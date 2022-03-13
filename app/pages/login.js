import { Avatar, Box, Button, chakra, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, Text, useToast } from '@chakra-ui/react'
import Head from 'next/head'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaUserAlt, FaLock } from "react-icons/fa"
import AuthService from "../services/auth.service"
import { login as loginHelper } from "../helpers/auth"

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors
    }
  } = useForm()

  const [showPassword, setShowPassword] = useState(false)
  const toast = useToast()

  const handleShowClick = () => setShowPassword(!showPassword)

  const onSubmit = async data => {
    try {
      const { email, password } = data
      const response = await AuthService.login(email, password)
      console.log(response)
      const { token } = response
      loginHelper(token)
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
    <div>
      <Head>
        <title>Cream - Login</title>
        <meta name="description" content="Sistema de chat real-time" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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
            <Heading color="teal.400">Welcome</Heading>
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
                        children={<CFaUserAlt color="gray.300" />}
                      />
                      <Input
                        isInvalid={errors.email ? true : false}
                        type="email"
                        placeholder="email address"
                        {...register("email", {
                          required: true
                        })}
                      />
                    </InputGroup>
                    {errors.email && (
                      <Text color='red'>Email é requerido</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        children={<CFaLock color="gray.300" />}
                      />
                      <Input
                        isInvalid={errors.password ? true : false}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password", {
                          required: true
                        })}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && (
                      <Text color='red'>Senha é requerida</Text>
                    )}
                    <FormHelperText textAlign="right">
                      <Link>forgot password?</Link>
                    </FormHelperText>
                  </FormControl>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                  >
                    Login
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
          <Box>
            New to us?{" "}
            <Link color="teal.500" href="#">
              Sign Up
            </Link>
          </Box>
        </Flex>
      </main>
    </div>
  )
}
