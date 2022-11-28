export default {
  getItem<T = unknown>(key: string): T | null {
    const value = localStorage.getItem(key)
    return value != null ? (JSON.parse(value) as T) : value
  },
  setItem<T = unknown>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  },
  removeItem(key: string): void {
    localStorage.removeItem(key)
  },
  clear(): void {
    localStorage.clear()
  },
  get length(): number {
    return localStorage.length
  }
}
