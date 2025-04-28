import Thread from '@/components/Thread';
import ThreadComposer from '@/components/ThreadComposer';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, View } from 'react-native';

const Page = () => {
  const { id } = useLocalSearchParams();
  const thread = useQuery(api.messages.getThreadById, {
    messageId: id as Id<'messages'>,
  });

  if (!thread) {
    // While loading, just show spinner
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView>
      <Thread thread={thread as Doc<'messages'> & { creator: Doc<'users'> }} />

      <View>
        <ThreadComposer isReply={true} threadId={id as Id<'messages'>} />
      </View>
    </ScrollView>
  );
};

export default Page;
