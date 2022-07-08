import { Button, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

const HeroButton = ({ text, dest }) => {
  return (
    <Link href={`/${dest}`} passHref>
      <Button
        px={4}
        variant="outline"
        fontSize={"md"}
        rounded={"sm"}
        color="white"
        width={40}
        py="6"
        boxShadow={
          "0px 1px 25px -5px rgb(144 214 64 / 56%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
        }
        _hover={{
          transform: "translateY(2px)",
          transform: "translateX(4px)",
          bg: "green.600",
          color: "white",
        }}
      >
        {text}
      </Button>
    </Link>
  );
};

export default HeroButton;
