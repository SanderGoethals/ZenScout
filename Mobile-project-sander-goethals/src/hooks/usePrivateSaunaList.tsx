import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export const usePrivateSaunaList = () => {
  return useQuery({
    queryKey: ["sauna-list"],
    queryFn: async () => {
      const { data } = await api.get<PrivateSauna[]>("/prive-sauna.json");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};