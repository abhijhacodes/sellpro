import Head from "next/head";
import NoAccess from "../components/Core/NoAccess";
import MyCart from "../components/PageComponents/MyCart";
import { isAuthenticated } from "../apiCalls/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const MyCartPage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) setIsSignedIn(true);
  }, []);

  return (
    <>
      <Head>
        <title>{isSignedIn ? "My Cart" : "Access Denied"}</title>
      </Head>
      <main>{isSignedIn ? <MyCart /> : <NoAccess />}</main>
    </>
  );
};

export default MyCartPage;
