import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const getAllPublicSaunas = async (): Promise<SpaBase[]> => {
  const snapshot = await getDocs(collection(db, "Publieke sauna"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<SpaBase, "id">),
  }));
};

export const getPublicSaunaByProvince = async (
  province: string
): Promise<SpaBase[]> => {
  const q = query(
    collection(db, "Publieke sauna"),
    where("province", "==", province)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<SpaBase, "id">),
  }));
};
