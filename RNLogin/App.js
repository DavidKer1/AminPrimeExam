import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import Navigation from './src/navigation/Navigation';
import Toast from 'react-native-toast-message';

const App = () => {
 
  return (
    <>
      <Navigation />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
