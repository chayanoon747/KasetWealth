import React, {useState} from 'react';
import { View,Touchable,Image,Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconAntDesign from 'react-native-vector-icons/AntDesign'

export const GoalNotificationScreen = ({navigation}) => {
    
    const [hasNotification, setHasNotification] = useState(true); // เปลี่ยนค่าเป็น true หรือ false ตามที่คุณต้องการ
    const [DaillyQuestData, setDaillyQuestData] = useState([
        { details:'เก็บเงิน 100'},
        { details:'ใช้เงินไม่เกิน 2000'}
    ]);
    const [WeeklyQuestData, setWeeklyQuestData] = useState([
        { details:'เก็บเงิน 1000'},
        { details:'ใช้เงินไม่เกิน 10000'}
    ]);
    const [PersonalGoalQuestData, setPersonalGoalQuestData] = useState([
        { details:'เก็บเงิน 10000'}
    ]);

    const renderItem = ({ item }) => (
        <View style={styles.DetailQuestContainer}>
            <View style={styles.BulletPoint}>
                <Text style={styles.BulletPoint}>{'\u2022'}</Text>
                <Text style={styles.DetailQuestText}>{item.details}</Text>
            </View>
        </View>
    );

    return(
        <ScrollView style={{ flex:1,backgroundColor:'#ffffff',paddingHorizontal:20}}>
            <View style={styles.boxhead}>
                <View style={{flexDirection:'row'}}>
                    <Image source={{uri:hasNotification
                        ? 'https://cdn.discordapp.com/attachments/1202281623585034250/1206157453813743616/RedCircle.png?ex=65dafcaa&is=65c887aa&hm=1c41bd2aece039fa0115029aeb50185b13c5fa0f621a2ca65e1ae082907ad0a2&'
                        : 'https://cdn.discordapp.com/attachments/1202281623585034250/1206170460136546354/WhiteCircle.png?ex=65db08c7&is=65c893c7&hm=cfc79a0c4ce3b57c898a4da4464adaac60450080b905c9ab8fb800ff7589ab03&'
                    }} width={10} height={10}/>
                    <Text style={styles.TypeQuestText}>Dailly Quset : ภารกิจรายวัน</Text>
                    <TouchableOpacity style={{marginLeft:59}}
                        onPress={()=>{
                            navigation.navigate('QuestScreen');
                        }}
                    >
                        <IconAntDesign name="right" size={30} color="#000000"/>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={DaillyQuestData}
                        renderItem={renderItem}
                        keyExtractor={(item,index) => index.toString()}
                        scrollEnabled={false}
                    />
                </View>
            </View>
            <View style={styles.boxhead}>
                <View style={{flexDirection:'row'}}>
                    <Image source={{
                        uri:hasNotification
                          ? 'https://cdn.discordapp.com/attachments/1202281623585034250/1206157453813743616/RedCircle.png?ex=65dafcaa&is=65c887aa&hm=1c41bd2aece039fa0115029aeb50185b13c5fa0f621a2ca65e1ae082907ad0a2&'
                          : 'https://cdn.discordapp.com/attachments/1202281623585034250/1206170460136546354/WhiteCircle.png?ex=65db08c7&is=65c893c7&hm=cfc79a0c4ce3b57c898a4da4464adaac60450080b905c9ab8fb800ff7589ab03&'
                        }} 
                        width={10} 
                        height={10}
                    />
                    <Text style={styles.TypeQuestText}>Weekly Quset : ภารกิจสัปดาห์</Text>
                    <TouchableOpacity style={{marginLeft:32}}
                        onPress={()=>{
                            navigation.navigate('QuestScreen');
                        }}
                    >
                        <IconAntDesign name="right" size={30} color="#000000"/>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={WeeklyQuestData}
                        renderItem={renderItem}
                        keyExtractor={(item,index) => index.toString()}
                        scrollEnabled={false}
                    />
                </View>
            </View>
            <View style={styles.boxhead}>
                <View style={{flexDirection:'row'}}>
                    <Image source={{
                        uri:hasNotification
                          ? 'https://cdn.discordapp.com/attachments/1202281623585034250/1206157453813743616/RedCircle.png?ex=65dafcaa&is=65c887aa&hm=1c41bd2aece039fa0115029aeb50185b13c5fa0f621a2ca65e1ae082907ad0a2&'
                          : 'https://cdn.discordapp.com/attachments/1202281623585034250/1206170460136546354/WhiteCircle.png?ex=65db08c7&is=65c893c7&hm=cfc79a0c4ce3b57c898a4da4464adaac60450080b905c9ab8fb800ff7589ab03&'
                    }} width={10} height={10}/>
                    <Text style={styles.TypeQuestText}>Personal Goal : เป้าหมายส่วนตัว</Text>
                    <TouchableOpacity style={{marginLeft:9}}
                        onPress={()=>{
                            navigation.navigate('QuestScreen');
                        }}
                    >
                        <IconAntDesign name="right" size={30} color="#000000"/>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={PersonalGoalQuestData}
                        renderItem={renderItem}
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
        fontSize:24,
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