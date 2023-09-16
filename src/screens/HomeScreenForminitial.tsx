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
              <Text className="text-black text-2xl uppercase font-bold">
                id
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    keyboardType="numeric"
                    value={value?.toString()}
                    onBlur={onBlur}
                    onChangeText={text => onChange(text)}
                    className="my-2 py-2 px-2 bg-white rounded-md text-black dark:text-dark"
                  />
                )}
                name="id"
              />
              {errors?.id?.message && (
                <View>
                  <Text className="text-white bg-red-600 px-4 py-2 mb-2">
                    {`${errors?.id?.message}`}
                  </Text>
                </View>
              )}
              {/* <Text className="text-black text-2xl uppercase font-bold">
                latitude
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    value={value?.toString()}
                    onBlur={onBlur}
                    onChangeText={text => onChange(text)}
                    className="my-2 py-2 px-2 bg-white rounded-md text-black dark:text-dark"
                  />
                )}
                name="latitude"
              />
              {errors?.latitude?.message && (
                <View>
                  <Text className="text-white bg-red-600 px-4 py-2 mb-2">
                    {`${errors?.latitude?.message}`}
                  </Text>
                </View>
              )}
              <Text className="text-black text-2xl uppercase font-bold">
                longitude
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    value={value?.toString()}
                    onBlur={onBlur}
                    onChangeText={text => onChange(text)}
                    className="my-2 py-2 px-2 bg-white rounded-md text-black dark:text-dark"
                  />
                )}
                name="longitude"
              />
              {errors?.longitude?.message && (
                <View>
                  <Text className="text-white bg-red-600 px-4 py-2 mb-2">
                    {`${errors?.longitude?.message}`}
                  </Text>
                </View>
              )} */}
              <Text className="text-black text-2xl uppercase font-bold">
                name
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    keyboardType="default"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={text => onChange(text)}
                    className="my-2 py-2 px-2 bg-white rounded-md text-black dark:text-dark"
                  />
                )}
                name="name"
              />
              {errors?.name?.message && (
                <View>
                  <Text className="text-white bg-red-600 px-4 py-2 mb-2">
                    {`${errors?.name?.message}`}
                  </Text>
                </View>
              )}
              {/* <Text className="text-black text-2xl uppercase font-bold">
                phone_code
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    value={value}
                    onBlur={onBlur}
                    onChangeText={text => onChange(text)}
                    className="my-2 py-2 px-2 bg-white rounded-md text-black dark:text-dark"
                  />
                )}
                name="phone_code"
              />
              {errors?.phone_code?.message && (
                <View>
                  <Text className="text-white bg-red-600 px-4 py-2 mb-2">
                    {`${errors?.phone_code?.message}`}
                  </Text>
                </View>
              )} */}

              <Text className="text-black text-2xl uppercase font-bold">
                select country
              </Text>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <SelectDropdown
                    data={countries}
                    onSelect={selectedItem => {
                      onChange(selectedItem.id); // update the form value here
                      alert(selectedItem.id); // update the form value here
                    }}
                    buttonTextAfterSelection={selectedItem => {
                      return selectedItem.name;
                    }}
                    renderCustomizedRowChild={item => {
                      return (
                        <View className="flex ml-5">
                          <Text className="text-black">{item?.name}</Text>
                        </View>
                      );
                    }}
                    defaultButtonText={'Selecione un pais'}
                    buttonStyle={{
                      width: '100vw',
                      borderRadius: 8,
                      marginBottom: 10,
                    }}
                  />
                )}
                name="country"
                defaultValue=""
              />
              {errors?.country?.message && (
                <View>
                  <Text className="text-white bg-red-600 px-4 py-2 mb-2">
                    {`${errors?.country?.message}`}
                  </Text>
                </View>
              )}

              <Text className="text-black text-2xl uppercase font-bold my-2">
                select date
              </Text>
              <Button
                title="Open"
                onPress={() => {
                  setOpen(true);
                  console.log('open modal');
                }}
              />
              <Controller
                name="date" // Nombre del campo en el formulario
                control={control}
                defaultValue={new Date()} // Valor inicial
                render={({field: {onChange}}) => (
                  <DatePicker
                    className="my-2"
                    modal
                    title="Seleccionar fecha"
                    confirmText="Confirmar"
                    cancelText="Cancelar"
                    mode="date"
                    open={open}
                    date={selectedDate}
                    onConfirm={selectedDate => {
                      setOpen(false);
                      setValue('date', selectedDate);
                      onChange(selectedDate);
                      setSelectedDate(selectedDate);
                      console.log('selecteddate', selectedDate);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                )}
              />
              <Text className="my-2 py-4 px-2 bg-white rounded-md text-black dark:text-black">
                {selectedDate.toISOString()}
              </Text>

              <Text className="text-black text-2xl uppercase font-bold my-2">
                select image - or - document
              </Text>
              {response?.assets &&
                response?.assets.map(({uri}: {uri: string}) => (
                  <View key={uri}>
                    <Image
                      resizeMode="cover"
                      resizeMethod="scale"
                      style={{width: 200, height: 200}}
                      source={{uri: uri}}
                    />
                  </View>
                ))}
              <View className="flex flex-row gap-1">
                {actions.map(({title, type, options}) => {
                  return (
                    <TouchableOpacity
                      className="bg-blue-500 py-4 px-3 rounded-md w-fit"
                      onPress={() => selectFile(type, options)}>
                      <Text className="text-white dark:text-white font-bold">
                        {title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View className="my-2">
                <Button title="Submit" onPress={handleSubmit(onSubmit)} />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
