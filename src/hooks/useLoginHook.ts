import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  emailValidator, 
  passwordValidator
} from '../utils/UserValidator';
import firestore from '@react-native-firebase/firestore';
import {User} from '../models/User';
import { RouterParam, ScreenMap } from '../navigation/router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';



const useLoginHook = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouterParam>>();

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    
    const userDocument = await firestore().collection('users').doc(email.value).get();
    if(!userDocument.exists || (userDocument.data() as User).password != password.value){
      setEmail({ ...email, error: "Email or Password is Incorrect" });
      setPassword({ ...password, error: "Email or Password is Incorrect" });
      return;
    }
    try {
      await AsyncStorage.setItem('isLoggedIn', "true");
      await AsyncStorage.setItem('email', email.value);
    } catch (e) {
      // saving error
    }

    navigation.navigate(ScreenMap.Dashboard);
  };

  const onSignUpPressed = async () => {
    navigation.navigate(ScreenMap.Register);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    onLoginPressed,
    onSignUpPressed
  };
};

export default useLoginHook;