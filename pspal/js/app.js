 // Import the functions you need from the SDKs you need
 
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
 import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";


 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyCjmwTNv9_Ip9WrVhQfSsZ900U0W90yJdo",
   authDomain: "paedisurg-pal.firebaseapp.com",
   databaseURL: "https://paedisurg-pal-default-rtdb.europe-west1.firebasedatabase.app/",
   projectId: "paedisurg-pal",
   storageBucket: "paedisurg-pal.appspot.com",
   messagingSenderId: "499839800802",
   appId: "1:499839800802:web:785b800efdea49ef8615bb",
   measurementId: "G-4P4SFKVZ7B"
 };

   // Initialize Firebase
   const app = initializeApp(firebaseConfig);
   // const analytics = getAnalytics(app);
   const database = getDatabase(app)

   const dbRef = firebase.database().ref(); 
const usersRef = dbRef.child(‘users’);