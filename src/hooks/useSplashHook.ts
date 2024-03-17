import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { RouterParam, ScreenMap } from '../navigation/router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const useSplashHook = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouterParam>>();
  useEffect(() => {
    setTimeout(_checkLogin , 3000)
  }, []);

  const _checkLogin = async () => {
    try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        if (value === "true" ) {
          navigation.reset({index: 0, routes: [ { name: ScreenMap.Dashboard } ]})
          navigation.navigate(ScreenMap.Dashboard);
        } else {
          navigation.reset({index: 0, routes: [ { name: ScreenMap.Login } ]})
          navigation.navigate(ScreenMap.Login);
        }
    } catch (error) {
        navigation.reset({index: 0, routes: [ { name: ScreenMap.Login } ]})
        navigation.navigate(ScreenMap.Login);
    }
  };

  return {};
};

export default useSplashHook;