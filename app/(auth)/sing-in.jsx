import { View, Text, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { signIn } from '../../lib/appwrite';

const SingIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="h-[83vh] w-full justify-center px-4 my-6">
          <Image source={images.logo} resizeMethod="contain" className="w-[115px] h-[35px]" />

          <Text className="font-psemibold mt-10 text-white text-2xl">Sign in</Text>

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
            secureTextEntry
          />

          <CustomButton title="Sign in" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />

          <View className="justify-center flex-row pt-5 gap-2">
            <Text className="text-gray-100 text-lg font-pregular">Don’t have an account?</Text>
            <Link href="/sing-up" className="text-secondary-100 text-lg font-pregular">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingIn;
