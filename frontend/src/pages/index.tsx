import TransactionList from "@/components/TransactionList";
import { Flex, VStack, Text, HStack, Button, Skeleton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { User } from "../../types";
import { useRouter } from "next/router";

const Home = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setIsLoading] = useState(true); //todo @euan add skeleton loading states
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const response = await fetch("http://152.42.182.247:5000/user/1");
      if (!response.ok) {
        setIsLoading(true)
        throw new Error("Fetching Error");
      }
      const data = await response.json();
      setUserData(data);
      setIsLoading(false);
    })();
  }, []);
  return (
    <Flex bg="#070F2B" h="100vh" w="100%">
      <VStack gap="1.5rem" w="100%">
        <Flex w="100%" justifyContent="center" pt="1.5rem">
          <Text
            textAlign="center"
            color="white"
            fontWeight="bold"
            fontSize="xl"
          >
            TikTokens
          </Text>
        </Flex>

        {
        loading? <Flex w="80%" flexDir="column"><Skeleton h="8rem" w="100%" borderRadius="1rem" colorScheme="black"/><Skeleton h="15rem" mt="3rem" w="100%" borderRadius="1rem" colorScheme="black"/></Flex>: <>
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
              SGD ${(Math.round(userData ? userData.balance * 100 : 0) / 100).toFixed(2)}
            </Text>
            <HStack w="100%" display="flex">
              <Button flex={1} variant="solid" _hover={{ bg: "gray.300" }} onClick={()=>router.push("/receive")}>
                Top-up
              </Button>
              <Button
                flex={1}
                variant="outline"
                color="white"
                _hover={{ bg: "gray.900" }}
                onClick={()=>router.push("/pay")}
              >
                Withdraw
              </Button>
            </HStack>
          </VStack>
        </Flex>

        <TransactionList /></>
      }
        
      </VStack>
    </Flex>
  );
};

export default Home;
