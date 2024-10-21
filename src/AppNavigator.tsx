import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PhalangeScreen from './screens/PhalangeScreen';
import CallScreen from './screens/CallScreen';
import SongScreen from './screens/SongScreen';
import LibraryScreen from './screens/LibraryScreen';
import CalendarScreen from './screens/CalendarScreen';
import InfoScreen from './screens/InfoScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Phalange" component={PhalangeScreen} />
        <Stack.Screen name="Call" component={CallScreen} />
        <Stack.Screen name="Song" component={SongScreen} />
        <Stack.Screen name="Library" component={LibraryScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
