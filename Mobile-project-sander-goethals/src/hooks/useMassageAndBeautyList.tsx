
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export const useMassageAndBeautyList = () => {
  return useQuery({
    queryKey: ["massage-and-beauty-list"],
    queryFn: async () => {
      const { data } = await api.get<MassageAndBeauty[]>("/massage.json");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};