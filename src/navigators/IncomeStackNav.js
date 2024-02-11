import React, { useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { FinancialScreen } from "../screens/main/FinancialScreen";
import { AssetLiabilityDetailScreen } from '../screens/main/AssetLiabilityDetailScreen';
import { CategorySelectionScreen } from "../screens/main/Income/CategorySelectionScreen";
import { AddCategoryScreen } from "../screens/main/Income/AddCategoryScreen";
import { EditCategoryIcon } from "../screens/main/Income/EditCategoryIcon";
import { AddInputScreen } from "../screens/main/Income/AddInputScreen";
import { CalendarScreen } from '../screens/main/Income/CalendarScreen';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { setEditStatus, setSelectedDate, setSelectedItems } from '../redux/variableSlice';
import { setItemPhotoURL } from '../redux/variableSlice';
import { RemoveCategoryIcon } from '../firebase/UserModel';
import { CategoryExpensesSelectionScreen } from "../screens/main/Expenses/CategoryExpensesSelectionScreen";
import { CategoryAssetSelectionScreen } from "../screens/main/Asset/CategoryAssetSelectionScreen";
import { CategoryLiabilitySelectionScreen } from "../screens/main/Liability/CategoryLiabilitySelectionScreen";
import { IncomeAndExpensesScreen } from '../screens/main/IncomeAndExpensesScreen';
import { DetailScreen } from '../screens/main/DetailScreen';
import { OverviewGuideScreen } from '../screens/main/OverviewGuideScreen';

export const IncomeStackNav = ({navigation})=>{
  const Stack = createNativeStackNavigator()

  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state)=>state.auths);
  const userUID = user[0].uid;

  const transactionTypeItem = useSelector((state)=>state.variables.transactionType)
  const selectedItems = useSelector((state)=>state.variables.selectedItems)
  const selectedDate = useSelector((state)=>state.variables.selectedDate)
  console.log(selectedDate)

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เนื่องจาก getMonth() เริ่มจาก 0
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

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
        name='CategoryExpensesSelectionScreen'
        component={CategoryExpensesSelectionScreen}
        options={{headerShown:false}}
      />

      <Stack.Screen
        name='CategoryAssetSelectionScreen'
        component={CategoryAssetSelectionScreen}
        options={{headerShown:false}}
      />

      <Stack.Screen
        name='CategoryLiabilitySelectionScreen'
        component={CategoryLiabilitySelectionScreen}
        options={{headerShown:false}}
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
                  if (transactionTypeItem === "รายได้") {
                    navigation.navigate('CategorySelectionScreen');
                  }
                  if (transactionTypeItem === "ค่าใช้จ่าย") {
                    navigation.navigate('CategoryExpensesSelectionScreen');
                  }
                  if (transactionTypeItem === "สินทรัพย์") {
                    navigation.navigate('CategoryAssetSelectionScreen');
                  }
                  if (transactionTypeItem === "หนี้สิน") {
                    navigation.navigate('CategoryLiabilitySelectionScreen');
                  }
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
            <View style={{height:80, backgroundColor:'#0ABAB5'}}>
              <View style={{flex:1}}>

              </View>

              <View style={{flexDirection: 'row', flex:1}}>
                <TouchableOpacity style={{width:35, marginLeft:15}}
                  onPress={()=>{
                    dispatch(setSelectedDate(""))
                    if (transactionTypeItem === "รายได้") {
                      navigation.navigate('CategorySelectionScreen');
                    }
                    if (transactionTypeItem === "ค่าใช้จ่าย") {
                      navigation.navigate('CategoryExpensesSelectionScreen');
                    }
                    if (transactionTypeItem === "สินทรัพย์") {
                      navigation.navigate('CategoryAssetSelectionScreen');
                    }
                    if (transactionTypeItem === "หนี้สิน") {
                      navigation.navigate('CategoryLiabilitySelectionScreen');
                    }
                    
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

              <View style={{flex:1}}>
                <Text style={{fontFamily:'ZenOldMincho-Regular',fontSize:18, color:'#ffffff',textAlign:'center'}}>{selectedDate ? selectedDate : formattedDate}</Text>
              </View>
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
                  if(transactionTypeItem == ""){
                    navigation.navigate('IncomeAndExpensesScreen');
                  }else{
                    navigation.navigate('AddInputScreen');
                  }
                  
                }}
               >
                <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
              </TouchableOpacity>

              <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginRight:50}}>ปฏิทิน</Text>
            </View>
          )
        }}
      />

      <Stack.Screen
        name='AssetLiabilityDetailScreen'
        component={AssetLiabilityDetailScreen}
        options={{
          header: () => (
            <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
              <TouchableOpacity style={{width:35, marginLeft:15}}
                onPress={()=>{
                  navigation.navigate('FinancialScreen');
                }}
               >
                <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
              </TouchableOpacity>

              <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginRight:50}}>สินทรัพย์-หนี้สิน</Text>
            </View>
          )
        }}
      />

      <Stack.Screen
        name='IncomeAndExpensesScreen'
        component={IncomeAndExpensesScreen}
        options={{
          header: () => (
            <View style={{height:80, backgroundColor:'#0ABAB5'}}>
              <View style={{flex:1}}>

              </View>

              <View style={{flexDirection: 'row', flex:1}}>
                <TouchableOpacity style={{width:35, marginLeft:15}}
                  onPress={()=>{
                    dispatch(setSelectedDate(""))
                    navigation.navigate('FinancialScreen');
                  }}
                >
                  <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
                </TouchableOpacity>
                <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center'}}>รายได้-ค่าใช้จ่าย</Text>

                <TouchableOpacity style={{marginRight:15}}
                  onPress={()=>{
                    navigation.navigate('CalendarScreen')
                  }}
                >
                  <Image source={require('../assets/calendarIcon.png')} width={30} height={30} />
                </TouchableOpacity>              
              </View>

              <View style={{flex:1}}>
   
              </View>
            </View>
          )
        }}
      />

      <Stack.Screen
        name='DetailScreen'
        component={DetailScreen}
        options={{
          header: () => (
            <View style={{height:80, backgroundColor:'#0ABAB5'}}>
              <View style={{flex:1}}>

              </View>

              <View style={{flexDirection: 'row', flex:1}}>
                <TouchableOpacity style={{width:35, marginLeft:15}}
                  onPress={()=>{
                    dispatch(setSelectedDate(""))
                    navigation.navigate('IncomeAndExpensesScreen');
                  }}
                >
                  <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
                </TouchableOpacity>
                <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginRight:50}}>รายละเอียด</Text>

                     
              </View>

              <View style={{flex:1}}>
                <Text style={{fontFamily:'ZenOldMincho-Regular',fontSize:18, color:'#ffffff',textAlign:'center'}}>{selectedDate ? selectedDate : formattedDate}</Text>
              </View>
            </View>
          )
        }}
      />

      


      
    </Stack.Navigator>
  )
}

