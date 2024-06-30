import TransactionList from "@/components/TransactionList";
import { Flex, VStack, Text, HStack, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { User } from "../../types";

const Home = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setIsLoading] = useState(true); //todo @euan add skeleton loading states

  useEffect(() => {
    (async () => {
      const response = await fetch("http://152.42.182.247:5000/user/1");
      if (!response.ok) {
        throw new Error("Fetching Error");
      }
      const data = await response.json();
      setUserData(data);
      setIsLoading(false);
    })();
  }, []);
  return (
    <Flex bg="#070F2B" h="100vh" w="100vw">
      <VStack>
        <Flex w="100vw" justifyContent="center" py="1rem">
          <Text
            textAlign="center"
            color="white"
            fontWeight="bold"
            fontSize="xl"
          >
            TikTokens
          </Text>
        </Flex>

        <Flex
          bgGradient="linear(to-r, #ff0050, 45%, #00f2ea)"
          w="80%"
          borderRadius="1rem"
          p="1rem"
        >
          <VStack
            display="flex"
            justifyContent="start"
            alignItems="start"
            gap="0.5rem"
            w="100%"
          >
            <Text
              textAlign="start"
              fontSize="large"
              fontWeight="semibold"
              color="white"
            >
              Current balance
            </Text>
            <Text
              textAlign="start"
              fontSize="xx-large"
              fontWeight="bold"
              color="white"
            >
              SGD ${userData?.balance}
            </Text>
            <HStack w="100%" display="flex">
              <Button flex={1} variant="solid" _hover={{ bg: "gray.300" }}>
                Top-up
              </Button>
              <Button
                flex={1}
                variant="outline"
                color="white"
                _hover={{ bg: "gray.900" }}
              >
                Withdraw
              </Button>
            </HStack>
          </VStack>
        </Flex>

        <TransactionList />
      </VStack>
    </Flex>
  );
};

export default Home;
