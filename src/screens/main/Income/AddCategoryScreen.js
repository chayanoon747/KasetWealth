import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert} from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { useState } from "react";
import { addCategories } from "../../../firebase/UserModel";
import { useDispatch, useSelector } from 'react-redux';
import { setItemPhotoURL } from "../../../redux/variableSlice";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export const AddCategoryScreen = ({route, navigation})=>{
    const dispatch = useDispatch();

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const categoryItem = useSelector((state)=>state.variables.category)
    console.log(categoryItem);

    const photoURLItem = useSelector((state)=>state.variables.photoURL)
    console.log(photoURLItem);

    const [newCategory, setNewCategory] = useState({
        category: categoryItem,
        subCategory: "empty",
        photoURL: photoURLItem
    });

    const addDataItem = ()=>{
        if(photoURLItem){
            addCategories(userUID, newCategory.category, newCategory.subCategory, photoURLItem);
            handleSubmitItem();
        }else{
            Alert.alert("Please enter a photo")
        }
        
    }

    const handleSubmitItem = () => {
        // ทำการนำข้อมูลไปยังหน้าถัดไปเมื่อกดปุ่ม บันทึกข้อมูล
        dispatch(setItemPhotoURL(""))
        navigation.navigate('FinancialScreen');
    };

    return(
        <ScrollView style={{flex:1, backgroundColor:'#fffffa', paddingHorizontal:20}}>
            <View style={{height:100}}></View>
            <View style={{flex:1, alignItems:'center'}}>
                <TouchableOpacity 
                    onPress={()=>{
                        navigation.navigate('EditCategoryIcon')
                    }}
                >
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Image source={require('../../../assets/backgroundIcon.png')} style={{width: 100, height:100}} />
                        <Image source={{uri:photoURLItem ? photoURLItem : "https://cdn.discordapp.com/attachments/1202281623585034250/1202697481461309451/question-mark.png?ex=65ce6650&is=65bbf150&hm=1cc87636791308fe05fc4444763cb3e68195c470bde2858f01c0e3a2a26495de&"}} style={{width: 50, height:50, position:'absolute'}} />
                    </View>
                    
                </TouchableOpacity>
                
                <TextInput style={{flex:1, width:'100%', backgroundColor:'transparent', fontFamily:'ZenOldMincho-Bold', fontSize:22, justifyContent:'center', alignItems:'center'}}
                    placeholder='ระบุชื่อ' underlineColor='#0ABAB5' activeUnderlineColor="#0ABAB5" placeholderTextColor='#0ABAB5' textColor="#0ABAB5"
                    onChangeText={(text) => setNewCategory({ ...newCategory, subCategory: text })}>  
                </TextInput>
            </View>
            <View style={{height:100}}></View>
            <View style={{height:150, justifyContent:'center', paddingHorizontal:3}}>
                <Shadow  style={{width:'100%', height:50}} distance={5} startColor={'#0ABAB5'} offset={[2, 4]}>
                    <TouchableOpacity style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center', borderRadius:16, borderWidth:1, borderColor:'#0ABAB5', backgroundColor:'#ffffff'}}
                        onPress={()=>{
                            addDataItem();
                        }}
                    >
                        <Text style={{fontFamily:'ZenOldMincho-Bold', color:'#0ABAB5', fontSize:22}}>บันทึกรายการ</Text>
                    </TouchableOpacity>
                </Shadow>
                
            </View>
        </ScrollView>
    )
}