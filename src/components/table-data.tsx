import { Box, Flex, Text } from "@chakra-ui/react"

interface TableDataProps {
  children: string
}

export function TableData({ children }: TableDataProps) {
  const words = children.split(" ")
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text marginRight="0.25rem">{words[0]}</Text>
        <Text textAlign="end">{words[1]}</Text>
      </Flex>
    </Box>
  )
}
