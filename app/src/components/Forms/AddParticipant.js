import { Button, FormControl, Input, InputGroup, Stack, Text, useToast } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useChat } from "../../contexts/chat.context"
import { useUser } from "../../contexts/user.context"
import ChatsService from "../../services/chats.service"

export default function AddParticipant() {
  const { user } = useUser()
  const { chat, setChat } = useChat()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm()

  const onSubmit = async data => {
    try {
      const { email } = data
      setChat(await ChatsService.addParticipant(user, chat._id, email))
      reset()

      toast({
        title: "Uouu!",
        description: "Participante adicionado com sucesso!",
        duration: 9000,
        isClosable: true,
        status: "success"
      })
    } catch (error) {
      toast({
        title: "Atenção",
        description: error.message,
        duration: 9000,
        isClosable: true,
        status: "error"
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={"4"}
          padding={".5rem"}
          backgroundColor={"white"}
        >
          <FormControl>
            <InputGroup>
              <Input
                isInvalid={errors.email ? true : false}
                type={"text"}
                placeholder={"Email do participante"}
                {...register("email", {
                  required: true
                })}
              />
            </InputGroup>
            {errors.email && (
              <Text color={"red"}>Email do participante é requerido</Text>
            )}
          </FormControl>
          <Button
            borderRadius={0}
            type="submit"
            variant="solid"
            colorScheme="teal"
            width="full"
          >
            Adicionar
          </Button>
        </Stack>
      </form>
    </>
  )
}