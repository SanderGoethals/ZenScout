import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { CreateReviewInput } from "./types";

export const fetchReviewsBySpa = async (spaId: string) => {
  const q = query(
    collection(db, "reviews"),
    where("spaId", "==", spaId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const createReview = async (
  input: CreateReviewInput,
  userId: string
) => {
  return addDoc(collection(db, "reviews"), {
    spaId: input.spaId,
    userId,
    rating: input.rating,
    comment: input.comment,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
