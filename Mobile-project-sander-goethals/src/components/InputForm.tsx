import React, { FC, useState } from 'react'
import { StyleSheet, TextInput, View} from 'react-native'
import { FormInputProps } from './types'

const InputForm: FC<FormInputProps> = ({
  containerStyle,
  inputStyle,
  multiline = false,
  error,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          inputStyle,
        ]}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...props}
      />
    </View>
  )
}

export default InputForm

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  multiline: {
    minHeight: 120,
    paddingVertical: 12,
  },
})

