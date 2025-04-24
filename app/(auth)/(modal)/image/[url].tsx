import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const Page = () => {
  const { url } = useLocalSearchParams();
  console.log('🚀 ~ Page ~ url:', url);

  return (
    <View>
      <Text>image view</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
