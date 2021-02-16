import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../Header';
import LoginForm from './LoginForm'
export default function Login() {
  return (
    <LinearGradient colors={['#252528', '#000']} style={styles.linearGradient}>
      <Header title={'LOGIN'}/>
      <LoginForm />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});


