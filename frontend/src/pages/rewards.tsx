import React from "react";
import Head from "next/head";
import {
  Flex,
  VStack,
  Text,
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import GiftBox from "@/components/GiftBox";

const Rewards = () => {
  const rewardList: rewardType[] = [
    { rewardMessage: "Cashback", rewardAmount: 0.5 },
    { rewardMessage: "Tiktok Shop Voucher", rewardAmount: 5 },
    { rewardMessage: "Amazon Voucher", rewardAmount: 5 },
    { rewardMessage: "Cashback", rewardAmount: 0.6 },
    { rewardMessage: "Cashback", rewardAmount: 0.8 },
    { rewardMessage: "Tiktok Shop Voucher", rewardAmount: 3 },
    { rewardMessage: "Cashback", rewardAmount: 1 },
    { rewardMessage: "Amazon Voucher", rewardAmount: 10 },
    { rewardMessage: "Cashback", rewardAmount: 0.5 },
    { rewardMessage: "Tiktok Shop Voucher", rewardAmount: 5 },
    { rewardMessage: "Amazon Voucher", rewardAmount: 5 },
    { rewardMessage: "Cashback", rewardAmount: 0.6 },
    { rewardMessage: "Cashback", rewardAmount: 0.8 },
    { rewardMessage: "Tiktok Shop Voucher", rewardAmount: 3 },
    { rewardMessage: "Cashback", rewardAmount: 1 },
    { rewardMessage: "Amazon Voucher", rewardAmount: 10 },
  ];
  const [modalState, setModalState] = useState(
    rewardList.map(() => {
      return { modal_opened: false, ticket_redeemed: false };
    })
  );

  interface rewardType {
    rewardMessage: string;
    rewardAmount: number;
  }

  const handleOpen = (index: any) => {
    const newState = modalState.map((state, i) =>
      i === index
        ? { modal_opened: true, ticket_redeemed: state.ticket_redeemed }
        : state
    );
    setModalState(newState);
  };

  const handleClose = (index: any) => {
    const newState = modalState.map((state, i) =>
      i === index
        ? { modal_opened: false, ticket_redeemed: state.ticket_redeemed }
        : state
    );
    setModalState(newState);
  };

  const handleRedeemTicket = (index: any) => {
    const newState = modalState.map((state, i) =>
      i === index
        ? { modal_opened: state.modal_opened, ticket_redeemed: true }
        : state
    );
    setModalState(newState);
  };

  const deleteReward = (index: any) => {
    //call api to delete reward from db
  };

  return (
    <>
      <Head>
        <title>Rewards</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex bg="#070F2B" w="100%" pb="80px">
        <VStack gap="1.5rem" w="100%">
          <Flex
            w="100vw"
            justifyContent="center"
            pt="1.5rem"
            direction="column"
          >
            <Text
              textAlign="center"
              color="white"
              fontWeight="bold"
              fontSize="xl"
            >
              Total Rewards
            </Text>
            <Text pt="10px" textAlign="center" color="white" fontSize="l">
              {`You have ${rewardList.length} unopened rewards.`}
            </Text>
          </Flex>
          <Flex w="100%" justify="space-around" flexWrap="wrap" rowGap="20px">
            {rewardList.map((value, index) => {
              return (
                <Box
                  key={index}
                  w="42%"
                  transition="transform 0.3s ease"
                  _hover={{ cursor: "pointer", transform: "scale(1.1)" }}
                >
                  <Image
                    src={
                      modalState[index].ticket_redeemed
                        ? "/rewards/tick.avif"
                        : `/rewards/reward${(index % 3) + 1}.avif`
                    }
                    alt="rewardImg"
                    borderRadius="20px"
                    onClick={() => handleOpen(index)}
                  />
                  <Modal
                    isOpen={modalState[index].modal_opened}
                    onClose={() => handleClose(index)}
                    isCentered
                    size="xs"
                  >
                    <ModalOverlay />
                    <ModalContent mx="30px" bgColor="#070F2B" textColor="white">
                      <ModalHeader>Congratulations!</ModalHeader>
                      <ModalCloseButton borderColor="none" />
                      {modalState[index].ticket_redeemed ? (
                        <ModalBody>
                          <VStack spacing="20px">
                            <Image
                              src="/rewards/rewardLogo.svg"
                              alt="rewardLogo"
                              boxSize="50px"
                            ></Image>
                            <Text>
                              {`You have won $${value.rewardAmount} worth of ${value.rewardMessage}!`}
                            </Text>
                          </VStack>
                        </ModalBody>
                      ) : (
                        <GiftBox
                          handleClick={handleRedeemTicket}
                          index={index}
                        />
                      )}

                      <ModalFooter>
                        <Flex w="100%" justify="space-evenly">
                          <Button
                            bgGradient="linear(to-r, #ff0050, 45%, #00f2ea)"
                            mr={3}
                            onClick={() => handleClose(index)}
                          >
                            <Text color="white" fontWeight="bold">
                              Close
                            </Text>
                          </Button>
                          {modalState[index].ticket_redeemed && (
                            <Button
                              bgGradient="linear(to-l, #ff0050, 45%, #00f2ea)"
                              mr={3}
                              onClick={() => deleteReward(index)}
                            >
                              <Text color="white" fontWeight="bold">
                                Redeem
                              </Text>
                            </Button>
                          )}
                        </Flex>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Box>
              );
            })}
          </Flex>
        </VStack>
      </Flex>
    </>
  );
};

export default Rewards;
