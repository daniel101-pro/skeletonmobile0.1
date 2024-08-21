import React, { useState, useContext, useEffect } from "react";
import { Image, ImageBackground, Pressable, Text, View, ScrollView } from "react-native";
import '../global.css';
import { images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from '../Context'
import { router } from "expo-router";

const onboarding1 = () => {
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
              source={images.Frame1}
              style={{ width: 80, height: 80, marginTop: 20 }}
              resizeMode="contain"
            />
            
            <Text className="text-white text-[32px] mt-[20px] font-skeletonf text-center">
              Unlock Hidden Worlds
            </Text>
            
            <Text className="text-white text-[15px] mt-[20px] text-center">
              Dive into the depths of human experiences. Anonymously share your secrets, dreams, and confessions.
            </Text>
            
            <View className="flex flex-row items-center justify-center mt-10">
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
                onPress={() => router.push("/onboarding2")}
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
  );
}

export default onboarding1;
