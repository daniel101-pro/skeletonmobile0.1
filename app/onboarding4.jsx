import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import '../global.css';
import { images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "@react-navigation/elements";
import { router } from "expo-router";

const onboarding4 = () => {
  return (
<SafeAreaView style={{ backgroundColor: "#0D203B" }}>
      <View className="w-full h-full -z-1 bg-primary">
      <ImageBackground source={require('../assets/images/Bg.png')} contentContainerStyle={{
        height: "100%",
        width: "100%",
        
      }}>


          <Pressable
              onPress={() => router.push("/index")}
              style={( { pressed } ) => {
                return { opacity: pressed ? 0.3  : 1 }
              }}>
              <Image
                source={images.arrowback}
                className="w-[82px] h-[84px] mt-[20px] ml-10"
                resizeMode="contain"
              />
          </Pressable>


        <View className="w-full flex items-center justify-center h-full px-4 -mt-[78px]">

          
          <Image
            source={images.disclaimer}
            className="w-[350px] h-[254px]"
            resizeMode="contain"
          />

          <Pressable
          onPress={() => router.push("/welcome")}
          style={( { pressed } ) => {
            return { opacity: pressed ? 0.3  : 1 }
          }}>
          <Image
            source={images.Primarybutton}
            className="w-[320px] h-[204px] -mt-[88px]"
            resizeMode="contain"
          />
          </Pressable>
        </View>
      </ImageBackground>
      </View>
    </SafeAreaView>
  )
}

export default onboarding4