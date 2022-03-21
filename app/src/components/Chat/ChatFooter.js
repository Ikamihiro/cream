import { Box, Flex } from "@chakra-ui/react"
import SendMessage from "../Forms/SendMessage"

export default function ChatFooter() {
  return (
    <>
      <Box
        bg={"gray.200"}
        w={"full"}
      >
        <Flex
          direction={"column"}
          padding={"1.35rem"}
          justifyContent={"stretch"}
          alignItems={"stretch"}
        >
          <SendMessage />
        </Flex>
      </Box>
    </>
  )
}