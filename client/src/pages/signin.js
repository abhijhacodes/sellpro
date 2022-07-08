import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Center,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import toast from "react-hot-toast";
import { signin, authenticate, isAuthenticated } from "../apiCalls/auth";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) router.push("/products");
  }, []);

  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
  });

  const { email, password, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, loading: false });
          toast.error(data.error);
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              loading: false,
            });
          });
          toast.success("Signed in successfully!");
          router.push("/products");
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
        <title>SellPro: Sign In</title>
      </Head>
      <main>
        <Center h="100vh" bg="gray.800">
          <Stack
            direction={{ base: "column", md: "row" }}
            bgGradient="linear(to-r, #1C8D73, #03203C)"
            boxShadow="2xl"
            spacing="16"
            borderRadius="3xl"
            px="4"
            align={"center"}
            justify={"center"}
          >
            <Box>
              <Image
                src="/assets/signin1.svg"
                height="360px"
                width="420px"
                display={{ base: "none", md: "block" }}
              />
            </Box>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                  Sign In
                </Heading>
                <Text fontSize={"lg"} color={"gray.400"}>
                  Sign in now to get full access to our site ✌
                </Text>
              </Stack>
              <Box
                rounded={"2xl"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"2xl"}
                p={8}
              >
                <form onSubmit={handleSubmit}>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={handleChange("email")}
                      minLength="1"
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
                  <Stack spacing={10} pt={4}>
                    <Button
                      type="submit"
                      isLoading={loading}
                      loadingText="Signing in"
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
                      Sign In
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Don't have an account ?{" "}
                      <Link href="/signup" passHref>
                        Sign Up
                      </Link>
                    </Text>
                  </Stack>
                </form>
              </Box>
            </Stack>
          </Stack>
        </Center>
      </main>
    </>
  );
}
