import { Colors } from '@/constants/Colors';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Stack, Tabs, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import {
  Heart,
  Home,
  PersonStanding,
  Plus,
  Search,
  User,
} from 'lucide-react-native';

const CreateTabIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={styles.createIconContainer}>
    <Plus size={size + 6} color={color} />
  </View>
);

const Layout = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000',
        tabBarStyle: { height: 70, paddingTop: 6 },
      }}
    >
      <Tabs.Screen
        name='feed'
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Home size={30} color={focused ? 'black' : 'gray'} />
          ),
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          headerShown: false,

          tabBarIcon: ({ color, size, focused }) => (
            <Search size={30} color={focused ? 'black' : 'gray'} />
          ),
        }}
      />
      <Tabs.Screen
        name='create'
        options={{
          title: 'Create',

          tabBarIcon: ({ color, size, focused }) => (
            <CreateTabIcon color={color} size={size} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push('/(auth)/(modal)/create');
            Haptics.selectionAsync();
          },
        }}
      />

      <Tabs.Screen
        name='favorites'
        options={{
          // headerShown: false,

          tabBarIcon: ({ color, size, focused }) => (
            <Heart size={30} color={focused ? 'black' : 'gray'} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <User size={30} color={focused ? 'black' : 'gray'} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({
  logoutText: {
    marginRight: 10,
    color: 'blue',
  },
  createIconContainer: {
    backgroundColor: Colors.itemBackground,
    borderRadius: 12,
    // padding: 20,
    minWidth: 60,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
