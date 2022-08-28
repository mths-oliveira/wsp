import { theme } from "../styles/theme"
import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import Head from "next/head"

export default function ({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Conversor de Moedas - WSP</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
