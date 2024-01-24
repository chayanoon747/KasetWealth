import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text, TouchableOpacity } from "react-native"
import { OverviewScreen } from '../screens/main/OverviewScreen';
import { FinancialScreen } from '../screens/main/FinancialScreen';
import { PetScreen } from '../screens/main/PetScreen';
import { MoreScreen } from '../screens/main/MoreScreen';


export const BottomTabNav = ({navigation})=>{
    const BottomTab = createBottomTabNavigator()
    return(
        <BottomTab.Navigator
            initialRouteName='OverviewScreen'
            screenOptions={{
                headerStyle:{
                    backgroundColor:'#0ABAB5',
                },
                headerTitleAlign: 'center',
                headerTitleStyle:{
                    fontSize:24,
                    fontFamily:'ZenOldMincho-Bold'
                },
                tabBarStyle:{
                    height:'8%',
                },
            }}
        >
            <BottomTab.Screen name="Overview" component={OverviewScreen} 
            options={{
                title:'Overview',
                headerLeft:()=>{
                    return(
                        <TouchableOpacity>
                            <Image source={require('../assets/profile.png')} style={{ width: 32, height: 32, marginLeft:'10%'}} />
                        </TouchableOpacity>
                    )
                    
                },
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
            }}
            />

            <BottomTab.Screen name="Financial" component={FinancialScreen} 
            options={{
                title:'Financial',
                tabBarIcon:({focused, color, size})=>{
                    const iconSource = focused ? require('../assets/financialIconFocus.png') : require('../assets/financialIcon.png');
                    return(
                        <Image source={iconSource} style={{ width: 32, height: 32, marginTop:'5%' }} />
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontSize:14, fontFamily: focused ? 'ZenOldMincho-Bold' : 'ZenOldMincho-Regular'}} color={color} size={size}>Financial</Text>
                  )
                },
            }}
            />

            <BottomTab.Screen name="Pet" component={PetScreen} 
            options={{
                title:'Pet',
                tabBarIcon:({focused, color, size})=>{
                    return(
                        <Image source={require('../assets/petIcon.png')} style={{ width: 32, height: 32, marginTop:'5%' }} />
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontSize:14, fontFamily: focused ? 'ZenOldMincho-Bold' : 'ZenOldMincho-Regular'}} color={color} size={size}>Pet</Text>
                  )
                },
                headerShown: false,  
                
            }}
            listeners={({ navigation }) => ({
                tabPress: (e) => {
                  e.preventDefault(); // Prevent default action
                  navigation.replace('PetStackNav'); // Replace the current screen with "Pet" screen in the stack
                },
              })}
            />

            <BottomTab.Screen name="More" component={MoreScreen} 
            options={{
                title:'More',
                tabBarIcon:({focused, color, size})=>{
                    const iconSource = focused ? require('../assets/moreIconFocus.png') : require('../assets/moreIcon.png');
                    return(
                        <Image source={iconSource} style={{ width: 32, height: 32, marginTop:'5%' }} />
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontSize:14, fontFamily: focused ? 'ZenOldMincho-Bold' : 'ZenOldMincho-Regular'}} color={color} size={size}>More</Text>
                  )
                },
            }}
            />

        </BottomTab.Navigator>
    )
}