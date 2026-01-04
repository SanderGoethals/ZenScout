import { useSyncWellness } from "./useSyncWellness";
import { View } from "react-native";

import GlassButton from "../../components/ui/GlassButton";
import TextMarkup from "../../components/ui/TextMarkup";

const WellnessAdminSync = () => {
  const { data, isLoading, isError, sync } = useSyncWellness();

  if (isError) return <TextMarkup>Fout bij laden</TextMarkup>;

  return (
    <View>
      <TextMarkup>{data?.length ?? 0} spa items geladen</TextMarkup>

        <GlassButton
          title="Sync spa naar Firebase"
          onPress={sync}
          disabled={isLoading || !data}
        />
    </View>
  );
};

export default WellnessAdminSync;
