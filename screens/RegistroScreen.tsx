import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

//FIREBASE
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';

export default function RegistroScreen( {navigation}: any ) {

  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')

  function registro(){
    createUserWithEmailAndPassword(auth, correo, contrasenia)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log("Usuario registrado")
    navigation.navigate('Login')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorCode)
    Alert.alert("ERROR", "Error al registrarse")
  });
  }


  return (
    <View>
      <Text>REGISTRO</Text>
      <TextInput
        placeholder='Ingrese correo'
        onChangeText={(text) => (setCorreo(text))}
        keyboardType='email-address'
      />
      <TextInput
        placeholder='Ingrese contraseña'
        onChangeText={(text) => (setContrasenia(text))}
      />

      <Button title='Registro' onPress={()=> registro()} />
    </View>
  )
}

const styles = StyleSheet.create({})