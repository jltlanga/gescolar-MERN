import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyBVVH6Tf8PfWdenMuiG08nhjBBWneWQ-Wo",
    authDomain: "react-stdnt.firebaseapp.com",
    projectId: "react-stdnt",
    storageBucket: "react-stdnt.appspot.com",
    messagingSenderId: "599764574436",
    appId: "1:599764574436:web:0f3da5d6145b21eae68cf1",
    measurementId: "G-128F3Y2SYQ"
  };

  const firebaseDB = firebase.initializeApp(firebaseConfig)


  export default firebaseDB.database().ref();