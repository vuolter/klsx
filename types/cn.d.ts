declare type KlsxObject = Record<string, boolean | unknown>
declare type KlsxArray = KlsxValue[]
declare type KlsxValue =
  | bigint
  | boolean
  | KlsxArray
  | KlsxObject
  | null
  | number
  | string
  | undefined
