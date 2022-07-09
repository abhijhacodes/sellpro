import Head from "next/head";
import { useState, useEffect } from "react";
import { loadProductsFromCart } from "../apiCalls/cart";
import { SimpleGrid, Heading, Center, VStack } from "@chakra-ui/react";
import ProductCard from "../components/Core/ProductCard";
import Link from "next/link";

const MyCartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    setCartProducts(loadProductsFromCart());
  }, []);

  return (
    <>
      <Head>
        <title>My Cart</title>
      </Head>
      <main>
        <>
          {cartProducts.length > 0 ? (
            <Center h="100vh">
              <SimpleGrid
                pt={10}
                spacing="8"
                columns={{ base: 1, md: 2, lg: 3 }}
              >
                {cartProducts.map((product, index) => (
                  <ProductCard
                    product={product}
                    key={index}
                    onCartPage={true}
                  />
                ))}
              </SimpleGrid>
            </Center>
          ) : (
            <Center h="97vh" w="100vw">
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
