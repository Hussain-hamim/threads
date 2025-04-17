import '../global.css';
import { Colors } from '@/constants/Colors';
import { useAuth, useOAuth } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera, User } from 'lucide-react-native';
import { useQueries, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function Index() {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_facebook' });
  // const { startOAuthFlow } = useOAuth({ strategy: 'oauth_instagram' });
  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: 'oauth_google',
  });
  const { signOut } = useAuth();

  const data = useQuery(api.users.getAllUsers);
  console.log('🚀 ~ Index ~ data:', data);

  const handleFacebookLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      console.log(
        '🚀 ~ handleFacebookLogin ~ createdSessionId:',
        createdSessionId
      ); //ctrl + alt + l
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleOAuthFlow();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Image
        source={require('@/assets/images/logo.jpg')}
        style={styles.loginImage}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            marginVertical: 20,
          }}
        >
          <Ionicons name='at' size={44} />
          {/* <User size={44} /> */}
          {/* <Camera size={24} /> */}

          <Text
            style={{
              fontSize: 28,
              fontWeight: '400',
            }}
          >
            Threads
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleFacebookLogin}
          >
            <View style={styles.loginButtonContent}>
              <Ionicons name='logo-instagram' size={38} />
              <Text style={styles.loginButtonText}>
                Continue with Instagram
              </Text>
              <Ionicons
                name='chevron-forward'
                size={24}
                color={Colors.border}
              />
            </View>
          </TouchableOpacity>

          {/* For tetstingh with a different account */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleGoogleLogin}
          >
            <View style={styles.loginButtonContent}>
              <Ionicons name='logo-google' color='black' size={38} />

              <Text style={styles.loginButtonText}>Continue with Google</Text>
              <Ionicons
                name='chevron-forward'
                size={24}
                color={Colors.border}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton}>
            <View style={styles.loginButtonContent}>
              <Ionicons name='cloud-outline' color='black' size={38} />

              <Text style={styles.loginButtonText}>Use without a profile</Text>
              <Ionicons
                name='chevron-forward'
                size={24}
                color={Colors.border}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={logout}>
            <Text className='text-3xl' style={styles.switchAccountButtonText}>
              Use different account (Log Out)
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    // backgroundColor: Colors.background,
    backgroundColor: '#EEEEEE',
  },
  loginImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 17,
    fontFamily: 'DMSans_500Medium',
  },
  buttonContainer: {
    gap: 10,
    marginHorizontal: 18,
    minWidth: 330,
  },
  loginButton: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
  },
  loginButtonText: {
    color: 'gray',
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
    flex: 1,
  },
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loginButtonImage: {
    width: 50,
    height: 50,
  },
  loginButtonSubtitle: {
    fontSize: 12,
    fontFamily: 'DMSans_400Regular',
    color: '#acacac',
    marginTop: 5,
  },
  switchAccountButtonText: {
    fontSize: 14,
    color: Colors.border,
    alignSelf: 'center',
  },
});
