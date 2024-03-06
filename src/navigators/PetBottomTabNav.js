import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text, TouchableOpacity } from "react-native"
import { AddGoalScreen } from "../screens/pet/AddGoalScreen";
import { CategoryGoal } from "../screens/pet/CategoryGoal";
import { GoalNotificationScreen } from "../screens/pet/GoalNotificationScreen";
import { PetShopScreen } from "../screens/pet/PetShopScreen";
import { GameQuest } from '../screens/pet/GameQuest';
import { PetQuestStackNav } from './PetQuestStackNav';
import { BottomTabNav } from './BottomTabNav';
import { EditHomeScreen } from '../screens/pet/EditHomeScreen';
import { PetHomeStackNav } from './PetHomeStackNav';
import { setEditItemLocation } from '../redux/variableSlice';
import { useDispatch } from 'react-redux';

export const PetBottomTabNav = ({navigation})=>{
    const BottomTab = createBottomTabNavigator()
    const dispatch = useDispatch();

    return(
        <BottomTab.Navigator
            initialRouteName='PetHomeStackNav'
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

            <BottomTab.Screen name="PetHomeStackNav" component={PetHomeStackNav}
                options={{
                    title:'ภารกิจ',
                    tabBarIcon:({focused, color, size})=>{
                        const iconSource = focused ? require('../assets/petBottomTab/homeIconFocus.png') : require('../assets/petBottomTab/homeIcon.png');
                        return(
                            <Image source={iconSource} style={{ width: 32, height: 32, marginTop:'5%' }} />
                        )
                    },
                    tabBarLabel:({focused, color, size})=>{
                    return(
                        <Text style={{ fontSize:14, fontFamily: focused ? 'ZenOldMincho-Bold' : 'ZenOldMincho-Regular'}} color={color} size={size}>หน้าหลัก</Text>
                    )
                    },
                    headerShown:false,
                }}
                listeners={() => ({
                    tabPress: (e) => {
                      e.preventDefault(); // Prevent default action
                      dispatch(setEditItemLocation(false));
                      navigation.navigate('PetHomeStackNav', {screen: 'HomeScreen'})
                    },
                })}
            />

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
                title:'PetShopScreen',
                tabBarIcon:({focused, color, size})=>{
                    const iconSource = focused ? require('../assets/petBottomTab/listIconFocus.png') : require('../assets/petBottomTab/listIcon.png');
                    return(
                        <Image source={iconSource} style={{ width: 32, height: 32, marginTop:'5%' }} />
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontSize:14, fontFamily: focused ? 'ZenOldMincho-Bold' : 'ZenOldMincho-Regular'}} color={color} size={size}>ร้านค้า</Text>
                  )
                },
                header: () => (
                    <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
                       

                        <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginLeft:50}}>ร้านค้า</Text>

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