import { Appointment } from "./Appointment";
import { GeoLocation } from "./GeoLocation";

export type Doctor = {
    id: string;
    name: string;
    appointments: number[];
    specialist: string;
    clinicId: string;
    clinicName: string;
    clinicLocation: string;
    clinicPinPoint: GeoLocation;
    imgUrl: string;
  };