import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text, TouchableOpacity } from "react-native"
import { AddGoalScreen } from "../screens/pet/AddGoalScreen";
import { CategoryGoal } from "../screens/pet/CategoryGoal";
import { GoalNotificationScreen } from "../screens/pet/GoalNotificationScreen";
import { PetShopScreen } from "../screens/pet/PetShopScreen";
import { GameQuest } from '../screens/pet/GameQuest';
import { PetQuestStackNav } from './PetQuestStackNav';
import { BottomTabNav } from './BottomTabNav';


export const PetBottomTabNav = ({navigation})=>{
    const BottomTab = createBottomTabNavigator()

    return(
        <BottomTab.Navigator
            initialRouteName='PetQuestStackNav'
            screenOptions={{
                headerStyle:{
                    height:80,
                    backgroundColor:'#0ABAB5',
                },
                headerTitleAlign: 'center',
                headerTitleStyle:{
                    fontSize:24,
                    fontFamily:'ZenOldMincho-Bold',
                    color:'#ffffff'
                },
                tabBarStyle:{
                    height:'8%',
                },
            }}
        >
            <BottomTab.Screen name="PetQuestStackNav" component={PetQuestStackNav}
            options={{
                title:'ภารกิจ',
                tabBarIcon:({focused, color, size})=>{
                    const iconSource = focused ? require('../assets/petBottomTab/questIconFocus.png') : require('../assets/petBottomTab/questIcon.png');
                    return(
                        <Image source={iconSource} style={{ width: 32, height: 32, marginTop:'5%' }} />
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontSize:14, fontFamily: focused ? 'ZenOldMincho-Bold' : 'ZenOldMincho-Regular'}} color={color} size={size}>ภารกิจ</Text>
                  )
                },
                headerShown:false,
                
            }}
            />

            <BottomTab.Screen name="PetShopScreen" component={PetShopScreen}
            options={{
                title:'บ้านของ...',
                tabBarIcon:({focused, color, size})=>{
                    const iconSource = focused ? require('../assets/petBottomTab/questIconFocus.png') : require('../assets/petBottomTab/questIcon.png');
                    return(
                        <Image source={iconSource} style={{ width: 32, height: 32, marginTop:'5%' }} />
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontSize:14, fontFamily: focused ? 'ZenOldMincho-Bold' : 'ZenOldMincho-Regular'}} color={color} size={size}>ร้านค้า</Text>
                  )
                },
                headerShown:false,
                
            }}
            />

            <BottomTab.Screen name="BottomTabNav" component={BottomTabNav}
            options={{
                tabBarIcon:({focused, color, size})=>{
                    const iconSource = require('../assets/petBottomTab/logoutIcon.png') 
                    return(
                        <Image source={iconSource} style={{ width: 32, height: 32, marginTop:'5%' }} />
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontSize:14, fontFamily:'ZenOldMincho-Regular'}} color={color} size={size}>ออก</Text>
                  )
                },
                headerShown:false,
            }}
            listeners={({ navigation }) => ({
                tabPress: (e) => {
                  e.preventDefault(); // Prevent default action
                  navigation.pop() // Replace the current screen with "Pet" screen in the stack
                  navigation.pop()
                  navigation.pop()
                  navigation.pop()
                },
              })}
            />
        </BottomTab.Navigator>
    )
}