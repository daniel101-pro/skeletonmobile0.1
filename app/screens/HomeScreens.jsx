import { View, Text, ImageBackground, ScrollView, TextInput, Image, Pressable, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Bell, Search } from 'lucide-react-native'
import AdsBg from '../components/AdsBg'
import Footer from '../components/Footer'
import AddBtn from '../components/AddBtn'
import { useRouter } from "expo-router";

const HomeScreens = () => {
  const router = useRouter()
  const pressed = () => {

  }


  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" translucent={true}/>
      <View className="w-full h-full bg-primary -z-1 flex flex-col items-center justify-center">
      <ImageBackground
          source={require("../../assets/images/Bg.png")}
          contentContainerStyle={{
            width: "100%",
          }}
          className="w-full h-full"
          resizeMode="cover"
        >
            <View className="relative flex flex-row items-center justify-center">
              <Text className="text-white text-[48px] text-center mt-[20px] font-skeletonf">Secret Feed</Text>
              <View className="fixed absolute top-9 right-5">
                <Bell color="white" size={26}/>
              </View>
            </View>
            <View className="flex flex-row items-center justify-center mt-[20px]">
              <View className="flex flex-row items-center justify-between px-5 py-2 border-2 border-white rounded-lg w-[90%]">
                <Search color='gray' size={25}/>
                <TextInput 
                  placeholder='Search for juicy secrets'
                  placeholderTextColor='gray'
                  className="w-[80%] font-skeletonf text-[23px]"
                />
              </View>
            </View>
            
            <ScrollView contentContainerStyle={{
              paddingHorizontal: 5,
              paddingTop: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}>
              {Array(5).fill().map((_, index) => (
                <Pressable
                  key={index}
                  onPress={() => router.push("screens/Comments")}
                  style={({ pressed }) => [
                    { 
                      width: '100%', // Make sure it doesn't stretch full width, and stays centered
                      alignItems: 'center', // Center the content inside Pressable
                    },
                    pressed && { opacity: 0.3 },
                  ]}
                >
                  <AdsBg />
                </Pressable>
            ))}

            </ScrollView>
          
          
      </ImageBackground>
      </View>
      <View className="fixed absolute bottom-20 right-8">
        <AddBtn/>
      </View>
      <View className="w-full">
        <Footer/>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreens