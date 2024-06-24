import Head from "next/head";
import Link from 'next/link'

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import { BiMoney } from "react-icons/bi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { BiSolidBank } from "react-icons/bi";
import { BiTrophy } from "react-icons/bi";

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
        <div className={styles.ctaContainer}>
          <div className={styles.balanceContainer}>
            Balance: 
          </div>
          <div className={styles.divider}/>
          <div className={styles.buttonsContainer}>
            <div className={styles.largeButton}>
              <BiMoney size={45}/>
              <Link href="/map">Pay</Link>
            </div>
            <div className={styles.largeButton}>
              <BiMoneyWithdraw size={45}/>
              <Link href="/map">Withdraw</Link>
            </div>
            <div className={styles.largeButton}>
              <BiSolidBank size={45}/>
              <Link href="/map">Deposit</Link>
            </div>
            <div className={styles.largeButton}>
              <BiTrophy size={45}/>
              <Link href="/map">Rewards</Link>
            </div>
          </div>
        </div>
        <div className={styles.transactionsContainer}>
          this area is for transactions
        </div>
      </main>
    </>
  );
}
