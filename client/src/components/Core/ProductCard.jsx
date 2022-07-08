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

const ProductCard = ({ product }) => {
  const { name, description, price, category, userId } = product;

  const addToCart = () => {
    console.log(isAuthenticated());
    if (!isAuthenticated()) {
      toast.error("Please sign in to use this feature.");
    } else {
      toast.success("Added to cart");
    }
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
        bgColor="green.600"
        color="white"
        width="100%"
        borderRadius="xl"
        leftIcon={<BsFillCartCheckFill />}
        _hover={{
          transform: "translateY(4px)",
        }}
        onClick={addToCart}
      >
        Add to cart
      </Button>
    </Stack>
  );
};

export default ProductCard;
