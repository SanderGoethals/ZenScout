import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const getAllMassageAndBeauty = async (): Promise<SpaBase[]> => {
  const snapshot = await getDocs(collection(db, "Beauty & Massage"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<SpaBase, "id">),
  }));
};

export const getMassageAndBeautyByProvince = async (
  province: string
): Promise<SpaBase[]> => {
  const q = query(
    collection(db, "Beauty & Massage"),
    where("province", "==", province)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<SpaBase, "id">),
  }));
};
