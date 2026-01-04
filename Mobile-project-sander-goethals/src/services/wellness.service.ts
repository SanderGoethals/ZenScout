import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const getAllWellnesses = async (): Promise<SpaBase[]> => {
  const snapshot = await getDocs(collection(db, "Wellness overnachting"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<SpaBase, "id">),
  }));
};

export const getWellnessByProvince = async (
  province: string
): Promise<SpaBase[]> => {
  const q = query(
    collection(db, "Wellness overnachting"),
    where("province", "==", province)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<SpaBase, "id">),
  }));
};
