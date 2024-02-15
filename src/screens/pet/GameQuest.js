import { View, Text, Image, TouchableOpacity, StyleSheet,ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AssetLiabilityDetailScreen } from "../main/AssetLiabilityDetailScreen";
import { useDispatch } from "react-redux";
import { setItemTransactionType } from "../../redux/variableSlice";
import { AddGoalScreen } from "./AddGoalScreen";

export const GameQuest = ({navigation})=>{
    const dispatch = useDispatch();
    return(
        <ScrollView style={{flex:1, padding:30, backgroundColor:'#B3DBD8'}}>
            <View style={{flex:1, borderWidth:1, borderColor:'#000000', borderRadius:16, marginVertical:10, backgroundColor:'#ffffff',height: 300}}>
              <Image source={require('../../assets/Dog.png')} style={{ width: 150, height: 200,alignSelf: 'center',transform: [{translateY: 90}] }}/>
            </View>

            {/* Daliy Quest */}
            <View style={{flex:1, backgroundColor:'#B3DBD8'}}>
                {/* Daliy Quest */}
                <Text style={[styles.department, styles.boldText, {color: '#2C6264'}]}>Daliy Quest : ภารกิจรายวัน</Text>

                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, marginVertical:10,backgroundColor:'#ffffff', justifyContent: 'space-between',height: 60}}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#9B51E0',alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={require('../../assets/desktop.png')} style={{ width: 20, height: 20,alignSelf: 'center',transform: [{translateY: 10}] }}/>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}>    เก็บเงิน 100 บาท</Text>
                    <Text style={[styles.subHeaderText,styles.boldText, {color: '#A9A9A9'}]}>    Daliy Quest</Text>
                  </View>
                  <View style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, backgroundColor: '#05E8B8',alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={require('../../assets/Group.png')} style={{ width: 20, height: 20,alignSelf: 'center',transform: [{translateY: 10}] }}/>
                  </View>
                </View>

                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, marginVertical:10,backgroundColor:'#ffffff',transform: [{translateY: -10}],height: 60}}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFA656',alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={require('../../assets/barbell.png')} style={{ width: 20, height: 20,alignSelf: 'center',transform: [{translateY: 10}] }}/>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}>    บันทึกข้อมูลรายได้</Text>
                    <Text style={[styles.subHeaderText,styles.boldText, {color: '#A9A9A9'}]}>    Daliy Quest</Text>
                  </View>
                  <View style={{flex:  0.75, flexDirection: 'column', alignItems: 'flex-end'}}>
                    <Text style={[styles.bodyText, { transform: [{ translateY: -5 }] }]}>    ได้รับ 50 แต้ม</Text>
                    <Image source={require('../../assets/Vector.png')} style={{ width: 15, height: 15,alignSelf: 'center',transform: [{ translateY: 3 }, { translateX: 50 }] }}/>
                  </View>
                </View>
            
                
            </View>
            {/* Weekly Quest */}
            <View style={{flex:1, backgroundColor:'#B3DBD8'}}>
                
                <Text style={[styles.department, styles.boldText, {color: '#2C6264'},{transform: [{ translateY: -10 }]}]}>Weekly Quest : ภารกิจรายสัปดาห์</Text>

                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, marginVertical:10,backgroundColor:'#ffffff', justifyContent: 'space-between',height: 60}}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#9B51E0',alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={require('../../assets/desktop.png')} style={{ width: 20, height: 20,alignSelf: 'center',transform: [{translateY: 10}] }}/>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}>    เก็บเงิน 100 บาท</Text>
                    <Text style={[styles.subHeaderText,styles.boldText, {color: '#A9A9A9'}]}>    Weekly Quest</Text>
                  </View>
                  <View style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, backgroundColor: '#05E8B8',alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={require('../../assets/Group.png')} style={{ width: 20, height: 20,alignSelf: 'center',transform: [{translateY: 10}] }}/>
                  </View>
                </View>

                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, marginVertical:10,backgroundColor:'#ffffff',transform: [{translateY: -10}],height: 60}}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFA656',alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={require('../../assets/barbell.png')} style={{ width: 20, height: 20,alignSelf: 'center',transform: [{translateY: 10}] }}/>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}>    ใช้จ่ายไม่เกิน 900 บาท</Text>
                    <Text style={[styles.subHeaderText,styles.boldText, {color: '#A9A9A9'}]}>    Weekly Quest</Text>
                  </View>
                  <View style={{flex: 0.75, flexDirection: 'column', alignItems: 'flex-end'}}>
                    <Text style={[styles.bodyText, { transform: [{ translateY: -5 }] }]}>    ได้รับ 50 แต้ม</Text>
                    <Image source={require('../../assets/Vector.png')} style={{ width: 15, height: 15,alignSelf: 'center',transform: [{ translateY: 3 }, { translateX: 50 }] }}/>
                  </View>
                </View>
                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, marginVertical:10,backgroundColor:'#ffffff',transform: [{translateY: -20}],height: 60}}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FD5B71',alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={require('../../assets/code-slash.png')} style={{ width: 20, height: 20,alignSelf: 'center',transform: [{translateY: 10}] }}/>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}>    มีเงินเก็บ 5,000,000 บาท</Text>
                    <Text style={[styles.subHeaderText,styles.boldText, {color: '#A9A9A9'}]}>    Weekly Quest</Text>
                  </View>
                  <View style={{flex: 0.75, flexDirection: 'column', alignItems: 'flex-end'}}>
                    <Text style={[styles.bodyText, { transform: [{ translateY: -5 }] }]}>    ได้รับ 50 แต้ม</Text>
                    <Image source={require('../../assets/Vector.png')} style={{ width: 15, height: 15,alignSelf: 'center',transform: [{ translateY: 3 }, { translateX: 50 }] }}/>
                  </View>
                </View>
            
                
            </View>
            {/* Personal Goal */}
            <View style={{flex:1, backgroundColor:'#B3DBD8'}}>
                
                <Text style={[styles.department, styles.boldText, {color: '#2C6264'},{transform: [{ translateY: -20 }]}]}>Personal Goal : เป้าหมายส่วนตัว</Text>

                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, marginVertical:10,backgroundColor:'#ffffff', justifyContent: 'space-between',height: 60,transform: [{ translateY: -20 }]}}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#9B51E0',alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={require('../../assets/desktop.png')} style={{ width: 20, height: 20,alignSelf: 'center',transform: [{translateY: 10}] }}/>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}>    ---</Text>
                    <Text style={[styles.subHeaderText,styles.boldText, {color: '#A9A9A9'}]}>    Personal Goal</Text>
                  </View>
                  <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, backgroundColor: '#0ABAB5',alignSelf: 'center',transform: [{translateY: -5}] }}
                    onPress={()=>{
                      navigation.navigate('AddGoalScreen')
                    }}
                  >
                    <Image source={require('../../assets/plus.png')} style={{ width: 20, height: 20,alignSelf: 'center',transform: [{translateY: 10}] }}/>
                  </TouchableOpacity>
                </View>
                


                
             
            </View>
            <View style = {{height:20}}>

            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headerText:{
        fontFamily:'ZenOldMincho-Bold',
        fontSize:12,
        color:'#000000'
    },

    subHeaderText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:12,
        color:'#000000'
    },

    bodyText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:10,
        color:'#000000'
    },

    department:{
      fontFamily:'ZenOldMincho-Bold',
      fontSize:18,
      color:'#000000'
    }
})