import React, { FC, useState } from "react";
import { View, Image, FlatList, StyleSheet } from "react-native";
import { ImageCarouselProps } from "./types";

const BORDER_RADIUS = 12;

const ImageCarousel: FC<ImageCarouselProps> = ({
  images,
  rounded = false,
}) => {
  const [containerWidth, setContainerWidth] = useState(0);

  return (
    <View
      style={[
        styles.container,
        rounded && styles.rounded,
      ]}
      onLayout={(e) => {
        setContainerWidth(e.nativeEvent.layout.width);
      }}
    >
      {containerWidth > 0 && (
        <FlatList
          data={images}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          snapToInterval={containerWidth + 1}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.src }}
              style={{
                width: containerWidth + 1,
              }}
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
    width: "100%",
    height: 200,
    overflow: "hidden",
  },
  rounded: {
    borderRadius: BORDER_RADIUS,
  },
});

export default ImageCarousel;
