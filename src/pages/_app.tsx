import { theme } from "../styles/theme"
import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"

export default function ({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
