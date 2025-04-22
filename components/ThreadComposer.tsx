import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
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
  // const inputAccessoryViewID = 'uniqueID';
  // const generateUploadUrl = useMutation(api.messages.generateUploadUrl);

  const handlePost = () => {
    addThread({
      content: threadContent,
      threadId,
    });
    setThreadContent('');
    setMediaFiles([]);
    router.dismiss();
  };

  const removeThread = () => {
    setThreadContent('');
    setMediaFiles([]);
  };

  const handleCancel = async () => {
    // todo
  };

  const selectImage = async (type: 'library' | 'camera') => {
    const options: ImagePicker.ImagePickerOptions = {
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: ['images', 'videos'],
    };

    let result;

    if (type === 'camera') {
      const permission = await ImagePicker.requestCameraPermissionsAsync();

      result = await ImagePicker.launchCameraAsync(options);
    } else {
      result = await ImagePicker.launchImageLibraryAsync(options);
    }

    if (!result.canceled) {
      setMediaFiles([result.assets[0], ...mediaFiles]);
    }
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

  ///
  //
  //////////////////
  // return (
  //   <View style={styles.container}>
  //     <Stack.Screen
  //       options={{
  //         headerLeft: () => (
  //           <TouchableOpacity
  //             onPress={handleCancel}
  //             style={{ marginRight: 50 }}
  //           >
  //             <Text>Cancel</Text>
  //           </TouchableOpacity>
  //         ),
  //       }}
  //     />

  //     <ScrollView contentContainerStyle={styles.content}>
  //       {/* Header */}
  //       <View style={styles.header}>
  //         <View style={styles.avatarPlaceholder} />
  //         <View>
  //           <Text style={styles.username}>hsncode_</Text>
  //           <TextInput
  //             style={styles.input}
  //             placeholder="What's new?"
  //             placeholderTextColor='#999'
  //             multiline
  //             value={text}
  //             autoFocus
  //             onChangeText={setText}
  //           />
  //         </View>
  //       </View>

  //       {/* Icons Row */}
  //       <View style={styles.iconsRow}>
  //         <Ionicons name='image-outline' size={22} color='#444' />
  //         <Ionicons name='camera-outline' size={22} color='#444' />
  //         <FontAwesome5 name='grin-alt' size={20} color='#444' />
  //         <MaterialIcons name='keyboard-voice' size={22} color='#444' />
  //         <Feather name='hash' size={22} color='#444' />
  //         <Entypo name='text' size={20} color='#444' />
  //         <Entypo name='location-pin' size={22} color='#444' />
  //       </View>

  //       {/* Add to Thread */}
  //       <View style={styles.addToThreadRow}>
  //         <View style={styles.smallAvatar} />
  //         <Text style={styles.addToThreadText}>Add to thread</Text>
  //       </View>
  //     </ScrollView>

  //     {/* Footer */}
  //     <View style={styles.footer}>
  //       <Text style={styles.replyText}>Your followers can reply & quote</Text>
  //       <TouchableOpacity
  //         style={[
  //           styles.postButton,
  //           text.trim() === '' && styles.disabledButton,
  //         ]}
  //         disabled={text.trim() === ''}
  //         onPress={handlePost}
  //       >
  //         <Text style={styles.postText}>Post</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
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

////////////////////////////////////////////////
const styless = StyleSheet.create({
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
