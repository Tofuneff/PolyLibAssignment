import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import * as React from 'react';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
