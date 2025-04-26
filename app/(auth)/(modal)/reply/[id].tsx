import ThreadComposer from '@/components/ThreadComposer';
import { ActivityIndicator, Text, View } from 'react-native';
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

  return (
    <View>
      {thread ? (
        <Thread
          thread={thread as Doc<'messages'> & { creator: Doc<'users'> }}
        />
      ) : (
        <ActivityIndicator />
      )}

      <View style={{ height: 220 }}>
        <Text style={{}}>
          <ThreadComposer isReply={true} threadId={id as Id<'messages'>} />
        </Text>
      </View>
    </View>
  );
};
export default Page;
