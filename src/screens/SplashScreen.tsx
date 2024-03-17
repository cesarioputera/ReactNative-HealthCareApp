import React from 'react';
import Logo from '../components/Logo';
import Background from '../components/Background';
import useSplashHook from '../hooks/useSplashHook';


const SplashScreen = () => {
  const a = useSplashHook()
  return (
    <Background>
      <Logo />
    </Background>
  );
};
export default SplashScreen;