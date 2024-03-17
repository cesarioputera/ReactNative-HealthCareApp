import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouterDoctorListParam, RouterParam, ScreenMap } from '../navigation/router';
import firestore from '@react-native-firebase/firestore';
import { Doctor } from '../models/Doctor';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const useDoctorList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouterParam>>();
  const [doctors, setDoctors] = useState<Doctor[] | null>();

  const route = useRoute().params as RouterDoctorListParam

  useEffect(() => {
    fetchDoctors(route.clinicId)
  }, []);

  const fetchDoctors = async (clinicId: string) => {
    try {
      await firestore()
        .collection('doctors')
        .where('clinicId', '==', clinicId)
        .get()
        .then(documentSnapshot => {
          let doctors = [] as Doctor[]
          documentSnapshot.forEach(data => {
            let doctor = data.data() as Doctor
            doctor.id = data.id
            doctors.push(doctor)
          })
          setDoctors(doctors)
        })
    } catch (error) {
      setDoctors(null)
    }
  };

  const onClinicPressed = async (id: string) => {
    navigation.navigate(ScreenMap.DoctorDetail, {doctorId: id})
  };


  return {
    doctors,
    onClinicPressed
  };
};


export default useDoctorList;