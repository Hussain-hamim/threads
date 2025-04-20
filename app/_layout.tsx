import '../global.css';

import {
  Slot,
  useNavigationContainerRef,
  useSegments,
  ErrorBoundary,
  Stack,
} from 'expo-router';
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  ClerkProvider,
  ClerkLoaded,
  useAuth,
  useUser,
} from '@clerk/clerk-expo';
import { tokenCache } from '@/utils/cache';
import { LogBox, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import * as Sentry from '@sentry/react-native';
import { isRunningInExpoGo } from 'expo';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}
LogBox.ignoreLogs(['Clerk: Clerk has been loaded with development keys']);

const routingInstrumentation = Sentry.reactNavigationIntegration();

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
});

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  // We recommend adjusting this value in production.
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  attachScreenshot: true,
  debug: false,
  tracesSampleRate: 1.0,
  _experiments: {
    profileSampleRate: 1.0,
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
  },
  integrations: [navigationIntegration],
  enableNativeFramesTracking: !isRunningInExpoGo(),
});

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(auth)';

    if (isSignedIn && !inTabsGroup) {
      router.replace('/(auth)/(tabs)/feed');
    } else if (!isSignedIn && inTabsGroup) {
      router.replace('/(public)');
    }
  }, [isSignedIn]);

  return <Slot />;
};

export default function RootLayout() {
  const ref = useNavigationContainerRef();
  useEffect(() => {
    routingInstrumentation.registerNavigationContainer(ref);
  }, [ref]);

  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
          <InitialLayout />
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
