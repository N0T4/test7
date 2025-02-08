import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'

const SingIn = () => {
  const [form, setform] = useState({
    email:'',
    password:''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit =() =>{

  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='h-[83vh] w-full justify-center px-4 my-6'>
          <Image 
            source={images.logo} 
            resizeMethod='contain'
            className='w-[115px] h-[35px]'
            />

          <Text
            className='font-psemibold mt-10 text-white text-2xl'
          >Sing in</Text>
          <FormField 
            title='Email'
            value={form.email}
            handleChangeText={(e) => setform({ ...form, email: e })}
            otherStyle='mt-7'
            keyboardType='email-address'
          />
          <FormField 
            title='Password'
            value={form.password}
            handleChangeText={(e) => setform({ ...form, password: e })}
            otherStyle='mt-7'
            keyboardType='password'
          />
          <CustomButton
            title="Sign in"
            handelPress={submit}
            containerStyles="mt-7"
            isLoading = {isSubmitting}
          />
          <View className="justify-center flex-row pt-5 gap-2">
              <Text className='text-gray-100 text-lg font-pregular'>
              Don’t have an account?
              </Text>
              <Link href='/sing-up' className='text-secondary-100 text-lg font-pregular'>Sign up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SingIn