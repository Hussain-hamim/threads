import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePaginatedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const feed = () => {
  const { top } = useSafeAreaInsets();
  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.getThreads,
    {},
    { initialNumItems: 5 }
  );

  return (
    <View style={{ marginTop: top }}>
      <Text>feed</Text>
    </View>
  );
};

export default feed;

const styles = StyleSheet.create({});
