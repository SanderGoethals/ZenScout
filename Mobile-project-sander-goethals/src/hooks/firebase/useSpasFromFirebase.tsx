import { useQuery } from "@tanstack/react-query";
import { getSpasByCategoryAndProvince } from "../../services/spa.service";
import { SpaCategory } from "../../constants/categories";

export const useSpas = (
  category: SpaCategory,
  province?: string
) => {
  return useQuery({
    queryKey: ["spas", category, province],
    queryFn: () =>
      getSpasByCategoryAndProvince(category, province),
    staleTime: 1000 * 60 * 5,
  });
};
