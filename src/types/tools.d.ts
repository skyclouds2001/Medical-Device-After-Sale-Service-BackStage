/**
 * Make all property type in T become never
 */
type Never<T> = {
  [K in keyof T]: never
}

/**
 * Make all property type in T become null
 */
type Null<T> = {
  [K in keyof T]: null
}

/**
 * Make all property type in T become undefined
 */
type Undefined<T> = {
  [K in keyof T]: undefined
}
