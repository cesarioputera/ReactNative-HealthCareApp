import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouterDoctorDetailParam, RouterDoctorListParam, RouterParam, ScreenMap } from '../navigation/router';
import firestore from '@react-native-firebase/firestore';
import { Doctor } from '../models/Doctor';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Clinic } from '../models/Clinic';
import { Schedule } from '../models/Schedule';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useDoctorDetail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouterParam>>();
  const route = useRoute().params as RouterDoctorDetailParam

  const [doctor, setDoctor] = useState<Doctor | null>();
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>();
  const [schedules, setSchedules] = useState<Schedule[]>();


  useEffect(() => {
    fetchDoctor(route.doctorId)
  }, []);

  const fetchDoctor = async (doctorId: string) => {
    try {
      const doctorSnapshot = await firestore()
        .collection('doctors')
        .doc(doctorId)
        .get()

      const doctor = doctorSnapshot.data() as Doctor
      doctor.id = doctorSnapshot.id

      const clinicSnapshot = await firestore()
        .collection('clinics')
        .doc(doctor.clinicId)
        .get()

      const clinic = clinicSnapshot.data() as Clinic
      doctor.clinicId = clinicSnapshot.id
      doctor.clinicLocation = clinic.location
      doctor.clinicName = clinic.name

      setDoctor(doctor)

    } catch (error) {
      setDoctor(null)
    }
  };

  const checkAvailability = (date: number) => {
    const now = new Date()
    if (now.valueOf() > date) return false
    if (doctor?.appointments && doctor?.appointments.indexOf(date) != -1) return false
    return true
  }

  const generateSchedules = (selectedDate: Date) => {
    setSelectedDate(selectedDate)
    setSelectedSchedule(null)
    const schedules = [] as Schedule[]
    for (let i = 9; i <= 17; i++) {
      selectedDate.setHours(i, 0, 0)

      schedules.push({ 
        label: selectedDate.toLocaleTimeString(), 
        timestamp: selectedDate.valueOf(), 
        available: checkAvailability(selectedDate.valueOf()) 
      })
    }
    setSchedules(schedules)
  };

  const createAppointment = async () => {
    const email = await AsyncStorage.getItem('email');
    firestore()
      .collection('doctors')
      .doc(doctor?.id)
      .update({
        appointments: firestore.FieldValue.arrayUnion(selectedSchedule?.timestamp)
      })

    firestore()
      .collection('appointments')
      .add({
        email: email,
        schedule: selectedSchedule?.timestamp,
        clinicLocation: doctor?.clinicLocation,
        clinicName: doctor?.clinicName,
        doctorName: doctor?.name
      })
      navigation.reset({index: 0, routes: [ { name: ScreenMap.Dashboard } ]})
      navigation.navigate(ScreenMap.Dashboard);
  }

  return {
    doctor,
    selectedDate,
    generateSchedules,
    schedules,
    selectedSchedule,
    setSelectedSchedule,
    createAppointment
  };
};


export default useDoctorDetail;