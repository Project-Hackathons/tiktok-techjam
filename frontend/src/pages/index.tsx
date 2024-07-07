import TransactionList from "@/components/TransactionList";
import {
  Flex,
  VStack,
  Text,
  HStack,
  Button,
  Skeleton,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Icon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { User } from "../../types";
import { useRouter } from "next/router";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Home = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();
  const [showCC, setShowCC] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://152.42.182.247:5000/user/3");
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
      maxH="100vh"
      overflowY="scroll"
      sx={{
        "::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for Chrome, Safari, and Opera
        },
        "-ms-overflow-style": "none", // Hide scrollbar for Internet Explorer and Edge
        "scrollbar-width": "none", // Hide scrollbar for Firefox
      }}
    >
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

        {!userData ? (
          <Flex w="80%" flexDir="column">
            <Skeleton
              h="8rem"
              w="100%"
              borderRadius="1rem"
              colorScheme="black"
            />
            <Skeleton
              h="15rem"
              mt="3rem"
              w="100%"
              borderRadius="1rem"
              colorScheme="black"
            />
          </Flex>
        ) : (
          <>
            <Accordion allowToggle w="100%" border="none">
              <AccordionItem w="100%">
                <AccordionButton
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Flex
                    bgGradient="linear(to-r, gray.700, 75%, gray.800)"
                    w="80%"
                    borderRadius="1rem"
                    px="1rem"
                    pt="1rem"
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
                        SGD $
                        {(
                          Math.round(userData ? userData.balance * 100 : 0) /
                          100
                        ).toFixed(2)}
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
                      <Flex justifyContent="center" w="100%" py="0.5rem">
                        <AccordionIcon color="white" />
                      </Flex>
                    </VStack>
                  </Flex>
                </AccordionButton>

                <AccordionPanel
                  pb={4}
                  w="100%"
                  display="flex"
                  justifyContent="center"
                >
                  <Flex
                    bgGradient="linear(to-r, #ff0050, 45%, #00f2ea)"
                    w="80%"
                    borderRadius="1rem"
                    p="1.5rem"
                    h="12rem"
                  >
                    <VStack
                      w="100%"
                      h="100%"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                    >
                      <Flex
                        w="100%"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text fontWeight="bold" color="white" fontSize="lg">
                          TikTok
                        </Text>
                        {showCC ? (
                          <Button
                            variant="ghost"
                            _hover={{ bg: "none" }}
                            onClick={() => setShowCC(false)}
                          >
                            <Icon as={IoEyeOff} color="gray.200" boxSize="7" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            _hover={{ bg: "none" }}
                            onClick={() => setShowCC(true)}
                          >
                            <Icon as={IoEye} color="gray.200" boxSize="7" />
                          </Button>
                        )}
                      </Flex>
                      <Flex
                        w="100%"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        {showCC ? (
                          <Text
                            fontWeight="semibold"
                            color="white"
                            fontSize="lg"
                          >
                            5105 1051 0510 5100
                          </Text>
                        ) : (
                          <Text
                            fontWeight="semibold"
                            color="white"
                            fontSize="lg"
                          >
                            5*** **** **** ****
                          </Text>
                        )}
                      </Flex>
                    </VStack>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <TransactionList userData={userData} />
          </>
        )}
      </VStack>
    </Flex>
  );
};

export default Home;
