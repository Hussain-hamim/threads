import ThreadComposer from '@/components/ThreadComposer';
import { ActivityIndicator, View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { api } from '@/convex/_generated/api';
import Thread from '@/components/Thread';
import { Id, Doc } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';

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
    <ScrollView contentContainerStyle={{}}>
      <Thread thread={thread as Doc<'messages'> & { creator: Doc<'users'> }} />

      <View style={{}}>
        <ThreadComposer isReply={true} threadId={id as Id<'messages'>} />
      </View>
    </ScrollView>
  );
};

export default Page;
