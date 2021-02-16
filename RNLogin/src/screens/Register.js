import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import RegisterForm from '../components/register/RegisterForm';

export default function Register() {
  return (
    <LinearGradient
      colors={['#252528', '#000']}
      style={styles.linearGradient}>
        <Header title={'REGISTRARSE'}/>
        <RegisterForm />
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});
