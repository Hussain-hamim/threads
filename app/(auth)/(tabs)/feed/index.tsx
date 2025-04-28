import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePaginatedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Colors } from '@/constants/Colors';
import ThreadComposer from '@/components/ThreadComposer';
import Thread from '@/components/Thread';
import { Doc } from '@/convex/_generated/dataModel';
import { Link, useNavigation } from 'expo-router';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';

const Feed = () => {
  const { top } = useSafeAreaInsets();
  const { results, loadMore } = usePaginatedQuery(
    api.messages.getThreads,
    {},
    { initialNumItems: 5 }
  );
  const [refreshing, setRefreshing] = React.useState(false);

  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();
  const isFocused = useIsFocused();

  // Scroll tracking
  const scrollOffset = useSharedValue(0);
  const prevScrollY = useSharedValue(0);

  // Show or hide tab bar
  const updateTabBar = (shouldHide: boolean) => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        marginBottom: shouldHide ? -tabBarHeight : 0,
        paddingTop: 6,
        height: 70,
      },
    });
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentY = event.contentOffset.y;

      if (isFocused) {
        const goingUp = currentY < prevScrollY.value;
        const atTop = currentY <= 0;

        scrollOffset.value = currentY;
        prevScrollY.value = currentY;

        if (goingUp || atTop) {
          runOnJS(updateTabBar)(false); // Show
        } else {
          runOnJS(updateTabBar)(true); // Hide
        }
      }
    },
  });

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
    <Animated.FlatList
      onScroll={scrollHandler}
      scrollEventThrottle={16}
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
      keyExtractor={(item) => item._id.toString()}
      onEndReached={onLoadMore}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ paddingTop: top }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={() => (
        <View style={styles.empty}>
          <Text>No threads available</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={() => (
        <View style={{ paddingBottom: 10 }}>
          <Image
            source={require('@/assets/images/threads-logo-black.png')}
            style={styles.logo}
          />
          <ThreadComposer isPreview />
        </View>
      )}
    />
  );
};

export default Feed;

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.border,
  },
  logo: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
});
