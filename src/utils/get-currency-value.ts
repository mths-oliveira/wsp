import { Coin } from "../types"

export async function getCurrencyValue(currency: Coin) {
  if (currency === "real") return 1
  const abbreviation = currency === "euro" ? "EUR" : "USD"
  const url = `https://economia.awesomeapi.com.br/json/last/${abbreviation}-BRL`
  const response = await fetch(url)
  const data = await response.json()
  const currencyValue = data[`${abbreviation}BRL`].bid
  return currencyValue
}
