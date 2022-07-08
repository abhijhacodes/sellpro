import {
  HStack,
  Icon,
  Text,
  Box,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  VStack,
  Select,
  Button,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getAllProducts } from "../apiCalls/products";
import {
  BsEmojiHeartEyes,
  BsFillHouseFill,
  BsFillCartCheckFill,
} from "react-icons/bs";
import { FcSearch } from "react-icons/fc";
import { FaTools } from "react-icons/fa";
import { BiShoppingBag } from "react-icons/bi";
import { GiPoloShirt } from "react-icons/gi";
import { MdFastfood, MdDelete } from "react-icons/md";
import TabGrid from "../components/Core/TabGrid";
import toast from "react-hot-toast";

const categoryItems = [
  { name: "All", icon: BsFillCartCheckFill },
  { name: "Tools", icon: FaTools },
  { name: "Art", icon: BsEmojiHeartEyes },
  { name: "Accessories", icon: GiPoloShirt },
  { name: "Household", icon: BsFillHouseFill },
  { name: "FoodsAndBevarages", icon: MdFastfood },
  { name: "Others", icon: BiShoppingBag },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const sortProducts = (e) => {
    const sortType = e.target.value;
    if (sortType === "default") {
      setFilteredProducts([...products]);
    } else {
      if (sortType === "popularity") {
        filteredProducts.sort((a, b) => b.sold - a.sold);
      } else if (sortType === "lowToHigh") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortType === "highToLow") {
        filteredProducts.sort((a, b) => b.price - a.price);
      }
      setFilteredProducts([...filteredProducts]);
    }
  };

  const loadProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        setProducts(data);
        setFilteredProducts(data);
      }
    });
  };

  const searchProducts = () => {
    filteredProducts = products.filter((product) => {
      if (
        searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return product;
      }
    });
    setFilteredProducts([...filteredProducts]);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredProducts([...products]);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Products: Buy now</title>
      </Head>
      <main>
        <Box h="100vh" w="95vw" bgColor="gray.800">
          <Tabs
            variant="soft-rounded"
            colorScheme="blue"
            align="center"
            w="100%"
          >
            <VStack py="16">
              <VStack spacing="4">
                <HStack>
                  <TabList display="flex" mt={10}>
                    {categoryItems.map((category, index) => (
                      <Tab
                        key={index}
                        bg="gray.700"
                        color="white"
                        _selected={{
                          color: "green.800",
                          bg: "green.100",
                        }}
                        mr={2}
                        mt={2}
                      >
                        <HStack spacing={1}>
                          <Icon as={category.icon} />
                          <Text>{category.name}</Text>
                        </HStack>
                      </Tab>
                    ))}
                  </TabList>
                </HStack>
                <HStack spacing={"12"}>
                  <Select
                    size={{ base: "sm", md: "md" }}
                    placeholder="Sort By"
                    variant="filled"
                    onChange={sortProducts}
                  >
                    <option value="default">Default</option>
                    <option value="popularity">Most Popular</option>
                    <option value="lowToHigh">Price - Low to High</option>
                    <option value="highToLow">Price - High to Low</option>
                  </Select>
                  <HStack spacing="2">
                    <Input
                      width="200px"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                      placeholder="Search Products..."
                    />
                    <Button onClick={searchProducts} colorScheme="green">
                      <FcSearch size="20px" />
                    </Button>
                    <Button onClick={clearSearch} colorScheme="red">
                      <MdDelete size="20px" />
                    </Button>
                  </HStack>
                </HStack>
              </VStack>
              <Box>
                <TabPanels>
                  {categoryItems.map((category, index) => (
                    <TabPanel key={index}>
                      <TabGrid
                        products={filteredProducts}
                        filter={category.name}
                      />
                    </TabPanel>
                  ))}
                </TabPanels>
              </Box>
            </VStack>
          </Tabs>
        </Box>
      </main>
    </>
  );
};

export default Products;
