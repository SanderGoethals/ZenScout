import React from "react";
import { View, Image, FlatList, Dimensions, StyleSheet } from "react-native";

interface ImageCarouselProps {
  images: { src: string; alt?: string }[];
  height?: number;
}

const { width } = Dimensions.get("window");

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, height = 250 }) => {
  return (
    <View style={{ height }}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.src }}
            style={[styles.image, { height }]}
            resizeMode="cover"
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width,
  },
});