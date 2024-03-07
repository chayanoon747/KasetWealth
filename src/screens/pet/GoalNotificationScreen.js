import React, { useState,useEffect } from 'react';
import { View,Touchable,Image,Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { retrieveAllDataQuest } from "../../firebase/UserModel";
import { useSelector, useDispatch} from 'react-redux';
import { retrieveQuestDaliyAndWeek } from "../../firebase/UserModel"
import { setHasNotification,setCameFromNoti, setIsUpdate} from "../../redux/variableSlice";
import { updateAllQuestSeenStatus} from '../../firebase/UserModel';
export const GoalNotificationScreen = ({navigation}) => {
    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    //const [hasNotification, setHasNotification] = useState(true); // เปลี่ยนค่าเป็น true หรือ false ตามที่คุณต้องการ
    const [questPersonalData, setQuestPersonalData] = useState([])
    const [questDaily, setQuestDaily] = useState([])
    const [questWeekly, setQuestWeekly] = useState([])
    const isUpdate = useSelector((state)=>state.variables.isUpdate);

    const hasNotification = useSelector(state => state.variables.hasNotification);
    const cameFromNoti = useSelector(state => state.variables.cameFromNoti);
    const [finish,setFinish] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        getQuestData()
        console.log(cameFromNoti)
        //console.log(hasNotification)
      }, [isUpdate,hasNotification]);

    const getQuestData = async()=>{
        try{
            const itemAllDataQuestPersonal = await retrieveAllDataQuest(userUID)
            const itemAllDataQuestDailyAndWeek = await retrieveQuestDaliyAndWeek();
            setQuestPersonalData(itemAllDataQuestPersonal)
            // setQuestDailyAndWeekly(itemAllDataQuestDailyAndWeek)
            setQuestDaily(itemAllDataQuestDailyAndWeek.daily)
            //console.log(itemAllDataQuestDailyAndWeek.daily)
            setQuestWeekly(itemAllDataQuestDailyAndWeek.weekly)
            //console.log(itemAllDataQuestDailyAndWeek.weekly)
            //console.log(itemAllDataQuestPersonal)
            //console.log(itemAllDataQuestDailyAndWeek.weekly.length)
            //console.log(itemAllDataQuestPersonal.length)
            const combinedData = [...itemAllDataQuestPersonal, ...itemAllDataQuestDailyAndWeek.daily, ...itemAllDataQuestDailyAndWeek.weekly];
            //console.log(checkNotiRed(combinedData))
            setHasNotification(checkNotiRed(combinedData))
            //console.log(hasNotification)
            setFinish(true);
            console.log("successful retrieve")
        }catch (error) {
            console.error('Error getQuestData:', error);
        }  
    }

    //ทำเพิ่ม
    function checkNotiRed(items) {
        return items.some(item => item.rewardStatus && !item.seen);
    }
    
    function checkRewardAndSeen(item){
       if(item.rewardStatus == true && item.seen == false){
            return true
       } 
    }
    const renderItemPersonalGoal = ({ item }) => (
        checkRewardAndSeen(item) ? (
            <View style={styles.DetailQuestContainer}>
                <View style={styles.BulletPoint}>
                    <Text style={styles.BulletPoint}>{'\u2022'}</Text>
                    <Text style={styles.DetailQuestText}>{item.subCategory} {item.value} บาท</Text>
                </View>
            </View>
        ) : null
    );
    const renderItemQuestDailyAndWeekly = ({ item }) => (
        checkRewardAndSeen(item) ? (
            <View style={styles.DetailQuestContainer}>
                <View style={styles.BulletPoint}>
                    <Text style={styles.BulletPoint}>{'\u2022'}</Text>
                    <Text style={styles.DetailQuestText}>{item.detail} {item.value} บาท</Text>
                </View>
            </View>
        ) : null
    );
    
    return(
        <ScrollView style={{ flex:1,backgroundColor:'#ffffff',paddingHorizontal:20}}>
            <View style={styles.boxhead}>
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {checkNotiRed(questDaily) &&(
                            <Image source={{uri: hasNotification
                            ? 'https://cdn.discordapp.com/attachments/1202281623585034250/1206157453813743616/RedCircle.png?ex=65dafcaa&is=65c887aa&hm=1c41bd2aece039fa0115029aeb50185b13c5fa0f621a2ca65e1ae082907ad0a2&'
                            : 'https://cdn.discordapp.com/attachments/1202281623585034250/1206170460136546354/WhiteCircle.png?ex=65db08c7&is=65c893c7&hm=cfc79a0c4ce3b57c898a4da4464adaac60450080b905c9ab8fb800ff7589ab03&'
                            }} width={10} height={10} 
                            />
                        )}
                        <Text style={styles.TypeQuestText}>Dailly Quest : ภารกิจรายวัน</Text>
                    </View>
                    <TouchableOpacity style={{}}
                            onPress={()=>{
                            if(finish){
                                dispatch(setCameFromNoti(true));
                                dispatch(setHasNotification(false))
                                dispatch(setIsUpdate(!isUpdate))
                                updateAllQuestSeenStatus(userUID,questPersonalData)
                                navigation.navigate("PetQuestStackNav");
                            }
                            
                        }}
                    >
                        <IconAntDesign name="right" size={30} color="#000000"/>
                    </TouchableOpacity>
                </View>
                <View>  
                    <FlatList
                        data={questDaily}
                        renderItem={renderItemQuestDailyAndWeekly}
                        keyExtractor={(item,index) => index.toString()}
                        scrollEnabled={false}
                    />
                </View>
            </View>
            <View style={styles.boxhead}>
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {checkNotiRed(questWeekly) &&(
                            <Image source={{uri: hasNotification
                                ? 'https://cdn.discordapp.com/attachments/1202281623585034250/1206157453813743616/RedCircle.png?ex=65dafcaa&is=65c887aa&hm=1c41bd2aece039fa0115029aeb50185b13c5fa0f621a2ca65e1ae082907ad0a2&'
                                : 'https://cdn.discordapp.com/attachments/1202281623585034250/1206170460136546354/WhiteCircle.png?ex=65db08c7&is=65c893c7&hm=cfc79a0c4ce3b57c898a4da4464adaac60450080b905c9ab8fb800ff7589ab03&'
                            }} width={10} height={10} 
                            />
                        )}
                        <Text style={styles.TypeQuestText}>Weekly Quest : ภารกิจสัปดาห์</Text>
                    </View>
                    <TouchableOpacity style={{}}
                        onPress={()=>{
                            if(finish){
                                dispatch(setCameFromNoti(true));
                                dispatch(setHasNotification(false))
                                dispatch(setIsUpdate(!isUpdate))
                                updateAllQuestSeenStatus(userUID,questPersonalData)
                                navigation.navigate("PetQuestStackNav");
                            }
                        
                        }}
                    >
                        <IconAntDesign name="right" size={30} color="#000000"/>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={questWeekly}
                        renderItem={renderItemQuestDailyAndWeekly}
                        keyExtractor={(item,index) => index.toString()}
                        scrollEnabled={false}
                    />
                </View>
            </View>
            <View style={styles.boxhead}>
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {checkNotiRed(questPersonalData) &&(
                            <Image source={{uri: hasNotification
                                ? 'https://cdn.discordapp.com/attachments/1202281623585034250/1206157453813743616/RedCircle.png?ex=65dafcaa&is=65c887aa&hm=1c41bd2aece039fa0115029aeb50185b13c5fa0f621a2ca65e1ae082907ad0a2&'
                                : 'https://cdn.discordapp.com/attachments/1202281623585034250/1206170460136546354/WhiteCircle.png?ex=65db08c7&is=65c893c7&hm=cfc79a0c4ce3b57c898a4da4464adaac60450080b905c9ab8fb800ff7589ab03&'
                            }} width={10} height={10} 
                            />
                        )}
                        <Text style={styles.TypeQuestText}>Personal Goal : เป้าหมายส่วนตัว</Text>
                    </View>
                    <TouchableOpacity style={{}}
                        onPress={()=>{
                            if(finish){
                                dispatch(setCameFromNoti(true));
                                dispatch(setHasNotification(false))
                                dispatch(setIsUpdate(!isUpdate))
                                updateAllQuestSeenStatus(userUID,questPersonalData)
                                navigation.navigate("PetQuestStackNav");
                            }
                        }}
                    >
                        <IconAntDesign name="right" size={30} color="#000000"/>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={questPersonalData}
                        renderItem={renderItemPersonalGoal}
                        keyExtractor={(item,index) => index.toString()}
                        scrollEnabled={false}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = {
    boxhead:{
        flex:1, 
        borderTopLeftRadius:15, 
        borderBottomWidth:1 , 
        borderColor:'#000000',  
        borderTopRightRadius:15, 
        justifyContent:'center', 
        backgroundColor:'#ffffff'
    },
    TypeQuestText:{
        fontFamily:'Rubik-Medium',
        fontSize:22,
        color:'#2C6264'
    },
    DetailQuestText:{
        fontFamily:'Rubik-Medium',
        fontSize:20,
        color:'#000000',
        marginBottom: 2,
        textAlign:'center'
    },
    DetailQuestContainer: {
        marginBottom: 10,
    },
    BulletPoint: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
}