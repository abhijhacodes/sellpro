import {
  TabList,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  Box,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect } from "react";
import { isAuthenticated } from "../apiCalls/auth";
import AdminTab from "../components/Admin/AdminTab";
import { useRouter } from "next/router";

const Admin = () => {
  const router = useRouter();
  useEffect(() => {
    if (!(isAuthenticated() && isAuthenticated().user.role === 1)) {
      router.push("/products");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <main>
        <Box minH="100vh" mt="20">
          <Tabs
            variant="soft-rounded"
            colorScheme="blue"
            align="center"
            w="100%"
          >
            <VStack>
              <TabList>
                <Tab
                  bg="gray.700"
                  color="white"
                  _selected={{
                    color: "green.800",
                    bg: "green.100",
                  }}
                >
                  Verified Products
                </Tab>
                <Tab
                  bg="gray.700"
                  color="white"
                  _selected={{
                    color: "green.800",
                    bg: "green.100",
                  }}
                >
                  Unverified Products
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <AdminTab verified={true} />
                </TabPanel>
                <TabPanel>
                  <AdminTab verified={false} />
                </TabPanel>
              </TabPanels>
            </VStack>
          </Tabs>
        </Box>
      </main>
    </>
  );
};

export default Admin;
