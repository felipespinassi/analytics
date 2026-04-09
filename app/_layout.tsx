import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import theme from "@/constants/theme";
import { DateRangeProvider } from "@/context/DateRangeContext";
import { ThemeProvider } from "@shopify/restyle";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        marginTop: -5,
      }}
    >
      <ThemeProvider theme={theme}>
        <GestureHandlerRootView
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
            marginTop: -5,
          }}
        >
          <DateRangeProvider>
            <Stack screenOptions={{ headerShown: false }} />
            <StatusBar style="auto" />
          </DateRangeProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </SafeAreaView>
  );
}
