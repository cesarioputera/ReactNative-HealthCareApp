import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RouterParam, ScreenMap } from '../navigation/router';
import firestore, { Filter } from '@react-native-firebase/firestore';
import { Clinic } from '../models/Clinic';
import GetLocation from 'react-native-get-location';
import { getDistance } from 'geolib';


const useClinicList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouterParam>>();
  const [clinics, setClinics] = useState<Clinic[] | null>();


  useEffect(() => {
    fetchClinics()
  }, []);

  const fetchClinics = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000,
      })

      firestore()
        .collection('clinics')
        .get()
        .then(documentSnapshot => {
          let clinics = [] as Clinic[]
          documentSnapshot.forEach(data => {
            let clinic = data.data() as Clinic
            clinic.id = data.id
            let distance = getDistance(
              { latitude: location.latitude, longitude: location.longitude },
              { latitude: clinic.pinPoint.latitude, longitude: clinic.pinPoint.longitude }
            )
            if (distance <= 8000) {
              clinics.push(clinic)
            }
          })
          setClinics(clinics)
        })
    } catch (error) {
      setClinics(null)
    }
  };

  const onClinicPressed = async (id: string) => {
    navigation.navigate(ScreenMap.DoctorList, { clinicId: id })
  };

  return {
    clinics,
    onClinicPressed
  };
};


export default useClinicList;