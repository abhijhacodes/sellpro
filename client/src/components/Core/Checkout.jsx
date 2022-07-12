import {
  Stack,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { ImCreditCard } from "react-icons/im";

const CheckoutItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color="gray.400">
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

const Checkout = ({ amount }) => {
  return (
    <Center h="100%">
      <Stack
        spacing="8"
        borderWidth="2px"
        rounded="lg"
        padding="8"
        width="70%"
        bgColor="gray.800"
        boxShadow="2xl"
      >
        <Heading size="md">Order Summary</Heading>
        <Stack spacing="6">
          <CheckoutItem label="Subtotal" value={`₹${amount}`} />
          <CheckoutItem label="Shipping + Tax">
            <Link href="#" textDecor="underline">
              Calculate shipping
            </Link>
          </CheckoutItem>
          <CheckoutItem label="Coupon Code">
            <Link href="#" textDecor="underline">
              Add coupon code
            </Link>
          </CheckoutItem>
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">
              Total Amount
            </Text>
            <Text fontSize="xl" fontWeight="extrabold">
              ₹{amount}
            </Text>
          </Flex>
        </Stack>
        <Button
          bgColor="green.600"
          color="white"
          size="lg"
          fontSize="md"
          rightIcon={<ImCreditCard />}
          boxShadow="2xl"
          _hover={{
            transform: "translateY(4px)",
            backgroundColor: "green.800",
          }}
          _active={{
            backgroundColor: "green.800",
          }}
        >
          Checkout
        </Button>
      </Stack>
    </Center>
  );
};

export default Checkout;
