import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { icons } from '../constants';

const VideoCard = ({ video }) => {
  // Перевірка, чи є creator
  const { title, thumbnail, video: videoUrl, creator } = video || {};
  const { username, avatar } = creator || {};

  const [play, setPlay] = useState(false)

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-start flex-row flex-1">
          <View className="w-[46px] h-[46px] border border-secondary justify-center items-start px-0.5 rounded-xl">
            {avatar ? (
              <Image
                source={{ uri: avatar }}
                className="w-full h-full rounded-xl"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-white">No Avatar</Text> // Placeholder, якщо немає аватарки
            )}
          </View>
          <View className="justify-center items-start gap-y-2 flex-1 ml-3">
            <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
            <Text className="text-xs text-green-100 font-pregular">{username}</Text>
          </View>
        </View>

        <View className='pt-2'>
            <Image 
                source={icons.menu}
                className='w-5 h-5'
                resizeMode='contain'
            />
        </View>
      </View>
    
    {play ? (
        <Text className='text-white'>Playing</Text>
    ) : ( 
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
            className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
        >
        <Image 
            source={{uri: thumbnail}}
            className="w-full h-full rounded-xl mt-3"
            resizeMethod='contain'
        />
        <Image 
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
        />
        </TouchableOpacity>
    )}


    </View>
  )
}

export default VideoCard
