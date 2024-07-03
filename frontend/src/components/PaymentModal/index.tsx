import React from "react";
import styles from "@/styles/PaymentModal.module.css";

const PaymentModal = ({ hideModal, paymentHandle, paymentAmount }: any) => {
  const handleBackgroundClick = () => {
    hideModal();
  };

  const handleCardClick = (event: any) => {
    event.stopPropagation();
  };
  return (
    <div className={styles.modalBackground} onClick={handleBackgroundClick}>
      <div className={styles.modalCard} onClick={handleCardClick}>
        <p>
          You are paying {paymentHandle} {paymentAmount}.
        </p>
      </div>
    </div>
  );
};

export default PaymentModal;
