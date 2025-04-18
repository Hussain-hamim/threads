import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Layout = () => {
  return (
    <>
      <StatusBar style='dark' />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: 'white' },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default Layout;
