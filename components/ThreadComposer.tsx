import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {
  Ionicons,
  Entypo,
  FontAwesome5,
  MaterialIcons,
  Feather,
} from '@expo/vector-icons';

import {} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Stack, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import * as ImagePicker from 'expo-image-picker';
import { Id } from '@/convex/_generated/dataModel';

type ThreadComposerProps = {
  isPreview?: boolean;
  isReply?: boolean;
  threadId?: Id<'messages'>;
};

const ThreadComposer = ({
  isPreview,
  isReply,
  threadId,
}: ThreadComposerProps) => {
  const router = useRouter();
  const [threadContent, setThreadContent] = useState('');
  const { userProfile } = useUserProfile();
  const [mediaFiles, setMediaFiles] = useState<ImagePicker.ImagePickerAsset[]>(
    []
  );

  const addThread = useMutation(api.messages.addThreadMessage);
  const generateUploadUrl = useMutation(api.messages.generateUploadUrl);

  const handlePost = async () => {
    const mediaIds = await Promise.all(mediaFiles.map(uploadMediaFile)); //
    console.log('🚀 ~ handlePost ~ mediaIds:', mediaIds);

    addThread({
      content: threadContent,
      threadId,
      mediaFiles: mediaIds,
    });
    setThreadContent('');
    setMediaFiles([]);
    router.dismiss();
  };

  const removeThread = () => {
    setThreadContent('');
    setMediaFiles([]);
  };

  const handleCancel = () => {
    setThreadContent('');
    Alert.alert('Discard thread?', '', [
      {
        text: 'Discard',
        onPress: () => router.dismiss(),
        style: 'destructive',
      },
      {
        text: 'Save Draft',
        style: 'cancel',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const selectImage = async (type: 'library' | 'camera') => {
    const options: ImagePicker.ImagePickerOptions = {
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: ['images', 'videos'],
    };

    let result;

    if (type === 'camera') {
      await ImagePicker.requestCameraPermissionsAsync();

      result = await ImagePicker.launchCameraAsync(options);
    } else {
      result = await ImagePicker.launchImageLibraryAsync(options);
    }

    if (!result.canceled) {
      setMediaFiles([result.assets[0], ...mediaFiles]);
    }
  };

  const uploadMediaFile = async (image: ImagePicker.ImagePickerAsset) => {
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();

    // Convert URI to blob
    const response = await fetch(image!.uri);
    const blob = await response.blob();

    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': image!.mimeType! },
      body: blob,
    });
    const { storageId } = await result.json();
    return storageId;
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleCancel}
              style={{ marginRight: 50 }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView contentContainerStyle={{}}>
        <View style={styles.topRow}>
          {userProfile && (
            <Image
              source={{ uri: userProfile?.imageUrl as string }}
              style={styles.avatar}
            />
          )}
          <View style={styles.centerContainer}>
            <Text style={styles.name}>
              {userProfile?.first_name} {userProfile?.last_name}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={isReply ? 'Reply to thread' : "What's new?"}
              placeholderTextColor='#999'
              multiline
              value={threadContent}
              autoFocus={!isPreview}
              onChangeText={setThreadContent}
            />

            {mediaFiles.length > 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {mediaFiles.map((image, index) => (
                  <View key={index} style={styles.mediaContainer}>
                    <Image
                      source={{ uri: image.uri }}
                      style={styles.mediaImage}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setMediaFiles((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                      style={styles.deleteIconContainer}
                    >
                      <Entypo name='cross' size={16} color='white' />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}

            <View style={styles.iconRow}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => selectImage('library')}
              >
                <Ionicons
                  name='images-outline'
                  size={24}
                  color={Colors.border}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => selectImage('camera')}
              >
                <Ionicons
                  name='camera-outline'
                  size={24}
                  color={Colors.border}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name='gif' size={24} color={Colors.border} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name='mic-outline' size={24} color={Colors.border} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <FontAwesome6 name='hashtag' size={24} color={Colors.border} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons
                  name='stats-chart-outline'
                  size={24}
                  color={Colors.border}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={removeThread}
            style={[styles.cancelButton, { opacity: isPreview ? 0 : 1 }]}
          >
            <Ionicons name='close' size={24} color={Colors.border} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.replyText}>Your followers can reply & quote</Text>
        <TouchableOpacity
          style={[
            styles.postButton,
            threadContent.trim() === '' && styles.disabledButton,
          ]}
          disabled={threadContent.trim() === ''}
          onPress={handlePost}
        >
          <Text style={styles.postText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ThreadComposer;

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    gap: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  centerContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
    maxHeight: 100,
  },
  cancelButton: {
    marginLeft: 12,
    alignSelf: 'flex-start',
  },
  iconRow: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  iconButton: {
    marginRight: 16,
  },
  keyboardAccessory: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingLeft: 64,
    gap: 12,
  },
  keyboardAccessoryText: {
    flex: 1,
    color: Colors.border,
  },
  submitButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mediaContainer: {
    position: 'relative',
    marginRight: 10,
    marginTop: 10,
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 4,
  },
  mediaImage: {
    width: 100,
    height: 200,
    borderRadius: 6,
    marginRight: 10,
    marginTop: 10,
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
