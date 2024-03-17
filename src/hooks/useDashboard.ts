import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RouterParam, ScreenMap } from '../navigation/router';
import { Appointment } from '../models/Appointment';
import firestore, { Filter } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../models/User';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PermissionsAndroid } from 'react-native';

const useDashboard = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouterParam>>();
  let email = null;
  const [user, setUser] = useState<User | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>();

  useEffect(() => {
    fetchUpcomingAppointment()
  }, []);

  const fetchUpcomingAppointment = async () => {
    try {
      email = await AsyncStorage.getItem('email');
      const _user = (await firestore().collection('users').doc(email!).get()).data() as User;
      _user.email = email!
      setUser(_user)

      setAppointment(null)
      await firestore()
        .collection('appointments')
        .where('email', '==', email)
        .get()
        .then(documentSnapshot => {
          let upcomingAppointments = [] as Appointment[]
          const todayTimestamp = new Date().valueOf()

          documentSnapshot.forEach(data => {
            let _appointment = data.data() as Appointment
            if (_appointment.schedule >= todayTimestamp) {
              upcomingAppointments.push(_appointment)
            }
            upcomingAppointments.sort((a, b) => (a.schedule - b.schedule))
            setAppointment(upcomingAppointments[0])
          })
        });

    } catch (error) {
      setAppointment(null)
    }
  };

  const onLogoutPressed = async () => {
    try {
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('isLoggedIn')
      navigation.reset({ index: 0, routes: [{ name: ScreenMap.Login }] })
      navigation.navigate(ScreenMap.Login)
    } catch (error) {
      setAppointment(null)
    }
  };

  const onCreateAppointmentPressed = async () => {
    try {
      requestLocationPermission()
    } catch (error) {
      setAppointment(null)
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'App needs access to your location ' +
            'so you can chosse nearest clinic.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigation.navigate(ScreenMap.ClinicList)
      } else {
        console.warn('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return {
    appointment,
    user,
    onCreateAppointmentPressed,
    onLogoutPressed
  };
};


export default useDashboard;