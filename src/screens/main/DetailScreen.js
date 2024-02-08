import { View, Text, Image, TouchableOpacity, StyleSheet, Alert} from "react-native";
import { ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";
import { addTransaction, editTransaction } from "../../firebase/UserModel";
import { useSelector, useDispatch} from 'react-redux'
import { useState, useEffect } from "react";

export const DetailScreen = ({navigation})=>{

     //itemData มี category,subcategory,url
     const itemData = useSelector((state)=>state.variables.itemData); 
     //console.log(itemData);
     const selectedDate = useSelector((state)=>state.variables.selectedDate);
     //console.log(selectedDate);
 
     const transactionType = useSelector((state)=>state.variables.transactionType);
 
     const user = useSelector((state)=>state.auths);
     const userUID = user[0].uid;
 
     const currentDate = new Date();
     const year = currentDate.getFullYear();
     const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เนื่องจาก getMonth() เริ่มจาก 0
     const day = currentDate.getDate().toString().padStart(2, '0');
     const formattedDate = `${year}-${month}-${day}`;
 
     const [input,setInput] = useState({detail:itemData.detail,value:itemData.value})
 
     const setDetail = (text) => {
         setInput(oldValue => ({
             ...oldValue,
             detail:text
         }))
       }
 
     const setValue = (text) => {
         setInput(oldValue => ({
             ...oldValue,
             value:text
         }))
     }

     const success = ()=>{
        navigation.navigate('FinancialScreen')
     }
 
     const handleEditTransaction = ()=>{
         //input มี 2 key คือ value กับ details
         if(input.value == ""){
             Alert.alert('กรุณาระบุจำนวนเงิน')
         }else{
             const value = parseFloat(input.value)
             //console.log(value)
             if(!isNaN(value)){
                editTransaction(userUID,itemData, input, success)
             }else{
                 Alert.alert('กรุณาระบุจำนวนเงินเป็นตัวเลข')
             }
         }   
     }

     
 
     
     
     return(
         <ScrollView style={{ backgroundColor:'#fffffa', paddingHorizontal:20}}>
             <View style={{height:50}}></View>
             <View style={{flex:1, alignItems:'center'}}>
 {/* รูป & ชื่อรายการ */}
                 <View style={{justifyContent:'center', alignItems:'center'}}>
                     <Image source={require('../../assets/backgroundIcon.png')} style={{width: 100, height:100}} />
                     <Image source={{uri:itemData.photoURL}} style={{width: 50, height:50, position:'absolute', alignItems:'center', justifyContent:'center'}}/>
                     {/* รับรูปไอค่อน */}
                 </View>
                 <TextInput style={{flex:1, width:'100%', backgroundColor:'transparent', fontFamily:'ZenOldMincho-Bold', fontSize:22, justifyContent:'center', alignItems:'center'}}
                     placeholder={itemData.subCategory} underlineColor='#000000' activeUnderlineColor="#000000" placeholderTextColor='#0ABAB5' textColor="#0ABAB5" editable={false}
                     >
                         {/* เปลี่ยนชื่อไอค่อนยังไง   */}
                 </TextInput>
             </View>
             <View style={{height:20}}></View>
 {/* กล่องจำนวนเงิน */}
             <View style={styles.TextInputBox}>
                 <TextInput style={{flex:1,width:'100%', borderColor:'#000000', backgroundColor:'transparent', fontFamily:'ZenOldMincho', fontSize:22, justifyContent:'center', alignItems:'center'}}
                     placeholder='ระบุจำนวนเงิน' underlineColor='transparent' activeUnderlineColor='transparent' placeholderTextColor='#0ABAB5' textColor="#0ABAB5"
                     value={input.value} onChangeText={(text)=>{setValue(text)}} keyboardType="number-pad"
                     >
                 </TextInput>
             </View>
             <View style={{height:20}}></View>
 {/* กล่องรายละเอียด */}
             <View style={styles.DetailInputBox}>
                 <TextInput style={{flex:3,width:'100%', borderColor:'#000000', backgroundColor:'transparent', fontFamily:'ZenOldMincho', fontSize:18, justifyContent:'start', alignItems:'start'}}
                     placeholder='รายละเอียดเพิ่มเติม' underlineColor='transparent' activeUnderlineColor='transparent' placeholderTextColor='#0ABAB5' textColor="#0ABAB5"
                     value={input.detail} onChangeText={(text)=>{setDetail(text)}}
                 >  
                 </TextInput>
             </View>
             
 {/* ปุ่มบันทึก */}
             <View style={{height:70, justifyContent:'center', paddingHorizontal:3}}>
                 <Shadow  style={{width:'100%', height:50}} distance={5} startColor={'#0ABAB5'} offset={[2, 4]}>
                     <TouchableOpacity style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center', borderRadius:16, borderWidth:1, borderColor:'#0ABAB5', backgroundColor:'#ffffff'}}
                         onPress={handleEditTransaction}
                     >
                         <Text style={{fontFamily:'ZenOldMincho-Bold', color:'#0ABAB5', fontSize:22}}>แก้ไขรายการ</Text>
                     </TouchableOpacity>
                 </Shadow>
             </View>

             <View style={{height:70, justifyContent:'center', paddingHorizontal:3}}>
                 <Shadow  style={{width:'100%', height:50}} distance={5} startColor={'#ff0000'} offset={[2, 4]}>
                     <TouchableOpacity style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center', borderRadius:16, borderWidth:1, borderColor:'#ff0000', backgroundColor:'#ffffff'}}
                         onPress={()=>{}}
                     >
                         <Text style={{fontFamily:'ZenOldMincho-Bold', color:'#ff0000', fontSize:22}}>ลบรายการ</Text>
                     </TouchableOpacity>
                 </Shadow>
             </View>
         </ScrollView>
     )
 }
 
 const styles = StyleSheet.create({
     TextInputBox: {
         flex:1,
         justifyContent:'center',
         borderRadius:15,
         borderWidth:1,
         borderColor:'#000000',
         paddingHorizontal:3,
         
     },
     DetailInputBox:{
         height:150,
         justifyContent:'flex-start',
         borderRadius:15,
         borderWidth:1,
         borderColor:'#000000',
         alignItems: 'flex-start',
         paddingHorizontal:3
     }
 })