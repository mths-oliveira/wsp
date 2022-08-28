import { Box, BoxProps } from "@chakra-ui/react"

export function TableRow({ children, ...rest }: BoxProps) {
  return (
    <Box
      display="table-row"
      _hover={{
        bg: "rgba(255,255,255,0.1)",
      }}
      sx={{
        "&>div": {
          paddingY: "0.75rem",
          display: "table-cell",
        },
        "&>div:first-child": {
          width: "100%",
          paddingX: "1rem",
        },
        "&>div:not(:first-child)": {
          fontWeight: "bold",
        },
        "&>div:last-child": {
          paddingRight: "1rem",
          paddingLeft: "0.25rem",
          textAlign: "end",
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}
