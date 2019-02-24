type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

export type XOR<T, U> = (T | U) extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : never

export type ArrayOneOrMore<T> = [T, ...T[]]

// export const assertNever = (obj: never): never => {
//   throw new Error(`Unexpected object: ${obj}`)
// }
