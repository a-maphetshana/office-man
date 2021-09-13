import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDlQVztEjmfvYAWf81AcS3_7CaQINyPxgk",
  authDomain: "office-man-anele.firebaseapp.com",
  databaseURL:"https://office-man-anele-default-rtdb.firebaseio.com/",
  projectId: "office-man-anele",
  storageBucket: "office-man-anele.appspot.com",
  messagingSenderId: "367195057993",
  appId: "1:367195057993:web:5d56a95dcdaa1e25ce3498"
};

export const app = initializeApp(firebaseConfig);