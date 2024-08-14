import { Image, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";
import '../global.css';
import { images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "@react-navigation/elements";
import { router } from "expo-router";
const onboarding2 = () => {
  return (
    <ScrollView
        contentContainerStyle={{
          height: "1000px",
        }}
      >
    <SafeAreaView style={{ backgroundColor: "#0D203B" }}>
      <View className="w-full h-full -z-1 bg-primary">
      <ImageBackground source={require('../assets/images/Bg.png')} contentContainerStyle={{
        height: "100%",
        width: "100%",
        
      }}>
        <View className="w-full flex h-full px-4">

         
          <Text className="text-white text-[48px] mt-[30px] font-skeletonf -ml-18">Skeleton’s Terms of Agreement</Text>
          <Text className="text-white text-[20px] mt-[30px] ml-15">This Terms of Agreement governs your use of Skeleton, an anonymous social networking platform.
          By using Skeleton, you agree to comply with this Agreement.{"\n"} {"\n"}
          1. Use of Skeleton: 
          - You agree to use Skeleton for lawful purposes and in accordance with this Agreement. 
          - You must be at least 18 years old to use Skeleton. By using Skeleton, you affirm that you are at least 18 years old.{"\n"} {"\n"}
          2. User Responsibilities: 
          - You are responsible for maintaining the confidentiality of your account information, including your email address and password. 
          - You agree not to engage in any activity that may compromise the security or integrity of Skeleton or interfere with the rights of other users.{"\n"} {"\n"}

          3. Disclaimer of Liability: 
          - You acknowledge and agree that Skeleton is provided "as is" and "as available." We disclaim all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. 
          - We are not responsible for any interactions or transactions between users of Skeleton, including but not limited to meetings arranged through the platform.{"\n"} {"\n"}

          4. Indemnification: 
          - You agree to indemnify and hold Skeleton, its affiliates, officers, directors, employees, and agents harmless from any claims, damages, losses, liabilities, and expenses arising out of or related to your use of Skeleton.{"\n"} {"\n"}

          5. Governing Law: 
          - This Agreement shall be governed by and construed in accordance with the laws of Federal Republic of Nigeria. Any disputes arising under or related to this Agreement shall be resolved exclusively by the courts of the Federal Republic of Nigeria.{"\n"} {"\n"}

          By using Skeleton, you agree to be bound by the terms and conditions of this Agreement. If you do not agree with any part of this Agreement, you must discontinue your use of Skeleton immediately{"\n"} {"\n"}</Text>


          <Text style= { {textAlign: 'center'}} className="text-white text-[15px] mt-[30px] ml-15 items-center justify-center">
          By clicking Accept, you ensure that you have read and agree with Skeleton’s Privacy Policy and Terms and Policies
          </Text>
          <View className="flex-row items-center justify-center mt-[10px]">
          
          <Pressable
          onPress={() => router.push("/welcome")}
          style={( { pressed } ) => {
            return { opacity: pressed ? 0.3  : 1 }
          }}>
          <Image
            source={images.skipbutton}
            className="w-[150px] h-[120px] mt-[1px] mr-[10px]"
            resizeMode="contain"
          />
          </Pressable>

          <Pressable
          onPress={() => router.push("/onboarding4")}
          style={( { pressed } ) => {
            return { opacity: pressed ? 0.3  : 1 }
          }}>
          <Image
            source={images.nextbutton}
            className="w-[150px] h-[120px] mt-[1px] ml-[10px]"
            resizeMode="contain"
          />
          </Pressable>
          </View>
        </View>
      </ImageBackground>
      </View>
    </SafeAreaView>

    </ScrollView>
  )
}

export default onboarding2