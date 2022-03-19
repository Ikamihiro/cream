import { Box, Flex } from "@chakra-ui/react";

export default function ChatFooter() {
  return (
    <>
      <Box
        bg={"gray.100"}
        w={"full"}
      >
        <Flex
          direction={"column"}
          padding={"1.35rem"}
        >
          Aqui vai ficar a caixa pra mandar mensagem
        </Flex>
      </Box>
    </>
  )
}