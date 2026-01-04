// import { useWellnessList } from "../../hooks/useWellnessList";
import { useMassageAndBeautyList } from "../../hooks/useMassageAndBeautyList";
import { usePrivateSaunaList } from "../../hooks/usePrivateSaunaList";
import { usePublicSaunaList } from "../../hooks/usePublicSaunaList";
import { syncMassageAndBeautyToFirestore, syncPrivateSaunaToFirestore, syncPublicSaunaToFirestore, syncWellnessToFirestore } from "./syncWellnessToFirestore";

export const useSyncWellness = () => {
  const query = useMassageAndBeautyList();

  const sync = async () => {
    if (!query.data) {
      throw new Error("Geen wellness data beschikbaar");
    }

    await syncMassageAndBeautyToFirestore(query.data);
  };

  return {
    ...query,
    sync,
  };
};
