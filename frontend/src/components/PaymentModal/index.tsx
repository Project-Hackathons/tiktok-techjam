import React from "react";
import styles from "@/styles/PaymentModal.module.css";

const PaymentModal = () => {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalCard}>
        <p>This is the confirmation modal.</p>
      </div>
    </div>
  );
};

export default PaymentModal;
