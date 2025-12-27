import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { RegisterUserInput, LoginUserInput } from "./types";

export const registerUser = async ({ email, password }: RegisterUserInput) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const uid = userCredential.user.uid;

  await setDoc(doc(db, "users", uid), {
    email,
    nickname: email.split("@")[0],
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return userCredential.user;
};

export const loginUser = async ({
  email,
 password,
}: LoginUserInput) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
};