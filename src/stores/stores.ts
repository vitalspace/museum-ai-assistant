import { writable } from "svelte/store";
import Locations from "./locations.json";

export const locations = writable(Locations);
export const currentLocationId = writable(9);
export const isFocused = writable(false);
export const infoModalIsOpen = writable(false);
export const currentLocation = writable({
  lat: Locations[8].lat,
  lng: Locations[8].lng,
  altitude: Locations[8].altitude,
  tilt: Locations[8].tilt,
  range: Locations[8].range,
  heading: Locations[8].heading,
});

export const controls = writable({
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0,
  },
});
