import { Button, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'

//IMAGE
import * as ImagePicker from 'expo-image-picker';

//FIREBASE
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from '../config/Config';

export default function RecursosScreen() {

  const [imagen, setImagen] = useState('')

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [19, 6]
    });

    if (!result.canceled) {
      console.log(result);
      setImagen(result.assets[0].uri)
    } else {
      alert('You did not select any image.');
    }
  };



  async function subir() {
    const storageRef = ref(storage, 'test/imagen');

    const response  =await fetch(imagen)
    const blob =await response.blob();

    try {
      await uploadBytes(storageRef, blob, { contentType:'image/jpg'})
      console.log("La imagen se subió con éxito")

      //Obtiene la URL de la imagen
      const imageURL = await getDownloadURL(storageRef);
      console.log('URL de desacarga de la imagen', imageURL)
      
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <View>
      <Text>Subir imagen desde la Galería</Text>
      <Button title='Seleccionar imagen' onPress={() => pickImageAsync()} />
      <Image source={{ uri: imagen }} style={styles.img} />
      <Button title='Subir' onPress={() => subir()} />
    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 300,
    height: 200,
    alignSelf: 'center'
  }
})