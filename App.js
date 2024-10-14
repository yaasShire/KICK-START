//
import Root from './app/routes/Root';
import 'react-native-gesture-handler';
import { COLORS } from './app/theme/globalStyle';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useFonts, Poppins_300Light, Poppins_100Thin, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold, Poppins_900Black } from '@expo-google-fonts/poppins'
import { useCallback, useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './app/redux/store'

//
export default function App() {

  let [fontsLoaded] = useFonts({
    poppins100: Poppins_100Thin,
    poppins300: Poppins_300Light,
    poppins400: Poppins_400Regular,
    poppins500: Poppins_500Medium,
    poppins600: Poppins_600SemiBold,
    poppins700: Poppins_700Bold,
    poppins800: Poppins_800ExtraBold,
    poppins900: Poppins_900Black
  });

  //
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }

  }, [fontsLoaded]);

  useEffect(() => {
    enableScreens(false);
  }, [])

  if (!fontsLoaded) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{ fontSize: 20, color: "white" }}
      >Loading...</Text>
    </View>;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
      <Provider store={store}>
        <PaperProvider>
          <Root />
          <StatusBar barStyle="light-content" backgroundColor={COLORS.primary_color} />
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//