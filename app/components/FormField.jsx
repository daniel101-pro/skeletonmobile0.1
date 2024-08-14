import { View, Text } from 'react-native'
import React from 'react'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-white font-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100">

      </View>
    </View>
  )
}

export default FormField