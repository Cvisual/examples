import React from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Navigation} from './src/navigation/Navigation';
import {SWRConfig} from 'swr';

const App = () => {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then(res => res.json()),
      }}>
      <GestureHandlerRootView className="flex-1">
        <Navigation />
      </GestureHandlerRootView>
    </SWRConfig>
  );
};

export default App;
