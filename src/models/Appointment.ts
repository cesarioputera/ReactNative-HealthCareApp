import { GeoLocation } from "./GeoLocation";

export type Appointment = {
    email: string;
    doctorName: string;
    clinicName: string;
    clinicLocation: GeoLocation;
    schedule: number;
  };