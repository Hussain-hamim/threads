import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity } from 'react-native';

const Layout = () => {
  const router = useRouter();

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
        <Stack.Screen
          name='(modal)/create'
          options={{
            presentation: 'modal',
            title: 'New Thread',
            headerRight: () => (
              <TouchableOpacity>
                <Ionicons name='ellipsis-horizontal-circle' size={26} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name='(modal)/edit-profile'
          options={{
            presentation: 'modal',
            title: 'Edit Profile',
            headerRight: () => (
              <TouchableOpacity onPress={() => router.dismiss()}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name='(modal)/image/[url]'
          options={{
            presentation: 'fullScreenModal',
            title: '',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.dismiss()}>
                <Ionicons name='close' size={24} color='white' />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity>
                <Ionicons
                  name='ellipsis-horizontal-circle'
                  size={24}
                  color='white'
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name='(modal)/reply/[id]'
          options={{
            presentation: 'modal',
            title: 'Reply',
            // headerRight: () => (
            //   <TouchableOpacity onPress={() => router.dismiss()}>
            //     <Text>Cancel</Text>
            //   </TouchableOpacity>
            // ),
          }}
        />
      </Stack>
    </>
  );
};

export default Layout;
