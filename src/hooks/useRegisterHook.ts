import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
  phoneNumberValidator
} from '../utils/UserValidator';
import firestore from '@react-native-firebase/firestore';
import { RouterParam, ScreenMap } from '../navigation/router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const useLoginHook = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouterParam>>();

  const [fullName, setFullName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });
  var registerSuccess = false;


  const onRegisterPressed = async () => {
    const fullNameError = nameValidator(fullName.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const phoneNumberError = phoneNumberValidator(phoneNumber.value);


    if (emailError || passwordError || fullNameError || phoneNumberError) {
      setFullName({ ...fullName, error: fullNameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setPhoneNumber({ ...phoneNumber, error: phoneNumberError });
      return;
    }

    //save to firestore
    firestore()
      .collection('users')
      .doc(email.value)
      .set({
        fullName: fullName.value,
        password: password.value,
        phoneNumber: phoneNumber.value
      })
      .then(() => {
        registerSuccess = true
      });

    navigation.navigate(ScreenMap.Login);
  };

  const onBackPressed = async () => {
    navigation.goBack();
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    onRegisterPressed,
    onBackPressed,
    registerSuccess
  };
};

export default useLoginHook;