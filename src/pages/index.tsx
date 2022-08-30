import valuesOfProductsAndServicesPerMonth from "../../products-and-services-values.json"
import {
  Box,
  Checkbox,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { TableRow } from "../components/table-row"
import { Coin, Currency, CurrencyData } from "../types"
import { getCurrencyValue } from "../utils/get-currency-value"
import { capitalCase } from "../utils/capital-case"
import { getMonth } from "../utils/get-month"
import { TableData } from "../components/table-data"
import { ScreenMarker } from "../components/screen-marker"

const { live, wol } = valuesOfProductsAndServicesPerMonth
const currencyData: Currency<CurrencyData> = {
  real: {
    simbol: "R$",
    value: 1,
  },
  dolar: {
    simbol: "US$",
    value: 1,
  },
  euro: {
    simbol: "€",
    value: 1,
  },
  libra: {
    simbol: "£",
    value: 1,
  },
}
const initialSelectedProducts = {
  wol: true,
  mp_wol: false,
  live: false,
  mp_live: false,
}
const initialValuesOfProductsAndServicesPerMonth = Array(3).fill(
  wol.monthlyPayment
)
export default function () {
  const [coin, setCoin] = useState<Coin>("real")
  const [selectedProducts, setSelectedProducts] = useState(
    initialSelectedProducts
  )
  const valuesOfProductsAndServicesPerMonth = [
    ...initialValuesOfProductsAndServicesPerMonth,
  ]
  if (selectedProducts.live) {
    valuesOfProductsAndServicesPerMonth[0] += live.enrolmentFee
    valuesOfProductsAndServicesPerMonth[2] += live.monthlyPayment
  }
  if (selectedProducts.mp_live) {
    valuesOfProductsAndServicesPerMonth[0] += live.mp.enrolmentFee
    valuesOfProductsAndServicesPerMonth[2] += live.mp.monthlyPayment
  }
  if (selectedProducts.mp_wol) {
    for (const i in valuesOfProductsAndServicesPerMonth) {
      valuesOfProductsAndServicesPerMonth[i] += wol.mp.monthlyPayment
    }
  }
  useEffect(() => {
    updateCurrencyValues()
    setInterval(updateCurrencyValues, 60_000)
  }, [])
  function updateCurrencyValues() {
    for (const coin in currencyData) {
      getCurrencyValue(coin as Coin).then((value) => {
        currencyData[coin].value = value
      })
    }
  }
  function convertCurrencyValue(value: number) {
    const currencyValue = currencyData[coin].value
    return value / currencyValue
  }
  function formatCurrency(value: number) {
    const valueFormated = value.toFixed(2).replace(".", ",")
    const { simbol } = currencyData[coin]
    return `${simbol} ${valueFormated}`
  }
  return (
    <>
      <Flex
        id="wrap"
        bg="gray.dark"
        overflowX="auto"
        scrollSnapType="x mandatory"
        flexDir={{
          md: "column",
        }}
        paddingX={{
          md: "15rem",
        }}
        sx={{
          "&>div": {
            width: "100%",
            minHeight: ["100vh", "100vh", "initial"],
            flexShrink: 0,
            scrollSnapAlign: "start",
          },
        }}
      >
        <Flex flexDir="column" paddingX="1rem">
          <Flex
            marginY="3.5rem"
            marginTop={{
              md: "5rem",
            }}
            justifyContent="space-between"
            textAlign="center"
          >
            {valuesOfProductsAndServicesPerMonth.map((value, i) => (
              <Stack key={`value-of-product-${i}`}>
                <Text>{capitalCase(getMonth(i))}</Text>
                <Text fontWeight="bold">
                  {formatCurrency(convertCurrencyValue(value))}
                </Text>
              </Stack>
            ))}
          </Flex>
          <Stack as="form" spacing="2.25rem">
            <RadioGroup value={coin} onChange={setCoin as any}>
              <Stack spacing="1rem">
                <Radio value="real">Real</Radio>
                <Radio value="dolar">Dolar</Radio>
                <Radio value="euro">Euro</Radio>
                <Radio value="libra">Libra</Radio>
              </Stack>
            </RadioGroup>
            <Stack
              spacing="1rem"
              textTransform="uppercase"
              sx={{
                "label:not(:first-child)": {
                  marginLeft: "1.5rem",
                },
              }}
              onChange={(e) => {
                const input = e.target as HTMLInputElement
                if (input.value === "wol") return
                const data = {
                  ...selectedProducts,
                  [input.value]: input.checked,
                }
                if (!data.mp_wol || !data.live) data.mp_live = false
                setSelectedProducts(data)
              }}
            >
              <Checkbox
                value="strike"
                isChecked={Object.values(selectedProducts).every(Boolean)}
                onChange={(e) => {
                  e.stopPropagation()
                  const input = e.target as HTMLInputElement
                  setSelectedProducts({
                    wol: true,
                    mp_wol: input.checked,
                    live: input.checked,
                    mp_live: input.checked,
                  })
                }}
              >
                Strike
              </Checkbox>
              <Checkbox value="wol" isChecked={selectedProducts.wol}>
                WOL
              </Checkbox>
              <Checkbox value="mp_wol" isChecked={selectedProducts.mp_wol}>
                MP WOL
              </Checkbox>
              <Checkbox value="live" isChecked={selectedProducts.live}>
                LIVE
              </Checkbox>
              <Checkbox value="mp_live" isChecked={selectedProducts.mp_live}>
                MP LIVE
              </Checkbox>
            </Stack>
          </Stack>
        </Flex>
        <Flex flexDirection="column">
          <Heading
            margin="3.5rem 1rem 1.5rem"
            marginTop={{
              md: "5rem",
            }}
          >
            Tabela de preços
          </Heading>
          <Flex
            display="table"
            height="fit-content"
            marginBottom={{
              md: "5rem",
            }}
          >
            <TableRow>
              <Box>WOL</Box>
              <TableData>
                {formatCurrency(convertCurrencyValue(wol.monthlyPayment))}
              </TableData>
            </TableRow>
            <TableRow>
              <Box>MP WOL</Box>
              <TableData>
                {formatCurrency(convertCurrencyValue(wol.mp.monthlyPayment))}
              </TableData>
            </TableRow>
            <TableRow>
              <Box>LIVE - Matrícula</Box>
              <TableData>
                {formatCurrency(convertCurrencyValue(live.enrolmentFee))}
              </TableData>
            </TableRow>
            <TableRow>
              <Box>LIVE - Mensalidade</Box>
              <TableData>
                {formatCurrency(convertCurrencyValue(live.monthlyPayment))}
              </TableData>
            </TableRow>
            <TableRow>
              <Box>MP LIVE - Matrícula</Box>
              <TableData>
                {formatCurrency(convertCurrencyValue(live.mp.enrolmentFee))}
              </TableData>
            </TableRow>
            <TableRow>
              <Box>MP LIVE - Mensalidade</Box>
              <TableData>
                {formatCurrency(convertCurrencyValue(live.mp.monthlyPayment))}
              </TableData>
            </TableRow>
          </Flex>
        </Flex>
      </Flex>
      <ScreenMarker />
    </>
  )
}
