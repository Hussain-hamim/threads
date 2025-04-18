import { Colors } from '@/constants/Colors';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Stack, Tabs } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const CreateTabIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={styles.createIconContainer}>
    <Ionicons name='add' size={size + 6} color={color} />
  </View>
);

const Layout = () => {
  const { signOut } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000',
        tabBarStyle: { height: 60 },
      }}
    >
      <Tabs.Screen
        name='feed'
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          headerShown: false,

          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              color={color}
              size={size}
            />
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
      />

      <Tabs.Screen
        name='favorites'
        options={{
          // headerShown: false,

          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={size}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => signOut}>
              <Ionicons name='log-out' size={24} />
            </TouchableOpacity>
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
    borderRadius: 25,
    // padding: 20,
    minWidth: 50,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
