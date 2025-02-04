import {TouchableOpacity, Text} from 'react-native'
import React from 'react'

const customButton = ({title, handlePres, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
        onPress={handlePres}
        activeOpacity={0.7}
        className={`bg-secondary-100 rounded-xl min-h-[61px] justify-center items-center ${containerStyles}  ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
    >
        <Text
            className={`text-primary font-semibold text-lg ${textStyles}`}
        >
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default customButton