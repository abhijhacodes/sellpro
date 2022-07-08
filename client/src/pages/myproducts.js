import Head from "next/head";
import NoAccess from "../components/Core/NoAccess";
import MyProducts from "../components/PageComponents/MyProducts";
import { isAuthenticated } from "../apiCalls/auth";
import { useState, useEffect } from "react";

const MyProductsPage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) setIsSignedIn(true);
  }, []);

  return (
    <>
      <Head>
        <title>{isSignedIn ? "My Products" : "Access Denied"}</title>
      </Head>
      <main>{isSignedIn ? <MyProducts /> : <NoAccess />}</main>
    </>
  );
};

export default MyProductsPage;
