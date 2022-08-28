import { Coin } from "../types"

const abbreviations = {
  libra: "GBP",
  euro: "EUR",
  dolar: "USD",
}

export async function getCurrencyValue(currency: Coin) {
  if (currency === "real") return 1
  const abbreviation = abbreviations[currency]
  const url = `https://economia.awesomeapi.com.br/json/last/${abbreviation}-BRL`
  const response = await fetch(url)
  const data = await response.json()
  const currencyValue = Number(data[`${abbreviation}BRL`].bid)
  return currencyValue
}
