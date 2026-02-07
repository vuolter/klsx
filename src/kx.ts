import type { KlassValue } from '~/types'

// eslint-disable-next-line sonarjs/cognitive-complexity
export function _kx(args: Readonly<KlassValue[]>): string {
  let str = ''
  for (const arg of args) {
    if (!arg) {
      continue
    }
    if (typeof arg == 'string') {
      str = str ? str + ' ' + arg : arg
    } else if (typeof arg == 'object') {
      if (Array.isArray(arg)) {
        const sub = _kx(arg)
        if (sub) {
          str = str ? str + ' ' + sub : sub
        }
      } else {
        for (const key in arg) {
          if (arg[key]) {
            str = str ? str + ' ' + key : key
          }
        }
      }
    }
  }
  return str
}

export function kx(...args: KlassValue[]): string {
  return _kx(args)
}

export default kx
