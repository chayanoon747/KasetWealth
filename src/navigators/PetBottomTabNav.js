import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text, TouchableOpacity } from "react-native"


export const PetBottomTabNav = ({navigation})=>{
    const BottomTab = createBottomTabNavigator()

    return(
        <BottomTab.Navigator
            initialRouteName='OverviewStackNav'
            
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
            <BottomTab.Screen name="OverviewStackNav" component={OverviewStackNav}
            options={{
                title:'Overview',
                tabBarIcon:({focused, color, size})=>{
                    const iconSource = focused ? require('../assets/overviewIconFocus.png') : require('../assets/overviewIcon.png');
                    return(
                        <Image source={iconSource} style={{ width: 32, height: 32, marginTop:'5%' }} />
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontSize:14, fontFamily: focused ? 'ZenOldMincho-Bold' : 'ZenOldMincho-Regular'}} color={color} size={size}>Overview</Text>
                  )
                },
                headerShown:false,
                
            }}
            />


        </BottomTab.Navigator>
    )
}