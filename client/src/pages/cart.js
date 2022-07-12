import Head from "next/head";
import { useState, useEffect } from "react";
import { emptyCart, loadProductsFromCart } from "../apiCalls/cart";
import {
  SimpleGrid,
  Heading,
  Center,
  VStack,
  Box,
  Stack,
  Button,
  HStack,
} from "@chakra-ui/react";
import ProductCard from "../components/Core/ProductCard";
import Link from "next/link";
import { BiShoppingBag } from "react-icons/bi";
import { GiEmptyMetalBucketHandle } from "react-icons/gi";
import dynamic from "next/dynamic";

const DynamicCheckout = dynamic(() => import("../components/Core/Checkout"), {
  ssr: false,
});

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
          <Stack
            minH="100vh"
            direction={{ base: "column", md: "column", lg: "row" }}
          >
            <Center w="60%" mt={cartProducts.length > 2 ? 24 : 12}>
              <VStack>
                {cartProducts.length > 0 ? (
                  <>
                    <HStack spacing="8">
                      <Heading
                        size={{ base: "md", md: "lg" }}
                        color="green.400"
                      >
                        My Cart ({cartProducts.length} products)
                      </Heading>
                      <Button
                        colorScheme="teal"
                        onClick={() => {
                          emptyCart();
                          setReload(!reload);
                        }}
                        rightIcon={<GiEmptyMetalBucketHandle />}
                      >
                        Empty Cart
                      </Button>
                    </HStack>
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
                  </>
                ) : (
                  <>
                    <VStack spacing="8">
                      <Heading align="center">
                        You haven't added any product to cart yet.
                      </Heading>
                      <Link href="/products" passHref>
                        <Button
                          colorScheme="teal"
                          size="lg"
                          rightIcon={<BiShoppingBag />}
                        >
                          Start shopping now
                        </Button>
                      </Link>
                    </VStack>
                  </>
                )}
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
              <DynamicCheckout
                amount={totalPrice}
                isDisabled={cartProducts.length < 1}
                setReload={setReload}
                reload={reload}
              />
            </Box>
          </Stack>
        </>
      </main>
    </>
  );
};

export default MyCartPage;
