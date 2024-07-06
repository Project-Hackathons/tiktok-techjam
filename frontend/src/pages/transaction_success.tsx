import React from "react";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import crypto from "crypto";

import styles from "@/styles/TxnSuccess.module.css";

interface QueryParams {
  name: string;
  amount: number;
  time: string;
}

export default function Home() {
  const router = useRouter();
  const initialProps = router.query as unknown as QueryParams;

  return (
    <Flex
      bg="#070F2B"
      pb="100px"
      height="100vh"
      w="420px"
      className={styles.main}
    >
      <div className={styles.headingContainer}>Transaction Success</div>
      <div className={styles.subtitle}>
        Please save a copy of this receipt for your own reference.
      </div>
      {initialProps &&
        "name" in initialProps &&
        "amount" in initialProps &&
        "time" in initialProps && (
          <table className={styles.table}>
            <tbody>
              <tr>
                <th>Payment Handle</th>
                <td>{initialProps.name}</td>
              </tr>
              <tr>
                <th>Amount</th>
                <td>${initialProps.amount}</td>
              </tr>
              <tr>
                <th>Txn Time</th>
                <td>{initialProps.time}</td>
              </tr>
              <tr>
                <th>Txn Hash</th>
                <td>
                  {crypto
                    .createHash("sha256")
                    .update(
                      initialProps.name +
                        initialProps.amount +
                        initialProps.time
                    )
                    .digest("hex")
                    .substring(0, 25)}
                </td>
              </tr>
            </tbody>
          </table>
        )}
    </Flex>
  );
}
