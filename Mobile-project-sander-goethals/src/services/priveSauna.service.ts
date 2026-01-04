import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const getAllPrivateSaunas = async (): Promise<SpaBase[]> => {
  const snapshot = await getDocs(collection(db, "Privé sauna"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<SpaBase, "id">),
  }));
};

export const getPrivateSaunaByProvince = async (
  province: string
): Promise<SpaBase[]> => {
  const q = query(
    collection(db, "Privé sauna"),
    where("province", "==", province)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<SpaBase, "id">),
  }));
};
