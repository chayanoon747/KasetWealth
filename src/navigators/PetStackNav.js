import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {EnterPetScreen} from '../screens/pet/EnterPetScreen'

export const PetStackNav = ()=>{
  const Stack = createNativeStackNavigator()

  return(
    <Stack.Navigator
      initialRouteName="EnterPetScreen" 
    >
      <Stack.Screen
        name='EnterPetScreen'
        component={EnterPetScreen}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  )
}