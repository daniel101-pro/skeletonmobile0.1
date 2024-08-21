import { Image, ImageBackground, Pressable, Text, View, ScrollView } from "react-native";
import '../global.css';
import { images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../Context'

const onboarding2 = () => {
  const {usertoken} = useContext(AuthContext)


  return (
    <SafeAreaView style={{ backgroundColor: "#0D203B", flex: 1 }}>
      <ImageBackground
        source={require('../assets/images/Bg.png')}
        style={{ flex: 1 }} // Ensures the background image covers the entire screen
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full flex items-center px-4">

            <Image
              source={images.onboardingstripe}
              style={{ width: '100%', height: undefined, aspectRatio: 480 / 460 }}
              resizeMode="contain"
            />

            <Image
              source={images.Frame2}
              style={{ width: 80, height: 80, marginTop: 20 }}
              resizeMode="contain"
            />

            <Text className="text-white text-[40px] mt-[30px] font-skeletonf text-center">
              Find your perfect match
            </Text>

            <Text className="text-white text-[15px] mt-[20px] text-center">
              Whatever you are looking for: fun, love or friendship. Match with someone that wants you too.
            </Text>

            <View className="flex-row items-center justify-center mt-10">
              <Pressable
                onPress={() => router.push("/welcome")}
                style={({ pressed }) => {
                  return { opacity: pressed ? 0.3 : 1 };
                }}
              >
                <Image
                  source={images.skipbutton}
                  style={{ width: 120, height: 80, marginRight: 10 }}
                  resizeMode="contain"
                />
              </Pressable>

              <Pressable
                onPress={() => router.push("/onboarding3")}
                style={({ pressed }) => {
                  return { opacity: pressed ? 0.3 : 1 };
                }}
              >
                <Image
                  source={images.nextbutton}
                  style={{ width: 120, height: 80, marginLeft: 10 }}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default onboarding2;
