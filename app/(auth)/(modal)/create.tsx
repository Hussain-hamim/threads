import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Ionicons,
  Entypo,
  FontAwesome5,
  MaterialIcons,
  Feather,
} from '@expo/vector-icons';

const CreateThread = () => {
  const [text, setText] = useState('');

  const handlePost = () => {
    console.log('Thread:', text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarPlaceholder} />
          <View>
            <Text style={styles.username}>hsncode_</Text>
            <TextInput
              style={styles.input}
              placeholder="What's new?"
              placeholderTextColor='#999'
              multiline
              value={text}
              onChangeText={setText}
            />
          </View>
        </View>

        {/* Icons Row */}
        <View style={styles.iconsRow}>
          <Ionicons name='image-outline' size={22} color='#444' />
          <Ionicons name='camera-outline' size={22} color='#444' />
          <FontAwesome5 name='grin-alt' size={20} color='#444' />
          <MaterialIcons name='keyboard-voice' size={22} color='#444' />
          <Feather name='hash' size={22} color='#444' />
          <Entypo name='text' size={20} color='#444' />
          <Entypo name='location-pin' size={22} color='#444' />
        </View>

        {/* Add to Thread */}
        <View style={styles.addToThreadRow}>
          <View style={styles.smallAvatar} />
          <Text style={styles.addToThreadText}>Add to thread</Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.replyText}>Your followers can reply & quote</Text>
        <TouchableOpacity
          style={[
            styles.postButton,
            text.trim() === '' && styles.disabledButton,
          ]}
          disabled={text.trim() === ''}
          onPress={handlePost}
        >
          <Text style={styles.postText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateThread;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    fontSize: 16,
    maxWidth: '90%',
    color: '#000',
    minWidth: '50%',
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 25,
    paddingHorizontal: 30,
  },
  addToThreadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  smallAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#bbb',
    marginRight: 10,
    marginLeft: 10,
  },
  addToThreadText: {
    color: '#444',
    fontSize: 14,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  replyText: {
    color: '#777',
    fontSize: 12,
  },
  postButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  postText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});
