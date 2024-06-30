import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import type { LatLngTuple, Map } from "leaflet";
import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import styles from "./Map.module.css";
import { useEffect, useRef, useState } from "react";
import ShowMarkers from "./ShowMarkers";
import Search from "../Search";
import { FaCompass } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Router from "next/router";
import { BiMoney, BiTrophy } from "react-icons/bi";

const MapComponent = () => {
  // INITIALIZING MAP
  const mapRef = useRef<Map | null>(null);
  const [loadMap, setLoadMap] = useState(false);
  const [currPosition, setCurrPosition] = useState<LatLngTuple>([
    1.304833, 103.831833,
  ]);
  const [homePosition, setHomePosition] = useState<LatLngTuple>([
    1.304833, 103.831833,
  ]);
  const OnGeolocationSuccess = (position: GeolocationPosition) => {
    setHomePosition([position.coords.latitude, position.coords.longitude]);
    setCurrPosition([position.coords.latitude, position.coords.longitude]);
    setLoadMap(true);
  };
  const OnGeolocationError = (error: GeolocationPositionError): void => {
    console.log("error");
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.error("User denied the request for Geolocation.");
        alert(
          "Permission to access location was denied. Please enable location permissions in your browser settings for the best browsing experience."
        );
        setLoadMap(true);
        break;
      case error.POSITION_UNAVAILABLE:
        console.error("Location information is unavailable.");
        alert(
          "Location information is currently unavailable. Please try again later."
        );
        setLoadMap(true);
        break;
      case error.TIMEOUT:
        console.error("The request to get user location timed out.");
        alert("The request to get your location timed out. Please try again.");
        setLoadMap(true);
        break;
      default:
        console.error("An unknown error occurred.");
        alert(
          "An unknown error occurred while attempting to access your location."
        );
        setLoadMap(true);
        break;
    }
  };
  useEffect(() => {
    if (!loadMap) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          OnGeolocationSuccess,
          OnGeolocationError
        );
      } else {
        alert(
          "Unsupported browser detected. Unable to fetch current user location."
        );
      }
    }
  }, [loadMap]);

  const flyToLocation = (position: LatLngTuple): void => {
    if (mapRef.current) {
      mapRef.current.flyTo(position, 18);
      setCurrPosition(position);
    }
  };

  return (
    <>
      {loadMap ? (
        <Box w="100vw" h="100vh" overflow="hidden">
          <Flex
            position="fixed"
            left="0"
            zIndex={99}
            justifyContent="center"
            display={{ base: "none", md: "block" }}
          >
            <Flex bg="white" h="100vh" w="4rem" shadow="xl" alignItems="center" flexDirection="column">
              <Flex mt="1rem" justifyContent="center" alignItems="center" h="3rem" w="3rem" cursor="pointer"  _hover={{bg:"gray.200"}} onClick={()=>{Router.push("/")}} borderRadius="0.5rem">
                <CgProfile size="2rem" color="grey"/>
              </Flex>
              <Flex mt="1rem" justifyContent="center" alignItems="center" h="3rem" w="3rem" cursor="pointer"  _hover={{bg:"gray.200"}} onClick={()=>{Router.push("/pay")}} borderRadius="0.5rem">
                <BiMoney size="2rem" color="grey"/>
              </Flex>
              <Flex mt="1rem" justifyContent="center" alignItems="center" h="3rem" w="3rem" cursor="pointer"  _hover={{bg:"gray.200"}} onClick={()=>{Router.push("/rewards")}} borderRadius="0.5rem">
                <BiTrophy size="2rem" color="grey"/>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            position="fixed"
            top="50"
            zIndex={99}
            w="100vw"
            justifyContent="center"
          >
            <Search flyToLocation={flyToLocation} />
          </Flex>
          <Flex
            position="fixed"
            bottom={{base:"5rem", md:"50"}}
            zIndex={99}
            w="100vw"
            justifyContent="end"
          >
            <Button
              variant="solid"
              size="lg"
              boxShadow="lg"
              onClick={() => flyToLocation(homePosition)}
              mr="2rem"
              bg="#69C9D0"
            >
              <FaCompass color="white" />
            </Button>
          </Flex>
          <MapContainer
            center={currPosition}
            zoom={50}
            scrollWheelZoom={true}
            className={styles.map}
            ref={mapRef}
            zoomControl={false}
          >
            <TileLayer
              attribution='&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
              url="https://www.onemap.gov.sg/maps/tiles/Grey/{z}/{x}/{y}.png"
            />
            <ShowMarkers />
            <Marker position={currPosition} />
          </MapContainer>
        </Box>
      ) : (
        <Flex w="100%" h="100vh" justifyContent="center" alignItems="center">
          <Text fontSize="x-large">
            Please enable location services for the best viewer experience!
          </Text>
        </Flex>
      )}
    </>
  );
};

export default MapComponent;
