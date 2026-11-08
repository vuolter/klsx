# 🎨 𝒌𝒍𝒔𝒙

#### The fastest classname constructor out there, drop-in replacement for [clsx](https://www.npmjs.com/package/clsx)

---

Conditionally joins class names together from strings, arrays and key-value objects:

```typescript
klsx('foo', 'bar', 'baz') // => "foo bar baz"

klsx(['foo', ['bar', true && 'baz']]) // => "foo bar baz"

klsx({ foo: 'string', bar: true, bux: null }, 'baz') // => "foo bar baz"
```

### Features

- 🚀 Faster than [clsx](https://www.npmjs.com/package/clsx), [classnames](https://www.npmjs.com/package/classnames) and even [classix](https://www.npmjs.com/package/classix)
- 🎯 Same of full featured [clsx](https://www.npmjs.com/package/clsx), just change a `c` with `k` and you've done!
- 👑 ES Module syntax, written in TypeScript and tested on [Bun](https://bun.com)
- 💎 Zero dependencies, less than 200 bytes (Brotli)
- 🐳 Provided with [real-world usage benchmark and memory footprint analysis](https://github.com/vuolter/klsx/blob/main/BENCHMARK.md)

## Benchmark

Throughput (ops/s, higher is better) from the latest run:

###### Bars are scaled to the fastest package in each test

![Throughput benchmark: 𝒌𝒍𝒔𝒙 vs clsx, classnames and classix](assets/benchmark.svg)

Full results: [BENCHMARK.md](BENCHMARK.md).

## Installation

<details open>
<summary>bun</summary>

```bash
bun add klsx
```

</details>

<details>
<summary>npm</summary>

```bash
npm install klsx
```

</details>

<details>
<summary>pnpm</summary>

```bash
pnpm add klsx
```

</details>

<details>
<summary>yarn</summary>

```bash
yarn add klsx
```

</details>

<details>
<summary>deno</summary>

```bash
deno add klsx
```

</details>

## Quick Start

```typescript
import { klsx, kx } from 'klsx'

kx('foo', 'bar', 'baz') // => "foo bar baz"
klsx('foo', 'bar', 'baz') // => "foo bar baz"
```

### React

```jsx
import { kx } from 'klsx'
import React, { useState } from 'react'

const MyComponent = () => {
  const [isActive, setIsActive] = useState(false)

  return <div className={kx('base-class', isActive ? 'active' : 'inactive')}>{/* ... */}</div>
}
```

### Migrate `cn`

From `clsx`:

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

To `klsx`:

```typescript
import { klsx, type KlassValue } from 'klsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: KlassValue[]) {
  return twMerge(klsx(inputs))
}
```

## Integrations

### Tailwind CSS

#### Visual Studio Code

1. Install the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension:

```bash
code --install-extension bradlc.vscode-tailwindcss
```

1. Update your [`settings.json`](https://code.visualstudio.com/docs/getstarted/settings) configuration with:

```json
{
  "tailwindCSS.classFunctions": ["klsx", "kx"]
}
```

#### Prettier

1. Install the [prettier-plugin-tailwindcss](https://www.npmjs.com/package/prettier-plugin-tailwindcss) plugin:

```bash
bun add -D prettier prettier-plugin-tailwindcss
```

1. Update your `prettier.config.js` configuration to handle `klsx`:

```javascript
/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['klsx', 'kx'],
}
```

### ESLint

1. Install the [eslint-plugin-clsx](https://www.npmjs.com/package/eslint-plugin-clsx) plugin:

```bash
bun add -D eslint eslint-plugin-clsx
```

1. Update your `eslint.config.js` configuration to handle `klsx`:

```javascript
import clsx from 'eslint-plugin-clsx'
import { defineConfig } from 'eslint/config'

export default defineConfig({
  plugins: { clsx },
  settings: {
    clsxOptions: {
      klsx: ['default', 'klsx', 'kx'],
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
