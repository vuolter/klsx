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
const tables: Record<string, ReturnType<typeof bench.table>> = {}

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

  tables[name] = bench.table()

  for (const [id] of COMPETITORS) {
    bench.remove(id)
  }
  bench.reset()
}
const end = Bun.nanoseconds()

for (const [name, table] of Object.entries(tables)) {
  console.log('\n', `Benchmark (${name})`)
  console.table(table)
}
console.log('\n', `Benchmark completed in ${nToMs(end - start)} ms.`)
