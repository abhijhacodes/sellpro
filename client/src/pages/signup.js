import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Image,
  Center,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Head from "next/head";
import { signup } from "../apiCalls/auth";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    loading: false,
  });

  const { firstname, lastname, email, password, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true });
    signup({ firstname, lastname, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, loading: false });
          toast.error(data.error);
        } else {
          setValues({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            loading: false,
          });
          toast.success("Signed up successfully! Please sign in now.");
          router.push("/signin");
        }
      })
      .catch((err) => {
        setValues({ ...values, loading: false });
        toast.error("Connection failed, please try again.");
      });
  };

  return (
    <>
      <Head>
        <title>SellPro: Sign Up</title>
      </Head>
      <main>
        <Center h="100vh" bg="gray.800">
          <Stack
            direction={{ base: "column", md: "row" }}
            bgGradient="linear(to-r, #03203C, #1C8D73)"
            boxShadow="2xl"
            spacing="16"
            borderRadius="3xl"
            px="4"
            align={"center"}
            justify={"center"}
          >
            <Box>
              <Image
                src="/assets/signup.svg"
                height="360px"
                width="420px"
                display={{ base: "none", md: "block" }}
              />
            </Box>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                  Sign Up
                </Heading>
                <Text fontSize={"lg"} color={"gray.300"}>
                  To buy &#38; sell products &#38; grow your network &#9996;
                </Text>
              </Stack>
              <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                p={8}
              >
                <Stack spacing={4}>
                  <form onSubmit={handleSubmit}>
                    <HStack>
                      <Box>
                        <FormControl id="firstName" isRequired>
                          <FormLabel>First Name</FormLabel>
                          <Input
                            type="text"
                            required
                            value={firstname}
                            onChange={handleChange("firstname")}
                            minLength="3"
                            maxLength="32"
                          />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl id="lastName" isRequired>
                          <FormLabel>Last Name</FormLabel>
                          <Input
                            type="text"
                            required
                            value={lastname}
                            onChange={handleChange("lastname")}
                            minLength="3"
                            maxLength="32"
                          />
                        </FormControl>
                      </Box>
                    </HStack>
                    <FormControl id="email" isRequired>
                      <FormLabel>Email address</FormLabel>
                      <Input
                        type="email"
                        required
                        value={email}
                        onChange={handleChange("email")}
                        minLength="7"
                      />
                    </FormControl>
                    <FormControl id="password" isRequired>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={handleChange("password")}
                          minLength="6"
                        />
                        <InputRightElement h={"full"}>
                          <Button
                            variant={"ghost"}
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Stack spacing={10} pt={2}>
                      <Button
                        type="submit"
                        loadingText="Signing Up"
                        isLoading={loading}
                        size="lg"
                        bg={"green.600"}
                        color={"white"}
                        _hover={{
                          bg: "green.400",
                        }}
                        focus={{
                          bg: "green.400",
                        }}
                      >
                        Sign up
                      </Button>
                    </Stack>
                    <Stack pt={6}>
                      <Text align={"center"}>
                        Already a user?{" "}
                        <Link href="/signin" passHref>
                          Sign In
                        </Link>
                      </Text>
                    </Stack>
                  </form>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Center>
      </main>
    </>
  );
}
