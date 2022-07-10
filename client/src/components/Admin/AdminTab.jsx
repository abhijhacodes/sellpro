import {
  Table,
  TableContainer,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
  Image,
  Button,
  HStack,
  VStack,
  Heading,
  Box,
  Center,
} from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { MdVerifiedUser } from "react-icons/md";
import {
  adminApproveProduct,
  adminDeleteProduct,
  getUnverifiedProducts,
} from "../../apiCalls/admin";
import {
  getProductPhotoURL,
  getVerifiedProducts,
} from "../../apiCalls/products";
import toast from "react-hot-toast";
import { isAuthenticated } from "../../apiCalls/auth";
import { useState, useEffect } from "react";

const AdminTab = ({ verified }) => {
  const { user, token } = isAuthenticated();
  const [products, setProducts] = useState([]);

  const loadVerifiedProducts = () => {
    getVerifiedProducts()
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

  const loadUnverifiedProducts = () => {
    getUnverifiedProducts(token, user._id)
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

  useEffect(() => {
    if (verified) {
      loadVerifiedProducts();
    } else {
      loadUnverifiedProducts();
    }
  }, []);

  const deleteProduct = (productId) => {
    adminDeleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Deleted your product successfully.");
        if (verified) {
          loadVerifiedProducts();
        } else {
          loadUnverifiedProducts();
        }
      }
    });
  };

  const approveProduct = (product) => {
    adminApproveProduct(product._id, user._id, token, product).then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        loadVerifiedProducts();
        loadUnverifiedProducts();
      }
    });
  };

  return (
    <>
      {products.length > 0 ? (
        <Center>
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
                        width="150px"
                      />
                    </Td>
                    <Td>{product.name}</Td>
                    <Td>{product.category}</Td>
                    <Td>{product.description}</Td>
                    <Td isNumeric>₹{product.price}</Td>
                    <Td>
                      <HStack>
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
                            deleteProduct(product._id);
                          }}
                        >
                          {verified ? "Delete" : "Disapprove"}
                        </Button>
                        {!verified && (
                          <Button
                            bgColor="green.500"
                            color="white"
                            borderRadius="xl"
                            size="sm"
                            leftIcon={<MdVerifiedUser />}
                            _hover={{
                              transform: "translateY(4px)",
                            }}
                            onClick={() => {
                              approveProduct(product);
                            }}
                          >
                            Approve
                          </Button>
                        )}
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Center>
      ) : (
        <Heading align="center" mt="28">
          There are no {verified ? "Verified" : "Unverified"} products
          currently.
        </Heading>
      )}
    </>
  );
};

export default AdminTab;
