import { View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";
import { ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";
import { setItemPhotoURL } from "../../../redux/variableSlice";
import firestore from '@react-native-firebase/firestore';
import { addIncome } from "../../../firebase/UserModel";
import { useSelector} from 'react-redux'
import { useState } from "react";

export const AddInputScreen = ({route, navigation})=>{

    const { itemData } = route.params;
    console.log(itemData.subCategory);

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const [input,setInput] = useState({detail:'',value:''})

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

    
    
    return(
        <ScrollView style={{ backgroundColor:'#fffffa', paddingHorizontal:20}}>
            <View style={{height:50}}></View>
            <View style={{flex:1, alignItems:'center'}}>
{/* รูป & ชื่อรายการ */}
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Image source={require('../../../assets/backgroundIcon.png')} style={{width: 100, height:100}} />
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
            <View style={{height:10}}></View>
{/* ปุ่มบันทึก */}
            <View style={{height:100, justifyContent:'center', paddingHorizontal:3}}>
                <Shadow  style={{width:'100%', height:50}} distance={5} startColor={'#0ABAB5'} offset={[2, 4]}>
                    <TouchableOpacity style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center', borderRadius:16, borderWidth:1, borderColor:'#0ABAB5', backgroundColor:'#ffffff'}}
                        onPress={()=>{
                            addIncome(userUID, itemData.category, itemData.subCategory, input)
                            navigation.navigate('FinancialScreen')
                        }}
                    >
                        <Text style={{fontFamily:'ZenOldMincho-Bold', color:'#0ABAB5', fontSize:22}}>บันทึกรายการ</Text>
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