import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import Profile from '@/components/profile';
import { Id } from '@/convex/_generated/dataModel';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <Profile userId={id as Id<'users'>} showBackButton />;
};

export default Page;

const styles = StyleSheet.create({});
