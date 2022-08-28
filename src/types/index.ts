export type Coin = "dolar" | "euro" | "real"

export interface Currency<T = any> {
  real: T
  dolar: T
  euro: T
}

export interface CurrencyData {
  value: number
  simbol: string
}
