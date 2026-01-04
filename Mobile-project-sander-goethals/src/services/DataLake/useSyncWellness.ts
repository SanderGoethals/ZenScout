import { useWellnessList } from "../../hooks/api/useWellnessList";
import { useMassageAndBeautyList } from "../../hooks/api/useMassageAndBeautyList";
import { usePrivateSaunaList } from "../../hooks/api/usePrivateSaunaList";
import { usePublicSaunaList } from "../../hooks/api/usePublicSaunaList";
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
