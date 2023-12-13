import { Button, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'

//Image
import * as ImagePicker from 'expo-image-picker';


export default function GeneralScreen() {

  const [image, setImage] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <Text>Cargar una imagen desde la cámara</Text>
      <Button title='Cámara' onPress={()=> pickImage()}/>
      <Image source={{ uri: image }} style={styles.img} />
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