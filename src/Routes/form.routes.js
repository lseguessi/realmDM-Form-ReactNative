import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../Views/Home';
import Form from '../Views/Form';

export default function Routes() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Inicio'}}
        />
        <Stack.Screen
          name="Form"
          component={Form}
          options={{title: 'Formulário Produto'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
