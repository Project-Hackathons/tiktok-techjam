import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Pay.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Flex,
  NumberInput,
  NumberInputField,
  Box,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { Scanner } from "@yudiel/react-qr-scanner";

import { HiOutlineChevronRight } from "react-icons/hi2";
import { userInfo, UserType } from "./api/userInfo";
import { createPortal } from "react-dom";

const inter = Inter({ subsets: ["latin"] });

const paymentTypes = [
  { id: 0, label: "Handle" },
  { id: 1, label: "NFC" },
  { id: 2, label: "QR Pay" },
];

export default function Home() {
  const [paymentType, setPaymentType] = useState(0);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState<UserType>();
  const router = useRouter();

  const [docEnv, setDocEnv] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setDocEnv(true);
    }
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      let userDeets = await userInfo();
      setUserDetails(userDeets);
    };
    getUserInfo();
  }, []);
  const userList = [
    { name: "Joseph Son", username: "joseph_sonny" },
    { name: "Friend number 1", username: "friendly_man" },
    { name: "Tom Cook", username: "cooked_man" },
    { name: "Fish man", username: "fish_guy" },
  ];

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
              {userList
                .filter(
                  (user) =>
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.username.toLowerCase().includes(search.toLowerCase())
                )
                .map((type) => (
                  <div
                    key={type.username}
                    className={styles.user}
                    onClick={() => {}}
                  >
                    <Avatar name={type.name}></Avatar>
                    <div className={styles.userDetails}>
                      <div className={styles.name}>{type.name}</div>
                      <div
                        className={styles.username}
                      >{`@${type.username}`}</div>
                    </div>
                    {/* <HiOutlineChevronRight size={28} /> */}
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
          <div className={styles.qrContainer}>
            <Scanner onScan={(result: any) => console.log(result)} />
          </div>
        );
    }
  };

  return (
    <Flex
      bg="#070F2B"
      pb="100px"
      height="100vh"
      w="100%"
      className={styles.main}
    >
      <div className={styles.headingContainer}>Transfer</div>
      <div className={styles.balanceContainer}>
        <div className={styles.transferableTitle}>Balance</div>
        <div className={styles.transferableValue}>{userDetails?.balance}</div>
      </div>
      <Flex w="117%" bg="#0a1640" justify="space-between" py="20px">
        <Box textColor="grey" px="30px" textAlign="center">
          <Text fontSize="sm">Amount in</Text>
          <Text fontSize="2xl" mt="-7px">
            {" "}
            SGD
          </Text>
        </Box>
        <NumberInput
          defaultValue={0}
          precision={2}
          textColor="white"
          width="125px"
          size="lg"
          min={0}
          max={userDetails?.balance}
          focusBorderColor="#0a1640"
        >
          <NumberInputField border="none" fontSize="xl" />
        </NumberInput>
      </Flex>
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
        {docEnv &&
          createPortal(
            <div className={styles.confirmationModal}>
              <p>This child is placed in the document body.</p>
            </div>,
            document.body
          )}
      </div>
    </Flex>
  );
}
