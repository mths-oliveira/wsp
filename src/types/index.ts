export type Coin = "dolar" | "euro" | "real" | "libra"

export interface Currency<T = any> {
  real: T
  dolar: T
  euro: T
  libra: T
}

export interface CurrencyData {
  value: number
  simbol: string
  name: string
  code: string
}
