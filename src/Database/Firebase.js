import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import ErrorMsgAlert from "../Components/MessageAlerts"

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5hJtYm3DjraJFZTgshP7c8Iq72QNunTE",
  authDomain: "deffect-management-application.firebaseapp.com",
  databaseURL: "https://deffect-management-application-default-rtdb.firebaseio.com",
  projectId: "deffect-management-application",
  storageBucket: "deffect-management-application.appspot.com",
  messagingSenderId: "203868602291",
  appId: "1:203868602291:web:4f1c8f1bca298c463115c6",
  measurementId: "G-16SX5XEX9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    
    console.error(err);
    alert(err.message)
   
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};


export {
  auth,
  db,
  signInWithGoogle,
  storage,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};