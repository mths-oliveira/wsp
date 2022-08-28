import initialProductsAndServicesValues from "../../products-and-services-values.json"
import { useState, useEffect } from "react"
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
import { Coin, Currency, CurrencyData } from "../types"
import { TableRow } from "../components/table-row"
import { formatCurrency } from "../utils/format-currency"
import { getCurrencyValue } from "../utils/get-currency-value"
import { capitalCase } from "../utils/capital-case"
import { getMonth } from "../utils/get-month"

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
const initialValuesPerMonth = Array(3).fill(
  initialProductsAndServicesValues.wol.monthlyPayment
)

export default function () {
  const [coin, setCoin] = useState<Coin>("real")
  const [valuesPerMonth, setValuesPerMonth] = useState<number[]>(
    initialValuesPerMonth
  )
  const [selectedProducts, setSelectedProducts] = useState(
    initialSelectedProducts
  )
  const [productsAndServicesValues, setProductsAndServicesValues] = useState(
    initialProductsAndServicesValues
  )
  const [screen, setScreen] = useState<0 | 1>(0)

  useEffect(() => {
    ;(async () => {
      const dolarValue = await getCurrencyValue("dolar")
      const euroValue = await getCurrencyValue("euro")
      const libraValue = await getCurrencyValue("libra")
      currencyData.dolar.value = Number(dolarValue)
      currencyData.euro.value = Number(euroValue)
      currencyData.libra.value = Number(libraValue)
    })()
  }, [])

  useEffect(() => {
    const { live, wol } = initialProductsAndServicesValues
    const currencyValue = currencyData[coin].value
    setProductsAndServicesValues({
      live: {
        enrolmentFee: live.enrolmentFee / currencyValue,
        monthlyPayment: live.monthlyPayment / currencyValue,
        mp: {
          enrolmentFee: live.mp.enrolmentFee / currencyValue,
          monthlyPayment: live.mp.monthlyPayment / currencyValue,
        },
      },
      wol: {
        monthlyPayment: wol.monthlyPayment / currencyValue,
        mp: {
          monthlyPayment: wol.mp.monthlyPayment / currencyValue,
        },
      },
    })
  }, [coin])

  useEffect(() => {
    const { live, wol } = productsAndServicesValues
    const productsAndServicesValuesPerMonth = {
      live: [live.enrolmentFee, 0, live.monthlyPayment],
      mp_live: [live.mp.enrolmentFee, 0, live.mp.monthlyPayment],
      wol: Array(3).fill(wol.monthlyPayment),
      mp_wol: Array(3).fill(wol.mp.monthlyPayment),
    }
    const valuesPerMonth = Array(3).fill(0)
    for (const selectedProduct in selectedProducts) {
      if (selectedProducts[selectedProduct]) {
        productsAndServicesValuesPerMonth[selectedProduct].forEach(
          (value, i) => {
            valuesPerMonth[i] += value
          }
        )
      }
    }
    setValuesPerMonth(valuesPerMonth)
  }, [selectedProducts, productsAndServicesValues])

  return (
    <>
      <Flex
        flexDir={{
          md: "column",
        }}
        paddingX={{
          md: "15rem",
        }}
        minHeight="100vh"
        bg="gray.dark"
        overflowX="auto"
        scrollSnapType="x mandatory"
        sx={{
          "&>div": {
            width: "100%",
            height: "100%",
            flexShrink: 0,
            scrollSnapAlign: "start",
          },
        }}
        onScroll={(e) => {
          const screen = e.currentTarget.childNodes[1] as HTMLDivElement
          const { width, left } = screen.getBoundingClientRect()
          const isSecondScreen = width / 2 > left
          setScreen(isSecondScreen ? 1 : 0)
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
            {valuesPerMonth.map((value, i) => (
              <Stack key={`${i}$8&44gF`}>
                <Text>{capitalCase(getMonth(i))}</Text>
                <Text fontWeight="bold">
                  {currencyData[coin].simbol + " "}
                  {formatCurrency(value)}
                </Text>
              </Stack>
            ))}
          </Flex>
          <Stack as="form" spacing="2.25rem">
            <RadioGroup value={coin} onChange={setCoin as any}>
              <Stack spacing="1rem">
                {Object.keys(currencyData).map((value) => (
                  <Radio value={value} key={value}>
                    {capitalCase(value)}
                  </Radio>
                ))}
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
                setSelectedProducts((selectedProducts) => {
                  selectedProducts[input.value] = input.checked
                  if (!selectedProducts.live || !selectedProducts.mp_wol)
                    selectedProducts.mp_live = false
                  return {
                    ...selectedProducts,
                  }
                })
              }}
            >
              <Checkbox
                value="strike"
                isChecked={Object.values(selectedProducts).every(Boolean)}
                onChange={(e) => {
                  const input = e.target as HTMLInputElement
                  e.stopPropagation()
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
            flexGrow={1}
            marginBottom={{
              md: "5rem",
            }}
          >
            <TableRow>
              <Box>WOL</Box>
              <Box>{currencyData[coin].simbol}</Box>
              <Box>
                {formatCurrency(productsAndServicesValues.wol.monthlyPayment)}
              </Box>
            </TableRow>
            <TableRow>
              <Box>MP WOL</Box>
              <Box>{currencyData[coin].simbol}</Box>
              <Box>
                {formatCurrency(
                  productsAndServicesValues.wol.mp.monthlyPayment
                )}
              </Box>
            </TableRow>
            <TableRow>
              <Box>LIVE - Matrícula</Box>
              <Box>{currencyData[coin].simbol}</Box>
              <Box>
                {formatCurrency(productsAndServicesValues.live.enrolmentFee)}
              </Box>
            </TableRow>
            <TableRow>
              <Box>LIVE - Mensalidade</Box>
              <Box>{currencyData[coin].simbol}</Box>
              <Box>
                {formatCurrency(productsAndServicesValues.live.monthlyPayment)}
              </Box>
            </TableRow>
            <TableRow>
              <Box>MP LIVE - Matrícula</Box>
              <Box>{currencyData[coin].simbol}</Box>
              <Box>
                {formatCurrency(productsAndServicesValues.live.mp.enrolmentFee)}
              </Box>
            </TableRow>
            <TableRow>
              <Box>MP LIVE - Mensalidade</Box>
              <Box>{currencyData[coin].simbol}</Box>
              <Box>
                {formatCurrency(
                  productsAndServicesValues.live.mp.monthlyPayment
                )}
              </Box>
            </TableRow>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        width="100%"
        position="fixed"
        bottom="1.5rem"
        left="0"
        justifyContent="center"
        display={["flex", "flex", "none"]}
      >
        <RadioGroup value={`${screen}`}>
          <Radio value="0" size="xs" marginRight="0.5rem" />
          <Radio value="1" size="xs" />
        </RadioGroup>
      </Flex>
    </>
  )
}
