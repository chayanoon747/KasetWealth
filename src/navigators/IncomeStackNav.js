import React, { useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { FinancialScreen } from "../screens/main/FinancialScreen";
import { CategorySelectionScreen } from "../screens/main/Income/CategorySelectionScreen";
import { AddCategoryScreen } from "../screens/main/Income/AddCategoryScreen";
import { EditCategoryIcon } from "../screens/main/Income/EditCategoryIcon";
import { AddInputScreen } from "../screens/main/Income/AddInputScreen";
import { CalendarScreen } from '../screens/main/Income/CalendarScreen';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { setEditStatus, setSelectedItems } from '../redux/variableSlice';
import { setItemPhotoURL } from '../redux/variableSlice';
import { RemoveCategoryIcon } from '../firebase/UserModel';

export const IncomeStackNav = ({navigation})=>{
  const Stack = createNativeStackNavigator()

  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state)=>state.auths);
  const userUID = user[0].uid;

  const selectedItems = useSelector((state)=>state.variables.selectedItems)
  

  return(
    <Stack.Navigator
      initialRouteName="FinancialScreen"
      screenOptions={{
        headerShown: true,
        headerStyle:{
          backgroundColor:'#0ABAB5',
          height: 50
        },
        headerTitleAlign:'center',
        headerTintColor:'#ffffff',
      }}
    >
      <Stack.Screen
        name='FinancialScreen'
        component={FinancialScreen}
        options={{ 
            header: () => (
              <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', justifyContent:'center', alignItems:'center' }}>
                <Text style={{fontFamily:'ZenOldMincho-Bold',fontSize:24, color:'#ffffff'}}>Financial</Text>
              </View>
            )
        }}
      />

      <Stack.Screen
        name='CategorySelectionScreen'
        component={CategorySelectionScreen}
        options={{headerShown:false}}
        /*options={{ 
          header: () => (
            <View style={{flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center', justifyContent:'space-between'}}>
              
              <TouchableOpacity style={{marginLeft:15}}
                onPress={()=>{
                  if(isEdit){
                    dispatch(setSelectedItems([]));
                    dispatch(setEditStatus(false));
                    setIsEdit(false)
                  }else{
                    navigation.navigate('FinancialScreen');
                  }
                  
                }}
              >
                {isEdit ? (
                  <Image source={require('../assets/cancelIcon.png')} width={30} height={30} color="#ffffff"/>
                ) : (
                  <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
                )}
                
              </TouchableOpacity>

              <Text style={{fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff'}}>รายได้</Text>
              
              <TouchableOpacity style={{marginRight:15}}
                onPress={()=>{
                  if(!isEdit){
                    dispatch(setEditStatus(true));
                    setIsEdit(true);
                  }else{
                    console.log(selectedItems);
                    RemoveCategoryIcon(userUID, selectedItems)
                  }
                }}
              >
                {isEdit ? (
                  <Image source={require('../assets/trashIcon.png')} width={30} height={30} color="#ffffff"/>
                ) : (
                  <IconFeather name="edit" size={30} color="#ffffff" />
                )}
              </TouchableOpacity>

            </View>
          )
        }}*/
      />

      <Stack.Screen
        name='AddCategoryScreen'
        component={AddCategoryScreen}
        options={{ 
          header: () => (
            <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
              <TouchableOpacity style={{width:35, marginLeft:15}}
                onPress={()=>{
                  dispatch(setItemPhotoURL(""))
                  navigation.navigate('CategorySelectionScreen');
                }}
              >
                <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
              </TouchableOpacity>
              <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginRight:50}}>หมวดหมู่</Text>
            </View>  
          )
        }}
      />

      <Stack.Screen
        name='EditCategoryIcon'
        component={EditCategoryIcon}
        options={{ 
          header: () => (
            <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
              <TouchableOpacity style={{width:35, marginLeft:15}}
                onPress={()=>{
                  navigation.navigate('AddCategoryScreen', {itemData:"" , });
                }}
              >
                <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
              </TouchableOpacity>
              <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginRight:50}}>สัญลักษณ์</Text>
            </View>
          )
        }}
      />

      <Stack.Screen
        name='AddInputScreen'
        component={AddInputScreen}
        options={{
          header: () => (
            <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
              <TouchableOpacity style={{width:35, marginLeft:15}}
                onPress={()=>{
                  navigation.navigate('CategorySelectionScreen');
                }}
              >
                <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
              </TouchableOpacity>
              <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center'}}>รายละเอียด</Text>

              <TouchableOpacity style={{marginRight:15}}
                onPress={()=>{
                  navigation.navigate('CalendarScreen')
                }}
              >
                <Image source={require('../assets/calendarIcon.png')} width={30} height={30} />
              </TouchableOpacity>

              
            </View>
          )
        }}
      />

<Stack.Screen
        name='CalendarScreen'
        component={CalendarScreen}
        options={{
          header: () => (
            <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
              <TouchableOpacity style={{width:35, marginLeft:15}}
                onPress={()=>{
                  navigation.navigate('AddInputScreen');
                }}
              >
                <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
              </TouchableOpacity>
              <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginRight:50}}>ปฏิทิน</Text>
            </View>
          )
        }}
      />
    </Stack.Navigator>
  )
}

