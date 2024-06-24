import Head from "next/head";
import Link from 'next/link'

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

// temp colors reference:
// black: #010101
// teal: #69C9D0
// white: #FFFFFF
// red: #EE1D52

export default function Home() {
  return (
    <>
      <Head>
        <title>TikToken</title>
        <meta name="description" content="The new way to pay." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Link href="/map">Withdraw / Deposit</Link>
      </main>
    </>
  );
}
