import {
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { FcCustomerSupport, FcBusinessman } from "react-icons/fc";
import { TbTruckDelivery } from "react-icons/tb";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";
import { SiTrustpilot } from "react-icons/si";

const featuresList = [
  {
    title: "Verified Products",
    text: "All products and sellers are verified by SellPro admins. We only list trusted products.",
    icon: MdVerifiedUser,
  },
  {
    title: "Reasonable Price",
    text: "Most reasonable price of all products across any platform. We can bet on this.",
    icon: BsFillCreditCard2FrontFill,
  },
  {
    title: "Customer Support",
    text: "Customers are our first priority, we always provide 24 X 7 customer support with no extra charges.",
    icon: FcCustomerSupport,
  },
  {
    title: "Fast Delivery",
    text: "Get your order delivered in no time. No extra cost for lightning fast delivery.",
    icon: TbTruckDelivery,
  },
  {
    title: "Sell Your Products",
    text: "Whether you're a sole trader or an artist, you can sell your stuff and grow your own customers.",
    icon: FcBusinessman,
  },
  {
    title: "Transparent pricing",
    text: "SellPro takes almost no commission from the sellers. Start selling your products for free now.",
    icon: SiTrustpilot,
  },
];

const Feature = ({ title, text, icon }) => {
  return (
    <Stack
      _hover={{
        boxShadow: "2xl",
        cursor: "pointer",
        borderRadius: "2xl",
        bg: "gray.900",
      }}
      padding="4"
    >
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        <Icon as={icon} w={10} h={10} color="green" />
      </Flex>
      <Text fontWeight={600} fontSize="lg">
        {title}
      </Text>
      <Text color={"gray.500"}>{text}</Text>
    </Stack>
  );
};

const Features = () => {
  return (
    <Stack p={4}>
      <HStack alignSelf="center">
        <Heading size={{ base: "xl", md: "2xl", lg: "3xl" }} fontFamily="mono">
          Features
        </Heading>
        <Text
          color="gray.500"
          fontSize={{ base: "sm", md: "md", lg: "lg" }}
          fontFamily="cursive"
        >
          This is why everyone loves us 😍
        </Text>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="10" padding="16">
        {featuresList.map((feature, index) => (
          <Feature
            title={feature.title}
            text={feature.text}
            icon={feature.icon}
            key={index}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default Features;
