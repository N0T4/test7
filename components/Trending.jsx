import { View, Text, FlatList } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';

const TrendingItem = () =>{
  return(
    <Animatable.Vie>
      
    </Animatable.Vie>
  )
}

const Trending = ({ posts }) => {
  return (
    <FlatList
      data={posts || []} // Запобігає 'undefined' помилкам
      keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())} // ✅ Фікс
      horizontal
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">{item.id}</Text>
      )}
    />
  )
}

export default Trending
