import { estimateShallowMemoryUsageOf } from 'bun:jsc'
import { brotliCompressSync, gzipSync } from 'node:zlib'

// @ts-ignore
import { klsx } from '@@/dist/index'
import { cx } from 'classix'
import classnames from 'classnames'
import { clsx } from 'clsx'
import { Bench, nToMs } from 'tinybench'

const COMPETITORS = Object.entries({
  klsx,
  classix: cx,
  clsx: clsx,
  classnames: classnames,
})
const TASKS = Object.entries({
  'mixed / real-world': {
    cb: (fn: CallableFunction) =>
      fn('foo', 'bar', { bax: true, bux: false }, ['baz', { bax: false, bux: true }]),
    exclude: ['classix'],
  },
  objects: {
    cb: (fn: CallableFunction) =>
      fn({ foo: true, bar: true, bax: true, bux: false }, { baz: true, bax: false, bux: true }),
    exclude: ['classix'],
  },
  arrays: {
    cb: (fn: CallableFunction) => fn(['foo', 'bar'], ['baz', 'bax', 'bux']),
    exclude: ['classix'],
  },
  'long strings': {
    cb: (fn: CallableFunction) =>
      fn(
        '',
        'foo',
        'bar',
        'baz',
        'bax',
        'bux',
        '',
        'foo',
        'bar',
        'baz',
        'bax',
        'bux',
        '',
        'foo',
        'bar',
        'baz',
        'bax',
        'bux',
      ),
    exclude: [],
  },
  'short strings': {
    cb: (fn: CallableFunction) => fn('foo', 'bar'),
    exclude: [],
  },
})

const bench = new Bench({
  now: () => nToMs(Bun.nanoseconds()),
  setup: (_task, mode) => {
    if (mode === 'warmup') {
      Bun.gc(true)
    }
  },
  time: 100,
})

type Row = Record<string, number | string | undefined>

const PACKAGE_COLUMN = 'Package'
const SCORE_COLUMN = 'Score'
const DIST_COLUMN = 'Dist (bytes)'

// 1st, 2nd, 3rd, 4th, 11th, 12th, 13th, 21st, ...
const ordinal = (n: number): string => {
  const lastTwo = n % 100
  if (lastTwo >= 11 && lastTwo <= 13) {
    return `${n}th`
  }
  const suffixes: Record<number, string> = { 1: 'st', 2: 'nd', 3: 'rd' }
  return `${n}${suffixes[n % 10] ?? 'th'}`
}

// ANSI styles to highlight the 𝒌𝒍𝒔𝒙 row in terminal output
const ANSI_RESET = '\u001B[0m'
const BOLD = '\u001B[1m'
// Fully saturated truecolor, so the colours don't depend on the terminal theme
const GREEN_TEXT = '\u001B[38;2;35;195;35m'
const RED_TEXT = '\u001B[38;2;195;35;35m'

const paint = (text: string, foreground = ''): string => `${BOLD}${foreground}${text}${ANSI_RESET}`

const paintRow = (row: Row, foreground: string): Row =>
  Object.fromEntries(
    Object.entries(row).map(([column, value]) => [
      column,
      value === undefined ? value : paint(String(value), foreground),
    ]),
  )

// console.table uses object keys as its first column, so keys are the ordinal positions.
// When ranked, 𝒌𝒍𝒔𝒙 text is green if it is the winner (1st) and red otherwise.
const withOrdinals = (rows: Row[], ranked: boolean): Record<string, Row> =>
  Object.fromEntries(
    rows.map((row, i) => {
      if (row[PACKAGE_COLUMN] !== 'klsx') {
        return [ordinal(i + 1), row]
      }
      const foreground = ranked ? (i === 0 ? GREEN_TEXT : RED_TEXT) : ''
      return [paint(ordinal(i + 1), foreground), paintRow(row, foreground)]
    }),
  )

const byAscending = (a: number, b: number): number => (a < b ? -1 : a > b ? 1 : 0)

// Samples count is the higher-is-faster metric: the most iterations within the fixed time window
const scoreOf = (row: Row): number => {
  const score = row[SCORE_COLUMN]
  return typeof score === 'number' ? score : -Infinity
}

const benchTables: Record<string, Row[]> = {}

const toScoreTable = (table: ReturnType<typeof bench.table>): Row[] =>
  table
    .filter((row): row is Row => row !== null)
    .map(({ 'Task name': pkg, Samples, ...rest }) => ({
      [PACKAGE_COLUMN]: pkg,
      ...rest,
      [SCORE_COLUMN]: Samples,
    }))
    .toSorted((a, b) => byAscending(scoreOf(b), scoreOf(a)))

// Installed version of each package under test, printed before the run
const PACKAGE_JSON: Record<string, string> = {
  klsx: `${import.meta.dir}/../package.json`,
  classix: Bun.resolveSync('classix/package.json', import.meta.dir),
  clsx: Bun.resolveSync('clsx/package.json', import.meta.dir),
  classnames: Bun.resolveSync('classnames/package.json', import.meta.dir),
}

const VERSIONS: Record<string, string> = Object.fromEntries(
  await Promise.all(
    Object.entries(PACKAGE_JSON).map(async ([id, file]) => {
      const pkg: unknown = await Bun.file(file).json()
      const version =
        typeof pkg === 'object' &&
        pkg !== null &&
        'version' in pkg &&
        typeof pkg.version === 'string'
          ? pkg.version
          : 'unknown'
      return [id, version] as const
    }),
  ),
)

console.log(' Packages compared:')
for (const [id] of COMPETITORS) {
  console.log(`  ${id.padEnd(12)} v${VERSIONS[id]}`)
}
console.log('')

const start = Bun.nanoseconds()

let count = 0
for (const [taskName, { cb, exclude }] of TASKS) {
  for (const [id, fn] of COMPETITORS) {
    if ((exclude as string[]).includes(id)) {
      continue
    }
    bench.add(id, () => cb(fn))
  }

  console.log(` Running benchmark [${++count}/${TASKS.length}]: ${taskName} ...`)
  // Runs must be sequential: concurrent benchmarks would skew each other's timings
  // eslint-disable-next-line no-await-in-loop
  await bench.run()

  benchTables[taskName] = toScoreTable(bench.table())

  for (const [id] of COMPETITORS) {
    bench.remove(id)
  }
  bench.reset()
}

// Each library is loaded in its own process so its heap cost can be isolated.
// Load memory = heap size after loading the library minus heap size of an empty process.
const heapBytesOf = async (id: string): Promise<number> => {
  const proc = Bun.spawn([process.execPath, `${import.meta.dir}/memory.ts`, id], {
    stdout: 'pipe',
    stderr: 'inherit',
  })
  const out = await new Response(proc.stdout).text()
  await proc.exited
  const parsed: unknown = JSON.parse(out)
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('bytes' in parsed) ||
    typeof parsed.bytes !== 'number'
  ) {
    throw new Error(`Unexpected memory probe output for ${id}`)
  }
  return parsed.bytes
}

// Size of the shipped file each library's import resolves to, raw, gzip and brotli
const distSizesOf = async (file: string) => {
  const code = Buffer.from(await Bun.file(file).arrayBuffer())
  return {
    raw: code.byteLength,
    gzip: gzipSync(code).byteLength,
    brotli: brotliCompressSync(code).byteLength,
  }
}

const DIST_FILES: Record<string, string> = {
  klsx: `${import.meta.dir}/../dist/index.js`,
  classix: Bun.resolveSync('classix', import.meta.dir),
  clsx: Bun.resolveSync('clsx', import.meta.dir),
  classnames: Bun.resolveSync('classnames', import.meta.dir),
}

const baselineBytes = await heapBytesOf('baseline')

const memoryTable: Row[] = []

for (const [id, fn] of COMPETITORS) {
  const distFile = DIST_FILES[id]
  if (!distFile) {
    throw new Error(`No dist file configured for ${id}`)
  }
  const shallow = estimateShallowMemoryUsageOf(fn)
  const storage = Buffer.byteLength(fn.toString(), 'utf8')
  // Sequential on purpose: parallel child processes would skew each other's heap sizes
  // eslint-disable-next-line no-await-in-loop
  const load = (await heapBytesOf(id)) - baselineBytes
  // eslint-disable-next-line no-await-in-loop
  const dist = await distSizesOf(distFile)
  memoryTable.push({
    [PACKAGE_COLUMN]: id,
    'Shallow (bytes)': shallow,
    'Storage (bytes)': storage,
    'Load (bytes)': load,
    [DIST_COLUMN]: dist.raw,
    'Gzip (bytes)': dist.gzip,
    'Brotli (bytes)': dist.brotli,
  })
}

const end = Bun.nanoseconds()

for (const [taskName, table] of Object.entries(benchTables)) {
  console.log('\n', `Benchmark (${taskName}):`)
  console.table(withOrdinals(table, true))
}

// Smaller brotli size is better, so the memory table ranks from smallest to largest brotli
const brotliOf = (row: Row): number => {
  const brotli = row['Brotli (bytes)']
  return typeof brotli === 'number' ? brotli : Infinity
}

console.log('\n', 'Analysis (memory usage):')
console.table(
  withOrdinals(
    memoryTable.toSorted((a, b) => byAscending(brotliOf(a), brotliOf(b))),
    true,
  ),
)

console.log('\n', `Completed in ${nToMs(end - start)} ms.`)
