// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD9hv4DsxaUZdCmA5jg1RDxx8RXqEPvQD4",
    authDomain: "mini-project-f9f87.firebaseapp.com",
    projectId: "mini-project-f9f87",
    storageBucket: "mini-project-f9f87.appspot.com",
    messagingSenderId: "1000827436863",
    appId: "1:1000827436863:web:33ef2717d7fb84b48f9d8a",
    measurementId: "G-D24DQDNMGQ"
};

export async function handleUploadClick(file) {
    if (file) {
        firebase.initializeApp(firebaseConfig);
        const storageRef = await firebase.storage().ref();
        const fileRef = await storageRef.child(file.name);
        await fileRef.put(file);
      const downloadUrl = await fileRef.getDownloadURL();
      console.log('Download URL:', downloadUrl);
      return downloadUrl;
    }
};

export async function handleUploadsClick(file) {
    if (file) {
        firebase.initializeApp(firebaseConfig);
        const storageRef = await firebase.storage().ref();
        const fileRef = await storageRef.child(file.name);
        await fileRef.put(file);
      const downloadUrl = await fileRef.getDownloadURL();
      console.log('Download URL:', downloadUrl);
      return downloadUrl;
    }
};