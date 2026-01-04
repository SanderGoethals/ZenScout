import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export const useWellnessList = () => {
  return useQuery({
    queryKey: ["wellness-list"],
    queryFn: async () => {
      const { data } = await api.get<SpaBase[]>("/wellness.json");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
