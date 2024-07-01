import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Pay.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { Flex, VStack, Text, HStack, Button } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const handleConfirmTransaction = () => {
    const accessToken = "<access_token>"; // TODO: replace with access token (from cookies?)
    const data = {
      from: "OWNSELF ID",
      to: user, // TODO: add function to replace username with userid
      amount: parseFloat(amount),
    };

    fetch("http://152.42.182.247:5000/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        // TODO: validate POST req success
        router.push("/transaction_success");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Flex bg="#070F2B" h="100vh" w="100vw" className={styles.main}>
      <div className={styles.headingContainer}> Outgoing Transfer</div>
      <div className={styles.balanceContainer}>
        <div className={styles.transferableTitleContainer}>
          <div className={styles.transferableTitle}>Transferable balance</div>
          <div className={styles.transferableDesc}>
            You cannot transfer refunds.
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
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className={styles.formItemContainer}>
          <label htmlFor="amountInput">Amount</label>
          <input
            type="text"
            id="amountInput"
            className={styles.transactionInput}
            value={amount}
            onChange={(e) => {
              const inputAmount = e.target.value;
              const regex = /^\d*\.?\d{0,2}$/;
              if (regex.test(inputAmount) || inputAmount === "") {
                setAmount(inputAmount);
              }
            }}
          />
        </div>
        <div
          className={`${styles.transactionBtn} ${
            user === "" || amount === "" ? styles.disabled : ""
          }`}
          onClick={handleConfirmTransaction}
        >
          Confirm
        </div>
      </div>
    </Flex>
  );
}
