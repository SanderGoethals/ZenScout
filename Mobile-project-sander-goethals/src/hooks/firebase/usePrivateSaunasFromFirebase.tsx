import { useQuery } from "@tanstack/react-query";
import { getAllPrivateSaunas } from "../../services/priveSauna.service";

export const usePrivateSaunasFromFirebase = () => {
  return useQuery({
    queryKey: ["Privé sauna-firebase"],
    queryFn: getAllPrivateSaunas,
    staleTime: 1000 * 60 * 5,
  });
};
