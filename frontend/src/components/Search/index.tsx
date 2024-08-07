import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Search2Icon, SmallCloseIcon } from "@chakra-ui/icons";
import type { LatLngTuple } from "leaflet";
import axios from "axios";

import type { PlaceData } from "@googlemaps/google-maps-services-js";

const SearchComponent = ({
  flyToLocation,
  onOpen,
}: {
  flyToLocation: (location: LatLngTuple) => void;
  onOpen: () => void;
}) => {
  const [searchedLocation, setSearchedLocation] = useState("");
  const [searchResults, setSearchResults] = useState<Partial<PlaceData>[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const fetchGoogleMapResults = async () => {
    const response = await axios.post("/api/search", {
      query: searchedLocation,
    });
    return response.data;
  };

  const resetSearch = ({ clearBar = true }: { clearBar?: boolean }) => {
    setSearchResults([]);
    setShowSearchResults(false);
    if (clearBar) {
      setSearchedLocation("");
    }
  };

  useEffect(() => {
    resetSearch({ clearBar: false });
  }, [searchedLocation]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsSearching(true);
      const result = await fetchGoogleMapResults();
      setSearchResults(result);
      setShowSearchResults(true);
      console.log(result);
    } catch (error) {
      setSearchResults([]);
      console.error("Search failed:", error);
    }
    setIsSearching(false);
  };

  const handleSelect = (location: { lat: number; lng: number }) => {
    resetSearch({});
    flyToLocation([location.lat, location.lng]);
    // setTimeout(() => {
    //   onOpen();
    // }, 2000);
  };

  return (
    <Box
      borderRadius="0.5rem"
      bg="white"
      w={{ base: "90vw", sm: "70vw", md: "50vw" }}
    >
      <form onSubmit={handleSearch}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon />
          </InputLeftElement>
          <Box cursor="pointer" onClick={() => resetSearch({})}>
            <InputRightElement onClick={() => resetSearch({})}>
              {isSearching ? <Spinner size="sm" /> : <SmallCloseIcon />}
            </InputRightElement>
          </Box>
          <Input
            w="100%"
            placeholder="Set your starting location"
            variant="outline"
            bg="white"
            borderRadius="0.5rem"
            borderBottomRadius={showSearchResults ? "0rem" : "0.5rem"}
            value={searchedLocation}
            onChange={(event) => setSearchedLocation(event.target.value)}
          />
        </InputGroup>
      </form>
      {showSearchResults && (
        <Box maxH="50vh" overflowY="auto">
          {searchResults.length > 0 ? (
            searchResults
              .filter((result) => result.geometry)
              .map((result) => (
                <Flex
                  key={result.place_id} // It's a good practice to use a key when rendering lists
                  alignItems="start"
                  justifyContent="center"
                  flexDir="column"
                  h="4rem"
                  px="1rem"
                  cursor="pointer"
                  _hover={{ bg: "#f7f8f8" }}
                  onClick={() => handleSelect(result.geometry!.location)}
                >
                  <Text noOfLines={1} fontSize="sm">
                    {result.name}
                  </Text>
                  <Text noOfLines={1} color="grey" fontSize="sm">
                    &nbsp;{result.formatted_address}
                  </Text>
                </Flex>
              ))
          ) : (
            <Flex
              alignItems="center"
              h="2.5rem"
              pl="2rem"
              _hover={{ bg: "#f7f8f8" }}
            >
              <Text fontSize="sm">No results found</Text>{" "}
            </Flex>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchComponent;
