import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { isAuthenticated } from "../../apiCalls/auth";
import { signout } from "../../apiCalls/auth";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useEffect } from "react";

const NavItems = [
  { text: "Products", href: "/products" },
  { text: "My Products", href: "/myproducts" },
  { text: "Upload", href: "/upload" },
  { text: "My Cart", href: "/cart" },
];

const NavLink = ({ text, href, currentRoute }) => (
  <Link href={href} passHref>
    <Button
      px={2}
      py={1}
      bg={href === currentRoute ? "gray.700" : "none"}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "green.400",
      }}
    >
      {text}
    </Button>
  </Link>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <>
      <Box
        bg="gray.900"
        px={4}
        pos="fixed"
        top="0"
        w={"full"}
        boxShadow={"lg"}
        zIndex="999"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link href="/" passHref>
              <Button
                px={2}
                py={1}
                bg="none"
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  color: "white",
                }}
                color="green.400"
                fontSize="2xl"
                fontFamily="cursive"
              >
                SellPro
              </Button>
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {NavItems.map((item) => (
                <NavLink
                  key={item.href}
                  text={item.text}
                  href={item.href}
                  currentRoute={currentRoute}
                />
              ))}
              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <NavLink
                  text="Admin"
                  href="/admin"
                  currentRoute={currentRoute}
                />
              )}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {isAuthenticated() ? (
              <HStack spacing={4}>
                <Text>
                  {isAuthenticated().user.role === 1 ? "(Admin)" : ""}{" "}
                  {isAuthenticated().user.email}
                </Text>
                <Button
                  variant={"solid"}
                  colorScheme={"red"}
                  size={"sm"}
                  mr={4}
                  onClick={() => {
                    signout(() => {
                      router.push("/");
                    });
                    toast.success("Signed out successfully.");
                  }}
                >
                  Sign Out
                </Button>
              </HStack>
            ) : (
              <>
                <Link href="/signin" passHref>
                  <Button
                    variant={"solid"}
                    colorScheme={"green"}
                    size={"sm"}
                    mr={4}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button
                    variant={"solid"}
                    colorScheme={"green"}
                    size={"sm"}
                    mr={4}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {NavItems.map((item) => (
                <NavLink key={item.href} text={item.text} href={item.href} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
