import { estimateShallowMemoryUsageOf } from 'bun:jsc'
import { cx } from 'classix'
import classnames from 'classnames'
import { clsx } from 'clsx'
import { Bench, nToMs } from 'tinybench'

import { cn } from '~/cn'

const COMPETITORS = [
  ...Object.entries({
    CLSN: cn,
    classix: cx,
    clsx: clsx,
    classnames: classnames,
  }),
] as const
const TASKS = [
  ...Object.entries({
    'short strings': {
      cb: (fn: CallableFunction) => fn('foo', 'bar'),
      exclude: [],
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
    objects: {
      cb: (fn: CallableFunction) =>
        fn(
          { foo: true, bar: true, bax: true, bux: false },
          { baz: true, bax: false, bux: true },
        ),
      exclude: ['classix'],
    },
    arrays: {
      cb: (fn: CallableFunction) => fn(['foo', 'bar'], ['baz', 'bax', 'bux']),
      exclude: ['classix'],
    },
    mixed: {
      cb: (fn: CallableFunction) =>
        fn('foo', 'bar', { bax: true, bux: false }, ['baz', { bax: false, bux: true }]),
      exclude: ['classix'],
    },
  }),
] as const

const bench = new Bench({
  now: () => nToMs(Bun.nanoseconds()),
  setup: (_task, mode) => {
    if (mode === 'warmup') {
      Bun.gc(true)
    }
  },
  time: 10,
})
const benchTables: Record<string, ReturnType<typeof bench.table>> = {}

const start = Bun.nanoseconds()

let count = 0
for (const [name, { cb, exclude }] of TASKS) {
  for (const [id, fn] of COMPETITORS) {
    if ((exclude as string[]).includes(id)) {
      continue
    }
    bench.add(id, () => cb(fn))
  }

  console.log(` Running benchmark [${++count}/${TASKS.length}]: ${name} ...`)
  await bench.run()

  benchTables[name] = bench.table()

  for (const [id] of COMPETITORS) {
    bench.remove(id)
  }
  bench.reset()
}

const storageTable = []
const memoryTable = []

const name = 'Task name'
const size = 'Size (bytes)'

for (const [id, fn] of COMPETITORS) {
  const storage = Buffer.byteLength(fn.toString(), 'utf8')
  const memory = estimateShallowMemoryUsageOf(fn)
  storageTable.push({ [name]: id, [size]: storage })
  memoryTable.push({ [name]: id, [size]: memory })
}

const end = Bun.nanoseconds()

for (const [name, table] of Object.entries(benchTables)) {
  console.log('\n', `Benchmark (${name}):`)
  console.table(table)
}
console.log('\n', 'Storage Size (footprint):')
console.table(storageTable)

console.log('\n', 'Memory Usage (shallow):')
console.table(memoryTable)

console.log('\n', `Completed in ${nToMs(end - start)} ms.`)
