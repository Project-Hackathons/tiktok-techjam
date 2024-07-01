import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Pay.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";

import { HiOutlineChevronRight } from "react-icons/hi2";

const inter = Inter({ subsets: ["latin"] });

const paymentTypes = [
  { id: 0, label: "Handle" },
  { id: 1, label: "NFC" },
  { id: 2, label: "QR Pay" },
];

export default function Home() {
  const [paymentType, setPaymentType] = useState(0);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // const handleConfirmTransaction = () => {
  //   const accessToken = "<access_token>"; // TODO: replace with access token (from cookies?)
  //   const data = {
  //     from: "OWNSELF ID",
  //     to: user, // TODO: add function to replace username with userid
  //     amount: parseFloat(amount),
  //   };

  //   fetch("http://152.42.182.247:5000/transfer", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then(() => {
  //       // TODO: validate POST req success
  //       router.push("/transaction_success");
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  const renderPaymentBody = () => {
    switch (paymentType) {
      case 0:
        return (
          <div className={styles.searchContainer}>
            {/* TODO: add icon, etc */}
            <input
              type="text"
              className={styles.searchBox}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search username"
            />
            <div className={styles.usersContainer}>
              {[
                { name: "Joseph Son", username: "joseph sonny" },
                { name: "Joseph Dad", username: "joseph daddy" },
                { name: "Joseph Bro", username: "joseph brooy" },
                { name: "Joseph Son", username: "joseph sonny" },
                { name: "Joseph Dad", username: "joseph daddy" },
                { name: "Joseph Bro", username: "joseph brooy" },
                { name: "Joseph Son", username: "joseph sonny" },
                { name: "Joseph Dad", username: "joseph daddy" },
                { name: "Joseph Bro", username: "joseph brooy" },
                { name: "Joseph Son", username: "joseph sonny" },
                { name: "Joseph Dad", username: "joseph daddy" },
                { name: "Joseph Bro", username: "joseph brooy" },
              ].map((type) => (
                <div
                  key={type.username}
                  className={styles.user}
                  onClick={() => {}}
                >
                  <div className={styles.userDetails}>
                    <div className={styles.name}>{type.name}</div>
                    <div className={styles.username}>{type.username}</div>
                  </div>
                  <HiOutlineChevronRight size={28} />
                </div>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className={styles.circlesContainer}>
            <div className={styles.outerPulsingCircle}></div>
            <div className={styles.innerPulsingCircle}></div>
            <div className={styles.infoText}>
              Hold your phones together <br />
              for quicker payment.
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.circlesContainer}>
            {/* TODO: fix QR scanner */}
          </div>
        );
    }
  };

  return (
    <Flex bg="#070F2B" h="100vh" w="100vw" className={styles.main}>
      <div className={styles.headingContainer}>Transfer</div>
      <div className={styles.balanceContainer}>
        <div className={styles.transferableTitle}>Balance</div>
        <div className={styles.transferableValue}>$100</div>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.typeContainer}>
          {paymentTypes.map((type) => (
            <div
              key={type.id}
              className={`${styles.type} ${
                type.id == paymentType ? styles.type_selected : ""
              }`}
              onClick={() => {
                setPaymentType(type.id);
              }}
            >
              {type.label}
            </div>
          ))}
        </div>
        {renderPaymentBody()}
      </div>
    </Flex>
  );
}
