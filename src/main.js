import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { MotionPlugin } from '@vueuse/motion'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWyeORNMSa8UonkzxzuTwyM8OruTDfS-o",
  authDomain: "login-and-register-page-cd6a3.firebaseapp.com",
  projectId: "login-and-register-page-cd6a3",
  storageBucket: "login-and-register-page-cd6a3.appspot.com",
  messagingSenderId: "486580249686",
  appId: "1:486580249686:web:5498df45775448f9f507f7"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).use(router).use(MotionPlugin).mount('#app')
