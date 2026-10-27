// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
export type ClassDictionary = Record<string, any>
export type ClassArray = ClassValue[]

export interface CnOptions {
  override?: boolean
}

function toVal(mix: ClassValue): string {
  let str = ''
  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (let k = 0; k < mix.length; k++) {
        if (mix[k]) {
          const nested = toVal(mix[k])
          if (nested) {
            str && (str += ' ')
            str += nested
          }
        }
      }
    } else if (mix !== null) {
      for (const k in mix) {
        if ((mix as any)[k]) {
          str && (str += ' ')
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
      const obj = last as any
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
