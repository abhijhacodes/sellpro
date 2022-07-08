import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Core/Layout";
import theme from "../../theme";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
