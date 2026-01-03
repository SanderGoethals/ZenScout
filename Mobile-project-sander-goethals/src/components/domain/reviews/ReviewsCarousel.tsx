import React, { FC, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

import { getReviewsBySpaId, getReviewsByUserId } from "../../../services/reviews.service";
import { Review } from "./review.types";
import GlassDisplay from "../../ui/GlassDisplay";
import RatingStars from "../../ui/RatingStars";
import TextMarkup from "../../ui/TextMarkup";
import { ShowReviewsProps } from "./review.types";

const { width } = Dimensions.get("window");

const COMMENT_HEIGHT = 120;

const ShowReviews: FC<ShowReviewsProps> = ({ spaId, userId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems?.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let data: Review[] = [];

        if (userId) {
          data = await getReviewsByUserId(userId);
        } else if (spaId) {
          data = await getReviewsBySpaId(spaId);
        }

        setReviews(data);
      } catch (error) {
        console.log(error);
        setError("Reviews konden niet geladen worden.");
      }
    };

    fetchReviews();
  }, [spaId, userId]);

  if (reviews.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        snapToAlignment="center"
        decelerationRate="fast"
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <GlassDisplay title={item.nickname}>
              <View style={styles.ratingRow}>
                <RatingStars score={Number(item.rating)} size={22} />
              </View>

              <GlassDisplay containerStyle={{backgroundColor: "rgba(255, 255, 255, 0.7)", borderRadius: 16}}>
                <View style={styles.commentFixedHeight}>
                  <ScrollView
                    showsVerticalScrollIndicator
                    nestedScrollEnabled
                  >
                    <TextMarkup style={styles.commentText}>
                      {item.comment}
                    </TextMarkup>
                  </ScrollView>
                </View>
              </GlassDisplay>
            </GlassDisplay>
          </View>
        )}
      />

      <View style={styles.dotsContainer}>
        {reviews.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ShowReviews;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  center: {
    padding: 16,
    alignItems: "center",
  },
  slide: {
    width,
    paddingHorizontal: 16,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -20,
    marginBottom: 8,
  },
  commentFixedHeight: {
    height: COMMENT_HEIGHT,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#2F3E3E",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#333",
  },
});
