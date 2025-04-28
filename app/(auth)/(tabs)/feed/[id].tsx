import Thread from '@/components/Thread';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { Link, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Comments from '@/components/Comments';
import { Colors } from '@/constants/Colors';
import { useUserProfile } from '@/hooks/useUserProfile';

const Page = () => {
  const { id } = useLocalSearchParams();
  const thread = useQuery(api.messages.getThreadById, {
    messageId: id as Id<'messages'>,
  });
  const { userProfile } = useUserProfile();

  return (
    <View style={{ flexGrow: 1, marginBottom: 5 }}>
      <ScrollView>
        {thread ? (
          <Thread
            thread={thread as Doc<'messages'> & { creator: Doc<'users'> }}
          />
        ) : (
          <ActivityIndicator />
        )}
        <Comments threadId={id as Id<'messages'>} />
      </ScrollView>
      <View style={styles.border} />
      <Link href={`/reply/${id as string}`} asChild>
        <TouchableOpacity activeOpacity={0.8} style={styles.replyButton}>
          <Image
            source={{ uri: userProfile?.imageUrl as string }}
            style={styles.replyButtonImage}
          />
          <Text style={{ color: 'gray' }}>
            Reply to {thread?.creator?.first_name}
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};
export default Page;
const styles = StyleSheet.create({
  border: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.border,
    marginVertical: 2,
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    margin: 6,
    backgroundColor: Colors.itemBackground,
    borderRadius: 100,
    gap: 10,
  },
  replyButtonImage: {
    width: 25,
    height: 25,
    borderRadius: 15,
  },
});
