import TransactionList from "@/components/TransactionList";
import { Flex, VStack, HStack, Button, Text, Skeleton } from "@chakra-ui/react";
import { User } from "../../types";
import { useState, useEffect } from "react";

const History = () => {
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
    <Flex bg="#070F2B" minH="100vh" w="100%" pb="100px">
      <VStack gap="1.5rem" w="100%" pt="1.5rem">
        {userData ? (
          <TransactionList userData={userData} />
        ) : (
          <Flex w="80%" h="100%" flexDir="column">
            <Text color="gray.100" fontSize="x-large" fontWeight="semibold">
              Transaction History
            </Text>
            <VStack color="white" gap="1rem" pt="2rem">
              <Skeleton height="60px" borderRadius="1rem" w="100%" />
              <Skeleton height="60px" borderRadius="1rem" w="100%" />
              <Skeleton height="60px" borderRadius="1rem" w="100%" />
            </VStack>
          </Flex>
        )}
      </VStack>
    </Flex>
  );
};

export default History;
