import { Box, Button, Flex, FormControl, Input, InputGroup, Stack, Text, Textarea, useToast } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

export default function ({ }) {
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm()

  const onSubmit = async data => {
    try {
      const { name, title, description } = data
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
    <Flex
      flexDirection={"column"}
      backgroundColor={"white"}
      justifyContent={"center"}
      alignItems={"stretch"}
    >
      <Stack
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box minW={"100%"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              spacing={"4"}
              padding={".5rem"}
              backgroundColor={"white"}
            >
              <FormControl>
                <InputGroup>
                  <Input
                    isInvalid={errors.name ? true : false}
                    type={"text"}
                    placeholder={"Nome do chat"}
                    {...register("name", {
                      required: true
                    })}
                  />
                </InputGroup>
                {errors.name && (
                  <Text color={"red"}>Nome do chat é requerido</Text>
                )}
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    isInvalid={errors.title ? true : false}
                    type="text"
                    placeholder="Título do chat"
                    {...register("title", {
                      required: true
                    })}
                  />
                </InputGroup>
                {errors.title && (
                  <Text color={"red"}>Título do chat é requerido</Text>
                )}
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Textarea
                    placeholder={"Descrição do chat"}
                    resize={"vertical"}
                    {...register("description", {
                      required: true
                    })}
                  />
                </InputGroup>
                {errors.description && (
                  <Text color={"red"}>Título do chat é requerido</Text>
                )}
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                CRIAR
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}