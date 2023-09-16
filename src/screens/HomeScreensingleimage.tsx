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

const HomeScreen = () => {
  const {navigate} = useNavigation<StackNavigationProp<any>>();
  const [response, setResponse] = useState<any | null>();

  const handleReset = async () => {
    await removeItem('onboarded');
    navigate('Onboarding');
  };
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm({
    //resolver: yupResolver(step1Schema),
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  let options: ImageLibraryOptions;
  const selectFile = () => {
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
    ImagePicker.launchImageLibrary(options, setResponse);

    setValue('foto', response?.assets[0]);
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

              <Text className="my-2 py-4 px-2 bg-white rounded-md text-black dark:text-black">
                {JSON.stringify(response?.assets[0].uri)}
              </Text>
              {response && (
                <View className="relative w-content">
                  <TouchableOpacity
                    onPress={() => setResponse(null)}
                    className="absolute right-0 top-0 z-10 bg-red-500 px-2 py-1">
                    <Text>X</Text>
                  </TouchableOpacity>
                  <Image
                    resizeMode="cover"
                    resizeMethod="scale"
                    style={{width: 380, height: 250}}
                    source={{uri: response?.assets[0].uri}}
                  />
                </View>
              )}
              <View className="flex flex-row gap-1 mt-1">
                <TouchableOpacity
                  className="bg-blue-500 py-4 px-3 rounded-md w-full"
                  onPress={selectFile}>
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

export default HomeScreen;
