import React, { FC, useRef, useState } from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

interface ImageItem {
  src: string;
}

export interface ImageCarouselProps {
  images: ImageItem[];
  height: number;
  rounded?: boolean;
  showThumbnails?: boolean;
  thumbnailHeight?: number;
}

const BORDER_RADIUS = 12;

const ImageCarousel: FC<ImageCarouselProps> = ({
  images,
  height,
  rounded = false,
  showThumbnails = false,
  thumbnailHeight = 52,
}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const mainListRef = useRef<FlatList>(null);
  const thumbListRef = useRef<FlatList>(null);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(
      e.nativeEvent.contentOffset.x / containerWidth
    );
    setActiveIndex(index);

    if (showThumbnails) {
      thumbListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  const onThumbnailPress = (index: number) => {
    setActiveIndex(index);
    mainListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  return (
    <View
      style={[
        styles.root,
        { height },
        rounded && styles.rounded,
      ]}
      onLayout={(e) =>
        setContainerWidth(e.nativeEvent.layout.width)
      }
    >
      {containerWidth > 0 && (
        <FlatList
          ref={mainListRef}
          data={images}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          snapToInterval={containerWidth}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.src }}
              style={{
                width: containerWidth,
                height,
              }}
              resizeMode="cover"
            />
          )}
        />
      )}

      {/* ZWEVENDE THUMBNAILS */}
      {showThumbnails && (
        <View style={styles.thumbnailOverlay}>
          <FlatList
            ref={thumbListRef}
            data={images}
            keyExtractor={(_, index) => `thumb-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailList}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => onThumbnailPress(index)}
                activeOpacity={0.85}
              >
                <Image
                  source={{ uri: item.src }}
                  style={[
                    styles.thumbnail,
                    {
                      width: thumbnailHeight,
                      height: thumbnailHeight,
                    },
                    index === activeIndex &&
                      styles.thumbnailActive,
                  ]}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    overflow: 'hidden',
  },
  rounded: {
    borderRadius: BORDER_RADIUS,
  },

  /* Thumbnail overlay */
  thumbnailOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    paddingVertical: 8,
  },
  thumbnailList: {
    paddingHorizontal: 12,
    gap: 10,
  },
  thumbnail: {
    borderRadius: 8,
    opacity: 0.7,
  },
  thumbnailActive: {
    opacity: 1,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});

export default ImageCarousel;
