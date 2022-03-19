import { Box, Flex } from "@chakra-ui/react";

export default function ChatBody() {
  return (
    <>
      <Box
        h={"full"}
      >
        <Flex
          padding={"1.3rem"}
          direction={"column"}
          h={"full"}
          sx={{
            '&::-webkit-scrollbar': {
              width: '8px',
              backgroundColor: 'rgba(0, 0, 0, 0.07)',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0, 0, 0, 0.12)',
            },
          }}
        >
          Aqui vão ficar as mensagens
        </Flex>
      </Box>
    </>
  )
}