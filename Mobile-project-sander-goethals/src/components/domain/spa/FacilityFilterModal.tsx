import React, { useState } from "react";
import {
  Modal,
  View,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import TextMarkup from "../../ui/TextMarkup";
import { FACILITIES } from "../../../constants/facilities";

interface Props {
  visible: boolean;
  selected: string[];
  onApply: (facilities: string[]) => void;
  onClose: () => void;
}

const FacilityFilterModal = ({
  visible,
  selected,
  onApply,
  onClose,
}: Props) => {
  const [search, setSearch] = useState("");
  const [localSelection, setLocalSelection] = useState<string[]>(selected);

  const filtered = FACILITIES.filter((f) =>
    f.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (facility: string) => {
    setLocalSelection((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <TextInput
            placeholder="Zoek faciliteit..."
            value={search}
            onChangeText={setSearch}
            style={styles.search}
          />

          <FlatList
            data={filtered}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const active = localSelection.includes(item);

              return (
                <Pressable
                  onPress={() => toggle(item)}
                  style={[
                    styles.item,
                    active && styles.itemActive,
                  ]}
                >
                  <TextMarkup
                    variant={active ? "extraBold" : "semiBold"}
                  >
                    {item}
                  </TextMarkup>
                </Pressable>
              );
            }}
          />

          <View style={styles.actions}>
            <Pressable onPress={() => setLocalSelection([])}>
              <TextMarkup>Reset</TextMarkup>
            </Pressable>

            <Pressable
              onPress={() => {
                onApply(localSelection);
                onClose();
              }}
            >
              <TextMarkup variant="extraBold">
                Toepassen ({localSelection.length})
              </TextMarkup>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default FacilityFilterModal;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  search: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  item: {
    paddingVertical: 10,
  },
  itemActive: {
    backgroundColor: "#E6EAEA",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },

  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    height: "70%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
});
