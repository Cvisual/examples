import React from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Navigation} from './src/navigation/Navigation';

const App = () => {
  return (
    <GestureHandlerRootView className="flex-1">
      <Navigation />
    </GestureHandlerRootView>
  );
};

export default App;
