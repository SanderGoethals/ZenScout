import { useMemo } from "react";

export function useFacilityFilter(
  spas: SpaBase[],
  selectedFacilities: string[]
): SpaBase[] {
  return useMemo(() => {
    if (selectedFacilities.length === 0) {
      return spas;
    }

    return spas.filter((spa) =>
      selectedFacilities.every((facility) =>
        spa.facilities?.includes(facility)
      )
    );
  }, [spas, selectedFacilities]);
}