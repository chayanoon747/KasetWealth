import { View, Text, Image, TouchableOpacity,ScrollView, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AssetLiabilityDetailScreen } from "./AssetLiabilityDetailScreen";
import { useDispatch } from "react-redux";
import { setItemTransactionType } from "../../redux/variableSlice";
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
                        <Text>AAAAAAA</Text>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        <Text>AAAAAA</Text>
                        
                    </View>
                </View>
                
                <View style={{height:915, borderRadius:16,borderWidth:1, borderColor:'#A9A9A9', marginBottom:10}}> 
                    <TouchableOpacity style={{height:65, borderTopLeftRadius:15, borderTopRightRadius:15, justifyContent:'center', paddingLeft:15, backgroundColor:'#B3DBD8'}}>
                        <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:16, color:'#000000'}}>ความมั่งคั่งในปัจจุบัน</Text>
                    </TouchableOpacity>
                    <View style={{overflow:'hidden',height:200, backgroundColor:'#FFFFFA',borderBottomWidth:1,borderColor:'#D2DBD6', borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
                        <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:30, paddingTop:20}}>
                            <Text style={styles.subHeaderText}> ความมั่งคั่งสุทธิ </Text>
                            <Text style={[styles.descibeText,{flex:1, paddingHorizontal:5,paddingTop:3, textAlign:'left'}]}>(สินทรัพย์รวม - หนี้สินรวม)</Text>
                         </View>
                        <View style={{flex:5, flexDirection:'column', paddingHorizontal:10}}>

                            <View style={{flex:1,paddingHorizontal:20, flexDirection:'row',textAlign:'left', paddingTop:1}}>
                                    <Text style={{flex:1, color:'#0ABAB5', fontFamily:'ZenOldMincho-Bold', fontSize:30}}>1,532,000</Text>
                                   {/*  <Text style={{flex:1, color:'#0ABAB5', fontFamily:'ZenOldMincho-Bold', fontSize:18, paddingTop:14}}>THB</Text> */}
                                    <Image source={require('../../assets/overview_1.png')} style={{width: 100, height:100}} />
                            </View>

                            <View style={{flex:2,paddingHorizontal:20, flexDirection:'row',textAlign:'left', paddingTop:1}}>
                                <Text style={{flex:1, color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> จากเกณฑ์ ควรเป็นค่า บวก </Text>
                            </View>
{/*                             <View style={{flex:1,paddingHorizontal:20, flexDirection:'row',textAlign:'left', paddingTop:1}}>
                                <Text style={{flex:1, color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> คุณมีเงินออมต่อเดือนอยู่ในเกณฑ์ ดี ซึ่งเงินออมก้อนนี้ ถือเป็นรากฐานสำคัญที่ จะนำไปใช้เพื่อต่อยอดความมั่งคั่งในอนาคตได้ </Text>
                            </View> */}
                        </View>                
                    </View>

                    <View style={{overflow:'hidden',height:210, backgroundColor:'#FFFFFA',borderBottomWidth:1,borderColor:'#D2DBD6', borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
                        <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:30, paddingTop:20}}>
                            <Text style={[styles.descibeText,{flex:1, paddingHorizontal:5,paddingTop:3, textAlign:'right'}]}>(รายได้รวม - ค่าใช้จ่ายรวม)</Text>
                            <Text style={styles.subHeaderText}> กระแสเงินสดสุทธิ </Text>
                         </View>
                        <View style={{flex:5, flexDirection:'column', paddingHorizontal:10}}>

                            <View style={{flex:1,paddingHorizontal:20, flexDirection:'row',textAlign:'right', paddingTop:1}}>
                                <Image source={require('../../assets/overview_2.png')} style={{width: 100, height:100}} />
                                <Text style={{flex:6, color:'#0ABAB5', fontFamily:'ZenOldMincho-Bold', fontSize:30,paddingTop:3, textAlign:'right'}}>8,207</Text>
                            </View>

                            <View style={{flex:2,paddingHorizontal:20, flexDirection:'row',textAlign:'right', paddingTop:1}}>
                                    <Text style={{flex:4, color:'#000000',fontFamily:'ZenOldMincho-Regular', fontSize:12,paddingTop:8, textAlign:'right'}}>จากเกณฑ์ ควรเป็นค่า บวก</Text>
                            </View>

{/*                             <View style={{flex:1,paddingHorizontal:20, flexDirection:'row',textAlign:'left', paddingTop:1}}>
                                <Text style={{flex:1, color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ปัจจุบันกระแสเงินสดสุทธิของคุณอยู่ในเกณฑ์ ดี เพราะคุณมีรายได้รวมมากกว่า
                                ค่าใช้จ่ายรวม ทำให้คุณมีเงินเหลือ และมีโอกาสในการนำเงินส่วนนี้ไปลงทุนเพื่อต่อ
                                ยอดความมั่งคั่งได้ในอนาคต</Text>
                            </View> */}
                        </View>                
                    </View>

                    <View style={{overflow:'hidden',height:200, backgroundColor:'#FFFFFA',borderBottomWidth:1,borderColor:'#D2DBD6', borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
                        <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:30, paddingTop:20}}>
                            <Text style={styles.subHeaderText}> อัตราส่วนความอยู่รอด </Text>
                            <Text style={[styles.descibeText,{flex:1, paddingHorizontal:5,paddingTop:3, textAlign:'left'}]}>(รายได้จากการทำงาน+รายได้จากสินทรัพย์)/ค่าใช้จ่ายรวม)</Text>
                         </View>
                        <View style={{flex:5, flexDirection:'column', paddingHorizontal:10}}>

                            <View style={{flex:1,paddingHorizontal:20, flexDirection:'row',textAlign:'left', paddingTop:1}}>   
                                    <Text style={{flex:1, color:'#0ABAB5', fontFamily:'ZenOldMincho-Regular', fontSize:30}}>5.87 เท่า </Text>
                                    <Image source={require('../../assets/overview_3.png')} style={{width: 100, height:100}} />
                            </View>

                            <View style={{flex:2,paddingHorizontal:20, flexDirection:'row',textAlign:'left', paddingTop:1}}>
                                <Text style={{flex:1, color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> จากเกณฑ์ ควร มากกว่าหรือเท่ากับ 1 เท่า ของค่าใช้จ่ายรวม </Text>

                                <Text style={{flex:1, color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> </Text>
                            </View>
{/*                             <View style={{flex:1,paddingHorizontal:20, flexDirection:'row',textAlign:'left', paddingTop:1}}>
                                <Text style={{flex:1, color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ปัจจุบันอัตราส่วนความอยู่รอดของคุณอยู่ในเกณฑ์ ดี เพราะคุณมี รายได้จากการ
                                ทำงานรวมกับรายได้จากสินทรัพย์ที่มากกว่าค่าใช้จ่ายรวม ทำให้คุณสามารถอยู่รอด
                                ได้  </Text>
                            </View> */}
                        </View>                
                    </View>

                    <View style={{overflow:'hidden',height:235, backgroundColor:'#FFFFFA', borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
                        <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:30, paddingTop:20}}>
                            <Text style={[styles.descibeText,{flex:1, paddingHorizontal:5,paddingTop:3, textAlign:'right'}]}>(รายได้จากสินทรัพย์/ค่าใช้จ่ายรวม)</Text>
                            <Text style={styles.subHeaderText}> อัตราส่วนความมั่งคั่ง </Text>
                         </View>
                        <View style={{flex:5, flexDirection:'column', paddingHorizontal:10}}>

                            <View style={{flex:1,paddingHorizontal:20, flexDirection:'row',textAlign:'right', paddingTop:1}}>
                                    <Image source={require('../../assets/overview_4.png')} style={{width: 100, height:100}} />
                                    <Text style={{flex:6, color:'#FE0000', fontFamily:'ZenOldMincho-Regular', fontSize:30,paddingTop:3, textAlign:'right'}}>0 เท่า</Text>
                            </View>

                            <View style={{flex:2,paddingHorizontal:20, flexDirection:'row',textAlign:'right', paddingTop:1}}>
                                <Text style={{flex:4, color:'#000000',fontFamily:'ZenOldMincho-Regular', fontSize:12,paddingTop:8, textAlign:'right'}}></Text>
                                <Text style={{flex:4, color:'#000000',fontFamily:'ZenOldMincho-Regular', fontSize:12,paddingTop:8, textAlign:'right'}}>จากเกณฑ์ ควร มากกว่าหรือเท่ากับ 1 เท่า ของค่าใช้จ่ายรวม</Text>
                            </View>
{/*                             <View style={{flex:1,paddingHorizontal:20, flexDirection:'row',textAlign:'left', paddingTop:1}}>
                                <Text style={{flex:1, color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ปัจจุบันอัตราส่วนความมั่งคั่งของคุณอยู่ในเกณฑ์ แย่ เพราะคุณไม่มีรายได้จาก
สินทรัพย์เลย ซึ่งหากคุณหยุดทำงานเมื่อไหร่ คุณก็มีโอกาสประสบปัญหาทาง
การเงินได้</Text>
                            </View> */}
                        </View>                
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

const styles = StyleSheet.create({
    headerText:{
        fontFamily:'ZenOldMincho-Bold',
        fontSize:16,
        color:'#000000'
    },

    subHeaderText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:14,
        color:'#000000'
    },

    bodyText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:14,
        color:'#000000'
    },
    
    descibeText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:10,
        color:'#A9A9A9'
    }
})
