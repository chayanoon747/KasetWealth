import { View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AssetLiabilityDetailScreen } from "./AssetLiabilityDetailScreen";

export const FinancialScreen = ({navigation})=>{
    return(
        <SafeAreaView style={{flex:1, padding:30, backgroundColor:'#fffffa'}}>
            {/* ยอดเงินคงเหลือ */}
            <View style={{flex:1, borderWidth:1, borderColor:'#000000', borderRadius:16, marginVertical:10, backgroundColor:'#ffffff'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10}}>
                    <Text style={styles.headerText}>ยอดเงินคงเหลือ</Text>
                    <Text style={[styles.bodyText,{flex:1, textAlign:'right'}]}>ข้อมูล ณ ปัจจุบัน</Text>
                </View>

                <View style={{flex:1, paddingLeft:10, paddingTop:5}}>
                    <Text style={{flex:1, color:'#0ABAB5', fontFamily:'ZenOldMincho-Black', fontSize:16}}>53,000 THB</Text>
                </View>

                <View style={{flex:1.5, flexDirection:'row', paddingHorizontal:10}}>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <Text style={styles.subHeaderText}>รายได้</Text>
                        <Text style={styles.subHeaderText}>90,000 THB</Text>
                    </View>

                    <View style={{flex:1, flexDirection:'column', paddingLeft:10, borderLeftWidth:1, borderColor:'#D2DBD6'}}>
                        <Text style={styles.subHeaderText}>รายจ่าย</Text>
                        <Text style={styles.subHeaderText}>37,000 THB</Text>
                    </View>
                </View>

                <View style={{flex:2, paddingHorizontal:5}}>
                    <View style={{flex:1}}></View>
                    <View style={{flex:1, borderTopWidth:1, borderColor:'#D2DBD6'}}>
                        <TouchableOpacity style={{flex:1, padding:5}}>
                            <Text style={[styles.bodyText,{flex:1, textAlign:'right'}]}>{"แสดงรายละเอียดเพิ่มเติม  >"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* ความมั่งคั่งสุทธิ */}
            <View style={{flex:1, borderWidth:1, borderColor:'#000000', borderRadius:16, marginVertical:10, backgroundColor:'#ffffff'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10}}>
                    <Text style={styles.headerText}>ความมั่งคั่งสุทธิ</Text>
                    <Text style={[styles.bodyText,{flex:1, textAlign:'right'}]}>ข้อมูล ณ ปัจจุบัน</Text>
                </View>

                <View style={{flex:1, paddingLeft:10, paddingTop:5}}>
                    <Text style={{flex:1, color:'#0ABAB5', fontFamily:'ZenOldMincho-Black', fontSize:16}}>1,532,000 THB</Text>
                </View>

                <View style={{flex:1.5, flexDirection:'row', paddingHorizontal:10}}>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <Text style={styles.subHeaderText}>สินทรัพย์รวม</Text>
                        <Text style={styles.subHeaderText}>2,000,000 THB</Text>
                    </View>

                    <View style={{flex:1, flexDirection:'column', paddingLeft:10, borderLeftWidth:1, borderColor:'#D2DBD6'}}>
                        <Text style={styles.subHeaderText}>หนี้สินรวม</Text>
                        <Text style={styles.subHeaderText}>448,00 THB</Text>
                    </View>
                </View>

                <View style={{flex:2, paddingHorizontal:5}}>
                    <View style={{flex:1}}></View>
                    <View style={{flex:1, borderTopWidth:1, borderColor:'#D2DBD6'}}>
                        <TouchableOpacity style={{flex:1, padding:5}}
                            onPress={()=>{
                                navigation.navigate('AssetLiabilityDetailScreen');
                            }}
                        >
                            <Text style={[styles.bodyText,{flex:1, textAlign:'right'}]}>{"แสดงรายละเอียดเพิ่มเติม  >"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{flex:0.5, borderWidth:1, borderColor:'#000000', borderRadius:16, marginVertical:10, backgroundColor:'#ffffff'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <TouchableOpacity style={{flex:1, alignItems:'center'}} 
                        onPress={()=>{
                            navigation.navigate('CategorySelectionScreen')
                        }}
                    >
                        <Image source={require('../../assets/revenueIcon2.png')} style={{width: 50, height:50}} />
                        <Text style={[styles.bodyText,{paddingTop:5}]}>รายได้</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, alignItems:'center'}}
                        onPress={()=>{
                            navigation.navigate('AddCategoryScreen')
                        }}
                    >
                        <Image source={require('../../assets/expenseIcon2.png')} style={{width: 50, height:50}} />
                        <Text style={[styles.bodyText,{paddingTop:5}]}>ค่าใช้จ่าย</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, alignItems:'center'}}>
                        <Image source={require('../../assets/assetIcon2.png')} style={{width: 50, height:50}} />
                        <Text style={[styles.bodyText,{paddingTop:5}]}>สินทรัพย์</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, alignItems:'center'}}>
                        <Image source={require('../../assets/liabilityIcon2.png')} style={{width: 50, height:50}} />
                        <Text style={[styles.bodyText,{paddingTop:5}]}>หนี้สิน</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
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
        fontFamily:'ZenOldMincho-Bold',
        fontSize:14,
        color:'#000000'
    },

    bodyText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:14,
        color:'#000000'
    }
    
})