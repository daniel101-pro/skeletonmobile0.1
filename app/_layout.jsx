import { Slot, SplashScreen, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useContext, useState } from "react";
import "../global.css";
import HomeScreens from "./screens/(tabs)/HomeScreens";
import {AuthContext, AuthProvider} from '../Context'
import { ToastProvider } from "react-native-toast-notifications";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [usertoken, setusertoken] = useState(false)
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Skeleton-Font": require("../assets/fonts/EastSeaDokdo-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
<ToastProvider>
      <Stack>
          <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="onboarding1"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="onboarding2"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="onboarding3"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="onboarding4"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="welcome"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false
          }}
        />
          <Stack.Screen
          name="screens/(tabs)"
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen
          name="screens/AddRequest"
          options={{
            headerShown: false,
          }}
          />

        <Stack.Screen
          name="screens/PostAd"
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="screens/ReplyAd"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="screens/AddSecret"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="screens/BuySkulls"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="screens/ConfirmAd"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="screens/Messages"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="screens/MessageScreen"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="screens/GettingStarted"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="screens/HowToPost"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="screens/MeetupRequestInfo"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="screens/Comments"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="screens/Skulls"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="screens/HowToChat"
          options={{
            headerShown: false
          }}
        />
        

        
      </Stack>
    </ToastProvider>
    </AuthProvider>
    
  );
}
