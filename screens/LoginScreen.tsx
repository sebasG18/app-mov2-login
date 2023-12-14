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
        const user = userCredential.user
        console.log("Acceso correcto")
        navigation.navigate('Drawer_Welcome')
        setCorreo('')
        setContrasenia('')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log("Acceso denegado")

        switch (errorCode) {
          case 'auth/missing-password':
            Alert.alert('Error', 'No puede ingresar una contraseña en blanco')
            break
          case 'auth/wrong-password':
            Alert.alert('Error', 'Error en las credenciales')
            break
          default:
            Alert.alert('Error', 'Comuniquese con el admin')
            console.log(errorCode)
            console.log(errorMessage)
            break
        }
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder='Ingrese email'
        onChangeText={(texto) => setCorreo(texto)}
      />

      <TextInput
        style={styles.input}
        placeholder='Ingrese su contraseña'
        onChangeText={(texto) => setContrasenia(texto)}
        secureTextEntry={true}
      />

      <Button
        title='Ingresar'
        onPress={login}
      />

      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Registro')}>
        Regístrate aquí
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    height: 40,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: '#000',
    color: '#fff',
    height: 40,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  link: {
    color: '#000',
    fontWeight: 'bold',
  },
})
