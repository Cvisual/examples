import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useForm} from 'react-hook-form';
import * as ImagePicker from 'react-native-image-picker';

import {ImageLibraryOptions} from 'react-native-image-picker/lib/typescript';

import {removeItem} from '../utils/asyncStorage';
import axios from 'axios';

const HomeScreenmultipleimage = () => {
  const {navigate} = useNavigation<StackNavigationProp<any>>();
  const [selectedImages, setSelectedImages] = useState<any | null>();
  const [images, setImages] = useState<[] | any | null>([]);

  const handleReset = async () => {
    await removeItem('onboarded');
    navigate('Onboarding');
  };
  const {handleSubmit} = useForm({
    defaultValues: {
      fotos: '',
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  let options: ImageLibraryOptions;
  const selectImages = async () => {
    options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };

    if (Platform.OS === 'ios') {
      options = {
        mediaType: 'mixed',
        presentationStyle: 'fullScreen',
      };
    }
    await ImagePicker.launchImageLibrary(options, setSelectedImages);
    try {
      const formData = new FormData();
      if (selectedImages?.assets !== null) {
        formData.append('foto', {
          uri: selectedImages?.assets[0].uri,
          type: selectedImages?.assets[0].type,
          name: selectedImages?.assets[0].fileName,
          size: selectedImages?.assets[0].fileSize,
        });
      }
      const respPost = await axios.post(
        'https://eb1f-181-59-2-226.ngrok-free.app/api/v1/resume/upload/file',
        formData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );
      const newArray = await [...(images ?? []), respPost?.data?.foto];
      setImages(newArray);
    } catch (error) {
      console.log('error devuelto del servidor: ', error);
    }
  };

  const removeImage = (uri: string) => {
    const deleted = images!.filter((img: any) => img !== uri);
    setImages(deleted);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 justify-start items-end">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 w-full justify-start items-end">
          <TouchableOpacity
            onPress={handleReset}
            className="bg-red-500 px-5 py-2 my-1 rounded-lg">
            <Text className="text-white">Reset</Text>
          </TouchableOpacity>
          <View className="flex-1 w-full bg-slate-400">
            <Text className="self-center my-2 text-black text-2xl">
              HomeScreen
            </Text>
            <View className="px-2">
              <Text className="text-black text-2xl uppercase font-bold my-2">
                select image - or - document
              </Text>

              {/* <Text className="my-2 py-4 px-2 bg-white rounded-md text-black dark:text-black">
                {JSON.stringify(response?.assets)}
              </Text> */}
              <View className="flex flex-row flex-wrap gap-4 w-full">
                {/* {images > 1
                  ? images?.map(({uri, index}: any) => (
                      <View className="w-40 h-22 flex mr-2" key={index}>
                        <TouchableOpacity
                        onPress={() => deleteImage(uri)}
                        className="absolute right-0 top-0 z-10 bg-red-500 px-2 py-1">
                        <Text>X</Text>
                      </TouchableOpacity>
                        <Text className="text-white dark:text-white font-bold">
                          {uri}
                        </Text>
                        <Image
                          style={{width: 180, height: 100, resizeMode: 'cover'}}
                          source={{
                            uri:
                              'https://eb1f-181-59-2-226.ngrok-free.app/uploads/' +
                              uri,
                            headers: { accept: '*' }
                          }}
                        />
                      </View>
                    ))
                  : ''} */}
                <View className="flex flex-row flex-wrap">
                  {images?.map((res: string) => (
                    <View className="w-40 h-22 flex mr-5">
                      <TouchableOpacity
                        onPress={() => removeImage(res)}
                        className="absolute right-0 top-0 z-10 bg-red-500 px-2 py-1">
                        <Text>X</Text>
                      </TouchableOpacity>
                      <Image
                        source={{
                          uri: `https://eb1f-181-59-2-226.ngrok-free.app/uploads/${res}`,
                        }}
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                          width: 180,
                          height: 100,
                          marginRight: 5,
                          marginBottom: 10,
                        }}
                      />
                    </View>
                  ))}
                </View>
                <Text className="text-black">{images}</Text>
              </View>
              <Text className="text-white dark:text-white font-bold">
                {typeof images}
              </Text>
              <View className="flex flex-row gap-1 mt-1">
                <TouchableOpacity
                  className="bg-blue-500 py-4 px-3 rounded-md w-full"
                  onPress={selectImages}>
                  <Text className="text-white dark:text-white font-bold">
                    Seleccione una foto
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="my-2">
                <TouchableOpacity
                  className="bg-blue-500 py-4 px-3 rounded-md w-full"
                  onPress={handleSubmit(onSubmit)}>
                  <Text className="text-white dark:text-white font-bold text-center">
                    Enviar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default HomeScreenmultipleimage;
