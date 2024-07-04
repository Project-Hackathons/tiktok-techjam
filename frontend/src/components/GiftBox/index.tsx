import React from "react";
import styles from "./GiftBox.module.css";
import { Text } from "@chakra-ui/react";
import { useState } from "react";

const GiftBox = ({ handleClick, index, rid }: any) => {
  const [openBox, setOpenBox] = useState<boolean>(false);
  const handleClickGift = () => {
    setOpenBox(true);
    const audio = new Audio("/rewards/rewards.mp3");
    audio.play();
    setTimeout(function () {
      handleClick(index, rid);
    }, 1200);
  };
  return (
    <div className={styles.box}>
      <div
        className={`${styles.box_body} ${styles.scaleDown} ${
          openBox && styles.box_body_click
        }`}
        onClick={handleClickGift}
      >
        <div className={styles.box_lid}>
          <div className={styles.box_bowtie}></div>
        </div>
      </div>
      <Text mt="-25px">Click to Redeem</Text>
    </div>
  );
};

export default GiftBox;
