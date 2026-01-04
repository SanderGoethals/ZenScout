import { useQuery } from "@tanstack/react-query";
import { getAllPublicSaunas } from "../../services/publicSauna.service";

export const usePublicSaunasFromFirebase = () => {
  return useQuery({
    queryKey: ["Publieke sauna-firebase"],
    queryFn: getAllPublicSaunas,
    staleTime: 1000 * 60 * 5,
  });
};
