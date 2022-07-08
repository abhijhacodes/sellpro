import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { MdWeb } from "react-icons/md";

const SocialButton = ({ children, label, href }) => {
  return (
    <Button
      bg="whiteAlpha.100"
      rounded={"full"}
      w={12}
      h={12}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: "whiteAlpha.200",
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

const FooterItems = [
  { text: "Home", href: "/" },
  { text: "Buy Products", href: "/products" },
  { text: "My Products", href: "/myproducts" },
  { text: "Upload Product", href: "/upload" },
  { text: "My Cart", href: "/cart" },
  { text: "Contact us", href: "mailto:abhi.jha.cs@gmail.com" },
];

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Text color="green.400" fontSize="2xl" fontFamily="cursive">
          SellPro
        </Text>
        <Stack direction={"row"} spacing={6}>
          {FooterItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <Text as="u" cursor="pointer">
                {item.text}
              </Text>
            </Link>
          ))}
        </Stack>
      </Container>

      <Box borderTopWidth={1} borderStyle={"solid"} borderColor="gray.700">
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© 2022 SellPro. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton
              label={"Website"}
              href={"https://www.abhijha.live/"}
              size="2xl"
            >
              <MdWeb />
            </SocialButton>
            <SocialButton
              label={"Github"}
              href={"https://github.com/abhijhacodes"}
            >
              <FaGithub />
            </SocialButton>
            <SocialButton
              label={"Linkedin"}
              href={"https://www.linkedin.com/in/abhijhacodes"}
            >
              <FaLinkedin />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
