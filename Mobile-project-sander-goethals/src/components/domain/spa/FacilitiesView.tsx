import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import TextMarkup from '../../ui/TextMarkup'
import { FacilitiesViewProps } from './spa.types'

const FacilitiesView: FC<FacilitiesViewProps> = ({ facilities }) => {
  if (!facilities || facilities.length === 0) {
    return null
  }

  return (
    <View style={styles.container}>

      <View style={styles.flexContainer}>
        {facilities.map((facility, index) => (
          <View key={`${facility}-${index}`} style={styles.card}>
            <TextMarkup style={styles.cardText}>{facility}</TextMarkup>
          </View>
        ))}
      </View>
    </View>
  )
}

export default FacilitiesView

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    marginHorizontal: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 14,
    color: '#111827',
  },

  flexContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },

  card: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },

    elevation: 4,
  },

  cardText: {
    fontSize: 15,
    fontWeight: "bold",
    color: '#374151',
  },
})
