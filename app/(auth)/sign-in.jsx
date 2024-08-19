import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { useRouter } from "expo-router";

const emailImage = require("../../assets/images/emailtt.png");
const passwordImages = [
  require("../../assets/images/pinttt.png"),
  require("../../assets/images/pinttt.png"),
  require("../../assets/images/pinttt.png"),
  require("../../assets/images/pinttt.png"),
];

const EmailPinForm = () => {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState(Array(4).fill(""));
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const pinRefs = useRef([]);

  const handlePinChange = (index, value) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < pinRefs.current.length - 1) {
      pinRefs.current[index + 1].focus();
    }
  };

  const handlePinKeyPress = (index, key) => {
    if (key === "Backspace" && index > 0) {
      if (pin[index] === "") {
        pinRefs.current[index - 1].focus();
      } else {
        const newPin = [...pin];
        newPin[index] = "";
        setPin(newPin);
      }
    }
  };

  const handleSubmit = async () => {
    setloading(true);
    try {
      const password = pin.join("");
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);
      const response = await fetch(`http://192.168.43.96:1234/login`, {
        method: "POST",
        body: formdata,
      });
      if (!response.ok) {
        Alert.alert("Network Error", "Please try again later");
        console.log("Response: ", response);
      }
      const resp2 = await response.json();
      if (resp2.status === 200) {
        Alert.alert("Success", "Login Successful");
        setTimeout(() => {
          router.push("screens/(tabs)");
        }, 2000);
      } else if (resp2.status === 404) {
        Alert.alert("Failure", "No matching credentials found");
        console.log("resp2: ", resp2);
        setTimeout(() => {
          router.push("screens/(tabs)");
        }, 2000);
      } else {
        Alert.alert("Unknown Error", "Connection error...");
        console.log("Resssp2: ", resp2);
        setTimeout(() => {
          router.push("screens/(tabs)");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Login failed");
      setTimeout(() => {
        router.push("screens/(tabs)");
      }, 2000);
    } finally {
      setloading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#0D203B" }}>
      <View className="w-full h-full -z-1 bg-primary">
        <ImageBackground
          source={require("../../assets/images/Bg.png")}
          contentContainerStyle={{
            width: "100%",
          }}
          className="w-full h-full"
          resizeMode="cover"
        >
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => {
              return { opacity: pressed ? 0.3 : 1 };
            }}
          >
            <Image
              source={images.arrowback}
              className="w-[82px] h-[84px] ml-5"
              resizeMode="contain"
            />
          </Pressable>
          <Text className="text-white text-[48px] mt-[20px] font-skeletonf ml-5 mb-5">
            Login
          </Text>
          <Text className="text-white text-[14px] ml-5 mb-2 font-pmedium">
            Enter your email address
          </Text>
          <View className="w-full mb-4 overflow-hidden rounded-lg">
            <Image
              source={emailImage}
              className="absolute w-126 h-full ml-3"
              resizeMode="cover"
            />
            <TextInput
              className="w-126 p-2 text-[15px] placeholder-white text-white bg-transparent ml-5 font-skeletonf"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#ffffff"
            />
          </View>
          <Text className="text-white text-[14px] ml-5 mb-2 font-pmedium">
            Pin
          </Text>
          <View className="flex flex-row flex-wrap justify-center items-center">
            {passwordImages.map((image, index) => (
              <View
                key={index}
                className="w-[80px] h-[50px] m-3 overflow-hidden rounded-lg"
              >
                <Image
                  source={image}
                  className="absolute w-full h-full"
                  style={StyleSheet.absoluteFill}
                  resizeMode="contain"
                />
                <TextInput
                  ref={(el) => (pinRefs.current[index] = el)}
                  className="w-full h-full text-center text-lg text-white bg-transparent"
                  maxLength={1}
                  keyboardType="numeric"
                  value={pin[index]}
                  onChangeText={(value) => handlePinChange(index, value)}
                  onKeyPress={({ nativeEvent }) =>
                    handlePinKeyPress(index, nativeEvent.key)
                  }
                />
              </View>
            ))}
          </View>
          <View className="items-end">
            <Pressable
              onPress={() => router.push("/register")}
              style={({ pressed }) => {
                return { opacity: pressed ? 0.3 : 1 };
              }}
            >
              <Text className="text-white text-[14px] mr-5 mb-2 font-pmedium">
                Forgotten Pin?
              </Text>
            </Pressable>
          </View>
          <View className="items-center mt-20">
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <TouchableOpacity
                onPress={handleSubmit}
                style={{ marginTop: 10 }}
                disabled={loading}
                activeOpacity={0.7}
              >
                <Image
                  source={require("../../assets/images/loginbutton2.png")}
                  style={{ width: 350, height: 80 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default EmailPinForm;
