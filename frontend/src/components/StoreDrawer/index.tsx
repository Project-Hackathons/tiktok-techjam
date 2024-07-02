import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  UseDisclosureProps,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { FaAngleDown } from "react-icons/fa";
import { Store } from "../Map/ShowMarkers";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import type { LatLngTuple } from "leaflet";

interface StoreDrawerProps extends UseDisclosureProps {
  // Add any additional props here
  stores: Store[];
  currentPosition: LatLngTuple;
  flyToLocation: (location: LatLngTuple, changeCurr: boolean) => void;
}

const StoreDrawer = ({
  isOpen,
  onOpen,
  onClose,
  stores,
  currentPosition,
  flyToLocation,
}: StoreDrawerProps) => {
  const getDirection = (position: LatLngTuple) => {
    const [lat, lng] = position;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  function getDistanceFromLatLonInKm(pos1: LatLngTuple, pos2: LatLngTuple) {
    //tech debt: as the crow flies, not actual gmap distance hehaw
    const [lat1, lon1] = pos1;
    const [lat2, lon2] = pos2;
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return Math.round(d * 10) / 10;
  }

  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  const filteredStores = (stores: Store[]) => {
    const storesWithDistance = stores.map((store: Store) => {
      // Calculate distance using the hypothetical calculateDistance function
      const distance = getDistanceFromLatLonInKm(currentPosition, [
        store.lat,
        store.lng,
      ]);
      // Return a new object with the distance property added
      return {
        ...store,
        distance,
      };
    });

    // Sort the stores by distance in ascending order
    const sortedStores = storesWithDistance.sort(
      (a, b) => a.distance - b.distance
    );

    // Return the sorted array of stores
    return sortedStores;
  };

  const showOnMap = (pos: LatLngTuple) => {
    onClose!();
    flyToLocation(pos, false);
  };
  return (
    <Flex justifyContent="center">
      <Drawer
        placement="bottom"
        onClose={onClose!} //techdebt?? wtv
        isOpen={isOpen!}
        trapFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent
          justifySelf="center"
          h="60vh"
          borderRadius="0.5rem"
          w="420px"
          bg="gray.900"
        >
          <DrawerHeader
            borderBottomWidth="1px"
            borderBottomColor="gray.700"
            onClick={onClose}
            _hover={{ bg: "gray.800" }}
            cursor="pointer"
          >
            <Flex justifyContent="space-between">
              <Flex alignItems="center" color="gray.100">
                📍 &nbsp;Ranked by distance
              </Flex>
              <Flex alignItems="center">
                <Icon color="gray.100" as={FaAngleDown} />
              </Flex>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Flex alignItems="center" h="100%" pb="4rem" overflowX="scroll">
              <HStack h="100%" gap="1rem">
                {filteredStores(stores)
                  .slice(5)
                  .map((store) => {
                    return (
                      <Flex
                        h="90%"
                        minW="17.5rem"
                        shadow="lg"
                        border="solid 1px"
                        borderColor="gray.700"
                        borderRadius="1rem"
                        bg="gray.800"
                        key={store.address}
                        color="white"
                      >
                        <Flex
                          p="1rem"
                          w="100%"
                          flexDirection="column"
                          justifyContent="space-between"
                        >
                          <VStack
                            display="flex"
                            justifyContent="start"
                            alignItems="start"
                          >
                            <Text textAlign="start" fontWeight="semibold">
                              {store.name}
                            </Text>
                            <Text
                              textAlign="start"
                              fontSize="sm"
                              color="gray.400"
                              noOfLines={1}
                            >
                              {store.distance} km • {store.address}
                            </Text>
                            <Text
                              textAlign="start"
                              fontSize="sm"
                              color="gray.400"
                            >
                              Withdrawal up to: ${store.withdrawal}
                            </Text>
                          </VStack>
                          <HStack w="100%" display="flex">
                            <Button
                              flex={1}
                              onClick={() => showOnMap([store.lat, store.lng])}
                              alignSelf="end"
                              size="sm"
                              color="#088395"
                              bg="white"
                              variant="outline"
                              mt="1rem"
                            >
                              Show on map
                            </Button>
                            <Button
                              flex={1}
                              onClick={() =>
                                getDirection([store.lat, store.lng])
                              }
                              alignSelf="end"
                              size="sm"
                              bg="#69C9D0"
                              color="white"
                              variant="solid"
                              colorScheme="blue"
                              rightIcon={<ArrowForwardIcon />}
                              mt="1rem"
                            >
                              Directions
                            </Button>
                          </HStack>
                        </Flex>
                      </Flex>
                    );
                  })}
              </HStack>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
export default StoreDrawer;
