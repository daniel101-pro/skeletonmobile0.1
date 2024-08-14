import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  ActivityIndicator, // Import ActivityIndicator for the loading spinner
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message"; // Import the toast package

// Import your local images
const emailImage = require("../../assets/images/emailtt.png");
const usernameImage = require("../../assets/images/emailtt.png");
const refreshIcon = require("../../assets/images/refresh.png");
const passwordImages = [
  require("../../assets/images/pinttt.png"),
  require("../../assets/images/pinttt.png"),
  require("../../assets/images/pinttt.png"),
  require("../../assets/images/pinttt.png"),
];

const generateRandomUsername = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let username = "";
  for (let i = 0; i < 10; i++) {
    username += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return username;
};

const RegistrationForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(generateRandomUsername());
  const [pin, setPin] = useState(Array(4).fill(""));
  const [loading, setLoading] = useState(false); // Loading state

  // Create refs for each pin input
  const pinRefs = useRef([]);

  const handlePinChange = (index, value) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Move to the next input if a value is entered
    if (value && index < pinRefs.current.length - 1) {
      pinRefs.current[index + 1].focus();
    }
  };

  const handlePinKeyPress = (index, key) => {
    if (key === "Backspace" && !pin[index] && index > 0) {
      pinRefs.current[index - 1].focus();
    }
  };

  const handleGenerateUsername = () => {
    setUsername(generateRandomUsername());
  };

  const handleSubmit = async () => {
    const password = pin.join("");

    // Validate email and pin
    if (!email.trim()) {
      Toast.show({
        type: "error",
        text1: "Invalid Input",
        text2: "Email cannot be empty",
        position: "bottom",
      });
      return;
    }

    if (password.includes(" ")) {
      Toast.show({
        type: "error",
        text1: "Invalid Input",
        text2: "PIN cannot contain spaces",
        position: "bottom",
      });
      return;
    }

    setLoading(true); // Set loading to true when the process starts

    try {
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);

      const response = await fetch(`http://192.168.43.96:1234/signup`, {
        method: "POST",
        body: formdata,
      });

      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Network Error",
          text2: "Please try again later",
          position: "bottom",
        });
        console.log("Response Error:", response);
        setLoading(false); // Set loading to false if there's an error
        return;
      }

      const resp2 = await response.json();
      if (resp2.status === 200) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Registration successful",
          position: "bottom",
        });
        setTimeout(() => {
          router.push("welcome");
        }, 3000);
      } else if (resp2.status === 404) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "User not found",
          position: "bottom",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error In Registering",
          text2: "Email already exists or Network Error",
          position: "bottom",
        });
        console.log("Response Data:", resp2);
      }
    } catch (error) {
      console.error("Error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Registration failed",
        position: "bottom",
      });
    } finally {
      setLoading(false); // Always set loading to false after the process completes
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#0D203B" }}>
      <View className="w-full h-full -z-1 bg-primary">
        <ImageBackground
          source={require("../../assets/images/Bg.png")}
          contentContainerStyle={{ width: "100%" }}
          className="w-full h-full"
          resizeMode="cover"
        >
          <Pressable
            onPress={() => router.back()} // Go back to the previous screen
            style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1 })}
          >
            <Image
              source={require("../../assets/images/arrowback.png")}
              className="w-[82px] h-[84px] ml-5"
              resizeMode="contain"
            />
          </Pressable>
          <Text className="text-white text-[48px] mt-[20px] font-skeletonf ml-5 mb-5">
            Register
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
              className="w-126 p-2 text-lg placeholder-white text-white bg-transparent ml-5"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#ffffff"
            />
          </View>
          <Text className="text-white text-[14px] ml-5 mb-2 font-pmedium">
            Username
          </Text>
          <View className="w-full mb-4 overflow-hidden rounded-lg flex-row items-center">
            <Image
              source={usernameImage}
              className="absolute w-126 h-full ml-3"
              resizeMode="cover"
            />
            <TextInput
              className="w-126 p-2 text-lg placeholder-white text-white bg-transparent ml-5"
              placeholder="Generated username"
              value={username}
              editable={false}
              placeholderTextColor="#ffffff"
            />
            <TouchableOpacity onPress={handleGenerateUsername}>
              <Image
                source={refreshIcon}
                className="w-[20px] h-[20px] mr-3 ml-52"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <Text className="text-white text-[14px] ml-5 mb-2 font-pmedium">
            Set Pin
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
                  ref={(el) => (pinRefs.current[index] = el)} // Set ref for each input
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
          <View className="items-center mt-20">
            <TouchableOpacity
              onPress={handleSubmit}
              style={{ marginTop: 10 }}
              activeOpacity={0.7}
              disabled={loading} // Disable the button when loading
            >
              {loading ? (
                <ActivityIndicator size="large" color="#fff" /> // Show spinner when loading
              ) : (
                <Image
                  source={require("../../assets/images/registerbutton.png")}
                  style={{ width: 350, height: 80 }}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
          </View>
          {/* Toast component for displaying notifications */}
          <Toast />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationForm;
