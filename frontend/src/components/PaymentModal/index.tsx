import React from "react";
import { useRouter } from "next/router";

import styles from "@/styles/PaymentModal.module.css";

const PaymentModal = ({
  hideModal,
  paymentHandle,
  paymentUid,
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
      from: userDetails.uid,
      to: paymentUid,
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
        <div>
          <div className={styles.medText}>You are paying</div>
          <div className={styles.largeText}>{paymentHandle} </div>
          <div className={styles.medText}>a grand total of</div>
          <div className={styles.largeText}>${paymentAmount}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <div
            className={styles.confirmTransactionCta}
            onClick={handleConfirmTransaction}
          >
            Confirm
          </div>
          <div
            className={styles.confirmTransactionCta}
            style={{ backgroundColor: "red" }}
            onClick={hideModal}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
