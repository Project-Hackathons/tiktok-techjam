import React from "react";
import styles from "@/styles/PaymentModal.module.css";

const PaymentModal = ({ hideModal }: any) => {
  const handleBackgroundClick = () => {
    hideModal();
  };

  const handleCardClick = (event: any) => {
    event.stopPropagation();
  };
  return (
    <div className={styles.modalBackground} onClick={handleBackgroundClick}>
      <div className={styles.modalCard} onClick={handleCardClick}>
        <p>This is the confirmation modal.</p>
      </div>
    </div>
  );
};

export default PaymentModal;
