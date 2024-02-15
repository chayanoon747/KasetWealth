import { View, Text, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dimensions, TouchableHighlight} from 'react-native';
import { PetBottomTabNav } from "../../navigators/PetBottomTabNav";


export const ExpainingScreen = ({navigation})=>{
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#0ABAB5'}}>
             <View style={{flex:1,alignItems:'flex-end', padding:'2%'}}>
 
                 
             </View>
 
             <View  style={{flex: 5,justifyContent:'center',alignContent:'center',flexDirection:'row'}} >
                 <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:36, color:'#FFFFFF',textAlign:'center', paddingHorizontal:70, paddingTop:80}}>นี้คืออสูรเงินฝากของคุณ!</Text> 
             </View>
 
             <View style={{flex: 5,justifyContent:'Top',alignContent:'Top',flexDirection:'column'}} > 
                     <View style={{justifyContent:'center',alignContent:'center',flexDirection:'row'}}>
                         <View style = {{
                              borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                              borderWidth:6, borderColor:'#0ABAB5',
                              width: Dimensions.get('window').width * 0.5,
                              height: Dimensions.get('window').width * 0.5,
                               backgroundColor:'#FFFFFF',
                               justifyContent: "center",
                                 alignItems: "center"
                          }}
                         >                       
                         <Image source={require('../../assets/petAssets/Pet_7.png')} style={{width: 250, height:250,justifyContent:'center',alignContent:'center'}} />
 
                         </View>
                    
                     
                      
 
                     </View>
             </View>
 
             <View  style={{flex: 5,justifyContent:'center',alignContent:'center',flexDirection:'row', borderWidth:1, borderColor:'#000000',backgroundColor:'#2C6264'}} >
                <TouchableOpacity style={{flex:1}} 
                    onPress={()=>{
                    navigation.navigate('PetBottomTabNav');
                    }}
                    >
                    <View style={{flex:1, borderWidth:1, borderColor:'#000000', borderRadius:15, marginVertical:12,marginHorizontal : 5, backgroundColor:'#ffffff'}}>
                     <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingHorizontal:60, paddingTop:1}}>
                         <Text style={{fontFamily:'ZenOldMincho-Regular', fontSize:24, color:'#000000',textAlign:'center'}}>ภารกิจของคุณคือทำ Quest ในแต่ละวันเพื่ออัปเกรดอสูรของคุณ</Text> 
                         <Text style={{fontFamily:'ZenOldMincho-Regular', fontSize:20, color:'#0ABAB5',textAlign:'right',paddingTop:150}}>Next..</Text> 
                     </View>      
                 </View>
                     
                </TouchableOpacity>
                 
             </View>
             
             
        </SafeAreaView>
     )
}