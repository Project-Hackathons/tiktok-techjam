import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { User } from "../../types";
import QRCode from "react-qr-code";

// import styles from "@/styles/Receive.module.css";

const Index = ({}: any) => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://tt.tchlabs.net/user/3");
      if (!response.ok) {
        throw new Error("Fetching Error");
      }
      const data = await response.json();
      setUserData(data);
    })();
  }, []);

  return (
    <Flex
      bgGradient="linear(to-t, #ff0050, 35%, #00f2ea)"
      h="100vh"
      w="100%"
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <Flex
        bg="white"
        p="3rem"
        flexDir="column"
        borderRadius="2rem"
        alignItems="center"
        mb="4rem"
      >
        {userData && (
          <>
            <QRCode
              value={JSON.stringify({
                uid: userData.uid,
                name: userData.display_name,
                username: userData.username,
              })}
              size={200}
            />
            <Text
              color="black"
              fontWeight="semibold"
              fontSize="x-large"
              pt="1.5rem"
            >
              @{userData.username}
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Index;
