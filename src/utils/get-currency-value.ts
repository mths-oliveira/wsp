import { Coin } from "../types"

const abbreviations = {
  libra: "GBP",
  euro: "EUR",
  dolar: "USD",
}

const coins = ["USD", "EUR", "GBP"]

export async function getCurrencyValue(currency: Coin) {
  if (currency === "real") return 1
  const abbreviation = abbreviations[currency]
  let url = "https://economia.awesomeapi.com.br/json/last/"
  for (const coin of coins) {
    url += `${coin}-BRL,`
  }
  url.replace(/,^/, "")
  console.log(url)
  const response = await fetch(url)
  const data = await response.json()
  const currencyValue = Number(data[`${abbreviation}BRL`].bid)
  return currencyValue
}
