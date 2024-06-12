
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDRnH9BOSPJ68Vs0OJ_M0uGLoMx_UHSxfU",
  authDomain: "serviciosoft-d7acf.firebaseapp.com",
  projectId: "serviciosoft-d7acf",
  storageBucket: "serviciosoft-d7acf.appspot.com",
  messagingSenderId: "992557852687",
  appId: "1:992557852687:web:9e8791c425d469c8fb9b7a"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);