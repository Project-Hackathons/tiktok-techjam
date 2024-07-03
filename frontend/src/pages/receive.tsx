import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { User } from "../../types";
import QRCode from "react-qr-code";

// import styles from "@/styles/Receive.module.css";

const Index = ({}: any) => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://152.42.182.247:5000/user/1");
      if (!response.ok) {
        throw new Error("Fetching Error");
      }
      const data = await response.json();
      setUserData(data);
    })();
  }, []);

  return (
    <Flex
      bg="#070F2B"
      h="100vh"
      w="100%"
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "30px",
        paddingBottom: "26vh",
      }}
    >
      <div
        style={{
          fontSize: "28px",
          color: "white",
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        This is your QR code.
        <br /> Keep it safe!
      </div>
      {userData && <QRCode value={userData.username} size={300} />}
    </Flex>
  );
};

export default Index;
