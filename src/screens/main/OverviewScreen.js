import { View, Text, Image, TouchableOpacity,ScrollView, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AssetLiabilityDetailScreen } from "./AssetLiabilityDetailScreen";
import { useDispatch } from "react-redux";
import { setItemTransactionType } from "../../redux/variableSlice";
import { useSelector } from 'react-redux'
import RNSpeedometer from 'react-native-speedometer';


export const OverviewScreen = ({navigation})=>{
    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;
    console.log(userUID);
    
    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{flex:1, padding:10}}>
                <View style={{height:295, borderRadius:16,borderWidth:1,backgroundColor:'#FFFFFA', borderColor:'#A9A9A9', marginBottom:10}}>
                    <TouchableOpacity style={{height:65, borderTopLeftRadius:15, borderTopRightRadius:15, justifyContent:'center', paddingLeft:20, backgroundColor:'#B3DBD8'}}
                        onPress={()=>{
                            navigation.navigate('OverviewGuideScreen')
                        }}
                    >
                        <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:16, color:'#000000'}}>สุขภาพทางการเงิน</Text>  
                    </TouchableOpacity>
                    <View style={{overflow:'hidden',borderColor:'#cfd0cf',marginHorizontal:10}}>
                        <View style={{height:10}}></View>
                        <View style={{justifyContent:'center',alignContent:'center',flexDirection:'row'}}>
                            <View style={{justifyContent:'center',alignContent:'center',flexDirection:'column'}}>
                                <Text style={{fontFamily:'ZenOldMincho-Regular',fontSize:14,textAlign:'center'}}>*ควรใส่ข้อมูลในทุกๆ 3 วัน</Text>
                                {/* GAUGE  */}
                                <RNSpeedometer value={5.5} size={150} minValue={0} maxValue={10} allowedDecimals={1} labels={[
                                    {name:'1',labelColor:'#FFFFFA',activeBarColor:'#80011f'},
                                    {name:'2',labelColor:'#FFFFFA',activeBarColor:'#cf1020'},
                                    {name:'3',labelColor:'#FFFFFA',activeBarColor:'#fb0100'},
                                    {name:'4',labelColor:'#FFFFFA',activeBarColor:'#e34928'},
                                    {name:'5',labelColor:'#FFFFFA',activeBarColor:'#fe7e00'},
                                    {name:'6',labelColor:'#FFFFFA',activeBarColor:'#fec30b'},
                                    {name:'7',labelColor:'#FFFFFA',activeBarColor:'#ffe135'},
                                    {name:'8',labelColor:'#FFFFFA',activeBarColor:'#dffe00'},
                                    {name:'9',labelColor:'#FFFFFA',activeBarColor:'#a4c739'},
                                    {name:'10',labelColor:'#FFFFFA',activeBarColor:'#76ab56'}]}
                                    />
                                <View style={{height:30}}></View>
                                <Text style={{fontFamily:'ZenOldMincho-Regular',fontSize:14,textAlign:'center'}}>สุขภาพการเงิน</Text>
                            </View>
                            <View style={{width:30}}></View>
                            <View style={{justifyContent:'center',alignContent:'center',flexDirection:'column'}}>
                                <Text style={{fontFamily:'ZenOldMincho-Regular',fontSize:14,textAlign:'center'}}>*ควรใส่ข้อมูลในทุกๆ 3 วัน</Text>
                                {/* GAUGE  */}
                                <RNSpeedometer value={2} size={150} minValue={0} maxValue={10} allowedDecimals={1} labels={[
                                    {name:'1',labelColor:'#FFFFFA',activeBarColor:'#08f26e'},
                                    {name:'2',labelColor:'#FFFFFA',activeBarColor:'#06c258'},
                                    {name:'3',labelColor:'#FFFFFA',activeBarColor:'#06a94d'}]}
                                    />
                                <View style={{height:30}}></View>
                                <Text style={{fontFamily:'ZenOldMincho-Regular',fontSize:14,textAlign:'center'}}>ความน่าเชื่อถือ</Text>
                            </View>
                        </View>
                        
                        <View style={{height:20}}></View>
                        
                        <Text style={{fontFamily:'ZenOldMincho-Regular',fontSize:16}}>สุขภาพการเงินของคุณ มีคะแนน</Text>
                        <Text style={{fontFamily:'ZenOldMincho-Bold',fontSize:16,fontWeight:'bold',color:'#0ABAB5'}}>อยู่ในเกณฑ์</Text>
                        
                    </View>
                </View>
                
                {/* ความมั่งคั่งในปัจจุบัน */}
                <View style={{height:677, borderRadius:16,borderWidth:1, borderColor:'#A9A9A9', marginBottom:10}}> 
                    <TouchableOpacity style={{height:65, borderTopLeftRadius:15, borderTopRightRadius:15, justifyContent:'center', paddingLeft:15, backgroundColor:'#B3DBD8'}}>
                        <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:16, color:'#000000'}}>ความมั่งคั่งในปัจจุบัน</Text>
                    </TouchableOpacity>
                    <View style={{overflow:'hidden',height:200, backgroundColor:'#FFFFFA',borderBottomWidth:1,borderColor:'#D2DBD6'}}>
                        <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:30, paddingTop:20}}>
                            <Text style={styles.subHeaderText}> ความมั่งคั่งสุทธิ </Text>
                            <Text style={[styles.descibeText,{flex:1, paddingHorizontal:5,paddingTop:3, textAlign:'left'}]}>(สินทรัพย์รวม - หนี้สินรวม)</Text>
                         </View>
                        <View style={{flex:5, flexDirection:'column', paddingHorizontal:10}}>

                            <View style={{flex:1,paddingHorizontal:20, flexDirection:'row',textAlign:'left', paddingTop:1}}>
                                    <Text style={{flex:1, color:'#0ABAB5', fontFamily:'ZenOldMincho-Bold', fontSize:30}}>1,532,000</Text>
                                    <Image source={require('../../assets/overview_1.png')} style={{width: 100, height:100}} />
                            </View>

                            <View style={{flex:2,paddingHorizontal:20, flexDirection:'row',textAlign:'left', paddingTop:1}}>
                                <Text style={{flex:1, color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> จากเกณฑ์ ควรเป็นค่า บวก </Text>
                            </View>                          
                        </View>                
                    </View>

                    <View style={{overflow:'hidden',height:210, backgroundColor:'#FFFFFA',borderBottomWidth:1,borderColor:'#D2DBD6'}}>
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

                    <View style={{overflow:'hidden',height:200, backgroundColor:'#FFFFFA',borderBottomWidth:1,borderColor:'#D2DBD6', borderBottomLeftRadius:16, borderBottomRightRadius:16}}>
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

                    

                </View>

                {/* สภาพคล่อง */}
                <View style={{height:469, borderRadius:16,borderWidth:1, borderColor:'#A9A9A9', marginBottom:10}}> 
                    <TouchableOpacity style={{height:65, borderTopLeftRadius:15, borderTopRightRadius:15, justifyContent:'center', paddingLeft:15, backgroundColor:'#B3DBD8'}}>
                        <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:16, color:'#000000'}}>สถาพคล่อง</Text>
                    </TouchableOpacity>
                    <View style={{height:200, backgroundColor:'#FFFFFA',borderBottomWidth:1,borderColor:'#D2DBD6'}}>
                        <View style={{flex:1.5, flexDirection:'column', alignItems:'flex-start', paddingHorizontal:30, paddingTop:20}}>
                            <Text style={styles.subHeaderText}> อัตราส่วนวัดความสามารถในการชำระหนี้ระยะสั้น </Text>
                            <Text style={[styles.descibeText,{flex:1, paddingHorizontal:5,paddingTop:3, textAlign:'left'}]}>(สินทรัพย์สภาพคล่อง / หนี้สินระยะสั้น)</Text>
                         </View>
                        <View style={{flex:5, flexDirection:'column', paddingHorizontal:10}}>
                            <View style={{flex:1 ,paddingHorizontal:20, flexDirection:'row',textAlign:'left'}}>
                                    <Text style={{flex:1, color:'#0ABAB5', fontFamily:'ZenOldMincho-Bold', fontSize:30, paddingTop:10}}>4.84 เท่า</Text>
                                    <Image source={require('../../assets/creditCard1.png')} style={{width: 100, height:100}}/>
                            </View>

                            <View style={{flex:2,paddingHorizontal:20, flexDirection:'column',textAlign:'left'}}>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12, marginTop:10}}> จากเกณฑ์ ควร มากกว่าหรือเท่ากับ 1 เท่า</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12, marginTop:5}}> ของหนี้สินรวม</Text>
                            </View>
                        </View>                
                    </View>

                    <View style={{height:200, backgroundColor:'#FFFFFA', borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
                        <View style={{flex:1.5, flexDirection:'column', alignItems:'flex-end', paddingHorizontal:30, paddingTop:20}}>
                            <Text style={styles.subHeaderText}> อัตราส่วนสภาพคล่องพื้นฐาน </Text>
                            <Text style={[styles.descibeText,{flex:1, paddingHorizontal:5,paddingTop:3, textAlign:'right'}]}>(สินทรัพย์สภาพคล่องต่อเดือน/ค่าใช้จ่ายรวมต่อเดือน)</Text>
                         </View>
                        <View style={{flex:5, flexDirection:'row', paddingHorizontal:30, paddingTop:10}}>
                            <View style={{flex:1}}>
                                <Image source={require('../../assets/moneyExchange.png')} style={{width: 100, height:100}} />
                            </View>
                            <View style={{flex:2}}>
                                <Text style={{color:'#FE0000', fontFamily:'ZenOldMincho-Regular', fontSize:30,paddingTop:3, textAlign:'right'}}>10 เท่า</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12,paddingTop:3, textAlign:'right'}}>จากเกณฑ์มาตรฐาน ควร มีค่า 3-6 เท่า</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12,paddingTop:3, textAlign:'right'}}>ของค่าใช้จ่ายรวมต่อเดือน</Text>
                            </View>
                        </View>                
                    </View>
                </View>

                {/* หนี้สินและความสามารถในการชำระหนี้ */}
                <View style={{height:467, borderRadius:16,borderWidth:1, borderColor:'#A9A9A9', marginBottom:10}}> 
                    <TouchableOpacity style={{height:65, borderTopLeftRadius:15, borderTopRightRadius:15, justifyContent:'center', paddingLeft:15, backgroundColor:'#B3DBD8'}}>
                        <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:16, color:'#000000'}}>หนี้สินและความสามารถในการชำระหนี้</Text>
                    </TouchableOpacity>
                    <View style={{height:200, backgroundColor:'#FFFFFA'}}>
                        <View style={{flex:1.5, flexDirection:'column', alignItems:'flex-start', paddingHorizontal:30, paddingTop:20}}>
                            <Text style={styles.subHeaderText}> อัตราส่วนหนี้สินต่อสินทรัพย์ </Text>
                            <Text style={[styles.descibeText,{flex:1, paddingHorizontal:5,paddingTop:3}]}>(หนี้สินรวม/สินทรัพย์รวม)</Text>
                         </View>
                        <View style={{flex:5, flexDirection:'row', paddingHorizontal:30, paddingTop:10, borderBottomWidth:1, borderColor:'#D2DBD6'}}>
                            <View style={{flex:2, justifyContent:'flex-start'}}>
                                <Text style={{color:'#FE0000', fontFamily:'ZenOldMincho-Regular', fontSize:30,paddingTop:3}}>0.22 เท่า</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12,paddingTop:3}}>จากเกณฑ์มาตรฐาน ควร น้อยกว่า 0.5 เท่า</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12,paddingTop:3}}>ของสินทรัพย์รวม</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Image source={require('../../assets/homeAndCar.png')} style={{width: 100, height:100}} />
                            </View>
                        </View>    
                    </View>

                    <View style={{height:200, backgroundColor:'#FFFFFA', borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
                        <View style={{flex:1.5, flexDirection:'column', alignItems:'flex-end', paddingHorizontal:30, paddingTop:20}}>
                            <Text style={styles.subHeaderText}> อัตราส่วนการชำระคืนหนี้สินจากรายได้ </Text>
                            <Text style={[styles.descibeText,{flex:1, paddingHorizontal:5,paddingTop:3, textAlign:'right'}]}>(การชำระหนี้สินต่อเดือน/รายได้รวมต่อเดือน)</Text>
                         </View>
                        <View style={{flex:5, flexDirection:'row', paddingHorizontal:30, paddingTop:10}}>
                            <View style={{flex:1}}>
                                <Image source={require('../../assets/manAndDEBT.png')} style={{width: 100, height:100}} />
                            </View>
                            <View style={{flex:2}}>
                                <Text style={{color:'#FE0000', fontFamily:'ZenOldMincho-Regular', fontSize:30,paddingTop:3, textAlign:'right'}}>0.15 เท่า</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12,paddingTop:3, textAlign:'right'}}>จากเกณฑ์มาตรฐาน ควร มีค่าน้อยกว่า 0.35 เท่า</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12,paddingTop:3, textAlign:'right'}}>ของรายได้รวมต่อเดือน</Text>
                            </View>
                        </View>                
                    </View>
                </View>

                {/* โอกาสในการสร้างความมั่งคั่ง (การออม) */}
                <View style={{height:267, borderRadius:16,borderWidth:1, borderColor:'#A9A9A9', marginBottom:10}}> 
                    <TouchableOpacity style={{height:65, borderTopLeftRadius:15, borderTopRightRadius:15, justifyContent:'center', paddingLeft:15, backgroundColor:'#B3DBD8'}}>
                        <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:16, color:'#000000'}}>โอกาสในการสร้างความมั่งคั่ง (การออม)</Text>
                    </TouchableOpacity>
                    <View style={{height:200, backgroundColor:'#FFFFFA', borderBottomLeftRadius:16, borderBottomRightRadius:16, flexDirection:'row'}}>
                       
                        <View style={{flex:1.8, flexDirection:'column', alignItems:'flex-start', paddingHorizontal:30, paddingTop:20}}>
                            <Text style={styles.subHeaderText}> อัตราส่วนการออม </Text>
                            <Text style={[styles.descibeText,{paddingHorizontal:5,paddingTop:3}]}>(เงินออมต่อเดือน/รายได้รวมต่อเดือน)</Text>
                            <Text style={{color:'#FE0000', fontFamily:'ZenOldMincho-Regular', fontSize:30,paddingTop:3}}>0.24 เท่า</Text>
                            <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12,paddingTop:3}}>จากเกณฑ์มาตรฐาน ควร มากกว่า 10 %</Text>
                            <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12,paddingTop:3}}>ของรายได้รวมต่อเดือน</Text>
                        </View>
                         
                        <View style={{flex:1, justifyContent:'center'}}>
                            <Image source={require('../../assets/handCoin.png')} style={{width: 100, height:100}} />    
                        </View> 
                    </View>
                </View>

                {/* โอกาสในการสร้างความมั่งคั่ง (การลงทุน) */}
                <View style={{height:648, borderRadius:16,borderWidth:1, borderColor:'#A9A9A9', marginBottom:10}}> 
                    <TouchableOpacity style={{height:65, borderTopLeftRadius:15, borderTopRightRadius:15, justifyContent:'center', paddingLeft:15, backgroundColor:'#B3DBD8'}}>
                        <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:16, color:'#000000'}}>โอกาสในการสร้างความมั่งคั่ง (การลงทุน)</Text>
                    </TouchableOpacity>

                    <View style={{height:200, backgroundColor:'#FFFFFA'}}>
                        <View style={{flex:1.5, flexDirection:'column', alignItems:'flex-start', paddingHorizontal:30, paddingTop:20}}>
                            <Text style={styles.subHeaderText}> อัตราส่วนสินทรัพย์ลงทุน </Text>
                            <Text style={[styles.descibeText,{flex:1, paddingHorizontal:5,paddingTop:3}]}>(สินทรัพย์ลงทุน / สินทรัพย์รวม)</Text>
                         </View>
                        <View style={{flex:5, flexDirection:'row', paddingHorizontal:30, paddingTop:10, borderBottomWidth:1, borderColor:'#D2DBD6'}}>
                            <View style={{flex:2, justifyContent:'flex-start'}}>
                                <Text style={{color:'#FE0000', fontFamily:'ZenOldMincho-Regular', fontSize:30,paddingTop:3}}>0.25 เท่า</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12,paddingTop:3}}>จากเกณฑ์ ควรมีค่า น้อยกว่า 0.5 เท่า</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12,paddingTop:3}}>ของสินทรัพย์รวม</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Image source={require('../../assets/coinPlant.png')} style={{width: 100, height:100}} />
                            </View>
                        </View>    
                    </View>

                    <View style={{height:200, backgroundColor:'#FFFFFA'}}>
                        <View style={{flex:1, flexDirection:'column', paddingHorizontal:30, paddingTop:20}}>
                            <Text style={[styles.subHeaderText, {textAlign:'right'}]}> อัตราส่วนการสร้างรายได้ </Text>
                            <Text style={[styles.subHeaderText, {textAlign:'right'}]}> จากสินทรัพย์ลงทุน </Text>
                            <Text style={[styles.descibeText,{paddingHorizontal:5,paddingTop:3, textAlign:'right'}]}>(รายได้จากสินทรัพย์ลงทุนต่อเดือน / รายรับรวมต่อเดือน)</Text>
                         </View>
                        <View style={{flex:2, flexDirection:'row', paddingHorizontal:30, paddingTop:10, borderBottomWidth:1, borderColor:'#D2DBD6'}}>
                            <View style={{flex:1}}>
                                <Image source={require('../../assets/percenFinancial.png')} style={{width: 100, height:100}} />
                            </View>
                            <View style={{flex:2, alignItems:'flex-end'}}>
                                <Text style={{color:'#FE0000', fontFamily:'ZenOldMincho-Regular', fontSize:30,paddingTop:3}}>0.32 เท่า</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12,paddingTop:3}}>จากเกณฑ์ ควรมีค่ามากกว่า 0</Text>
                            </View>
                        </View>    
                    </View>

                    <View style={{height:180, backgroundColor:'#FFFFFA', borderBottomLeftRadius:16, borderBottomRightRadius:16}}>
                        <View style={{flex:1.5, flexDirection:'column', alignItems:'flex-start', paddingHorizontal:30, paddingTop:20}}>
                            <Text style={styles.subHeaderText}> อัตราส่วนอิสรภาพทางการเงิน </Text>
                            <Text style={[styles.descibeText,{flex:1, paddingHorizontal:5,paddingTop:3}]}>(รายได้จากสินทรัพย์ลงทุน/รายจ่าย)</Text>
                         </View>
                        <View style={{flex:5, flexDirection:'row', paddingHorizontal:30, paddingTop:10, borderColor:'#D2DBD6'}}>
                            <View style={{flex:2, justifyContent:'flex-start'}}>
                                <Text style={{color:'#FE0000', fontFamily:'ZenOldMincho-Regular', fontSize:30,paddingTop:3}}>5.87 เท่า</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12,paddingTop:3}}>จากเกณฑ์ ควรมีค่ามากกว่า 0</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Image source={require('../../assets/moneyFly.png')} style={{width: 100, height:100}} />
                            </View>
                        </View>    
                    </View>
                </View>
                <View style={{height:20}}></View>
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
