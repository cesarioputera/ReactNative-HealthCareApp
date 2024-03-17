
import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../components/Theme';
import useRegisterHook from '../hooks/useRegisterHook';

const RegisterScreen = () => {
  const {
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
  } = useRegisterHook()

  return (
    <Background>
      <BackButton onBackPressed={onBackPressed} />

      <Logo />

      <Header>Create Account</Header>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={fullName.value}
        onChangeText={text => setFullName({ value: text, error: '' })}
        error={!!fullName.error}
        errorText={fullName.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="next"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <TextInput
        label="Phone Number"
        returnKeyType="done"
        value={phoneNumber.value}
        onChangeText={text => setPhoneNumber({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoComplete="tel"
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
      />

      <CustomButton mode="contained" onPress={onRegisterPressed} style={styles.button}>
        Sign Up
      </CustomButton>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={onBackPressed}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>

  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default RegisterScreen;
