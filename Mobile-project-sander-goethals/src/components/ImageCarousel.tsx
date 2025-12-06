import React, { FC, useState } from "react";
import { View, Image, FlatList, StyleSheet } from "react-native";
import { ImageCarouselProps } from "./types";

const ImageCarousel: FC<ImageCarouselProps> = ({ images, height = 250 }) => {
  const [containerWidth, setContainerWidth] = useState(0);

  return (
    <View
      style={[styles.container, { height }]}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        setContainerWidth(w);
      }}
    >
      {containerWidth > 0 && (
        <FlatList
          data={images}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          snapToInterval={containerWidth + 1}   // ← belangrijk
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.src }}
              style={{ width: containerWidth + 1, height }}   // ← fix
              resizeMode="cover"
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
  },
});

export default ImageCarousel;
