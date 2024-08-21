import React, { useContext } from 'react';
import { Stack } from 'expo-router';
import { AuthContext } from '@/Context';

export default function AppScreens() {
  const { usertoken } = useContext(AuthContext);

  return (
    <Stack>
      {usertoken ? (
        <>
          <Stack.Screen name="screens/(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="screens/AddRequest" options={{ headerShown: false }} />
          <Stack.Screen name="screens/PostAd" options={{ headerShown: false }} />
          <Stack.Screen name="screens/ReplyAd" options={{ headerShown: false }} />
          <Stack.Screen name="screens/AddSecret" options={{ headerShown: false }} />
          <Stack.Screen name="screens/BuySkulls" options={{ headerShown: false }} />
          <Stack.Screen name="screens/ConfirmAd" options={{ headerShown: false }} />
          <Stack.Screen name="screens/Messages" options={{ headerShown: false }} />
          <Stack.Screen name="screens/MessageScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/GettingStarted" options={{ headerShown: false }} />
          <Stack.Screen name="screens/HowToPost" options={{ headerShown: false }} />
          <Stack.Screen name="screens/MeetupRequestInfo" options={{ headerShown: false }} />
          <Stack.Screen name="screens/Comments" options={{ headerShown: false }} />
          <Stack.Screen name="screens/Skulls" options={{ headerShown: false }} />
          <Stack.Screen name="screens/HowToChat" options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding1" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding2" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding3" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding4" options={{ headerShown: false }} />
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </>
      )}
    </Stack>
  );
}
