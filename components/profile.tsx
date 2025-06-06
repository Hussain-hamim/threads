import { Colors } from '@/constants/Colors';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuth } from '@clerk/clerk-react';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { usePaginatedQuery } from 'convex/react';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Tabs from './Tabs';
import Thread from './Thread';
import UserProfile from './UserProfile';

type ProfileProps = {
  userId?: Id<'users'>;
  showBackButton?: boolean;
};

const Profile = ({
  userId,
  showBackButton = false,
  // userId = 'jd72c1x7px0x0ygwpec5ar3vc571en6p',
  // showBackButton = true,
}: ProfileProps) => {
  const { userProfile } = useUserProfile();
  const { top } = useSafeAreaInsets();
  const { signOut } = useAuth();
  const router = useRouter();

  const { results } = usePaginatedQuery(
    api.messages.getThreads,
    { userId: userId || userProfile?._id },
    { initialNumItems: 5 }
  );

  return (
    <View style={[styles.container, { paddingTop: top + 8 }]}>
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <Link href={`/(auth)/(tabs)/feed/${item._id}`} asChild>
            <TouchableOpacity activeOpacity={0.8}>
              <Thread
                thread={item as Doc<'messages'> & { creator: Doc<'users'> }}
              />
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={
          <>
            <Text style={styles.tabContentText}>
              You haven't posted anything yet
            </Text>
          </>
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
