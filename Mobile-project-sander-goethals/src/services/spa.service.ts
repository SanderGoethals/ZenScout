import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { SpaCategory, CATEGORY_COLLECTION_MAP } from "../constants/categories";

export const getSpasByCategoryAndProvince = async (
  category: SpaCategory,
  province?: string
): Promise<SpaBase[]> => {
  const collectionName = CATEGORY_COLLECTION_MAP[category];

  const q = province
    ? query(
        collection(db, collectionName),
        where("province", "==", province)
      )
    : query(collection(db, collectionName));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<SpaBase, "id">),
  }));
};
