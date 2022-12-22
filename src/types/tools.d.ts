/**
 * Make all properties in T become never
 */
type Never<T> = {
  [K in keyof T]: never
}

/**
 * Make all properties in T become null
 */
type Null<T> = {
  [K in keyof T]: null
}

/**
 * Make all properties in T become undefined
 */
type Undefined<T> = {
  [K in keyof T]: undefined
}
