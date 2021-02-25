import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
    apiKey: "AIzaSyDU0OmLRmPhjyes8EMJnHVDxo2z-CcV1Cw",
    authDomain: "acumen-c8322.firebaseapp.com",
    projectId: "acumen-c8322",
    storageBucket: "acumen-c8322.appspot.com",
    messagingSenderId: "170397367636",
    appId: "1:170397367636:web:31b2d2b7a8a6eac2655cc1"
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();


