export function capitalCase(str: string) {
  const firstChar = str.charAt(0).toUpperCase()
  const subString = str.substring(1).toLowerCase()
  return firstChar + subString
}
