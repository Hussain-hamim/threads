import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePaginatedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Colors } from '@/constants/Colors';
import ThreadComposer from '@/components/ThreadComposer';
import Thread from '@/components/Thread';
import { Doc } from '@/convex/_generated/dataModel';

const feed = () => {
  const { top } = useSafeAreaInsets();
  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.getThreads,
    {},
    { initialNumItems: 5 }
  );
  const [refreshing, setRefreshing] = React.useState(false);

  const onLoadMore = () => {
    loadMore(5);
  };

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <FlatList
      data={results}
      renderItem={({ item }) => (
        <Thread thread={item as Doc<'messages'> & { creator: Doc<'users'> }} />
      )}
      keyExtractor={(item) => item._id.toString()}
      onEndReached={onLoadMore}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ paddingTop: top }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={() => (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>No threads available</Text>
        </View>
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: StyleSheet.hairlineWidth,
            backgroundColor: Colors.border,
          }}
        />
      )}
      ListHeaderComponent={() => (
        <View style={{ paddingBottom: 10 }}>
          <Image
            source={require('@/assets/images/threads-logo-black.png')}
            style={{
              width: 40,
              height: 40,
              alignSelf: 'center',
            }}
          />

          <ThreadComposer isPreview />
        </View>
      )}
    />
  );
};

export default feed;

const styles = StyleSheet.create({});
