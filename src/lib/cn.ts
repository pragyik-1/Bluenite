// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClassArg = string | number | boolean | bigint | null | undefined | ClassArg[] | any

function flatten(values: ClassArg[]): string {
  return values
    .flat(Infinity)
    .filter((v) => typeof v === 'string' && v.trim() !== '')
    .join(' ')
}

export function cn(override: boolean | undefined, userClass: ClassArg, ...internalClasses: ClassArg[]): string {
  const internal = flatten(internalClasses)
  const user = flatten([userClass])
  if (override) return user
  if (!user) return internal
  return internal ? `${internal} ${user}` : user
}
