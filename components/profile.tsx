import { Colors } from '@/constants/Colors';
import { Id } from '@/convex/_generated/dataModel';
import { useUserProfile } from '@/hooks/useUserProfile';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@clerk/clerk-react';
import { useRouter } from 'expo-router';
import UserProfile from './UserProfile';
import Tabs from './Tabs';

type ProfileProps = {
  userId?: Id<'users'>;
  showBackButton?: boolean;
};

const Profile = ({
  // userId,
  // showBackButton = false,
  userId = 'jd72c1x7px0x0ygwpec5ar3vc571en6p',
  showBackButton = true,
}: ProfileProps) => {
  const { userProfile } = useUserProfile();
  const { top } = useSafeAreaInsets();
  const { signOut } = useAuth();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <FlatList
        data={[]}
        renderItem={({ item }) => <Text>Test</Text>}
        ListEmptyComponent={
          <Text style={styles.tabContentText}>
            You haven't posted anything yet
          </Text>
        }
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.background,
            }}
          />
        )}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              {showBackButton ? (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => router.back()}
                >
                  <Ionicons name='chevron-back' size={24} color='#000' />
                  <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
              ) : (
                <MaterialCommunityIcons name='web' size={24} color='black' />
              )}
              <View style={styles.headerIcons}>
                <Ionicons name='logo-instagram' size={24} color='black' />
                <TouchableOpacity onPress={() => signOut()}>
                  <Ionicons name='log-out-outline' size={24} color='black' />
                </TouchableOpacity>
              </View>
            </View>
            {userId && <UserProfile userId={userId} />}
            {!userId && userProfile && (
              <UserProfile userId={userProfile?._id} />
            )}

            <Tabs onTabChange={(tab) => {}} />
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  tabContentText: {
    fontSize: 16,
    marginVertical: 16,
    color: Colors.border,
    alignSelf: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    fontSize: 16,
  },
});

export default Profile;
