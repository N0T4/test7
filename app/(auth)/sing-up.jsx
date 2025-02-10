import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
import { createUser } from '../../lib/appwrite'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {
    createUser();
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="h-[83vh] w-full justify-center px-4 my-6">
          <Image 
            source={images.logo} 
            resizeMethod="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="font-psemibold mt-10 text-white text-2xl">Sign up</Text>

          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyle="mt-10"
          />
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyle="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyle="mt-7"
            keyboardType="default"
            secureTextEntry
          />

          <CustomButton
            title="Sign up"
            handlePress={submit}  // ✅ Fix spelling
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center flex-row pt-5 gap-2">
            <Text className="text-gray-100 text-lg font-pregular">
              Already have an account?
            </Text>
            <Link href="/sing-in" className="text-secondary-100 text-lg font-pregular">Login</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
