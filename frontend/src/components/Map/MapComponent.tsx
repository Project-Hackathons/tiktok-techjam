import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { type LatLngTuple, type Map } from "leaflet";
import {
  Icon,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Flex,
  HStack,
  Text,
  VStack,
  useDisclosure,
  DrawerOverlay,
} from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import styles from "./Map.module.css";
import { useEffect, useRef, useState } from "react";
import ShowMarkers from "./ShowMarkers";
import Search from "../Search";
import { FaAngleDown, FaCompass, FaListUl } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Router from "next/router";
import { BiCurrentLocation, BiMoney, BiTrophy } from "react-icons/bi";
import StoreDrawer from "../StoreDrawer";
import type { Store } from "./ShowMarkers";
import axios from "axios";

const MapComponent = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const fetchStores = async () => {
    try {
      const response = await axios.get("http://152.42.182.247:5000/stores");
      const stores = response.data;
      setStores(stores);
      return stores; // You can return the stores or handle them as needed
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
    //   {
    //     address: "Singapore 467360",
    //     lat: 1.324592,
    //     lng: 103.9292631,
    //     name: "7-Eleven",
    //     withdrawal: 500,
    //   },
    //   {
    //     address: "705 E Coast Rd, Singapore 459062",
    //     lat: 1.3119873,
    //     lng: 103.9223542,
    //     name: "7-Eleven + Mr Softee",
    //     withdrawal: 100,
    //   },
    //   {
    //     address: "750 Chai Chee Rd, #01-32, Singapore 469000",
    //     lat: 1.3234063,
    //     lng: 103.9221309,
    //     name: "7-Eleven",
    //     withdrawal: 200,
    //   },
    //   {
    //     address: "25 New Upper Changi Rd, #01-626, Singapore 462025",
    //     lat: 1.3235676,
    //     lng: 103.9337613,
    //     name: "7-Eleven",
    //     withdrawal: 100,
    //   },
    //   {
    //     address: "20 Chai Chee Rd, #01-426, Singapore 461020",
    //     lat: 1.3263519,
    //     lng: 103.9231012,
    //     name: "7-Eleven",
    //     withdrawal: 300,
    //   },
    //   {
    //     address: "123 Bedok North Street 2, #01-158, Singapore 460123",
    //     lat: 1.3292945,
    //     lng: 103.9373334,
    //     name: "7-Eleven",
    //     withdrawal: 900,
    //   },
    //   {
    //     address: "57 Marine Ter, #01-125, Singapore 440057",
    //     lat: 1.306474,
    //     lng: 103.9153155,
    //     name: "7-Eleven",
    //     withdrawal: 400,
    //   },
    //   {
    //     address:
    //       "1110 East Coast Parkway, #01-01/02, Cyclist Park, Singapore 449880",
    //     lat: 1.3044096,
    //     lng: 103.9238689,
    //     name: "7-Eleven",
    //     withdrawal: 0,
    //   },
    //   {
    //     address: "56 New Upper Changi Rd, #01-1298, Ixora 461056",
    //     lat: 1.3247114,
    //     lng: 103.9407488,
    //     name: "7-Eleven",
    //     withdrawal: 200,
    //   },
    //   {
    //     address: "18 Jln Masjid, #01-05 Kembangan Plaza, Singapore 418944",
    //     lat: 1.3203746,
    //     lng: 103.9124957,
    //     name: "7-Eleven",
    //     withdrawal: 900,
    //   },
    //   {
    //     address: "89 Bedok North Street 4, #01-83, Singapore 460089",
    //     lat: 1.3320551,
    //     lng: 103.9381182,
    //     name: "7-Eleven",
    //     withdrawal: 0,
    //   },
    //   {
    //     address: "392 E Coast Rd, Singapore 428992",
    //     lat: 1.308735,
    //     lng: 103.9116708,
    //     name: "7-Eleven",
    //     withdrawal: 200,
    //   },
    //   {
    //     address: "168 Bedok South Ave 3, #01-477 Siglap East, Singapore 460168",
    //     lat: 1.3202846,
    //     lng: 103.9445132,
    //     name: "7-Eleven",
    //     withdrawal: 0,
    //   },
    //   {
    //     address: "412 Bedok North Ave 2, #01-128, Singapore 460412",
    //     lat: 1.3293002,
    //     lng: 103.9311212,
    //     name: "7-Eleven",
    //     withdrawal: 900,
    //   },
    //   {
    //     address:
    //       "121 Bedok Reservoir Rd, #01-198 Eunos Vista, Singapore 470121",
    //     lat: 1.3313255,
    //     lng: 103.9096189,
    //     name: "7-Eleven",
    //     withdrawal: 0,
    //   },
    //   {
    //     address:
    //       "744 Bedok Reservoir Rd, #01-3061 Reservoir Village, Singapore 470744",
    //     lat: 1.3375907,
    //     lng: 103.9220182,
    //     name: "7-Eleven",
    //     withdrawal: 800,
    //   },
    //   {
    //     address: "58 Marine Ter, #01-59 Haven, Singapore 440058",
    //     lat: 1.306067,
    //     lng: 103.9138188,
    //     name: "7-Eleven",
    //     withdrawal: 200,
    //   },
    //   {
    //     address: "213 E Coast Rd, No.213, Singapore 428912",
    //     lat: 1.3073755,
    //     lng: 103.9067524,
    //     name: "7-Eleven",
    //     withdrawal: 600,
    //   },
    //   {
    //     address: "Blk 83 Marine Parade Central, #01-574, Singapore 440083",
    //     lat: 1.3027784,
    //     lng: 103.9062377,
    //     name: "7-Eleven",
    //     withdrawal: 700,
    //   },
    //   {
    //     address: "1A Eunos Cres, #01-2469/2471, Singapore 401001",
    //     lat: 1.321351,
    //     lng: 103.9027665,
    //     name: "7-Eleven + Mr Softee",
    //     withdrawal: 600,
    //   },
    // ];
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const { isOpen, onClose, onOpen } = useDisclosure();
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

  const flyToLocation = (position: LatLngTuple, changeCurr = true): void => {
    if (mapRef.current) {
      mapRef.current.flyTo(position, 18);
      if (changeCurr) {
        setCurrPosition(position);
      }
    }
  };

  return (
    <>
      {loadMap ? (
        <Box w="100%" h="100vh" overflow="hidden">
          <Flex
            position="fixed"
            top="50"
            zIndex={99}
            w="100%"
            maxWidth="420px"
            justifyContent="center"
            px="1rem"
          >
            <Search flyToLocation={flyToLocation} onOpen={onOpen} />
          </Flex>

          <Flex
            position="fixed"
            bottom="20"
            w="100%"
            maxW="420px"
            zIndex={99}
            flexDirection="column"
            pr="1rem"
          >
            <VStack>
              <Flex justifyContent="end" w="100%">
                <Button
                  variant="solid"
                  color="white"
                  bg="#37B7C3"
                  borderRadius="50%"
                  boxShadow="lg"
                  h="3.5rem"
                  w="3.5rem"
                  onClick={() => flyToLocation(homePosition)}
                >
                  <Icon as={BiCurrentLocation} boxSize="2rem" />
                </Button>
              </Flex>
              <Flex justifyContent="end" w="100%">
                <Button
                  variant="outline"
                  color="#088395"
                  bg="white"
                  boxShadow="lg"
                  size="lg"
                  onClick={onOpen}
                  leftIcon={<FaListUl />}
                >
                  View Stores
                </Button>
              </Flex>
              <StoreDrawer
                onOpen={onOpen}
                onClose={onClose}
                isOpen={isOpen}
                stores={stores}
                currentPosition={currPosition}
                flyToLocation={flyToLocation}
              />
            </VStack>
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
              url="https://www.onemap.gov.sg/maps/tiles/Night/{z}/{x}/{y}.png"
            />
            <ShowMarkers stores={stores} />
            <Marker position={currPosition} />
          </MapContainer>
        </Box>
      ) : (
        <Flex w="100%" h="100vh" justifyContent="center" alignItems="center">
          <Text fontSize="x-large" fontWeight="semibold" textAlign="center" color="white">
            Location services need to be enabled for the best viewing experience!
          </Text>
        </Flex>
      )}
    </>
  );
};

export default MapComponent;
