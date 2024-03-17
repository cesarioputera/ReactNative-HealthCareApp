import { GeoLocation } from "./GeoLocation";

export type Clinic = {
    id: string;
    name: string;
    location: string;
    pinPoint: GeoLocation;
    imgUrl: string;
  };