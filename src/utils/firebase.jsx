import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

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

const provider = new GoogleAuthProvider();

export const loginGoogle = async () => {
  const newProvider = provider;
  const newAuth = auth;
  try {
    const data = await signInWithPopup(newAuth, newProvider);
    const credential = GoogleAuthProvider.credentialFromResult(data);
    const token = credential.accessToken;
    const user = data.user;
    if (user) {
      return { user };
    }
  } catch (error) {
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(credential);
  }
};
