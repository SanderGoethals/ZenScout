
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export const usePublicSaunaList = () => {
  return useQuery({
    queryKey: ["public-sauna-list"],
    queryFn: async () => {
      const { data } = await api.get<PublicSauna[]>("/publieke-sauna.json");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};