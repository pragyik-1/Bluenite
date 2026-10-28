export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
export type ClassDictionary = Record<string, unknown>
export type ClassArray = ClassValue[]

export interface CnOptions {
  override?: boolean
}

function toVal(mix: ClassValue): string {
  let str = ''
  if (typeof mix === 'string') {
    str += mix
  } else if (typeof mix === 'number' || typeof mix === 'bigint') {
    str += String(mix)
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (let k = 0; k < mix.length; k++) {
        if (mix[k]) {
          const nested = toVal(mix[k])
          if (nested) {
            if (str) str += ' '
            str += nested
          }
        }
      }
    } else if (mix !== null) {
      for (const k in mix) {
        if (mix[k]) {
          if (str) str += ' '
          str += k
        }
      }
    }
  }
  return str
}

export function cn(...inputs: ClassValue[]): string {
  const args = [...inputs]
  let options: CnOptions | undefined

  if (args.length > 0) {
    const last = args[args.length - 1]
    if (
      typeof last === 'object' &&
      last !== null &&
      !Array.isArray(last) &&
      !(last instanceof String) &&
      Object.prototype.toString.call(last) === '[object Object]'
    ) {
      const obj = last as Record<string, unknown>
      if ('override' in obj && Object.keys(obj).length === 1) {
        options = { override: !!obj.override }
        args.pop()
      }
    }
  }

  const classes: string[] = []
  for (let i = 0; i < args.length; i++) {
    const x = toVal(args[i])
    if (x) {
      classes.push(x)
    }
  }

  if (options?.override) {
    if (classes.length === 0) return ''
    return classes[0]
  }

  return classes.join(' ')
}
