import { Stack, Tabs } from 'expo-router';

const Layout = () => {
  return (
    <Tabs
      screenOptions={{ tabBarShowLabel: false, tabBarActiveTintColor: '#000' }}
    >
      <Tabs.Screen name='feed' options={{ headerShown: false }} />
      <Tabs.Screen name='favorites' options={{ headerShown: false }} />
      <Tabs.Screen name='create' options={{ headerShown: false }} />
      <Tabs.Screen name='search' options={{ headerShown: false }} />
      <Tabs.Screen name='profile' options={{ headerShown: false }} />
    </Tabs>
  );
};

export default Layout;
