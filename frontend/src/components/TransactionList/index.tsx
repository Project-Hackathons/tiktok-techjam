import { useEffect, useState } from "react";

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { User } from "../../../types";

import { HiOutlineChevronRight } from "react-icons/hi2";

const inter = Inter({ subsets: ["latin"] });

export default function TransactionList() {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://152.42.182.247:5000/user/1");
      if (!response.ok) {
        throw new Error("Fetching Error");
      }
      const data = await response.json();
      setUserData(data);
    })();
  }, []);

  if (userData === null) {
    return <div>Loading...</div>; // TODO: add design for loading screen
  }

  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.transactionsContainer}>
          {userData.transactions.map((txn) => {
            return (
              <div className={styles.transactionItem} key={txn.to.uid}>
                <div className={styles.detailsContainer}>
                  <div className={styles.transactionTitle}>
                    FROM UID{txn.from.uid}
                  </div>
                  <div className={styles.transactionDetail}>
                    TO UID{txn.to.uid}
                  </div>
                </div>
                <div className={styles.valueContainer}>
                  ${txn.from.balance_before - txn.from.balance_after}{" "}
                  <HiOutlineChevronRight size={32} />
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
