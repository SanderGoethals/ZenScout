import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./global.css";
import WellnessListScreen from './src/screens/Wellness/WellnessListScreen';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <WellnessListScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
