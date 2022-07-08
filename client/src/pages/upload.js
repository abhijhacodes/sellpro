import Head from "next/head";
import NoAccess from "../components/Core/NoAccess";
import UploadProduct from "../components/PageComponents/UploadProduct";
import { isAuthenticated } from "../apiCalls/auth";
import { useState, useEffect } from "react";

const UploadPage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) setIsSignedIn(true);
  }, []);

  return (
    <>
      <Head>
        <title>{isSignedIn ? "Upload Product" : "Access Denied"}</title>
      </Head>
      <main>{isSignedIn ? <UploadProduct /> : <NoAccess />}</main>
    </>
  );
};

export default UploadPage;
