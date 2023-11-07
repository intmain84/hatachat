// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBkt-34y0A72bJb9OejVrwZAGFJfUYIij8',
  authDomain: 'hatachat-c18bc.firebaseapp.com',
  projectId: 'hatachat-c18bc',
  storageBucket: 'hatachat-c18bc.appspot.com',
  messagingSenderId: '376064052521',
  appId: '1:376064052521:web:ff5277cffe79c6c5647b38'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
