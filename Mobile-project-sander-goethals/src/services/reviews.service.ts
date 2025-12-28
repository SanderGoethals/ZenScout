import { addDoc, collection, serverTimestamp, getDoc, getDocs, doc, query, orderBy, where, Timestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { CreateReviewInput } from "./types";
import { Review } from "../components/domain/reviews/types";

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

export const getReviewsBySpaId = async (spaId: string) => {
  const reviewsCollection = collection(db, "reviews");
  const reviewsSnap = await getDocs(
    query(reviewsCollection, 
      where("spaId", "==", spaId), 
      orderBy("createdAt", "desc")));

  const reviews = reviewsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Review[];
  return reviews;
};