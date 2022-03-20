import { Box, Button, Flex, Input, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useUser } from "../../contexts/user.context"

export default function SendMessage() {
  const { setUser } = useUser()
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm()

  const onSubmit = async data => {
    console.log(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction={"row"} alignItems={"center"}>
          <Box flex={"1"} mr={"1rem"}>
            <Input
              bgColor={"white"}
              type={"text"}
              placeholder={"Digite a mensagem ..."}
              {...register("message", {
                required: true
              })}
            />
          </Box>
          <Box w={"10%"}>
            <Button
              borderRadius={0}
              type={"submit"}
              variant={"solid"}
              colorScheme={"teal"}
              width={"full"}
            >
              Enviar
            </Button>
          </Box>
        </Flex>
      </form>
    </>
  )
}