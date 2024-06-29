import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Pay.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleConfirmTransaction = () => {
    console.log("done");
  };

  return (
    <>
      <Head>
        <title>Pay Friends!</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.headingContainer}> Outgoing Transfer</div>
        <div className={styles.balanceContainer}>
          <div className={styles.transferableTitleContainer}>
            <div className={styles.transferableTitle}>Transferable balance</div>
            <div className={styles.transferableDesc}>
              This is the amount you can <br />
              transfer to others.
            </div>
          </div>
          <div className={styles.transferableValue}>$100</div>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formItemContainer}>
            <label htmlFor="userInput">User</label>
            <input
              type="text"
              id="userInput"
              className={styles.transactionInput}
            />
          </div>
          <div className={styles.formItemContainer}>
            <label htmlFor="amountInput">Amount</label>
            <input
              type="text"
              id="amountInput"
              className={styles.transactionInput}
            />
          </div>
          <div
            className={styles.transactionBtn}
            onClick={handleConfirmTransaction}
          >
            Confirm
          </div>
        </div>
      </main>
    </>
  );
}
