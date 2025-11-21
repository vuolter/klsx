# KLSX

A simple replacement for [clsx](https://www.npmjs.com/package/clsx) **_you may not actually need_** (see the [benchmark](https://github.com/vuolter/klsx/blob/main/BENCHMARK.md))

Developed as a case study, [Bun](https://bun.com) friendly.

## Features

- Unnecessarily fast
- Same functionality and API of clsx
- Modern ESM syntax
- Zero dependencies
- No "lite" mode (simply doesn't make any sense)
- Only 277B (~190B compressed)
- Deeply typed and tested
- Experimental WASM variant (for research purposes, do not use it!)

## Installation

```bash
bun add klsx
```

or with `npm`:

```bash
npm install klsx
```

_(or with whatever package manager you prefer)_

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

## Integrations

### Tailwind CSS

<details open>
<summary>
  Visual Studio Code
</summary>

1. Install the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension.

2. Update your [`settings.json`](https://code.visualstudio.com/docs/getstarted/settings) configuration with:

```json
{
  "tailwindCSS.classFunctions": ["klsx", "cn"]
}
```

</details>

### ESLint

1. Install the [eslint-plugin-clsx](https://www.npmjs.com/package/eslint-plugin-clsx) plugin:

```bash
bun add -D eslint eslint-plugin-clsx
```

2. Update your `eslint.config.js` configuration to handle `klsx`:

```typescript
import { defineConfig } from 'eslint/config'
import clsx from 'eslint-plugin-clsx'

export default defineConfig({
  plugins: { clsx },
  settings: {
    clsxOptions: {
      klsx: ['default', 'klsx', 'cn'],
    },
  },
})
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
