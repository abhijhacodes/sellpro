import Head from "next/head";
import Footer from "./Footer";
import dynamic from "next/dynamic";

const DynamicNavbar = dynamic(() => import("./Navbar"), {
  ssr: false,
});

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/assets/logo.png" />
      </Head>
      <header>
        <DynamicNavbar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
