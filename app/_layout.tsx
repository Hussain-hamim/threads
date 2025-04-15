import { Stack } from 'expo-router';
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { Text } from 'react-native';

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const InitialLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <ClerkLoaded>
        <InitialLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
