import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet,ScrollView} from "react-native";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { HomeScreen } from "../screens/pet/HomeScreen";
import { EditHomeScreen } from "../screens/pet/EditHomeScreen";
import { InventoryScreen } from "../screens/pet/InventoryScreen";
import { GoalNotificationScreen } from "../screens/pet/GoalNotificationScreen";

export const PetHomeStackNav = ({navigation})=>{
  const Stack = createNativeStackNavigator()

  return(
    <Stack.Navigator
      initialRouteName="HomeScreen" 
    >
        <Stack.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{ 
                header: () => (
                    <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
                       

                        <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginLeft:50}}>บ้านของ...</Text>

                        <TouchableOpacity style={{width:35, marginRight:15}}
                            onPress={()=>{
                            navigation.navigate('GoalNotificationScreen');
                            }}
                        >
                            <Image source={require('../assets/petBottomTab/notificationIcon.png')} style={{ width: 32, height: 32, marginRight:'10%'}} />
                        </TouchableOpacity>
                    </View>
                )
            }}
        />

        <Stack.Screen
            name='EditHomeScreen'
            component={EditHomeScreen}
            options={{
                header: () => (
                    <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
                    <TouchableOpacity style={{width:35, marginLeft:15}}
                        onPress={()=>{
                        navigation.navigate('HomeScreen');
                        }}
                    >
                        <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
                    </TouchableOpacity>

                    <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginRight:50}}>บ้านของ...</Text>
                    </View>
                )
            }}
        />

        <Stack.Screen
            name='InventoryScreen'
            component={InventoryScreen}
            options={{ 
                header: () => (
                    <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
                    <TouchableOpacity style={{width:35, marginLeft:15}}
                        onPress={()=>{
                        navigation.navigate('EditHomeScreen');
                        }}
                    >
                        <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
                    </TouchableOpacity>

                    <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginRight:50}}>คลังเก็บของ</Text>
                    </View>
                )
            }}
        />

        <Stack.Screen
            name='GoalNotificationScreen'
            component={GoalNotificationScreen}
            options={{ 
                header: () => (
                    <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
                    <TouchableOpacity style={{width:35, marginLeft:15}}
                        onPress={()=>{
                        navigation.navigate('HomeScreen');
                        }}
                    >
                        <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
                    </TouchableOpacity>

                    <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginRight:50}}>การแจ้งเตือน</Text>
                    </View>
                )
            }}
        />



    </Stack.Navigator>
  )
}