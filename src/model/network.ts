export default interface Network<T = unknown> {
  code: number
  msg: string
  data: string | T
}
