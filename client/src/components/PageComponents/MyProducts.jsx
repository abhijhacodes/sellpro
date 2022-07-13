import {
  Box,
  HStack,
  Button,
  Center,
  Heading,
  Table,
  TableContainer,
  Tr,
  Th,
  Td,
  Thead,
  VStack,
  Tbody,
  Image,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../../apiCalls/auth";
import {
  deleteProduct,
  getProductsByUser,
  getProductPhotoURL,
} from "../../apiCalls/products";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete, AiOutlineCloudUpload } from "react-icons/ai";
import { useRouter } from "next/router";
import Link from "next/link";

const MyProducts = () => {
  const { user, token } = isAuthenticated();
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const getMyProducts = () => {
    getProductsByUser(user._id, token)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => {
        toast.error("Some error occured, please try again!");
      });
  };

  const updateMyProduct = (productId) => {
    router.push(`/update/${productId}`);
  };

  const deleteMyProduct = (productId) => {
    deleteProduct(productId, user._id, token)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Deleted your product successfully.");
          getMyProducts();
        }
      })
      .catch((err) => {
        toast.error("Some error occured, please try again!");
      });
  };

  useEffect(() => {
    getMyProducts();
  }, []);

  return (
    <>
      {products.length > 0 ? (
        <Box w="95vw" mt="24" mb="16" h="100vh">
          <VStack spacing="12">
            <Heading fontSize={{ base: "md", md: "xl", lg: "3xl" }}>
              Keep track and update your products here
            </Heading>
            <TableContainer maxWidth="80vw">
              <Table size="sm" variant="striped">
                <Thead>
                  <Tr>
                    <Th isNumeric>No.</Th>
                    <Th>Photo</Th>
                    <Th>Name</Th>
                    <Th>Category</Th>
                    <Th>Description</Th>
                    <Th isNumeric>Price</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map((product, index) => (
                    <Tr key={index}>
                      <Td isNumeric>{index + 1}</Td>
                      <Td>
                        <Image
                          src={getProductPhotoURL(product._id)}
                          alt={product.name}
                          height="100px"
                          width="120px"
                        />
                      </Td>
                      <Td>{product.name}</Td>
                      <Td>{product.category}</Td>
                      <Td maxWidth="360px" overflow="hidden">
                        {product.description}
                      </Td>
                      <Td isNumeric>₹{product.price}</Td>
                      <Td>
                        {product.isVerified ? (
                          <Text color="green.200">Approved</Text>
                        ) : (
                          <Text color="yellow">Pending</Text>
                        )}
                      </Td>
                      <Td>
                        <HStack>
                          <Button
                            bgColor="blue.500"
                            color="white"
                            borderRadius="xl"
                            size="sm"
                            leftIcon={<FaRegEdit />}
                            _hover={{
                              transform: "translateY(4px)",
                            }}
                            onClick={() => {
                              updateMyProduct(product._id);
                            }}
                          >
                            Update
                          </Button>
                          <Button
                            bgColor="red.500"
                            color="white"
                            borderRadius="xl"
                            size="sm"
                            leftIcon={<AiFillDelete />}
                            _hover={{
                              transform: "translateY(4px)",
                            }}
                            onClick={() => {
                              deleteMyProduct(product._id);
                            }}
                          >
                            Delete
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </Box>
      ) : (
        <Center h="97vh" w="95vw">
          <VStack spacing="8">
            <Heading align="center" mt="28">
              You haven't uploaded any product to sell yet.
            </Heading>
            <Link href="/upload" passHref>
              <Button
                colorScheme="teal"
                size="lg"
                rightIcon={<AiOutlineCloudUpload />}
              >
                Get started now!
              </Button>
            </Link>
          </VStack>
        </Center>
      )}
    </>
  );
};

export default MyProducts;
