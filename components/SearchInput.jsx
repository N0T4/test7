import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyle ,secureTextEntry, ...props }) => {
    const [showPassword, setShowPassword] = useState(false); // Виправлено `setshowPassword`
    const [isFocused, setIsFocused] = useState(false); // Додаємо стейт для фокусу

    return (

            <View className={`border-2 w-full h-16 px-4 bg-black-100 rounded-2xl items-center 
                ${isFocused ? 'border-secondary-100' : 'border-black-200'} flex-row`}>

                <TextInput
                    className="text-base mt-0.5 text-white flex-1 font-pregular"
                    value={value}
                    placeholder="Search for a video topic"
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText} // Виправлено `handelChangeText`
                    secureTextEntry={title === 'Password' && !showPassword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
                <TouchableOpacity>
                    <Image 
                        source={icons.search}
                        className="w-5 h-5"
                        resizeMode='containe'
                    />
                </TouchableOpacity>
                
            </View>
    );
};

export default SearchInput;
