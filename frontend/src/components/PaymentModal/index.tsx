import React from "react";
import { useRouter } from "next/router";

import styles from "@/styles/PaymentModal.module.css";

const PaymentModal = ({
  hideModal,
  paymentHandle,
  paymentAmount,
  userDetails,
}: any) => {
  const router = useRouter();

  const handleBackgroundClick = () => {
    hideModal();
  };

  const handleCardClick = (event: any) => {
    event.stopPropagation();
  };

  const handleConfirmTransaction = () => {
    const accessToken = "<access_token>"; // TODO: replace with access token (from cookies?)
    const data = {
      from: userDetails.username,
      to: paymentHandle, // TODO: add function to replace username with userid
      amount: parseFloat(paymentAmount),
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
    <div className={styles.modalBackground} onClick={handleBackgroundClick}>
      <div className={styles.modalCard} onClick={handleCardClick}>
        <p>
          You are paying {paymentHandle} {paymentAmount}.
        </p>
        <div onClick={handleConfirmTransaction}>Confirm Transaction</div>
      </div>
    </div>
  );
};

export default PaymentModal;
