import React from "react";
import { View, Text, ImageBackground, Image } from "react-native";

const AdsBg = ({ title, comment_number, body }) => {
  console.log("TItle: ", title, comment_number, body)
  return (
    <View className="w-full mt-2">
      <ImageBackground
        source={require("../../assets/images/ads_bg.png")}
        className="w-full h-52 justify-end p-8"
        resizeMode="stretch" // Adjusted to "contain" for better scaling
      >
        <View className="flex-1 justify-end mb-12">
          <Text className="text-white text-[36px] font-skeletonf mb-2">
            {title}
          </Text>
          <Text className="text-white text-[25px] font-skeletonf">
            {body}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-start px-2 mt-10">
          <Image 
            source={require("../../assets/images/group8.png")} 
            className="w-8 h-8 mr-2" 
          />
          <Text className="text-white text-[25px] font-skeletonf">
            {comment_number} Comments
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AdsBg;
