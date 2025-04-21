import { Colors } from '@/constants/Colors';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = () => {
  const { biostring, linkstring, userId, imageUrl } = useLocalSearchParams<{
    biostring: string;
    linkstring: string;
    userId: string;
    imageUrl: string;
  }>();
  const [bio, setBio] = useState(biostring);
  const [link, setLink] = useState(linkstring);
  const [image, setImage] = useState(imageUrl);
  const [name, setName] = useState('');

  const updateUser = useMutation(api.users.updateUser);
  const generateUploadUrl = useMutation(api.users.generateUploadUrl);

  const router = useRouter();
  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const onDone = async () => {
    let storageId = null;

    if (selectedImage) {
      storageId = await updateProfilePicture();
    }

    const toUpdate: any = {
      _id: userId as Id<'users'>,
      bio: bio,
      websiteUrl: link,
    };

    if (storageId) {
      toUpdate.imageUrl = storageId;
    }
    console.log('🚀 ~ onDone ~ toUpdate:', toUpdate);

    await updateUser(toUpdate);

    router.dismissTo('/(auth)/(tabs)/profile');
  };

  const updateProfilePicture = async () => {
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();

    // Convert URI to blob
    const response = await fetch(selectedImage!.uri);
    const blob = await response.blob();

    // Step 2: POST the file to the URL
    await fetch(postUrl, {
      method: 'POST',
      body: blob,
      headers: {
        'Content-Type': selectedImage!.mimeType!,
      },
    });

    // Step 3: Update the user with the new image URL
    // await updateImage({ _id: userId as Id<'users'>, imageUrl: postUrl });

    /////
    const { storageId } = await response.json();
    console.log('🚀 ~ updateProfilePicture ~ storageId:', storageId);

    return storageId;
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={onDone}>
              <Text>Done</Text>
            </TouchableOpacity>
          ),
        }}
      />
      {selectedImage ? (
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: selectedImage.uri }} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: image }} style={styles.image} />
        </TouchableOpacity>
      )}
      {/* <Image source={{ uri: image }} style={styles.image} /> */}
      <View style={styles.section}>
        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder='hsn'
            style={[styles.bioInput]}
          />
        </View>

        <View>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={4}
            style={[styles.bioInput]}
            textAlignVertical='top'
            placeholder='Write a bio...'
            autoFocus
          />
        </View>
        <View>
          <Text style={styles.label}>Link</Text>
          <TextInput
            value={link}
            onChangeText={setLink}
            placeholder='https://hsn.dev'
            autoCapitalize='none'
            style={[styles.bioInput, { borderBottomWidth: 0 }]}
          />
        </View>

        {/* <Button onPress={() => onDone()} title='done' /> */}
      </View>
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={onDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    borderRadius: 14,
    padding: 8,
    margin: 16,
  },
  bioInput: {
    height: 50,
    borderColor: Colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 10,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.submit,
  },
  image: {
    width: 80,
    height: 80,
    marginTop: 16,

    borderRadius: 50,
    alignSelf: 'center',
  },
});
