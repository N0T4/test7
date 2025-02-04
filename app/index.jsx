import { Text, View, SafeAreaView, ScrollView, Image} from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'
import {images} from '../constants'
import CustomButton from "../components/CustomButton";
import { StatusBar } from 'expo-status-bar';





const index = () => {
  return (
      <SafeAreaView className='bg-primary h-full'>
          <ScrollView contentContainerStyle={{height : '100%'}}>
            <View className='w-full min-h-[85vh] justify-center items-center px-4'>

              <Image 
              source={images.logo}
              className='w-[130px] h-[84px]'
              resizeMode='contain'/>

              <Image 
              source={images.cards}
              className='max-w-[380px] w-full h-[300px]'/>

              <View className='relative mt-5 w-[333px]'>
                <Text className='text-3xl text-white font-bold text-center'>Discover Endless Possibilities with<Text className='text-secondary-200'> Aora</Text></Text>
                <Image 
                source={images.path}
                className='w-[136px] h-[15px] absolute -bottom-2 -right-1'
                resizeMode='contain'
                />
              </View>
              <Text
              className='text-sm text-center font-regular text-gray-100 mt-7'
              >
              Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
              </Text>
              <CustomButton 
                title='Continue with Email'
                handlePres={() => router.push('/sing-in.jsx')}
                containerStyles='w-full mt-7'
              />
            </View>
          </ScrollView>
          <StatusBar 
          backgroundColor='#161622'
          style='light'
          />
        </SafeAreaView>
  )
}

export default index
