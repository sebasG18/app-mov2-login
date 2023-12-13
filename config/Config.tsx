import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";

///SOLUCIÓN DE WARNING
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCsynZepPniUAWQsOwP5YLEuiV8jUKZxc",
  authDomain: "app-login-13c72.firebaseapp.com",
  databaseURL: "https://app-login-13c72-default-rtdb.firebaseio.com",
  projectId: "app-login-13c72",
  storageBucket: "app-login-13c72.appspot.com",
  messagingSenderId: "580578977514",
  appId: "1:580578977514:web:ff2b60bb96051c8b9e1993"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const auth = getAuth(app)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const storage = getStorage(app)
