import { View, Text, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const EnterPetScreen = ({navigation})=>{
    return(
       <SafeAreaView style={{flex:1, backgroundColor:'#0ABAB5'}}>
            <View style={{flex:1, alignItems:'flex-end', padding:'3%'}}>
                <TouchableOpacity style={{flex:1}} 
                    onPress={()=>{
                        navigation.goBack();
                    }}
                >
                    <Image source={require('../../assets/exitIcon.png')}></Image>
                </TouchableOpacity>
                
            </View>
            <View style={{flex:16, margin:5, backgroundColor:'#ffffff', borderRadius:12}}>
                
            </View>
            
       </SafeAreaView>
    )
}