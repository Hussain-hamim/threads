import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StatusBar style='dark' />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Welcome to the Threads app!
      </Text>
      <Text>Hello world oy</Text>
    </View>
  );
}
