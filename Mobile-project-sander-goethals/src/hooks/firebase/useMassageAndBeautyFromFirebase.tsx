import { useQuery } from "@tanstack/react-query";
import { getAllMassageAndBeauty } from "../../services/massageAndBeauty.service";

export const useMassageAndBeautyFromFirebase = () => {
  return useQuery({
    queryKey: ["Beauty & Massage-firebase"],
    queryFn: getAllMassageAndBeauty,
    staleTime: 1000 * 60 * 5,
  });
};
