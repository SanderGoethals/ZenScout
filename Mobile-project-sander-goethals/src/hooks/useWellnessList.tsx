import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export const useWellnessList = () => {
  return useQuery({
    queryKey: ["wellness-list"],
    queryFn: async () => {
      const { data } = await api.get<Wellness[]>("/wellness.json");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

// export const useMassageList = () => {
//   return useQuery({
//     queryKey: ["massage-list"],
//     queryFn: async () => {
//       const { data } = await api.get<Massage[]>("/massage.json");
//       return data;
//     },
//     staleTime: 1000 * 60 * 5,
//   });
// };

// export const usePrivateSaunaList = () => {
//   return useQuery({
//     queryKey: ["sauna-list"],
//     queryFn: async () => {
//       const { data } = await api.get<PrivateSauna[]>("/prive-sauna.json");
//       return data;
//     },
//     staleTime: 1000 * 60 * 5,
//   });
// };

// export const usePublicSaunaList = () => {
//   return useQuery({
//     queryKey: ["public-sauna-list"],
//     queryFn: async () => {
//       const { data } = await api.get<PublicSauna[]>("/publieke-sauna.json");
//       return data;
//     },
//     staleTime: 1000 * 60 * 5,
//   });
// };