import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {setItem} from '../utils/asyncStorage';

const {width} = Dimensions.get('window');

export const OnboardingScreen = () => {
  const {navigate} = useNavigation<StackNavigationProp<any>>();

  const handleDone = () => {
    navigate('Home');
    setItem('onboarded', '1'); //install react-async-storage
  };

  const doneButton = ({...props}) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text className="text-white font-bold">Ingresar</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Onboarding
        containerStyles={{paddingHorizontal: 15}}
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHighlight={false}
        DoneButtonComponent={doneButton}
        showSkip={false}
        nextLabel={'Siguiente'}
        pages={[
          {
            backgroundColor: '#f7e246',
            image: (
              <View>
                <LottieView
                  source={require('../assets/animations/boost.json')}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: 'Boost Productivity',
            subtitle: 'Subscribe this channel to boost your productivity level',
          },
          {
            backgroundColor: '#fff',
            image: (
              <View>
                <LottieView
                  source={require('../assets/animations/work.json')}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: 'Work Seamlessly',
            subtitle: 'Get your work done seamlessly without interruption',
          },
          {
            backgroundColor: '#fff',
            image: (
              <View>
                <LottieView
                  source={require('../assets/animations/achieve.json')}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: 'Achieve Higher Goals',
            subtitle:
              'By boosting your productivity we help you to achieve higher goals',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: 'green',
    borderRadius: 100,
    marginRight: 10,
  },
});
