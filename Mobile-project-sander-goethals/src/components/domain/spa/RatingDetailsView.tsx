import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { RatingDetailsProps } from './types'

export const RatingDetailsView: FC<RatingDetailsProps> = ({
  data,
  evenColor,
  oddColor,
}) => {
  if (!data?.reviewScores?.length) {
    return <View>
      <Text>No review scores available.</Text>
    </View>}

  return (
    <View style={styles.container}>
      {data.reviewScores.map((data, index) => {
        const backgroundColor = index % 2 === 0 ? evenColor : oddColor

        return (
          <View
            key={`${data.label}-${index}`}
            style={[styles.row, { backgroundColor }]}
          >
            <Text style={styles.label}>{data.label}</Text>

            <View style={styles.scoreContainer}>
              <Text style={styles.score}>{data.score}</Text>
              <Text style={styles.maxScore}>/10</Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937', // donkergrijs, professioneel
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  score: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  maxScore: {
    fontSize: 12,
    marginLeft: 2,
    color: '#6B7280',
  },
})
