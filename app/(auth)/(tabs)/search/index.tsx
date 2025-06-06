import ProfileSearchResult from '@/components/ProfileSearchResult';
import { Colors } from '@/constants/Colors';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const userList = useQuery(
    api.users.searchUsers,
    search === '' ? 'skip' : { search }
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: '',
        }}
      />

      <View style={styles.searchContainer}>
        <Text style={styles.title}>Search</Text>
        <TextInput
          style={[styles.input, { borderWidth: StyleSheet.hairlineWidth }]}
          placeholder='Search users...'
          value={search}
          onChangeText={setSearch}
          placeholderTextColor='#888'
        />
      </View>

      <FlatList
        data={userList}
        contentInsetAdjustmentBehavior='automatic'
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.border,
            }}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No users found</Text>
        )}
        renderItem={({ item }) => (
          <ProfileSearchResult key={item._id} user={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});
