import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native"
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react";
import { useSelector } from 'react-redux';
import { Shadow } from "react-native-shadow-2";

export const AddGoalScreen = ({navigation})=>{
  const [input,setInput] = useState({value:''})

  const photoURLItem = useSelector((state)=>state.variables.photoURL)
  //console.log(photoURLItem);

  const categoryItem = useSelector((state)=>state.variables.category)

  const setValue = (text) => {
    setInput(oldValue => ({
        ...oldValue,
        value:text
    }))
  }

  const handleAddTransaction = () => {
    //input มี 2 key คือ value กับ details
    if(input.value == ""){
        Alert.alert('กรุณาระบุจำนวนเงิน')
    }else{
        const value = parseFloat(input.value)
        //console.log(value)
        if(!isNaN(value)){
            /*
            if(selectedDate == ""){ //formattedDate กรณีที่ user ไม่ได้เลือกวันที่ เป็นวันที่ปัจจุบัย
                addTransaction(userUID,itemData, input, formattedDate)
            }else{          //กรณีวันที่มีค่า ก็จะรับ set ค่าตาม user
                addTransaction(userUID ,itemData, input, selectedDate)
            }

            navigation.goBack();
            */
            console.log(`จำนวนเงิน: ${value}`);
        }else{
            Alert.alert('กรุณาระบุจำนวนเงินเป็นตัวเลข')
        }
    }
  };

  const CategoryGoalScreen = () => {
    navigation.navigate('CategoryGoal');
  };

    return(
       <SafeAreaView style={styles.container}>
            <View style={styles.secondContainer}>
              <View style={styles.IconContainer}>
                  <TouchableOpacity
                      onPress={CategoryGoalScreen}
                  >
                      <View style={styles.questionMarkIcon}>
                          <Image source={require('../../assets/game_backgroundIcon.png')} style={styles.game_backgroundIcon} />
                          <Image source={{uri:photoURLItem ? photoURLItem : "https://cdn.discordapp.com/attachments/951838870272606259/1207602408197193788/game_questionMark.png?ex=65e03e62&is=65cdc962&hm=3525e699ba934a6d818cf3fea970a856cf3c28c561c30bff6619b9f56f2e3cdc&"}} style={styles.game_questionMark} />
                      </View>
                      
                  </TouchableOpacity>
                  
                  <TextInput style={styles.CategoryText}
                      placeholder= {categoryItem ? categoryItem : "เลือกหมวดหมู่"}
                      editable={false} 
                      underlineColor='#0ABAB5' 
                      activeUnderlineColor="#0ABAB5" 
                      placeholderTextColor='#FFFFFA' 
                      textColor="#FFFFFA"
                    >  
                  </TextInput>
              </View>

              

              <View style={styles.NumberPadContainer}>
                    <TextInput style={styles.NumberPadText}
                        placeholder='ระบุจำนวนเงิน' 
                        underlineColor='transparent' 
                        activeUnderlineColor='transparent' 
                        placeholderTextColor='#B3DBD8' 
                        textColor="#B3DBD8"
                        value={input.value} 
                        onChangeText={(text)=>{setValue(text)}} 
                        keyboardType="number-pad"
                        >
                    </TextInput>
              </View>
              <View style={{height:70}}></View>
            </View>

            <View style={{height:50}}></View>

            <View style={styles.SaveContainer}>
                <Shadow  style={styles.shadow} distance={5} startColor={'#0ABAB5'} offset={[2, 4]}>
                    <TouchableOpacity style={styles.SaveButton}
                        onPress={handleAddTransaction}
                    >
                        <Text style={styles.SaveText}>บันทึกรายการ</Text>
                    </TouchableOpacity>
                </Shadow>
                
            </View>
       </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#B3DBD8',
    },
    secondContainer: {
        flex:0,
        alignSelf:'center',
        justifyContent:'center',
        width:350,
        height:436,
        backgroundColor:'#2C6264',
        marginTop:'7.5%',
        paddingHorizontal:20,
        borderRadius:12,
        borderWidth:1
    },
    IconContainer:{
        flex:1, 
        alignItems:'center',
        justifyContent:'center',
        marginTop:'10%'
    },
    questionMarkIcon: {
        justifyContent:'center', 
        alignItems:'center',
        marginBottom:'10%'
    },
    game_backgroundIcon: {
        width: 100, 
        height:100
    },
    game_questionMark: {
        width: 90, 
        height: 90, 
        position: 'absolute' 
    },
    CategoryText: {
        flex:1, 
        width:'100%',
        marginBottom:'20%', 
        backgroundColor:'transparent', 
        fontFamily:'ZenOldMincho-Bold', 
        fontSize:26, 
        justifyContent:'center', 
        alignItems:'center'
    },
    NumberPadContainer: {
        justifyContent:'center',
        alignContent:'center',
        height:'15%',
        borderRadius:8,
        borderWidth:1,
        borderColor:'#000000',
        paddingHorizontal:3,
        backgroundColor:'white'
      },
    NumberPadText: {
        flex:1,
        width:'100%', 
        borderColor:'#000000', 
        backgroundColor:'transparent', 
        fontFamily:'ZenOldMincho', 
        fontSize:22, 
        justifyContent:'center', 
        alignItems:'center'
    },
    shadow: {
        width:'100%', height:50
    },
    SaveContainer:{
        height:'20%', 
        justifyContent:'center', 
        paddingHorizontal:'10%'
    },
    SaveButton: {
        width:'100%', 
        height:'100%', 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:16, 
        borderWidth:1, 
        borderColor:'#0ABAB5', 
        backgroundColor:'#ffffff'
    },
    SaveText: {
        fontFamily:'ZenOldMincho-Bold', 
        color:'#0ABAB5', 
        fontSize:22
    }
  });