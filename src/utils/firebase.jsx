import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0xMAV8-6jE7jXV0MBEsFktX72a3R14x8",
  authDomain: "fikiral-9cf92.firebaseapp.com",
  projectId: "fikiral-9cf92",
  storageBucket: "fikiral-9cf92.appspot.com",
  messagingSenderId: "237897805135",
  appId: "1:237897805135:web:a9dc2151a6ff878fd1693a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// with google

export const loginGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, provider);
    const user = data.user;
    if (user) {
      return { user };
    }
  } catch (error) {
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(credential);
  }
};

// with facebook

export const loginFacebook = async () => {
  try {
    const providerFB = new FacebookAuthProvider();
    const data = await signInWithPopup(auth, providerFB);
    if (data) {
      return data;
    }
  } catch (error) {
    if (error.code === "auth/account-exists-with-different-credential") {
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(credential);
    }
  }
};
