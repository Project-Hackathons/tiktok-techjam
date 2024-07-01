import { Flex, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoHomeOutline, IoTrophyOutline } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { GoHistory } from "react-icons/go";

const Navbar = () => {
  const Router = useRouter();
  return (
    <Flex bg="#070F2B" position="fixed" bottom="0" zIndex="9999">
      <Flex
        h="4rem"
        px="1rem"
        py="2rem" //changes based on whether or not we wna include text
        w="100vw"
        shadow="xl"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          _hover={{ bg: "gray.900" }}
          onClick={() => {
            Router.push("/");
          }}
          p="1rem"
          borderRadius="0.5rem"
        >
          <VStack gap="0.25rem">
            <IoHomeOutline size="1.75rem" color="gray" />
            {/* <Text color="gray">Profile</Text> */}
          </VStack>
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          _hover={{ bg: "gray.900" }}
          onClick={() => {
            Router.push("/map");
          }}
          p="1rem"
          borderRadius="0.5rem"
        >
          <VStack gap="0.25rem">
            <FaMapMarkedAlt size="1.75rem" color="gray" />
            {/* <Text color="gray">Map</Text> */}
          </VStack>
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          onClick={() => {
            Router.push("/pay");
          }}
          p="0.25rem"
          bgGradient="linear(to-r, #ff0050, 45%, #00f2ea)"
          borderRadius="0.5rem"
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            _hover={{ bg: "gray.200" }}
            // onClick={() => {
            //   Router.push("/pay");
            // }}
            bg="white"
            p="0.5rem"
            borderRadius="0.5rem"
          >
            <VStack gap="0.25rem">
              <FaMoneyBillTransfer size="1.75rem" />
              {/* <Text color="gray">Pay</Text> */}
            </VStack>
          </Flex>
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          _hover={{ bg: "gray.900" }}
          onClick={() => {
            Router.push("/rewards");
          }}
          p="1rem"
          borderRadius="0.5rem"
        >
          <VStack gap="0.25rem">
            <IoTrophyOutline size="1.75rem" color="gray" />
            {/* <Text color="gray">Rewards</Text> */}
          </VStack>
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          _hover={{ bg: "gray.900" }}
          onClick={() => {
            Router.push("/history");
          }}
          p="1rem"
          borderRadius="0.5rem"
        >
          <VStack gap="0.25rem">
            <GoHistory size="1.75rem" color="gray" />
            {/* <Text color="gray">History</Text> */}
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
