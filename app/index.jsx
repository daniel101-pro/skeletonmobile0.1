import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import '../global.css';
import { images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "@react-navigation/elements";
import { router } from "expo-router";
export default function Index() {
  return (
    <SafeAreaView style={{ backgroundColor: "#0D203B" }}>
      <View className="w-full h-full -z-1 bg-primary">
      <ImageBackground source={require('../assets/images/Bg.png')} contentContainerStyle={{
        height: "100%",
        width: "100%",
        
      }}>
        <View className="w-full flex items-center h-full px-4">

          <Text className="text-white text-[17px] mt-44">Are you prepared for this?</Text>
          <Image
            source={images.logo}
            className="w-[250px] h-[204px] mt-[28px]"
            resizeMode="contain"
          />
          <Text className="text-white text-[17px] mt-[30px]">If you are, then go ahead.</Text>
          <Pressable
          onPress={() => router.push("/onboarding1")}
          style={( { pressed } ) => {
            return { opacity: pressed ? 0.3  : 1 }
          }}>
          <Image
            source={images.Primarybutton}
            className="w-[320px] h-[204px] mt-[1px]"
            resizeMode="contain"
          />
          </Pressable>
        </View>
      </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
