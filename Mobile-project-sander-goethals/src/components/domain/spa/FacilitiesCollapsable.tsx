import React, { FC, useRef, useState } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import FacilitiesView from './../spa/FacilitiesView'
import { FacilitiesCollapsibleProps } from './spa.types'

const FacilitiesCollapsible: FC<FacilitiesCollapsibleProps> = ({
  facilities,
  collapsedHeight = 120,
  bgColor,
}) => {
  const [expanded, setExpanded] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const anim = useRef(new Animated.Value(collapsedHeight)).current

  if (!facilities || facilities.length === 0) return null

  const toggle = () => {
    const next = !expanded
    setExpanded(next)

    Animated.timing(anim, {
      toValue: next ? Math.max(contentHeight, collapsedHeight) : collapsedHeight,
      duration: next ? 260 : 220,
      useNativeDriver: false,
    }).start()
  }

  return (
    <Pressable onPress={toggle} style={[styles.outer, { backgroundColor: bgColor }]}>

      {/* Collapsible viewport */}
      <Animated.View style={[styles.viewport,{height: anim, overflow: 'hidden',},]}>
        <View onLayout={(e) => {
            const h = e.nativeEvent.layout.height
            if (h !== contentHeight) {
              setContentHeight(h)
              anim.setValue(collapsedHeight)}
          }}>
          <FacilitiesView facilities={facilities} />
        </View>
      </Animated.View>
    </Pressable>
  )
}

export default FacilitiesCollapsible

const styles = StyleSheet.create({
  outer: {
    marginTop: 18,
    paddingBottom: 14,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FFFFFF',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  chevronWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  
  viewport: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
})