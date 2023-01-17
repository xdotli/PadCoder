import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EntryPage} from './pages/entry';
import {LoginPage} from './pages/login';
import {MainPage} from './pages/main';
import {CodingPage} from './pages/coding';
import {RecoilRoot} from 'recoil';
import {WebViewPage} from './pages/webview';

const Stack = createNativeStackNavigator();

export const App: React.FC = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'none',
          }}>
          <Stack.Screen name="entry" component={EntryPage} />
          <Stack.Screen name="login" component={LoginPage} />
          <Stack.Screen name="webview" component={WebViewPage} />
          <Stack.Screen name="main" component={MainPage} />
          <Stack.Screen name="coding" component={CodingPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};
