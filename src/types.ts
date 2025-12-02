export type KlassObject = Record<string, boolean | unknown>
export type KlassArray = KlassValue[]
export type KlassValue =
  | bigint
  | boolean
  | KlassArray
  | KlassObject
  | null
  | number
  | string
  | undefined
