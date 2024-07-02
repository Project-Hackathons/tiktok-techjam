import TransactionList from "@/components/TransactionList"
import { Flex, VStack, HStack, Button, Text } from "@chakra-ui/react"

const History = () => {
    return (
        <Flex bg="#070F2B" h="100vh" w="100%">
        <VStack gap="1.5rem" w="100%" pt="1.5rem">
          <TransactionList />
        </VStack>
      </Flex>
    )
}

export default History