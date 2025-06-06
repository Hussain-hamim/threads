import { StyleSheet, View } from 'react-native';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';
import { useLocalSearchParams } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

const Page = () => {
  const { url, likeCount } = useLocalSearchParams<{
    url: string;
    likeCount: string;
  }>();

  console.log('Likes🚀:', likeCount);

  return (
    <GestureHandlerRootView>
      <StatusBar style='light' />
      <View style={styles.container}>
        <ImageZoom
          uri={url}
          minScale={0.5}
          maxScale={5}
          maxPanPointers={1}
          doubleTapScale={2}
          isSingleTapEnabled
          isDoubleTapEnabled
          style={styles.image}
          resizeMode='contain'
        />
      </View>
    </GestureHandlerRootView>
  );
};
export default Page;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
