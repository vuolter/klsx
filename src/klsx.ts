import { type KlassObject, type KlassValue } from '@/types'

const isArray = Array.isArray

// Appends the truthy keys of an object to str
function append(obj: KlassObject, str: string): string {
  for (const key in obj) {
    if (key && obj[key]) {
      str = str ? str + ' ' + key : key
    }
  }
  return str
}

// Appends every truthy class in list to str, recursing into nested arrays
function collect(list: readonly KlassValue[], str: string): string {
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (!item) {
      continue
    }
    if (typeof item == 'string') {
      str = str ? str + ' ' + item : item
    } else if (typeof item == 'object') {
      str = isArray(item) ? collect(item, str) : append(item, str)
    }
  }
  return str
}

export default function klsx(...args: KlassValue[]): string {
  let str = ''
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (!arg) {
      continue
    }
    if (typeof arg == 'string') {
      str = str ? str + ' ' + arg : arg
    } else if (typeof arg == 'object') {
      str = isArray(arg) ? collect(arg, str) : append(arg, str)
    }
  }
  return str
}
