import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import {removeItem} from '../utils/asyncStorage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CustomModal} from '../components/Modal';

const HomeScreen = () => {
  const {navigate} = useNavigation<StackNavigationProp<any>>();
  const [modalVisible, setModalVisible] = useState(false);

  const handleReset = async () => {
    await removeItem('onboarded');
    navigate('Onboarding');
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-500 justify-start items-center">
      <View className="self-end mb-10">
        <TouchableOpacity
          onPress={handleReset}
          className="bg-red-500 px-5 py-2 my-1 rounded-lg">
          <Text className="text-white">Reset</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 justify-center items-center">
        <Text className="my-10">elemento</Text>
        <TouchableOpacity
          onPress={openModal}
          className="bg-black px-10 py-4 my-1 rounded-lg">
          <Text className="text-white">open modal</Text>
        </TouchableOpacity>
        <Text className="text-white font-bold uppercase mt-4">
          modal - {modalVisible.toString()}
        </Text>
        <CustomModal visible={modalVisible} onClose={closeModal}>
          <Text className="font-lg">Contenido del modal</Text>
        </CustomModal>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
