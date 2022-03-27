import { Box, Button, Flex, Input, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useUser } from "../../contexts/user.context";
import { useChat } from "../../contexts/chat.context";
import MessagesService from "../../services/messages.service";

export default function SendMessage({ messagesEndRef }) {
  const toast = useToast();
  const { user } = useUser();
  const { chat, addLoadingMessage } = useChat();
  const { register, handleSubmit, reset } = useForm();

  const scrollToBottom = () => {
    if (!messagesEndRef || !messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (data) => {
    try {
      const { message } = data;

      if (!message || message === "") {
        return;
      }

      const response = await MessagesService.sendText(user, {
        body: message,
        chatId: chat._id,
      });
      addLoadingMessage(response);
      reset();
      scrollToBottom();
    } catch (error) {
      toast({
        title: "Atenção",
        description: error.message,
        duration: 9000,
        isClosable: true,
        status: "error",
      });
    }
  };

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
                required: true,
              })}
            />
          </Box>
          <Box w={"10%"}>
            <Button
              borderRadius={10}
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
  );
}
