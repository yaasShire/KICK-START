//
import Root from './app/routes/Root';
import 'react-native-gesture-handler';
import { COLORS } from './app/theme/globalStyle';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
//
export default function App() {
  return (
    <PaperProvider>
      <Root />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary_color} />
    </PaperProvider>
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