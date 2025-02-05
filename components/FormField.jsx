import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';

const FormField = ({ title, value, placeholder, handleChangeText, otherStyle, ...props }) => {
    const [showPassword, setShowPassword] = useState(false); // Виправлено `setshowPassword`
    const [isFocused, setIsFocused] = useState(false); // Додаємо стейт для фокусу

    return (
        <View className={`space-y-2 ${otherStyle}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

            {/* Контейнер з динамічною зміною бордера при фокусі */}
            <View className={`border-2 w-full h-16 px-4 bg-black-100 rounded-2xl items-center 
                ${isFocused ? 'border-secondary-100' : 'border-black-200'} flex-row`}>

                <TextInput
                    className="flex-1 text-white text-base font-psemibold"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText} // Виправлено `handelChangeText`
                    secureTextEntry={title === 'Password' && !showPassword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
                {title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image 
                        source={!showPassword ? icons.eye : icons.eyeHide}
                        className='w-6 h-6'
                        resizeMethod='contain'
                        />
                    </TouchableOpacity>
                )}
                
            </View>
        </View>
    );
};

export default FormField;
