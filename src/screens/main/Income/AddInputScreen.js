import { View, Text, Image, TouchableOpacity, StyleSheet, Alert} from "react-native";
import { ScrollView } from "react-native";
import { TextInput, ActivityIndicator, Checkbox } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";
import { setIsUpdate, setItemPhotoURL } from "../../../redux/variableSlice";
import { addCategories, addTransaction, addTransactionLiability, addTransactionExpenses } from "../../../firebase/UserModel";
import { useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from "react";
import { retrieveAllData } from "../../../firebase/RetrieveData";

export const AddInputScreen = ({ navigation })=>{
    const dispatch = useDispatch()
    //itemData มี category,subcategory,url
    const itemData = useSelector((state)=>state.variables.itemData); 
    //console.log(itemData);
    
    const selectedDate = useSelector((state)=>state.variables.selectedDate);
    //console.log(selectedDate);

    const transactionType = useSelector((state)=>state.variables.transactionType);

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const isUpdate = useSelector((state)=>state.variables.isUpdate);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เนื่องจาก getMonth() เริ่มจาก 0
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const [input,setInput] = useState({detail:'',value:''})

    const [isLoading, setIsLoading] = useState(false)

    const [checkBoxVariableExpenses, setCheckBoxVariableExpenses] = useState(false)
    const [checkBoxFixedExpenses, setCheckBoxFixedExpenses] = useState(false)

    ///ทำเพิ่ม by sam เพื่อไว้เช็ค isFirstTransaction ไว้เช็คในการทำคะแนนความน่าเชื่อถือ
    const [isFirstTransaction,setIsFirstTransaction] = useState();
    
    useEffect(()=>{
        getIsFirstTransactionData()
    },[isFirstTransaction])
    const getIsFirstTransactionData = async()=>{
        const itemsdata = await retrieveAllData(userUID);
        setIsFirstTransaction(itemsdata.isFirstTransaction)
        console.log("don't first transaction: "+isFirstTransaction)
    }

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

    const handleTypeTransaction = ()=>{
        if(transactionType == 'หนี้สิน'){
            handleAddTransactionLiability()
        }
        else if(itemData.category == 'ค่าใช้จ่ายผันแปร(ชำระหนี้)' || itemData.category == 'ค่าใช้จ่ายคงที่(ชำระหนี้)'){
            handleAddTransactionExpenses()
        }
        else{
            handleAddTransaction()
        }
    }

    const handleAddTransaction = ()=>{
        //input มี 2 key คือ value กับ details
        setIsLoading(true)

        let validateInput = true;
        let validateTypeInput = true;
        let validateValueMaxLimitInput = true;
        let validateValueMinLimitInput = true;
        let validateValueFixedDecimal = true;

        if(input.value == ""){
            validateInput = false
            Alert.alert('กรุณาระบุจำนวนเงิน')
            setIsLoading(false)
            return;
        }
        
        if(isNaN(input.value)){
            validateTypeInput = false
            Alert.alert('กรุณากรอกเป็นตัวเลข')
            setIsLoading(false)
            return;
        }

        if(input.value >= 1000000){
            validateValueMaxLimitInput = false
            Alert.alert('กรุณากรอกจำนวนเงินไม่เกิน 100,000,000')
            setIsLoading(false)
            return;
        }

        if(input.value <= 0){
            validateValueMinLimitInput = false
            Alert.alert('กรุณากรอกเลขที่มากกว่า 0')
            setIsLoading(false)
            return;
        }

        if(input.value.toString().includes(".")){
            let decimalPlaces = input.value.toString().split('.')[1].length;
            if(decimalPlaces > 2){
                validateValueFixedDecimal = false
                Alert.alert('กรุณาป้อนทศนิยมไม่เกิน 2 ตำแหน่ง')
                return;
            }
        }

        if(validateInput && validateTypeInput && validateValueMaxLimitInput&& validateValueMinLimitInput && validateValueFixedDecimal){
            if(selectedDate == ""){ //formattedDate กรณีที่ user ไม่ได้เลือกวันที่ เป็นวันที่ปัจจุบัน
                addTransaction(userUID,itemData, input, formattedDate,isFirstTransaction)
                .then(()=>{
                    dispatch(setIsUpdate(!isUpdate))

                    setTimeout(() => {
                        navigation.navigate('FinancialScreen')
                    }, 800);
                }) 
            }else{          //กรณีวันที่มีค่า ก็จะรับ set ค่าตาม user
                addTransaction(userUID,itemData, input, selectedDate,isFirstTransaction)
                .then(()=>{
                    dispatch(setIsUpdate(!isUpdate))

                    setTimeout(() => {
                        navigation.navigate('FinancialScreen')
                    }, 800);
                })
            }
        }
    }

    const handleAddTransactionLiability = ()=>{
        //input มี 2 key คือ value กับ details
        setIsLoading(true)

        let validateInput = true;
        let validateTypeInput = true;
        let validateCheckboxExpenses = true;

        if(input.value == ""){
            validateInput = false
            Alert.alert('กรุณาระบุจำนวนเงิน')
            setIsLoading(false)
            return;
        }
        
        if(isNaN(input.value)){
            validateTypeInput = false
            Alert.alert('กรุณากรอกเป็นตัวเลข')
            setIsLoading(false)
            return;
        }
        if(!checkBoxVariableExpenses && !checkBoxFixedExpenses){
            validateCheckboxExpenses = false
            Alert.alert(
                'แจ้งเตือน!',
                'กรุณาเลือกหัวข้อสำหรับการสร้างหัวการชำระหนี้สินว่าเป็นค่าใช้จ่ายประเภทใด',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')}
                ],
                {cancelable: false}
            );
            
            setIsLoading(false)
            return;
        }

        if(validateInput && validateTypeInput && validateCheckboxExpenses){
            if(selectedDate == ""){ //formattedDate กรณีที่ user ไม่ได้เลือกวันที่ เป็นวันที่ปัจจุบัน
                if(checkBoxVariableExpenses){
                    addTransactionLiability(userUID,itemData, input, formattedDate, 'ค่าใช้จ่ายผันแปร','ค่าใช้จ่ายผันแปร(ชำระหนี้)', `ชำระหนี้${itemData.subCategory}`,isFirstTransaction)
                    .then(()=>{
                        dispatch(setIsUpdate(!isUpdate))
                            
                        setTimeout(() => {
                            navigation.navigate('FinancialScreen')
                        }, 800);
                    })
                }else{
                    addTransactionLiability(userUID,itemData, input, formattedDate, 'ค่าใช้จ่ายคงที่','ค่าใช้จ่ายคงที่(ชำระหนี้)', `ชำระหนี้${itemData.subCategory}`,isFirstTransaction)
                    .then(()=>{
                        dispatch(setIsUpdate(!isUpdate))
                            
                        setTimeout(() => {
                            navigation.navigate('FinancialScreen')
                        }, 800);
                    })
                }
            }else{          //กรณีวันที่มีค่า ก็จะรับ set ค่าตาม user
                if(checkBoxVariableExpenses){
                    addTransactionLiability(userUID,itemData, input, selectedDate, 'ค่าใช้จ่ายผันแปร', `ชำระหนี้${itemData.subCategory}`,isFirstTransaction)
                    .then(()=>{
                        
                        dispatch(setIsUpdate(!isUpdate))
                            
                        setTimeout(() => {
                            navigation.navigate('FinancialScreen')
                        }, 800);
                    })
                }else{
                    addTransactionLiability(userUID,itemData, input, selectedDate, 'ค่าใช้จ่ายคงที่', `ชำระหนี้${itemData.subCategory}`,isFirstTransaction)
                    .then(()=>{
                        
                        dispatch(setIsUpdate(!isUpdate))
                            
                        setTimeout(() => {
                            navigation.navigate('FinancialScreen')
                        }, 800);
                    })
                }
            }
        }
    }

    const handleAddTransactionExpenses = ()=>{
        setIsLoading(true)

        let validateInput = true;
        let validateTypeInput = true;

        if(input.value == ""){
            validateInput = false
            Alert.alert('กรุณาระบุจำนวนเงิน')
            setIsLoading(false)
            return;
        }
        
        if(isNaN(input.value)){
            validateTypeInput = false
            Alert.alert('กรุณากรอกเป็นตัวเลข')
            setIsLoading(false)
            return;
        }

        if(validateInput && validateTypeInput){
            if(selectedDate == ""){ //formattedDate กรณีที่ user ไม่ได้เลือกวันที่ เป็นวันที่ปัจจุบัน
                addTransactionExpenses(userUID,itemData, input, formattedDate)
                .then(()=>{
                    dispatch(setIsUpdate(!isUpdate))

                    setTimeout(() => {
                        navigation.navigate('FinancialScreen')
                    }, 800);
                }) 
            }else{          //กรณีวันที่มีค่า ก็จะรับ set ค่าตาม user
                addTransactionExpenses(userUID,itemData, input, selectedDate)
                .then(()=>{
                    dispatch(setIsUpdate(!isUpdate))

                    setTimeout(() => {
                        navigation.navigate('FinancialScreen')
                    }, 800);
                })
            }
        }
    }

    const componentCheckBoxRepayDebt = ()=>{
        return(
            <View style={{flex:1}}>
                <Text style={{color:'#FF0000'}}>*ระบบจะทำการสร้างหัวข้อสำหรับการชำระหนี้สินของรายการนี้ โปรดระบุว่าเป็นค่าใช้จ่ายแบบใด</Text>
                <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <View style={{flex:2, flexDirection:'row'}}>
                            <Checkbox style={{flex:1}}
                                status={checkBoxVariableExpenses ? 'checked' : 'unchecked'}
                                onPress={()=>{
                                    setCheckBoxVariableExpenses(!checkBoxVariableExpenses);
                                    if(checkBoxFixedExpenses){
                                        setCheckBoxFixedExpenses(false)
                                    }
                                }}  
                                color="#0ABAB5"
                            />
                            <Text style={{flex:1, textAlignVertical:'center', color:checkBoxVariableExpenses ? '#0ABAB5' : 'gray'}}>ค่าใช้จ่ายผันแปร</Text>
                        </View>
                    </View>

                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <View style={{flex:2, flexDirection:'row'}}>
                            <Checkbox style={{flex:1}}
                                status={checkBoxFixedExpenses ? 'checked' : 'unchecked'}
                                onPress={()=>{
                                    setCheckBoxFixedExpenses(!checkBoxFixedExpenses);
                                    if(checkBoxVariableExpenses){
                                        setCheckBoxVariableExpenses(false)
                                    }
                                }}  
                                color="#0ABAB5"
                            />
                            <Text style={{flex:1, textAlignVertical:'center', color:checkBoxFixedExpenses ? '#0ABAB5' : 'gray'}}>ค่าใช้จ่ายคงที่</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return(
        <ScrollView style={{ backgroundColor:'#fffffa', paddingHorizontal:20}}>
            {isLoading ? (<ActivityIndicator size='large' color="#0ABAB5" style={{marginVertical:'60%'}}></ActivityIndicator>) : (
            <View style={{flex:1}}>
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
                {transactionType == 'หนี้สิน' ? componentCheckBoxRepayDebt() : <View></View>}
                
                
    {/* ปุ่มบันทึก */}
                <View style={{height:100, justifyContent:'center', paddingHorizontal:3}}>
                    <Shadow  style={{width:'100%', height:50}} distance={5} startColor={'#0ABAB5'} offset={[2, 4]}>
                        <TouchableOpacity style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center', borderRadius:16, borderWidth:1, borderColor:'#0ABAB5', backgroundColor:'#ffffff'}}
                            onPress={()=>{
                                handleTypeTransaction()
                            }}
                        >
                            <Text style={{fontFamily:'ZenOldMincho-Bold', color:'#0ABAB5', fontSize:22}}>บันทึกรายการ</Text>
                        </TouchableOpacity>
                    </Shadow>
                </View>
            </View>
           )}
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