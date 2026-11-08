import { type KlassValue } from '@/types'

function kx(str: string, list: readonly KlassValue[]): string {
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (!item) {
      continue
    }
    if (typeof item == 'string') {
      str = str ? str + ' ' + item : item
    } else if (Array.isArray(item)) {
      str = kx(str, item)
    } else if (typeof item == 'object') {
      for (const key in item) {
        if (key && item[key]) {
          str = str ? str + ' ' + key : key
        }
      }
    }
  }
  return str
}

export default function klsx(...args: KlassValue[]): string
export default function klsx(): string {
  let str = ''
  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i]
    if (!arg) {
      continue
    }
    if (typeof arg == 'string') {
      str = str ? str + ' ' + arg : arg
    } else if (Array.isArray(arg)) {
      str = kx(str, arg)
    } else if (typeof arg == 'object') {
      for (const key in arg) {
        if (key && arg[key]) {
          str = str ? str + ' ' + key : key
        }
      }
    }
  }
  return str
}
