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
import PdfViewer from './screens/PdfViewer';
import PhalangeDetailsScreen from './screens/PhalangeDetailsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
<NavigationContainer>
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: 'Salve Deus' }}
    />
    <Stack.Screen
      name="Phalange"
      component={PhalangeScreen}
      options={{ title: 'Falange Missionárias' }}
    />
    <Stack.Screen 
      name="PhalangeDetails" 
      component={PhalangeDetailsScreen} 
      options={{ title: 'Detalhes da Falange' }} 
    />

    <Stack.Screen
      name="Call"
      component={CallScreen}
      options={{ title: 'Chamadas Oficial' }}
    />
    <Stack.Screen
      name="Song"
      component={SongScreen}
      options={{ title: 'Cantos' }}
    />
    <Stack.Screen
      name="Library"
      component={LibraryScreen}
      options={{ title: 'Biblioteca' }}
    />
    <Stack.Screen
      name="Calendar"
      component={CalendarScreen}
      options={{ title: 'Calendário' }}
    />
    <Stack.Screen
      name="Info"
      component={InfoScreen}
      options={{ title: 'Informações' }}
    />
    <Stack.Screen
      name="PdfViewer"
      component={PdfViewer}
      options={{ title: 'Visualizador de PDF' }}
    />
  </Stack.Navigator>
</NavigationContainer>

  );
};

export default AppNavigator;
