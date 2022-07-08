import Features from "../components/LandingPage/Features";
import Hero from "../components/LandingPage/Hero";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>SellPro</title>
      </Head>
      <main>
        <Hero />
        <Features />
      </main>
    </>
  );
}
