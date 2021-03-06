import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useUser } from "../../contexts/user.context";
import { login } from "../../helpers/auth";
import AuthService from "../../services/auth.service";

export default function RegisterForm({ setIsLogin }) {
  const { setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    try {
      const { name, email, password } = data;

      let user = await AuthService.register(name, email, password);
      delete user.password;

      login(user);
      setUser(user);
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
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Registre-se</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<FaUserAlt />}
                    />
                    <Input
                      isInvalid={errors.name ? true : false}
                      type="text"
                      placeholder="name"
                      {...register("name", {
                        required: true,
                      })}
                    />
                  </InputGroup>
                  {errors.name && <Text color="red">Nome é requerido</Text>}
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<FaUserAlt />}
                    />
                    <Input
                      isInvalid={errors.email ? true : false}
                      type="email"
                      placeholder="email address"
                      {...register("email", {
                        required: true,
                      })}
                    />
                  </InputGroup>
                  {errors.email && <Text color="red">Email é requerido</Text>}
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<FaLock />}
                    />
                    <Input
                      isInvalid={errors.password ? true : false}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                      })}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && (
                    <Text color="red">Senha é requerida</Text>
                  )}
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Registrar
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          Já possui uma conta?{" "}
          <Link color="teal.500" onClick={() => setIsLogin(true)}>
            Login
          </Link>
        </Box>
      </Flex>
    </>
  );
}
