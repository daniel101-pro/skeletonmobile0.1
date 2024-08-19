import {
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const welcome = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#0D203B" }}>
      <View className="w-full h-full -z-1 bg-primary">
        <ImageBackground
          source={require("../assets/images/Bg.png")}
          contentContainerStyle={{
            height: "100%",
            width: "100%",
          }}
        >
          <View className="w-full flex items-center justify-center h-full px-4 ">
            <Image
              source={require("../assets/images/logotext.png")}
              className="w-[250px] h-[204px] "
              resizeMode="contain"
            />
           <TouchableOpacity
              onPress={() => router.push("/register")}
              style={{ marginTop: 20 }}
              activeOpacity={0.7}
            >
              <Image
                source={require('../assets/images/joinnow.png')}
                style={{ width: 300, height: 80 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/sign-in")}
              style={{ marginTop: 10 }}
              activeOpacity={0.7}
            >
              <Image
                source={require('../assets/images/login.png')}
                style={{ width: 300, height: 80, marginTop: -20 }}
                resizeMode="contain"
                
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default welcome;
