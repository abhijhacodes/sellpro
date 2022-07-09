import {
  Box,
  Button,
  HStack,
  Image,
  Skeleton,
  Stack,
  Tag,
  TagLabel,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { getProductPhotoURL } from "../../apiCalls/products";
import toast from "react-hot-toast";
import { BsFillCartCheckFill } from "react-icons/bs";
import { isAuthenticated } from "../../apiCalls/auth";
import { addProductToCart, removeProductFromCart } from "../../apiCalls/cart";

const ProductCard = ({ product, onCartPage = false }) => {
  const { name, description, price, category, userId } = product;

  const addToCart = () => {
    addProductToCart(product, () => {
      toast.success(`${name} added to cart.`);
    });
  };

  const removeFromCart = () => {
    removeProductFromCart(product._id);
    toast.success(`${name} removed from cart.`);
  };

  return (
    <Stack
      spacing={{ base: "4", md: "5" }}
      borderRadius="2xl"
      padding="5"
      bgColor="gray.900"
      w="320px"
      h="450px"
      justifyContent="center"
      boxShadow="3xl"
    >
      <Box position="relative">
        <Image
          src={getProductPhotoURL(product._id)}
          alt={name}
          height="200px"
          width="100%"
          draggable="false"
          fallback={<Skeleton />}
          borderRadius={{ base: "md", md: "xl" }}
        />
      </Box>
      <Stack spacing="2" textAlign="left">
        <HStack justifyContent="space-between">
          <Text fontWeight="medium" color="gray.400" fontSize="xl">
            {name}
          </Text>
          <Tag size="md" variant="solid" colorScheme="red" borderRadius="full">
            <TagLabel>
              {category === "FoodsAndBevarages" ? "Food" : category}
            </TagLabel>
          </Tag>
        </HStack>
        <Text fontWeight="light" color="gray.500">
          {description}
        </Text>
        <Text
          as="span"
          fontWeight="semibold"
          color={useColorModeValue("gray.800", "gray.100")}
        >
          ₹{price} /-
        </Text>
      </Stack>
      <Button
        bgColor={onCartPage ? "red.600" : "green.400"}
        color="white"
        width="100%"
        borderRadius="xl"
        leftIcon={<BsFillCartCheckFill />}
        _hover={{
          transform: "translateY(4px)",
        }}
        onClick={onCartPage ? removeFromCart : addToCart}
      >
        {onCartPage ? "Remove from cart" : "Add to cart"}
      </Button>
    </Stack>
  );
};

export default ProductCard;
