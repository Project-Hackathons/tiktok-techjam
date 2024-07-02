import { Divider, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const TransactionList = () => {
  const router = useRouter()
  const path = router.asPath
  
  return (
    <Flex w="80%" h="50%" flexDir="column">
      <Text color="gray.100" fontSize="x-large" fontWeight="semibold">
        {
          path == "/history" ? "Transaction History" : "Recent Transactions"
        }
      </Text>
      <VStack color="white" gap="1rem">
        <Flex
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          borderBottom="solid 1px"
          py="1rem"
          borderBottomColor="gray.600"
        >
          <HStack>
            <Flex
              bg="gray.800"
              w="2.5rem"
              h="2.5rem"
              borderRadius="0.5rem"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontWeight="bold">D</Text>
            </Flex>
            <VStack
              gap={0}
              display="flex"
              justifyContent="start"
              alignItems="start"
            >
              <Text fontWeight="bold">Dribble Pro</Text>
              <Text color="gray.400">1 hour ago</Text>
            </VStack>
          </HStack>
          <Text fontWeight="semibold" fontSize="lg" color="green.300">
            + $720
          </Text>
        </Flex>
        <Flex
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          borderBottom="solid 1px"
          py="1rem"
          borderBottomColor="gray.600"
        >
          <HStack>
            <Flex
              bg="gray.800"
              w="2.5rem"
              h="2.5rem"
              borderRadius="0.5rem"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontWeight="bold">D</Text>
            </Flex>
            <VStack
              gap={0}
              display="flex"
              justifyContent="start"
              alignItems="start"
            >
              <Text fontWeight="bold">Dribble Pro</Text>
              <Text color="gray.400">1 hour ago</Text>
            </VStack>
          </HStack>
          <Text fontWeight="semibold" fontSize="lg" color="white">
            - $720
          </Text>
        </Flex>
        <Flex
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          borderBottom="solid 1px"
          py="1rem"
          borderBottomColor="gray.600"
        >
          <HStack>
            <Flex
              bg="gray.800"
              w="2.5rem"
              h="2.5rem"
              borderRadius="0.5rem"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontWeight="bold">D</Text>
            </Flex>
            <VStack
              gap={0}
              display="flex"
              justifyContent="start"
              alignItems="start"
            >
              <Text fontWeight="bold">Dribble Pro</Text>
              <Text color="gray.400">1 hour ago</Text>
            </VStack>
          </HStack>
          <Text fontWeight="semibold" fontSize="lg" color="green.300">
            + $720
          </Text>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default TransactionList;
