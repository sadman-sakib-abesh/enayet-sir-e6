import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
const config={
    apiKey: "AIzaSyBEnR7peh_WfZ2joRuKj1auOQMDSuCu1mY",
  authDomain: "enayetsir-68175.firebaseapp.com",
  projectId: "enayetsir-68175",
  storageBucket: "enayetsir-68175.appspot.com",
  messagingSenderId: "510823902219",
  appId: "1:510823902219:web:5143364a5ad4ffa6352b0e",
  measurementId: "G-HQMJWKC8PB"
 }




const app=firebase.initializeApp(
    config
);


  const db=app.firestore();
  const auth=app.auth();
  const storage=app.storage();

  export {db,auth,storage} 