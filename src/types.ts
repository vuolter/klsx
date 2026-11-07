export type KlassObject = Record<string, unknown>
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
