import { addDoc, collection, serverTimestamp, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { CreateReviewInput } from "./types";

export const createReview = async ({
  spaId,
  comment,
  rating,
}: CreateReviewInput) => {
  const uid = auth.currentUser!.uid;

  const userSnap = await getDoc(doc(db, "users", uid));

  if (!userSnap.exists()) {
    throw new Error("User profile not found");
  }

  const { nickname } = userSnap.data();

  if (!nickname) {
    throw new Error("User nickname missing");
  }

  await addDoc(collection(db, "reviews"), {
    spaId,
    uid,
    nickname,
    comment,
    rating,
    createdAt: serverTimestamp(),
  });
};

