import Head from "next/head";
import Link from 'next/link'

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

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
        <div className={styles.headingContainer}>
          <div className={styles.heading}>
            Good Morning, <b>Joseph</b>!
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <div className={styles.largeButton}>
            <Link href="/map">Withdraw / Deposit</Link>
          </div>
          <div className={styles.largeButton}>
            <Link href="/map">Pay</Link>
          </div>
        </div>
        <div className={styles.transactionsContainer}>
          this area is for transactions
        </div>
      </main>
    </>
  );
}
