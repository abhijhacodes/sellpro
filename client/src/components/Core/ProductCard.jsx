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
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { getProductPhotoURL } from "../../apiCalls/products";
import toast from "react-hot-toast";
import { BsFillCartCheckFill } from "react-icons/bs";
import { addProductToCart, removeProductFromCart } from "../../apiCalls/cart";
import PublisherModal from "./PublisherModal";
import { getProductPublisher } from "../../apiCalls/user";

const ProductCard = ({
  product,
  onCartPage = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const { name, description, price, category, userId } = product;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [publisher, setPublisher] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const addToCart = () => {
    addProductToCart(product, () => {
      toast.success(`${name} added to cart.`);
    });
  };

  const removeFromCart = () => {
    removeProductFromCart(product._id);
    toast.success(`${name} removed from cart.`);
    setReload(!reload);
  };

  const showPublisher = (userId) => {
    getProductPublisher(userId)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          setPublisher(data);
          onOpen();
        }
      })
      .catch((err) => {
        toast.error("Some error occured, please try again!");
      });
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
          {description.substring(0, 72)}
        </Text>
        <HStack justifyContent="space-between">
          <Text as="span" fontWeight="semibold" color="gray.100">
            ₹{price} /-
          </Text>
          <Button
            size="xs"
            onClick={() => showPublisher(userId)}
            colorScheme="teal"
            variant="outline"
          >
            Publisher
          </Button>
        </HStack>
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
      <PublisherModal isOpen={isOpen} onClose={onClose} publisher={publisher} />
    </Stack>
  );
};

export default ProductCard;
