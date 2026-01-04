import { useQuery } from "@tanstack/react-query";
import { getAllWellnesses } from "../../services/wellness.service";

export const useWellnessFromFirebase = () => {
  return useQuery({
    queryKey: ["Wellness overnachting-firebase"],
    queryFn: getAllWellnesses,
    staleTime: 1000 * 60 * 5,
  });
};
