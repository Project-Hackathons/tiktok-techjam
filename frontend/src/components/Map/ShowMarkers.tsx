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

import axios from "axios";

export interface Store {
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
          <VStack
            gap="0.25rem"
            justifyContent="start"
            alignItems="start"
            display="flex"
          >
            <Text as="span" noOfLines={1} fontSize="sm" fontWeight="semibold">
              {store.name}
            </Text>
            <Text as="span" noOfLines={1} fontSize="sm" color="grey">
              {store.address}
            </Text>
            {store.withdrawal == 0 ? (
              <Text as="span" noOfLines={1} fontSize="sm" color="grey">
                (Withdrawal unavailable)
              </Text>
            ) : (
              <Text as="span" noOfLines={1} fontSize="sm" color="grey">
                (Withdrawal up to ${store.withdrawal})
              </Text>
            )}
          </VStack>

          <Button
            onClick={() => getDirection(position)}
            alignSelf="end"
            size="sm"
            bg="#69C9D0"
            color="white"
            colorScheme="blue"
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

const ShowMarkers = ({stores}:{ stores: Store[]}) => {
  const [currZoom, setCurrZoom] = useState(50);
  const [mapBounds, setMapBounds] = useState<LatLngBounds | null>(null);

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
