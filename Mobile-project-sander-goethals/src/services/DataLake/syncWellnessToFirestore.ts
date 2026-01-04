import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "../../config/firebase";

export const syncWellnessToFirestore = async (list: SpaBase[]) => {
  const batch = writeBatch(db);

  list.forEach((spa) => {
    const ref = doc(collection(db, "Wellness overnachting"), spa.id);
    batch.set(ref, spa, { merge: true });
  });

  await batch.commit();
};

export const syncPrivateSaunaToFirestore = async (list: SpaBase[]) => {
  const batch = writeBatch(db);

  list.forEach((spa) => {
    const ref = doc(collection(db, "Privé sauna"), spa.id);
    batch.set(ref, spa, { merge: true });
  });

  await batch.commit();
};

export const syncPublicSaunaToFirestore = async (list: SpaBase[]) => {
  const batch = writeBatch(db);

  list.forEach((spa) => {
    const ref = doc(collection(db, "Publieke sauna"), spa.id);
    batch.set(ref, spa, { merge: true });
  });

  await batch.commit();
};

export const syncMassageAndBeautyToFirestore = async (list: SpaBase[]) => {
  const batch = writeBatch(db);

  list.forEach((spa) => {
    const ref = doc(collection(db, "Beauty & Massage"), spa.id);
    batch.set(ref, spa, { merge: true });
  });

  await batch.commit();
};