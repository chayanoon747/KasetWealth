import { View, Text, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { TextInput} from "react-native-paper";
import { Dimensions, TouchableHighlight} from 'react-native';


export const EnterNameScreen = ({navigation})=>{
    return(
       <SafeAreaView style={{flex:1, backgroundColor:'#2C6264'}}>

            <View  style={{flex: 1,justifyContent:'center',alignContent:'center',flexDirection:'row'}} >
                <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:36, color:'#FFFFFF',textAlign:'center', paddingHorizontal:70, paddingTop:80}}>นี้คืออสูรเงินฝากของคุณ!</Text> 
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
                        <Image source={require('../../assets/petAssets/Pet_7.png')} style={{width: 250, height:250,justifyContent:'center',alignContent:'center'}} />

                        </View>
                    </View>
            </View>

            <View  style={{flex: 1,justifyContent:'center',alignContent:'center',flexDirection:'row', borderWidth:1, borderColor:'#000000',backgroundColor:'#0ABAB5'}} >
                <View style={{flex:1, borderWidth:1, borderColor:'#000000', borderRadius:15, marginVertical:12,marginHorizontal : 5, backgroundColor:'#ffffff'}}>
                    <View style={{flex:1, flexDirection:'column', alignItems:'center', paddingHorizontal:10, paddingTop:1}}>
                        <Text style={{flex:1,fontFamily:'ZenOldMincho-Regular', fontSize:24, color:'#000000',textAlign:'center', textAlignVertical:'center'}}>อยากตั้งชื่ออะไรดีละ!</Text> 
                        <View style={{flex:1,borderWidth:1, borderColor:'#000000', borderRadius:15, marginVertical:12,marginHorizontal : 5, backgroundColor:'#ffffff'}}>
                            <TextInput style={{height:50,width :250,borderRadius:16, backgroundColor:'#ffffff', borderTopLeftRadius:16, borderTopRightRadius:16}} 
                                placeholder='Name*' placeholderTextColor="rgba(0, 0, 0, 0.3)" keyboardType='default' underlineColor='transparent' activeUnderlineColor="transparent" cursorColor="gray"
                            >
                            </TextInput>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity style={{flex:1}} 
                                 onPress={()=>{
                                 navigation.navigate('ExpainingScreen');
                                 }}
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