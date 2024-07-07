import { Divider, Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { User } from "../../../types";
import { FaMoneyBill } from "react-icons/fa";
import { BiMoneyWithdraw, BiTransfer } from "react-icons/bi";
import { GoFileMedia } from "react-icons/go";
import { AiOutlineStock } from "react-icons/ai";

function formatUnixTimestamp(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formatter.format(date); // e.g., "03 Jul 2023"
}
const TransactionList = ({ userData }: { userData: User }) => {
  const router = useRouter();
  const path = router.asPath;

  const trans = () => {
    if (path == "/history") {
      return userData.transactions.sort((a, b) => b.timestamp - a.timestamp);
    } else {
      return userData.transactions
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 3);
    }
  };

  const transactionIconMap = {
    "TOPUP(STORE)": FaMoneyBill,
    "WITHDRAWAL(STORE)": BiMoneyWithdraw,
    "DIRECT-TRANSFER": BiTransfer,
    "CONTENT-SUBSCRIPTION":GoFileMedia,
    "AD-MANAGER":AiOutlineStock
  }

  return (
    <Flex w="80%" h="50%" flexDir="column">
      <Text color="gray.100" fontSize="x-large" fontWeight="semibold">
        {path == "/history" ? "Transaction History" : "Recent Transactions"}
      </Text>
      <VStack color="white" gap="1rem">
        {trans().map((t) => (
          <Flex
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="solid 1px"
            py="1rem"
            borderBottomColor="gray.600"
            key={t.tid}
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
                <Icon as={transactionIconMap[t.type]}/>
              </Flex>
              <VStack
                gap={0}
                display="flex"
                justifyContent="start"
                alignItems="start"
              >
                <Text fontWeight="bold">{t.type}</Text>
                <Text color="gray.400">{formatUnixTimestamp(t.timestamp)}</Text>
              </VStack>
            </HStack>
            {t.from.uid == parseInt(userData.uid) ? (
              <Text fontWeight="semibold" fontSize="lg">
                - ${t.from.balance_before - t.from.balance_after}
              </Text>
            ) : (
              <Text fontWeight="semibold" fontSize="lg" color="green.300">
                + ${t.from.balance_before - t.from.balance_after}
              </Text>
            )}
          </Flex>
        ))}
      </VStack>
    </Flex>
  );
};

export default TransactionList;
