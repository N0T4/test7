import { Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View className='flex-1 items-center justify-center bg'>
      <Text className='text-2xl font-pblack' >Aora!</Text>
      <Link href='/home' style={{color: 'red'}}>Go to home</Link>
    </View>
  )
}

export default index
