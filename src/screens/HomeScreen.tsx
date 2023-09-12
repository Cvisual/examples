import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {removeItem} from '../utils/asyncStorage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const HomeScreen = () => {
  const {navigate} = useNavigation<StackNavigationProp<any>>();

  const handleReset = async () => {
    await removeItem('onboarded');
    navigate('Onboarding');
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text>HomeScreen</Text>
      <TouchableOpacity
        onPress={handleReset}
        className="bg-red-500 px-5 py-2 mt-2 rounded-lg">
        <Text className="text-white">Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
