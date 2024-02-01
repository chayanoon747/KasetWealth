import { View, Text, Image, ScrollView, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from 'react-redux'

export const OverviewScreen = ()=>{
    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;
    console.log(userUID);
    
    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{flex:1, padding:10}}>
                <View style={{height:200, borderRadius:16,borderWidth:1, borderColor:'#A9A9A9', marginBottom:10}}>
                    <TouchableOpacity style={{height:50, borderTopLeftRadius:15, borderTopRightRadius:15, justifyContent:'center', paddingLeft:20, backgroundColor:'#B3DBD8'}}>
                        <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:14, color:'#000000'}}>สุขภาพทางการเงิน</Text>
                        
                    </TouchableOpacity>
                    <View style={{overflow:'hidden',height:148, backgroundColor:'#FFFFFA', borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        
                    </View>
                </View>
                
                <View style={{height:200, borderRadius:16,borderWidth:1, borderColor:'#A9A9A9', marginBottom:10}}>
                    <TouchableOpacity style={{height:50, borderTopLeftRadius:15, borderTopRightRadius:15, justifyContent:'center', paddingLeft:20, backgroundColor:'#B3DBD8'}}>
                        <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:14, color:'#000000'}}>ความมั่งคั่งในปัจจุบัน</Text>
                    </TouchableOpacity>
                    <View style={{overflow:'hidden',height:148, backgroundColor:'#FFFFFA', borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        
                    </View>
                </View>

                <View style={{height:300, backgroundColor:'blue'}}>

                </View>
                <View style={{height:500, backgroundColor:'purple'}}>

                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}