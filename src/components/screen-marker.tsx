import { Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { useState, useEffect } from "react"

export function ScreenMarker() {
  const [screenNumber, setScreenNumber] = useState(0)
  useEffect(() => {
    const wrap = document.getElementById("wrap")
    const child = wrap.childNodes[1] as HTMLDivElement
    wrap.onscroll = () => {
      const { left, width } = child.getBoundingClientRect()
      const screenNumber = width / 2 >= left ? 1 : 0
      setScreenNumber(screenNumber)
    }
  }, [])
  return (
    <RadioGroup
      value={screenNumber}
      pointerEvents="none"
      display={{
        md: "none",
      }}
    >
      <Stack
        width="100vw"
        direction="row"
        justifyContent="center"
        position="fixed"
        bottom="2.25rem"
        left="0"
      >
        <Radio value={0} size="xs" />
        <Radio value={1} size="xs" />
      </Stack>
    </RadioGroup>
  )
}
