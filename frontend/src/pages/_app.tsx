import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Flex, Box } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Flex
        width="100%"
        justifyContent="center"
        bgGradient="linear(to-r, #ff0050, 45%, #00f2ea)"
      >
        <Box width="100%" maxWidth="420px">
          <Component {...pageProps} />
          <Navbar />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
