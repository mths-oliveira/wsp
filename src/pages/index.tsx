import valuesOfProductsAndServicesPerMonth from "../../products-and-services-values.json"
import {
  Box,
  Checkbox,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useState } from "react"
import { Coin, Currency, CurrencyData } from "../types"

import { capitalCase } from "../utils/capital-case"
import { getMonth } from "../utils/get-month"
import { ScreenMarker } from "../components/screen-marker"
import { GetServerSideProps } from "next"

const { live, wol } = valuesOfProductsAndServicesPerMonth
const initialSelectedProducts = {
  wol: true,
  mp_wol: false,
  live: false,
  mp_live: false,
}
const initialValuesOfProductsAndServicesPerMonth = Array(3).fill(
  wol.monthlyPayment
)
interface Props {
  currencyData: Currency<CurrencyData>
}
export default function ({ currencyData }: Props) {
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
        color="#fff"
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
                <Radio value="dolar">Dólar</Radio>
                <Radio value="euro">Euro</Radio>
                <Radio value="libra">Libra</Radio>
              </Stack>
            </RadioGroup>
            <Stack
              spacing="1rem"
              sx={{
                "label:not(:first-of-type)": {
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
                Wol
              </Checkbox>
              <Checkbox value="mp_wol" isChecked={selectedProducts.mp_wol}>
                Multi Wol
              </Checkbox>
              <Checkbox value="live" isChecked={selectedProducts.live}>
                Live
              </Checkbox>
              <Checkbox value="mp_live" isChecked={selectedProducts.mp_live}>
                Multi Live
              </Checkbox>
            </Stack>
          </Stack>
        </Flex>
        <Flex
          flexDirection="column"
          marginBottom={{
            sm: "5rem",
          }}
        >
          <Heading
            fontSize="1.25rem"
            marginTop={["3.5rem", "4.5rem"]}
            marginBottom="1.25rem"
            marginLeft={["1rem", 0]}
          >
            Tabela de preços
          </Heading>

          <TableContainer
            overflow="hidden"
            border={{
              sm: "1px solid rgba(255,255,255,0.1)",
            }}
            padding={{
              sm: "1rem",
            }}
            borderRadius="md"
          >
            <Table
              variant="simple"
              sx={{
                ">*>tr>*": {
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  padding: ["1rem", "1rem 1.5rem"],
                },
                ">tbody>tr>td": {
                  "&:nth-of-type(2)": {
                    width: "100%",
                  },
                  "&:last-of-type": {
                    textAlignLast: "justify",
                    fontWeight: "bold",
                  },
                },
              }}
            >
              <TableCaption>
                Valores convertidos em {currencyData[coin].name}
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Produto</Th>
                  <Th>Pagamento</Th>
                  <Th isNumeric>Valor</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Wol</Td>
                  <Td>Mensalidade</Td>
                  <Td isNumeric>
                    {formatCurrency(convertCurrencyValue(wol.monthlyPayment))}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Multi Wol</Td>
                  <Td>Mensalidade</Td>
                  <Td isNumeric>
                    {formatCurrency(
                      convertCurrencyValue(wol.mp.monthlyPayment)
                    )}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Live</Td>
                  <Td>Matrícula</Td>
                  <Td isNumeric>
                    {formatCurrency(convertCurrencyValue(live.enrolmentFee))}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Live</Td>
                  <Td>Mensalidade</Td>
                  <Td isNumeric>
                    {formatCurrency(convertCurrencyValue(live.monthlyPayment))}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Multi Live</Td>
                  <Td>Matrícula</Td>
                  <Td isNumeric>
                    {formatCurrency(convertCurrencyValue(live.mp.enrolmentFee))}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Multi Live</Td>
                  <Td>Mensalidade</Td>
                  <Td isNumeric>
                    {formatCurrency(
                      convertCurrencyValue(live.mp.monthlyPayment)
                    )}
                  </Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Produto</Th>
                  <Th>Pagamento</Th>
                  <Th isNumeric>Valor</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
      <ScreenMarker />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const currencyData = {
    dolar: {
      simbol: "$",
      code: "USD",
      value: 1,
      name: "Dólares americanos",
    },
    euro: {
      simbol: "€",
      code: "EUR",
      value: 1,
      name: "Euros",
    },
    libra: {
      simbol: "£",
      code: "GBP",
      value: 1,
      name: "Libras esterlinas",
    },
  }
  let url = "https://economia.awesomeapi.com.br/last/"
  for (const coin in currencyData) {
    const { code } = currencyData[coin]
    url += `${code}-BRL${code !== "GBP" ? "," : ""}`
  }
  const response = await fetch(url)
  const data = await response.json()
  for (const coin in currencyData) {
    const { code } = currencyData[coin]
    currencyData[coin].value = Number(data[`${code}BRL`].bid)
  }
  return {
    props: {
      currencyData: {
        real: {
          simbol: "R$",
          code: "BRL",
          value: 1,
          name: "Reais",
        },
        ...currencyData,
      },
    },
  }
}
