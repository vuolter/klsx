# KLSX

A simple replacement for [clsx](https://github.com/lukeed/clsx) **_you may not actually need_** (see the [benchmark](https://github.com/vuolter/klsx/blob/main/BENCHMARK.md)).

Developed as a case study, [Bun](https://bun.com) friendly.

## Features

- Unnecessarily fast
- Same functionality and API of clsx
- Modern ESM syntax
- No dependencies
- No "lite" mode (simply doesn't make any sense)
- Only 277B (~190B compressed)
- Experimental WASM variant (for research purposes, don't use it!)

## Installation

```bash
bun add klsx
```

or with `npm`:

```bash
npm install klsx
```

(or with whatever package manager you prefer)

## Quick Start

```typescript
import { klsx } from 'klsx'

klsx('foo', 'bar') // -> "foo bar"
klsx('foo', { bar: true, bux: false }, 'baz') // -> "foo bar baz"
klsx('foo', [0, 'bar', [{ bux: null, baz: 'I am not empty' }, undefined], 'bax']) // -> "foo bar baz bax"
```

or with the short alias `cn`:

```typescript
import { cn } from 'klsx'

cn('foo', 'bar') // -> "foo bar"
cn('foo', { bar: true, bux: false }, 'baz') // -> "foo bar baz"
cn('foo', [0, 'bar', [{ bux: null, baz: 'I am not empty' }, undefined], 'bax']) // -> "foo bar baz bax"
```

## Development

Install dependencies:

```bash
bun install
```

Build dist files:

```bash
bun run build
```

## Testing

Run test suite:

```bash
bun test
```

Run benchmark suite:

```bash
bun bench
```

## Case Study

_Coming soon..._
