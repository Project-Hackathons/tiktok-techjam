import { useEffect, useState } from "react";
import Head from "next/head";
import Link from 'next/link'

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import { BiMoney, BiMoneyWithdraw, BiSolidBank, BiTrophy } from "react-icons/bi";

interface User {
  uid: string;
  balance: number;
  display_name: string;
  email: string;
  username: string;
  transactions: Transaction[];
}

interface Transaction {
  tid: number;
  fee: number;
  from: TransactionDetail;
  to: TransactionDetail;
}

interface TransactionDetail {
  uid: number;
  balance_before: number;
  balance_after: number;
}

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch('http://152.42.182.247:5000/user/1');
      if (!response.ok) {
        throw new Error('Fetching Error');
      }
      const data = await response.json();
      setUserData(data);
    })()
  }, []);

  if (userData === null) {
    return <div>Loading...</div>; // TODO: add design for loading screen
  }

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
            Good Morning, <b>{userData.display_name}</b>!
          </div>
        </div>
        <div className={styles.ctaContainer}>
          <div className={styles.balanceContainer}>
            Balance: ${userData.balance}
          </div>
          <div className={styles.divider}/>
          <div className={styles.buttonsContainer}>
            <Link href="/pay">
              <div className={styles.largeButton}>
                <BiMoney size={45}/>
                Pay
              </div>
            </Link>
            <Link href="/map">
              <div className={styles.largeButton}>
                <BiMoneyWithdraw size={45}/>
                Withdraw
              </div>
            </Link>
            <Link href="/map">
              <div className={styles.largeButton}>
                <BiSolidBank size={45}/>
                Deposit
              </div>
            </Link>
            <Link href="/">
              <div className={styles.largeButton}>
                <BiTrophy size={45}/>
                Rewards
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.transactionsContainer}>
          <div className={styles.transactionItem}>
            <div className={styles.detailsContainer}>
              <div className={styles.transactionTitle}>
                FROM UID1
              </div>
              <div className={styles.transactionDetail}>
                TO UID2
              </div>
            </div>
            <div className={styles.valueContainer}>
              $100
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
