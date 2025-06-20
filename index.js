// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsxb83oaivbBX6czviOI_jgZ4t-mralpk",
  authDomain: "aqua-guardian-kilimani.firebaseapp.com",
  databaseURL: "https://aqua-guardian-kilimani-default-rtdb.firebaseio.com",
  projectId: "aqua-guardian-kilimani",
  storageBucket: "aqua-guardian-kilimani.appspot.com",
  messagingSenderId: "61123389210",
  appId: "1:61123389210:web:7a3493f969418ce229aea3",
  measurementId: "G-08HCWHFSGK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);