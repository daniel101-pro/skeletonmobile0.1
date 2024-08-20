/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/Loading` | `/(auth)/register` | `/(auth)/register2` | `/(auth)/register3` | `/(auth)/register4` | `/(auth)/register5` | `/(auth)/sign-in` | `/(auth)/sign-up` | `/Loading` | `/_sitemap` | `/components` | `/components/AddBtn` | `/components/AdsBg` | `/components/Footer` | `/components/FormField` | `/components/RequestsBg` | `/components/Send` | `/onboarding1` | `/onboarding2` | `/onboarding3` | `/onboarding4` | `/register` | `/register2` | `/register3` | `/register4` | `/register5` | `/screens` | `/screens/(tabs)` | `/screens/(tabs)/HomeScreens` | `/screens/(tabs)/Requests` | `/screens/(tabs)/Settings` | `/screens/AddRequest` | `/screens/AddSecret` | `/screens/BuySkulls` | `/screens/Comments` | `/screens/ConfirmAd` | `/screens/GettingStarted` | `/screens/HomeScreens` | `/screens/HowToChat` | `/screens/HowToPost` | `/screens/MeetupRequestInfo` | `/screens/MessageScreen` | `/screens/Messages` | `/screens/PostAd` | `/screens/ReplyAd` | `/screens/Requests` | `/screens/Settings` | `/screens/Skulls` | `/sign-in` | `/sign-up` | `/welcome`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
