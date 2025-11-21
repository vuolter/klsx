export function _cn(args: Readonly<ClsnValue[]>): string {
  let str = ''
  for (const arg of args) {
    if (!arg) {
      continue
    }
    if (typeof arg == 'string') {
      str = str ? str + ' ' + arg : arg
    } else if (typeof arg == 'object') {
      if (Array.isArray(arg)) {
        const tmp = _cn(arg)
        if (tmp) {
          str = str ? str + ' ' + tmp : tmp
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

export function cn(...args: ClsnValue[]): string {
  return _cn(args)
}

export default cn
