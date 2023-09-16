import React, {FC, ReactNode} from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const CustomModal: FC<ModalProps> = ({visible, onClose, children}) => {
  return (
    <View className="relative">
      <Modal
        transparent={true}
        animationType="slide"
        visible={visible}
        onRequestClose={onClose}>
        <View className="z-10 absolute top-3 right-3">
          <TouchableOpacity
            onPress={onClose}
            className="bg-red-500 w-8 h-8 self-end flex items-center justify-center rounded-md">
            <Text className="font-xl">X</Text>
          </TouchableOpacity>
        </View>
        <View className="bg-white p-5 rounded-xl flex-1 m-2">{children}</View>
      </Modal>
    </View>
  );
};

export default CustomModal;
