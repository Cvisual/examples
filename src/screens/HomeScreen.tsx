import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Image,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import useSWR from 'swr';
import {useForm, Controller} from 'react-hook-form';
// import * as yup from 'yup';
// import {yupResolver} from '@hookform/resolvers/yup';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import * as ImagePicker from 'react-native-image-picker';

import {removeItem} from '../utils/asyncStorage';
import {SafeAreaView} from 'react-native-safe-area-context';

// const step1Schema = yup.object().shape({
//   deleted: yup.string().required(),
//   _id: yup.string().required(),
//   id: yup.number().required(),
//   name: yup.string().required(),
//   phone_code: yup.string().required(),
//   latitude: yup.string().required(),
//   longitude: yup.string().required(),
// });

// interface ResultImage {
//   fileCopyUri: string;
//   name: string;
//   size: number;
//   type: symbol;
//   uri: string;
// }

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Seleccione una foto',
    type: 'library',
    options: {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
];

if (Platform.OS === 'ios') {
  actions.push({
    title: 'Seleccione una foto',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'mixed',
      presentationStyle: 'fullScreen',
    },
  });
}

const HomeScreen = () => {
  const {navigate} = useNavigation<StackNavigationProp<any>>();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [response, setResponse] = useState<any>(null);

  const handleReset = async () => {
    await removeItem('onboarded');
    navigate('Onboarding');
  };
  const {data: country} = useSWR(
    'https://eb1f-181-59-2-226.ngrok-free.app/api/v1/countries/65040ff322df8faa6e09b6ac',
  );
  const {data: countries} = useSWR(
    'https://eb1f-181-59-2-226.ngrok-free.app/api/v1/countries',
  );
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm({
    values: country,
    //resolver: yupResolver(step1Schema),
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const alert = (pais: number) => {
    console.log('pais:', pais);
  };

  const selectFile = (type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-500 justify-center items-center">
      <View>
        <Text>elemento</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
