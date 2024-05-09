// for use with properties that are optional
export type Replace<OriginalType, ReplacedType> = Omit<
  OriginalType,
  keyof ReplacedType
> &
  ReplacedType;
