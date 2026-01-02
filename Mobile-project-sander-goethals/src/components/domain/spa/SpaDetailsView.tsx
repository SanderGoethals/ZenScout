import React, { FC, useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
  Text,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useHeaderHeight } from '@react-navigation/elements'

import ImageCarousel from '../../ui/ImageCarousel'
import RatingStars from '../../ui/RatingStars'
import SocialIconProps from '../../ui/SocialsIcon'
import FacilitiesCollapsible from './FacilitiesCollapsable'
import { RatingDetailsView } from './RatingDetailsView'
import { DetailProps } from './spa.types'
import { getCategoryColor } from '../../../theme/categoryHelpers'
import TextMarkup from '../../ui/TextMarkup'
import GlassButton from '../../ui/GlassButton'
import AddReview from '../reviews/AddReview'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const SpaDetailsView: FC<DetailProps> = ({
  data: item,
  isFavorite,
  onToggleFavorite,
  category,
}) => {
  const backgroundLight = getCategoryColor(category, 'first')
  const backgroundBase = getCategoryColor(category, 'second')

  const [showRatings, setShowRatings] = useState(false)
  const [showWriteReview, setShowWriteReview] = useState(false);

  const headerHeight = useHeaderHeight()

  const descriptionParts = item.fullDescription
    ? item.fullDescription.split(/\n\s*\n/)
    : []

  return (
    <>
      <StatusBar style="light" translucent />

      <ScrollView
        style={{ backgroundColor: backgroundLight }}
        contentContainerStyle={{ paddingTop: headerHeight }}
        showsVerticalScrollIndicator={false}
      >
        {item.images?.length > 0 && (
          <View style={{ marginTop: -headerHeight }}>
            <ImageCarousel
              images={item.detailImages}
              height={360}
              showThumbnails
            />
          </View>
        )}

        <View
          style={[
            styles.facilitiesBackground,
            { backgroundColor: backgroundBase },
          ]}
        />

        <View style={styles.infoCard}>
          <TextMarkup variant='boldItalic' style={styles.titleText}>
            {item.name}
          </TextMarkup>

          <TouchableOpacity
            onPress={() => setShowRatings(true)}
            activeOpacity={0.8}
          >
            <View style={styles.scoreContainer}>
              <RatingStars score={Number(item.score)} size={32} />
              <TextMarkup variant='boldItalic' style={styles.scoreText}>{item.score}</TextMarkup>
              <TextMarkup variant='boldItalic' style={styles.maxScore}>/10</TextMarkup>
            </View>
          </TouchableOpacity>

          <View style={styles.priceOverlay}>
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
        </View>

        <View style={{ marginTop: 12 }}>
          <FacilitiesCollapsible
            facilities={item.facilities}
            collapsedHeight={160}
            bgColor={backgroundBase}
          />
        </View>

        <View
          style={[
            styles.descriptionContainer,
            { backgroundColor: backgroundBase },
          ]}
        >
          <TextMarkup style={styles.descriptionText}>
            {item.description}
          </TextMarkup>
        </View>

        <View
          style={[
            styles.fullDescriptionContainer,
            { backgroundColor: backgroundBase },
          ]}
        >
          <View style={styles.offerContainer}>
            <MaterialCommunityIcons name="spa" size={32} color="#E89AAE" />
            <TextMarkup variant='extraBold' style={styles.offerTitle}>
              {item.offerTitle}
            </TextMarkup>
            <MaterialCommunityIcons name="spa" size={32} color="#E89AAE" />
          </View>

          {descriptionParts.map((part: string, index: number) => (
            <TextMarkup
              key={index}
              variant={index === 0 ? 'semiBoldItalic' : 'semiBold'}
              style={
                index === 0
                  ? styles.fullDescriptionIntro
                  : styles.fullDescriptionParagraph
              }
            >
              {part.trim()}
            </TextMarkup>
          ))}
        </View>

        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="map-marker"
            size={30}
            color="red"
          />
          <Text style={{ fontSize: 20, fontWeight: '500'}}>
            {item.address}
          </Text>
        </View>

        {item.contact && (
          <View style={styles.socialRow}>
            {item.contact.site && (
              <SocialIconProps
                name="web"
                color="#555"
                url={item.contact.site}
                bgColor={backgroundBase}
              />
            )}

            {item.contact.socials?.facebook && (
              <SocialIconProps
                name="facebook"
                color="#4267B2"
                url={item.contact.socials.facebook}
                bgColor={backgroundBase}
              />
            )}

            {item.contact.socials?.instagram && (
              <SocialIconProps
                name="instagram"
                color="#E1306C"
                url={item.contact.socials.instagram}
                bgColor={backgroundBase}
              />
            )}

            <TouchableOpacity onPress={() => onToggleFavorite(item)}>
              <MaterialCommunityIcons
                style={[
                  styles.favoriteButton,
                  { backgroundColor: backgroundBase },
                ]}
                name={
                  isFavorite
                    ? 'heart-circle'
                    : 'heart-circle-outline'
                }
                color={isFavorite ? '#E0245E' : '#D8A679'}
                size={64}
              />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

    <Modal
      visible={showRatings}
      transparent
      animationType="slide"
      onRequestClose={() => setShowRatings(false)}
    >
      <Pressable
        style={styles.overlay}
        onPress={() => setShowRatings(false)}
      />

      <View style={[styles.modalContainer, {height: SCREEN_HEIGHT * 0.7}]}>
        <View style={styles.sheetHandle} />

        <RatingDetailsView
          data={item}
          evenColor={backgroundLight}
          oddColor={backgroundBase}
        />

        <GlassButton
          title="Beoordeling schrijven"
          onPress={() => setShowWriteReview(true)}
          style={{ marginTop: 50, marginBottom: 50 }}
        />
      </View>
    </Modal>

    <Modal
      visible={showWriteReview}
      transparent
      animationType="slide"
      onRequestClose={() => setShowWriteReview(false)}
    >
      
              <Pressable
        style={styles.overlay}
        onPress={() => setShowWriteReview(false)}
      />
      <View style={[styles.modalContainer, {height: SCREEN_HEIGHT * 0.5}]}>
        <AddReview spaId={item.id} onClose={() => setShowWriteReview(false)} />
      </View>
    </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  infoCard: {
    marginTop: -15,
    marginHorizontal: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
  },
  priceOverlay: {
    position: 'absolute',
    right: -12,
    bottom: -20,
    backgroundColor: '#2E7D32',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 6,
  },
  facilitiesBackground: {
    position: 'absolute',
    top: 360,
    left: 0,
    right: 0,
    height: 300,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 6,
  },
  scoreText: {
    fontSize: 32,
  },
  maxScore: {
    fontSize: 18,
    marginBottom: 4,
    color: '#9CA3AF',
  },
  offerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  offerTitle: {
    fontSize: 26,
    color: '#374151',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    gap: 20,
    paddingTop: 10,
    paddingBottom: 25,
  },
  favoriteButton: {
    borderRadius: 999,
    elevation: 5,
  },
  descriptionContainer: {
    marginTop: 20,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
  },
  descriptionText: {
    fontSize: 18,
    lineHeight: 24,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    elevation: 30,
  },
  sheetHandle: {
    width: 56,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginBottom: 14,
  },
  titleText: {
    fontSize: 34,
    letterSpacing: 1,
    textAlign: 'center',
  },
  priceText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  fullDescriptionContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  fullDescriptionIntro: {
    fontSize: 20,
  },
  fullDescriptionParagraph: {
    fontSize: 18,
    lineHeight: 26,
    color: '#374151',
  },
})
