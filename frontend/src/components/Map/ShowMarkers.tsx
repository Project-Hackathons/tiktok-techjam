import { Marker, useMapEvents, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { memo, useEffect, useState } from "react";
import type { LatLngBounds, LatLngTuple } from "leaflet";
// import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import { debounce } from "lodash";
import * as L from "leaflet";
import { Flex, Text, Button, VStack } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import axios from 'axios'

interface Store {
  address: string;
  lat: number;
  lng: number;
  name: string;
  withdrawal: number;
}

const RedMarker = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const getDirection = (position: LatLngTuple) => {
  const [lat, lng] = position;
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  window.open(url, "_blank");
};

const MemoizedMarker = memo(
  ({ position, store }: { position: LatLngTuple; store: Store }) => (
    <Marker position={position} icon={RedMarker}>
      <Popup>
        <Flex
          justifyContent="center"
          alignItems="start"
          flexDirection="column"
          gap={0}
          height="8rem"
          width="12rem"
          
        >
          <VStack gap="0.25rem" justifyContent="start" alignItems="start" display="flex">
          <Text  as="span" noOfLines={1} fontSize="sm" fontWeight="semibold">
            {store.name}
          </Text>
          <Text  as="span" noOfLines={1} fontSize="sm" color="grey">
            {store.address}
          </Text>
          <Text  as="span" noOfLines={1} fontSize="sm" color="grey">
            (Withdrawal up to $500)
          </Text>
          </VStack>
   

          <Button
            onClick={() => getDirection(position)}
            alignSelf="end"
            size="sm"
            bg="#69C9D0"
            color="white"
            rightIcon={<ArrowForwardIcon />}
            mt="1rem"
          >
            Directions
          </Button>
        </Flex>
      </Popup>
    </Marker>
  )
);
MemoizedMarker.displayName = "MemoizedMarker";

const ShowMarkers = () => {
  const [currZoom, setCurrZoom] = useState(50);
  const [mapBounds, setMapBounds] = useState<LatLngBounds | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const fetchStores = async () => {
    try {
      const response = await axios.get('http://152.42.182.247:5000/stores');
      const stores = response.data;
      setStores(stores)
      return stores; // You can return the stores or handle them as needed
    } catch (error) {
      console.error('Error fetching stores:', error);
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

  const map = useMapEvents({
    moveend: debounce(() => {
      setMapBounds(map.getBounds());
    }, 100),
    zoomend: debounce(() => {
      const zoom = map.getZoom();
      if (zoom) {
        setCurrZoom(zoom);
        setMapBounds(map.getBounds());
      }
    }, 100),
  });

  // Filter markers based on whether they fall within the current map bounds
  const visibleMarkers = stores.filter((store) => {
    return mapBounds ? mapBounds.contains([store.lat, store.lng]) : false;
  });

  return (
    <>
      {currZoom > 12 ? (
        <>
          {visibleMarkers.map((store) => (
            <MemoizedMarker
              key={store.address}
              position={[store.lat, store.lng]}
              store={store}
            />
          ))}
        </>
      ) : null}
    </>
  );
};

export default ShowMarkers;
