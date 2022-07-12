import Head from "next/head";
import { useState, useEffect } from "react";
import { loadProductsFromCart } from "../apiCalls/cart";
import {
  SimpleGrid,
  Heading,
  Center,
  VStack,
  Box,
  Stack,
} from "@chakra-ui/react";
import ProductCard from "../components/Core/ProductCard";
import Link from "next/link";
import Checkout from "../components/Core/Checkout";

const MyCartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [reload, setReload] = useState(false);

  let totalPrice = 0;
  cartProducts.forEach((product) => {
    totalPrice += product.price;
  });

  useEffect(() => {
    setCartProducts(loadProductsFromCart());
  }, [reload]);

  return (
    <>
      <Head>
        <title>My Cart</title>
      </Head>
      <main>
        <>
          {cartProducts.length > 0 ? (
            <Stack
              minH="100vh"
              direction={{ base: "column", md: "column", lg: "row" }}
            >
              <Center w="60%" mt={cartProducts.length > 2 ? 24 : 12}>
                <VStack>
                  <Heading size={{ base: "md", md: "lg" }} color="green.400">
                    My Cart ({cartProducts.length} products)
                  </Heading>
                  <SimpleGrid
                    pt={10}
                    pb={12}
                    spacing="8"
                    columns={{ base: 1, md: 2, lg: 2 }}
                  >
                    {cartProducts.map((product, index) => (
                      <ProductCard
                        product={product}
                        key={index}
                        onCartPage={true}
                        setReload={setReload}
                        reload={reload}
                      />
                    ))}
                  </SimpleGrid>
                </VStack>
              </Center>
              <Box
                w="40%"
                pos="sticky"
                top="0"
                right="0"
                h="100vh"
                bgColor="gray.900"
              >
                <Checkout amount={totalPrice} />
              </Box>
            </Stack>
          ) : (
            <Center h="97vh" w="95vw">
              <VStack>
                <Heading align="center" mt="28">
                  You haven't added any product to cart yet.
                </Heading>
                <Link href="/products" passHref>
                  <Heading as="u" color="green.400" cursor="pointer">
                    Get started now
                  </Heading>
                </Link>
              </VStack>
            </Center>
          )}
        </>
      </main>
    </>
  );
};

export default MyCartPage;
