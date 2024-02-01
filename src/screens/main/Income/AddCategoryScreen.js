import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView} from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";

export const AddCategoryScreen = ({navigation})=>{
    return(
        <ScrollView style={{flex:1, backgroundColor:'#fffffa', paddingHorizontal:20}}>
            <View style={{height:100}}></View>
            <View style={{flex:1, alignItems:'center'}}>
                <TouchableOpacity 
                    onPress={()=>{
                        navigation.navigate('EditCategoryIcon')
                    }}
                >
                    <Image source={require('../../../assets/backgroundIcon.png')} style={{width: 100, height:100}} />
                </TouchableOpacity>
                
                <TextInput style={{flex:1, width:'100%', backgroundColor:'transparent', fontFamily:'ZenOldMincho-Bold', fontSize:22, justifyContent:'center', alignItems:'center'}}
                    placeholder='ระบุชื่อ' underlineColor='#0ABAB5' activeUnderlineColor="#0ABAB5" placeholderTextColor='#0ABAB5' textColor="#0ABAB5"
                ></TextInput>
            </View>
            <View style={{height:100}}></View>
            <View style={{height:150, justifyContent:'center', paddingHorizontal:3}}>
                <Shadow  style={{width:'100%', height:50}} distance={5} startColor={'#0ABAB5'} offset={[2, 4]}>
                    <TouchableOpacity style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center', borderRadius:16, borderWidth:1, borderColor:'#0ABAB5', backgroundColor:'#ffffff'}}>
                        <Text style={{fontFamily:'ZenOldMincho-Bold', color:'#0ABAB5', fontSize:22}}>บันทึกรายการ</Text>
                    </TouchableOpacity>
                </Shadow>
                
            </View>
        </ScrollView>
    )
}