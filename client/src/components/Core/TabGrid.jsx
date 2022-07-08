import React from "react";
import { Heading, SimpleGrid, Center } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

const TabGrid = ({ products, filter }) => {
  if (filter !== "All") {
    products = products.filter((product) => product.category === filter);
  }

  return (
    <>
      {products.length > 0 ? (
        <Center>
          <SimpleGrid pt={10} spacing="8" columns={{ base: 1, md: 2, lg: 3 }}>
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </SimpleGrid>
        </Center>
      ) : (
        <Heading align="center" mt="28">
          No products found for this category
        </Heading>
      )}
    </>
  );
};

export default TabGrid;
