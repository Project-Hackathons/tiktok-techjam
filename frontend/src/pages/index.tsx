import TransactionList from "@/components/TransactionList";
import { Flex, VStack, Text, HStack, Button, Icon } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { User } from "../../types";
import { useRouter } from "next/router";
import axios from "axios";
import { IoPersonSharp } from "react-icons/io5";
import { FaTiktok } from "react-icons/fa";
import { userInfo } from "./api/userInfo";

const Home = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setIsLoading] = useState(true); //todo @euan add skeleton loading states
  const router = useRouter();

  useEffect(() => {
    console.log(router.query)
    if (!userData){
      fetchUser()
    }
  }, [router.query]);

  const login = async () => {
    const response = await axios.get("/api/auth");
    console.log(response.data.url);
    window.location.replace(response.data.url);
  };

  const fetchUser = async () => {
    const { code } = router.query;
    if (code && typeof code == "string") {
      const accessCode = decodeURIComponent(code);
      console.log(accessCode)
      let userDeets = await userInfo(accessCode); //todo @euan
      console.log(userDeets)
      setUserData(userDeets);
      setIsLoading(false);
    }
  };
  return (
    <Flex bg="#070F2B" h="100vh" w="100%">
      {!userData ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          color="white"
          w="100%"
        >
          <Button
            variant="solid"
            colorScheme="blue"
            bg="gray.800"
            leftIcon={<FaTiktok />}
            onClick={login}
          >
            <Text>Login with TikTok</Text>
          </Button>
        </Flex>
      ) : (
        <VStack gap="1.5rem" w="100%">
          <Flex justifyContent="start" pt="1.5rem" w="80%">
            <HStack>
              <Flex
                bgGradient="linear(to-r, #DEE4EA, 45%, #F9FCFF)"
                w="2.5rem"
                h="2.5rem"
                borderRadius="0.5rem"
                justifyContent="center"
                alignItems="center"
              >
                <Icon as={IoPersonSharp} boxSize={"1.5rem"} />
              </Flex>
              <Text
                textAlign="start"
                color="white"
                fontWeight="semibold"
                fontSize="xl"
              >
                {userData.display_name}
              </Text>
            </HStack>
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
                <Button
                  flex={1}
                  variant="solid"
                  _hover={{ bg: "gray.300" }}
                  onClick={() => router.push("/receive")}
                >
                  Top-up
                </Button>
                <Button
                  flex={1}
                  variant="outline"
                  color="white"
                  _hover={{ bg: "gray.900" }}
                  onClick={() => router.push("/pay")}
                >
                  Withdraw
                </Button>
              </HStack>
            </VStack>
          </Flex>

          <TransactionList />
        </VStack>
      )}
    </Flex>
  );
};

export default Home;
