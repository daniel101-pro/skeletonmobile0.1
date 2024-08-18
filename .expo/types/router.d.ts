/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/sign-in` | `/(auth)/sign-up` | `/_sitemap` | `/components` | `/components/AddBtn` | `/components/AdsBg` | `/components/Footer` | `/components/FormField` | `/components/RequestsBg` | `/components/Send` | `/onboarding1` | `/onboarding2` | `/onboarding3` | `/onboarding4` | `/screens` | `/screens/(tabs)` | `/screens/(tabs)/HomeScreens` | `/screens/(tabs)/Requests` | `/screens/(tabs)/Settings` | `/screens/AddRequest` | `/screens/AddSecret` | `/screens/BuySkulls` | `/screens/Comments` | `/screens/ConfirmAd` | `/screens/HomeScreens` | `/screens/MessageScreen` | `/screens/Messages` | `/screens/PostAd` | `/screens/ReplyAd` | `/screens/Requests` | `/screens/Settings` | `/sign-in` | `/sign-up` | `/welcome`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
