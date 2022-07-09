import { Box, Center, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import Link from "next/link";

const NoAccess = () => {
  return (
    <Center height="100vh" width="95vw">
      <Stack direction={{ base: "column", md: "row" }}>
        <Box textAlign="center" py={10} px={6}>
          <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
          <Heading as="h2" size="xl" mt={6} mb={2}>
            <Text color="red.500">Access Denied!</Text>
            <Link href="/signin" passHref>
              <Text color="green.500" cursor="pointer" as="u">
                Please Sign in to contiune
              </Text>
            </Link>
          </Heading>
          <Text color={"gray.400"} as="h3">
            This feature is only available for registered users.
            <br /> Please sign in to your account and start using SellPro for
            free. No credit card required.
          </Text>
        </Box>
        <Box>
          <Image
            src="/assets/signin.svg"
            alt="signin photo"
            height={{ base: "300", md: "360" }}
            width={{ base: "250", md: "300" }}
          />
        </Box>
      </Stack>
    </Center>
  );
};
export default NoAccess;
