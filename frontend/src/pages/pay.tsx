import { Inter } from "next/font/google";
import styles from "@/styles/Pay.module.css";
import { useState, useEffect } from "react";
import { Flex, Box, Text, Avatar } from "@chakra-ui/react";
import { Scanner } from "@yudiel/react-qr-scanner";

import { HiOutlineChevronRight } from "react-icons/hi2";
import PaymentModal from "@/components/PaymentModal";

import { userInfo, UserType } from "./api/userInfo";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";

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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentUid, setPaymentUid] = useState<Number | null>();
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentHandle, setPaymentHandle] = useState("");

  const [docEnv, setDocEnv] = useState(false);

  interface QueryParams {
    name: string;
    uid: number;
  }

  const router = useRouter();
  const initialProps = router.query as unknown as QueryParams;

  useEffect(() => {
    if (initialProps.name && initialProps.uid) {
      setPaymentUid(initialProps.uid);
    }
  }, [initialProps]);

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
    { name: "Joseph Son", username: "joseph_sonny", uid: 2 },
    { name: "Friend number 1", username: "friendly_man", uid: 3 },
  ];

  const renderPaymentBody = () => {
    switch (paymentType) {
      case 0:
        return (
          <>
            {/* TODO: add icon, etc */}
            <input
              type="text"
              className={styles.searchBox}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search username"
            />
            <div className={styles.searchContainer}>
              <div className={styles.usersContainer}>
                {[
                  ...(initialProps.name && initialProps.uid
                    ? [{ name: initialProps.name, uid: initialProps.uid }]
                    : []),
                  ...userList.filter(
                    (user) =>
                      user.name.toLowerCase().includes(search.toLowerCase()) ||
                      user.username.toLowerCase().includes(search.toLowerCase())
                  ),
                ].map((user) => (
                  <div
                    key={user.uid}
                    className={`${styles.user} ${
                      user.uid == paymentUid ? styles.userSelected : ""
                    }`}
                    onClick={() => {
                      setPaymentUid(user.uid);
                      setPaymentHandle(user.name);
                    }}
                  >
                    <Avatar name={user.name}></Avatar>
                    <div className={styles.userDetails}>
                      <div className={styles.name}>{user.name}</div>
                      {"username" in user && (
                        <div
                          className={styles.username}
                        >{`@${user.username}`}</div>
                      )}
                    </div>
                    <HiOutlineChevronRight
                      size={28}
                      style={{ marginLeft: "auto" }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`${styles.confirmTransactionButton} ${
                !paymentUid ||
                !paymentAmount ||
                parseFloat(paymentAmount.slice(1)) >
                  (userDetails ? userDetails.balance : Infinity)
                  ? styles.confirmTransactionButtonDisabled
                  : ""
              }`}
              onClick={() => {
                setShowPaymentModal(true);
              }}
            >
              Confirm
            </div>
          </>
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
            <Scanner
              onScan={(result) => {
                if (paymentAmount == "") {
                  return;
                }
                const res = JSON.parse(result[0].rawValue);
                setPaymentUid(parseInt(res.uid));
                setPaymentHandle(res.name);
                setShowPaymentModal(true);
              }}
            />
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
      maxH="100vh"
      overflowY="scroll"
      sx={{
        "::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for Chrome, Safari, and Opera
        },
        "-ms-overflow-style": "none", // Hide scrollbar for Internet Explorer and Edge
        "scrollbar-width": "none", // Hide scrollbar for Firefox
      }}
    >
      <div className={styles.headingContainer}>Transfer</div>
      <div className={styles.balanceContainer}>
        <div className={styles.transferableTitle}>Balance</div>
        <div className={styles.transferableValue}>${userDetails?.balance}</div>
      </div>
      <Flex w="420px" bg="#0a1640" justify="space-around" py="20px">
        <Box textColor="grey" textAlign="start">
          <Text fontSize="sm">Amount in</Text>
          <Text fontSize="2xl" mt="-7px">
            {" "}
            SGD
          </Text>
        </Box>
        <input
          type="text"
          id="amountInput"
          className={styles.paymentAmountInput}
          value={paymentAmount}
          placeholder="$0.00"
          onChange={(e) => {
            let inputAmount = e.target.value;
            if (inputAmount.startsWith("$")) {
              inputAmount = inputAmount.slice(1);
            }
            const regex = /^\d*\.?\d{0,2}$/;
            if (inputAmount === "") {
              setPaymentAmount("");
            } else if (regex.test(inputAmount)) {
              setPaymentAmount(`$${inputAmount}`);
            }
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
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
          showPaymentModal &&
          createPortal(
            <PaymentModal
              hideModal={() => {
                setShowPaymentModal(false);
              }}
              paymentUid={paymentUid}
              paymentHandle={paymentHandle}
              paymentAmount={paymentAmount.slice(1)}
              userDetails={userDetails}
            />,
            document.body
          )}
      </div>
    </Flex>
  );
}
