import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";// Переконайся, що у constants.js всі require()

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className='items-center justify-center gap-1 pt-4'>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
  className={focused ? "font-psemibold" && "text-xs" : "font-pregular" && "text-xs"}
  style={{ color: focused ? "#FF9C01" : "#CDCDE0" }}
>
  {name}
</Text>

    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
     
        className='mt-4'
        screenOptions={{
            tabBarShowLabel : false,
            tabBarActiveTintColor : "#FF9C01",
            tabBarInactiveTintColor : "#CDCDE0",
            tabBarStyle :{
                backgroundColor : "#161622",
                borderTopWidth : 1,
                borderTopColor : "#232533"
            }
          
        }}
        
    >
        <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
             icon={icons.home} 
             color={color} 
             name="Home" 
             focused={focused} 
            />
          ),
        }}
      />
          <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
             icon={icons.bookmark} 
             color={color} 
             name="Saved" 
             focused={focused} 
            />
          ),
        }}
        />
        <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
             icon={icons.plus} 
             color={color} 
             name="Create" 
             focused={focused} 
            />
          ),
        }}
        />
         <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
             icon={icons.profile} 
             color={color} 
             name="Profile" 
             focused={focused} 
            />
          ),
        }}
        />
    </Tabs>
    
  );
};

export default TabsLayout;
