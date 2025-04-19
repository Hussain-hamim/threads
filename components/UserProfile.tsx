import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
type UserProfileProps = {
  userId?: string;
};

const UserProfile = ({ userId }: UserProfileProps) => {
  return (
    <View>
      <Text>UserProfile</Text>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
