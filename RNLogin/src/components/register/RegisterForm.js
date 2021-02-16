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
import {postRegister} from '../../api/api';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export default function RegisterForm() {
  const navigation = useNavigation()
  const formik = useFormik({
    initialValues: {
      nombre: '',
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      nombre: yup
        .string()
        .required('El nombre es requerido')
        .min(2, 'El nombre debe tener minimo dos letras')
        .max(50, 'El nombre es demasiado grande'),
      username: yup.string().required('El email es requerido'),
      password: yup
        .string()
        .required('La contraseña es requerida')
        .min(5, 'La contraseña debe tener minimo 5 caracteres'),
    }),
    onSubmit: async (data) => {
      data.username = data.username.toLowerCase();
      try {
        const result = await postRegister(data);
        if(result.data.errors){
          Toast.show({
            type:'error',
            text1: result.data.errors.msg,
            text2: 'Intenta con otro nombre de usuario'
          })
        }else{
          console.log(result);
          Toast.show({
            type:'success',
            text1: 'Usuario registrado correctamente',
            text2: 'Ya puedes iniciar sesión'
          })
        }
        formik.resetForm()

      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Nombre"
        placeholderTextColor="#8f5c21"
        value={formik.values.nombre}
        onChangeText={formik.handleChange('nombre')}
      />
      <Text style={styles.error}>{formik.errors.nombre}</Text>
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
        <Text style={{fontSize: 16}}>Registrarse</Text>
      </TouchableOpacity>

      <Text style={styles.question}>¿Ya tienes cuenta?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.txtChange}>Iniciar Sesión</Text>
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
