import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='profile/[id]' options={{ headerShown: false }} />
      <Stack.Screen
        name='[id]'
        options={{
          title: 'Thread',
          headerShown: true,
          headerShadowVisible: false,
          headerTintColor: 'black',
          headerBackTitle: 'Back',
          headerRight: () => (
            <MaterialCommunityIcons
              name='dots-vertical'
              size={24}
              color={'black'}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
