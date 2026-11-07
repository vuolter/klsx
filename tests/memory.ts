// Prints the total V8 heap size (bytes) after loading one library in a fresh process.
// Usage: bun ./tests/memory.ts <𝒌𝒍𝒔𝒙 | classix | clsx | classnames | baseline>
const LIBS: Record<string, () => Promise<unknown>> = {
  baseline: async () => {},
  // @ts-ignore
  klsx: () => import('@@/dist/index'),
  classix: () => import('classix'),
  clsx: () => import('clsx'),
  classnames: () => import('classnames'),
}

const id = process.argv[2] ?? ''
const load = LIBS[id]
if (!load) {
  throw new Error(`Unknown library: ${id}`)
}

await load()
Bun.gc(true)

interface V8Snapshot {
  snapshot: { meta: { node_fields: string[]; node_types: unknown[] } }
  nodes: number[]
}

const isV8Snapshot = (value: unknown): value is V8Snapshot =>
  typeof value === 'object' && value !== null && 'snapshot' in value && 'nodes' in value

const raw: unknown = Bun.generateHeapSnapshot('v8')
const snapshot: unknown = typeof raw === 'string' ? JSON.parse(raw) : raw
if (!isV8Snapshot(snapshot)) {
  throw new Error('Unexpected heap snapshot format')
}

const { node_fields: fields } = snapshot.snapshot.meta
const stride = fields.length
const sizeIndex = fields.indexOf('self_size')

let bytes = 0
for (let i = 0; i < snapshot.nodes.length; i += stride) {
  bytes += snapshot.nodes[i + sizeIndex] ?? 0
}

console.log(JSON.stringify({ id, bytes }))
