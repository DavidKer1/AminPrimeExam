import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import {postLogin} from '../../api/api'
export default function LoginForm() {
  const navigation = useNavigation()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({

      username: yup.string().required('El email es requerido'),
      password: yup
        .string()
        .required('La contraseña es requerida')
        .min(5, 'La contraseña debe tener minimo 5 caracteres'),
    }),
    onSubmit: async (data) => {
      data.username = data.username.toLowerCase();
        
      
      try {
        const result = await postLogin(data);
        if(result.data.errors){
          Toast.show({
            type:'error',
            text1: result.data.errors.msg,
            text2: 'Intentalo de nuevo'
          })
        }else{
          Toast.show({
            type:'success',
            text1: 'Login exitoso',
            text2: 'Revisa el token'
          })

          navigation.navigate('Home', {token: result.data.token})

        }

      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        placeholderTextColor="#8f5c21"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <Text style={styles.error}>{formik.errors.username}</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor="#8f5c21"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry={true}
      />
      <Text style={styles.error}>{formik.errors.password}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => formik.handleSubmit()}>
        <Text style={{fontSize: 16}}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.question}>¿Aún no tienes cuenta?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.txtChange}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 30,
  },
  info: {
    marginVertical: 20,
  },
  text: {
    color: '#8A7051',
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#FDA43C',
    width: '100%',
    height: 46,
    borderRadius: 8,
    color: '#8f5c21',
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: '#FDA43C',
    height: 46,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    alignSelf: 'center',
    paddingTop: 10,
    color: '#6C5A45',
  },
  txtChange: {
    color: '#FDA43C',
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
  error: {
    color: '#ff4208',
    height: 26,
    marginTop: 5,
    marginLeft: 20,
  },
});
