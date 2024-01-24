import React from "react";
import { View, Text, SafeAreaView} from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import { StackNav } from './src/navigators/StackNav';

export default function App() {
  return  (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
          <StackNav/>
      </NavigationContainer>
    </SafeAreaView>
  );
}