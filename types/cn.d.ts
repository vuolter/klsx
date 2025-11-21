declare type ClsnObject = Record<string, boolean | unknown>
declare type ClsnArray = ClsnValue[]
declare type ClsnValue =
  | bigint
  | boolean
  | ClsnArray
  | ClsnObject
  | null
  | number
  | string
  | undefined
