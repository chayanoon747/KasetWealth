import { View, Text, TouchableOpacity, Image, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { TextInput} from "react-native-paper";
import { Dimensions, TouchableHighlight} from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import { useState, useEffect } from "react";
import { addPetName } from "../../firebase/UserModel";
import { setIsUpdate } from "../../redux/variableSlice";
import { retrieveAllDataPetImage } from "../../firebase/UserModel";

export const EnterNameScreen = ({navigation})=>{
    const dispatch = useDispatch()
    const [input,setInput] = useState({value:''})

    const isUpdate = useSelector((state)=>state.variables.isUpdate);

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const [petImageData, setPetImageData] = useState("")

    useEffect(() => {
        getImageData()
    }, [isUpdate]);   

    const getImageData = async()=>{
        try{
            const itemAllDataPetImage = await retrieveAllDataPetImage(userUID)
            setPetImageData(itemAllDataPetImage)
            
        }catch (error) {
            console.error('Error getImageData:', error);
        }  
    }

    const setValue = (text) => {
        setInput(oldValue => ({
            ...oldValue,
            value:text
        }))
    }
    /*
    const handleAddPetName = () => {
        const sort = /^[a-zA-Z\s]*$/; 
        if (!input.value.trim()) {
            Alert.alert('กรุณาระบุชื่อ');
        } else if (!sort.test(input.value)) {
            Alert.alert('ชื่อควรประกอบด้วยตัวอักษรเท่านั้น');
        } else {
            const value = input.value;
            //console.log(value);
    
            addPetName(userUID, input)
                .then(() => {
                    dispatch(setIsUpdate(!isUpdate));
    
                    setTimeout(() => {
                        //setIsLoading(false);
                        navigation.navigate('ExpainingScreen');
                        console.log(`ชื่อ: ${value}`);
                        console.log(`userUID: ${userUID}`);
                    }, 700);
                });
        }
    };
    */
    const handleAddPetName = () => {
        if(input.value == ""){
            Alert.alert('กรุณาระบุชื่อ')
        }else{
            const value = input.value
            //console.log(value)
            addPetName(userUID, input)
            .then(()=>{
                dispatch(setIsUpdate(!isUpdate))
                    
                setTimeout(() => {
                    //setIsLoading(false);
                    navigation.navigate('ExpainingScreen')
                    console.log(`pet name: ${value}`);
                    console.log(`userUID: ${userUID}`);
                }, 700);
            })
        }
    };
    
    return(
       <SafeAreaView style={{flex:1, backgroundColor:'#2C6264'}}>

            <View  style={{flex: 1,justifyContent:'center',alignContent:'center',flexDirection:'row'}} >
                <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:36, color:'#FFFFFF',
                textAlign:'center', paddingHorizontal:70, paddingTop:80}}>นี้คืออสูรเงินฝากของคุณ!</Text> 
            </View>

            <View style={{flex: 1,justifyContent:'Top',alignContent:'Top',flexDirection:'column'}} > 
                    <View style={{justifyContent:'center',alignContent:'center',flexDirection:'row'}}>
                        <View style = {{
                             borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                             borderWidth:6, borderColor:'#0ABAB5',
                             width: Dimensions.get('window').width * 0.5,
                             height: Dimensions.get('window').width * 0.5,
                              backgroundColor:'#FFFFFF',
                              justifyContent: "center",
                            alignItems: "center",
                            shadowColor : '#FFFFFF',
                            shadowOffset: {
                                width: 0,
                                height: 9,
                            },
                            shadowOpacity: 0.48,
                            shadowRadius: 11.95,
                            elevation: 18
                         }}
                        >                       
                        {petImageData ? (
                            <Image source={{uri: petImageData[0]}} 
                            style={{width: 250, height:250,justifyContent:'center',alignContent:'center'}} />
                        ) : null}
                        </View>
                    </View>
            </View>

            <View  style={{flex: 1,justifyContent:'center',alignContent:'center',flexDirection:'row', borderWidth:1, 
            borderColor:'#000000',backgroundColor:'#0ABAB5'}} >
                <View style={{flex:1, borderWidth:1, borderColor:'#000000', borderRadius:15, marginVertical:12,
                marginHorizontal : 5, backgroundColor:'#ffffff'}}>
                    <View style={{flex:1, flexDirection:'column', alignItems:'center', paddingHorizontal:10, paddingTop:1}}>
                        <Text style={{flex:1,fontFamily:'ZenOldMincho-Regular', fontSize:24, color:'#000000',textAlign:'center', 
                        textAlignVertical:'center'}}>อยากตั้งชื่ออะไรดีละ!</Text> 
                        <View style={{flex:1,borderWidth:1, borderColor:'#000000', borderRadius:15, marginVertical:12,
                        marginHorizontal : 5, backgroundColor:'#ffffff'}}>
                            <TextInput style={{height:50,width :250,borderRadius:16, backgroundColor:'#ffffff', borderTopLeftRadius:16, 
                            borderTopRightRadius:16}} 
                                placeholder='Name*' 
                                placeholderTextColor="rgba(0, 0, 0, 0.3)" 
                                keyboardType='default' 
                                underlineColor='transparent' 
                                activeUnderlineColor="transparent" 
                                cursorColor="gray"
                                value={input.value}
                                onChangeText={(text)=>{setValue(text)}} 
                            >
                            </TextInput>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity style={{flex:1}} 
                                 onPress={handleAddPetName}
                                >
                               <Text style={{fontFamily:'ZenOldMincho-Black', fontSize:20, color:'#0ABAB5',textAlign:'right', paddingTop:20}}>Confirm</Text> 
                             </TouchableOpacity>
                        </View>

                    </View>
                    
                </View>
            </View>
            
            
       </SafeAreaView>
    )
}