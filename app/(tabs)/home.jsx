import { View, Text, FlatList,Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import {images} from '../../constants'
import SearchInput from '../../components/SearchInput'

const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={[{id:1},{id:2},{id:3}]}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
        <Text className ="text-3xl text-white">{item.id}</Text>
      )}  
      ListHeaderComponent={()=>(
        <View className="my-6 px-4 space-y-6">
            <View className="justify-between flex-row items-start mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Nota
                </Text>
              </View>
              <View className="mt-1.5">
                <Image 
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='containe'
                />
              </View>
            </View>

            <SearchInput></SearchInput>
        </View>
      )}
      >
      </FlatList>
    </SafeAreaView>
  )
}

export default Home