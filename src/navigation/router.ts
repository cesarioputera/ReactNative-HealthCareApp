import { Doctor } from "../models/Doctor";

export enum ScreenMap {
  Splash = 'Splash',
  Login = 'Login',
  Dashboard = 'Dashboard',
  Register = 'Register',
  ClinicList = 'ClinicList',
  DoctorList = 'DoctorList',
  DoctorDetail = 'DoctorDetail',
};

export type RouterParam = {
  Splash: undefined,
  Login: undefined,
  Dashboard: undefined,
  Register: undefined,
  ClinicList: undefined,
  DoctorList: { clinicId: string } | undefined
  DoctorDetail: { doctorId: string } | undefined
};

export type RouterDoctorListParam = {
  clinicId: string;
};

export type RouterDoctorDetailParam = {
  doctorId: string;
};