import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

//FIREBASE
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user
        //console.log(user)
        console.log("Acceso correcto")
        navigation.navigate('Drawer_Welcome')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Acceso denegado")
        //Alert.alert("Error", "Error en las credenciales")
        console.log(errorCode)
        console.log(errorMessage)

        if(errorCode === 'auth/missing-password'){
          Alert.alert("Error", "No puede ingresar una contraseña en blanco")
        } else if( errorCode === 'auth/wrong-password'){
          Alert.alert("Error", "Error en las credenciales")
        } else{
          Alert.alert("Error", "Comuniquese con el admin")
        }


      });
  }

  return (
    <View>
      <Text style={{ fontSize: 30 }}>Login</Text>

      <TextInput
        placeholder='Ingrese email'
        onChangeText={(texto) => (setCorreo(texto))}
      
      />

      <TextInput
        placeholder='Ingrese su contraseña'
        onChangeText={(texto) => (setContrasenia(texto))}
        secureTextEntry= {true}
      />

      <Button title='Ingresar' onPress={ ()=> login() } />

      <Text onPress={() => navigation.navigate('Registro')}> 👉 Regístrate aquí 👈</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})