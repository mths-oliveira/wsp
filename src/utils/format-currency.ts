export function formatCurrency(value: number) {
  const valueFormated = value.toFixed(2).replace(".", ",")
  return valueFormated
}
