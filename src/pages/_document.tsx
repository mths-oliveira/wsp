import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import { ColorModeScript } from "@chakra-ui/react"

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="icon"
            type="image/jpg"
            href="https://res.cloudinary.com/redfuel/image/upload/v1652875763/wsp/users/48f760be-ad6f-4b24-8513-9d1e492bbef8/team_photos/hc4tj8zkmf5syvx41zca.jpg"
          />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7275668723926191"
            crossorigin="anonymous"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode="dark" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
