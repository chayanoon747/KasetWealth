import React from "react";
import { View, ImageBackground, Text, TouchableOpacity, Image, Alert, Modal } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dimensions, TouchableHighlight} from 'react-native';
import { PetBottomTabNav } from "../../navigators/PetBottomTabNav";
import { TextInput} from "react-native-paper";
import { useSelector, useDispatch} from 'react-redux';
import { useState, useEffect } from "react";
import { addPetName, addRandomDailyQuest, addRandomWeeklyQuest, delDailyQuest, delWeeklyQuest, newCurrentQuestTime, newStampQuestTime, retrieveAllQuest, retrieveCurrentQuestTime, retrieveStampQuestTime } from "../../firebase/UserModel";
import { retrieveAllDataPet } from "../../firebase/UserModel";
import { retrieveInventory } from "../../firebase/RetrieveData";
import { setEditItemLocation } from "../../redux/variableSlice";
import { retrieveAllDataQuest } from "../../firebase/UserModel";
import { retrieveQuestDaliyAndWeek,retrieveAllDataQuestNew } from "../../firebase/UserModel"
import { setHasNotification } from "../../redux/variableSlice";
import { addDownGradeCardtoFalse } from "../../firebase/UserModel";
import { setTotalDownGradeCardValue } from "../../redux/variableSlice";


export const HomeScreen =({navigation})=>{
    const dispatch = useDispatch()
    const editItemLocation = useSelector((state)=>state.variables.editItemLocation);

    const [petImageData, setPetImageData] = useState(null);
    const [itemWall1, setItemWall1] = useState();
    const [itemWall2, setItemWall2] = useState();
    const [itemWall3, setItemWall3] = useState();
    const [itemTable1, setItemTable1] = useState();
    const [itemTable2, setItemTable2] = useState();
    const [itemTable3, setItemTable3] = useState();
    const [itemInventory, setItemInventory] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const totalDifferenceDate = useSelector(state => state.variables.totalDifferenceDate);
    console.log('differenceDate in HomeScreen:', totalDifferenceDate);

    const totalDownGradeCardValue = useSelector(state => state.variables.totalDownGradeCardValue);
    console.log('InputValue in HomeScreen:', totalDownGradeCardValue);

    const isUpdate = useSelector((state)=>state.variables.isUpdate);
    const isUpdateItemPet = useSelector((state)=>state.variables.isUpdateItemPet);

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const totalGuage = useSelector(state => state.variables.totalGuage);
    console.log('Total Guage in HomeScreen:', totalGuage);

    const [questPersonalData, setQuestPersonalData] = useState([])
    const [questDaily, setQuestDaily] = useState([])
    const [questWeekly, setQuestWeekly] = useState([])
    const [questAll , setQuestAll] = useState([])
    const [questStateTrue, setQuestStateTrue] = useState([])
    
    const [finish,setFinish] = useState(false)

    const [stampTime,setStampTime] = useState({})
    const [questRounds,setQuestRounds] = useState({})

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เนื่องจาก getMonth() เริ่มจาก 0
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedCurrentDate = `${year}-${month}-${day}`;

    const hasNotification = useSelector(state => state.variables.hasNotification);
    const cameFromNoti = useSelector(state => state.variables.cameFromNoti);
    useEffect(() => {
        findLocationItem();
        getImageData()
        getQuestData()
        getAllQuest()
        if(finish){
            checkRandomQuest();
        }
        console.log(hasNotification)
        handleTotalDownGradeCardValue()
    }, [isUpdate,hasNotification,cameFromNoti,totalDownGradeCardValue, editItemLocation, isUpdateItemPet,finish]);    

    const getImageData = async()=>{
        try{
            const itemAllDataPet = await retrieveAllDataPet(userUID)
            setPetImageData(itemAllDataPet)
            
        }catch (error) {
            console.error('Error getImageData:', error);
        }  
    }

    const getAllQuest = async()=>{
        try{
          const itemTime = await retrieveStampQuestTime(userUID)
          setStampTime(itemTime)
          const itemTime2 = await retrieveCurrentQuestTime(userUID)
          setQuestRounds(itemTime2)
          setFinish(true)
        }catch (error) {
            console.error('Error getAllQuest:', error);
        }
    }

    const checkRandomQuest= async()=>{
        const formattedCurrentDateAsDateObject = new Date(formattedCurrentDate)
        const formattedCurrentDatetimestamp = formattedCurrentDateAsDateObject.getTime()
    
        const questRoundsAsDateObject = new Date(questRounds)
        const questRoundstimestamp = questRoundsAsDateObject.getTime()
  
        const stampTimeAsDateObject = new Date(stampTime)
        const stampTimetimestamp = stampTimeAsDateObject.getTime()
        //86400000 คือ จำนวนมิลลิวินาทีใน 1 วัน 
        const rounddaydif = (formattedCurrentDatetimestamp-questRoundstimestamp)/86400000;
        const daydif = (formattedCurrentDatetimestamp-stampTimetimestamp)/86400000;
  
        if(daydif >= 1){
            await delDailyQuest(userUID)
            await addRandomDailyQuest(userUID)
            await newStampQuestTime(userUID,formattedCurrentDate)
            if(rounddaydif >= 7) {
                await delWeeklyQuest(userUID)
                const moddaydif = (rounddaydif%7)
                const newquestRounds = new Date(formattedCurrentDatetimestamp-(86400000*moddaydif))
                const year = newquestRounds.getFullYear();
                const month = (newquestRounds.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เนื่องจาก getMonth() เริ่มจาก 0
                const day = newquestRounds.getDate().toString().padStart(2, '0');
                const formattednewquestRounds = `${year}-${month}-${day}`;
                await newCurrentQuestTime(userUID,formattednewquestRounds)
                await addRandomWeeklyQuest(userUID)
            }
        }
    }

    const findLocationItem = async()=>{
        setItemTable1();
        setItemTable2();
        setItemTable3();
        setItemWall1();
        setItemWall2();
        setItemWall3();
        const inventory =  await retrieveInventory(userUID);
        setItemInventory(inventory)
        
        inventory.table.forEach((element)=>{
            if(element.itemLocation == '1'){
                setItemTable1(element);
            }
            if(element.itemLocation == '2'){
                setItemTable2(element);
            }
            if(element.itemLocation == '3'){
                setItemTable3(element);
            }
        })
        inventory.wall.forEach((element)=>{
            if(element.itemLocation == '1'){
                setItemWall1(element);
            }
            if(element.itemLocation == '2'){
                setItemWall2(element);
            }
            if(element.itemLocation == '3'){
                setItemWall3(element);
            }
        })
    }

    const showAlert = () => {
        Alert.alert(
            "Downgrade Card Used",
            "The downgrade card has been used.",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
        
    const handleTotalDownGradeCardValue = async() => {
        if (totalDownGradeCardValue) {
            addDownGradeCardtoFalse(userUID);
            dispatch(setTotalDownGradeCardValue(false));
            //showAlert();
            toggleModal();
        }
    }

    const componentItem = (item)=>{
        if(item.itemType == 'table'){
            return(
                <View>
                    <Image source={{uri:item.itemPhotoURL}}
                        width={65} height={65} resizeMode="contain">
                    </Image>
                </View>
            )
        }
        if(item.itemType == 'wall'){
            return(
                <View  style={{marginLeft:8}}>
                    <Image source={{uri:item.itemPhotoURL}}
                        width={90} height={90} resizeMode="contain">
                    </Image>
                </View>
            )
        }
        
    }
    const getQuestData = async()=>{
        try{
            const itemAllDataQuest = await retrieveAllDataQuestNew(userUID)
            setQuestPersonalData(itemAllDataQuest.personal)
            setQuestDaily(itemAllDataQuest.daily)
            setQuestWeekly(itemAllDataQuest.weekly)
            setQuestAll(itemAllDataQuest.all)
            //setHasNotification(checkNotiRed(itemAllDataQuest.all))
            dispatch(setHasNotification(checkNotiRed(itemAllDataQuest.all)))
        }catch (error) {
            console.error('Error getQuestData:', error);
        }  
    }
    function checkNotiRed(items) {
        return items.some(item => !item.rewardStatus && !item.seen && item.questState);
    }
    return(
        <View style={{flex:1}}>
            <ImageBackground source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1207709035797946448/pxArt_1.png?ex=65e0a1b0&is=65ce2cb0&hm=22d1404ba545efff694fcb96da06d26072e6b17849dd3daa83cd8100a6641ac8&=&format=webp&quality=lossless&width=390&height=640'}}
            resizeMode="cover" style={{flex: 1}}>
                <View style={{flex:1,margin:5}}>
                    <View style={{flexDirection:'row', flex:1}}>
                        <View style={{height:'50%',width:'25%',borderWidth:2,borderRadius:15,backgroundColor:'#fffffa',justifyContent:'center', marginRight:10}}>
                            <Image source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1206277501626617856/Dollar_Coin.png?ex=65db6c77&is=65c8f777&hm=a72f70bdba7584048fdfd739bb0d289c5a47b48c1614e5fd75ed3083f44c3dfa&=&format=webp&quality=lossless&width=27&height=27'}}
                                height={25} width={25}>
                            </Image>
                            {/* จำนวนเงิน */}
                        </View>

                        <View style={{height:'50%',width:'25%',borderWidth:2,borderRadius:15,backgroundColor:'#fffffa',justifyContent:'center'}}>
                            <Image source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1206277501387538524/Diamond.png?ex=65db6c77&is=65c8f777&hm=20833581ffe174c0c908177a5224439ae4146c9faceda2d6cae45c06b995b423&=&format=webp&quality=lossless&width=26&height=26'}}
                                height={25} width={25}>
                            </Image>
                            {/* จำนวนเงิน */}
                        </View>

                        <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}
                            onPress={()=>{
                                navigation.navigate('EditHomeScreen')
                        }}
                        >
                            <Image source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1207713872203616256/Home.png?ex=65e0a631&is=65ce3131&hm=ce9840c9b6e95a321abf9ee467fd55df4d49c8534957b6d6289e4fd2e3fc4bcd&=&format=webp&quality=lossless&width=60&height=60'}}
                                width={55} height={55}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:8}}>
                        {/* itemType: wall */}
                        <View style={{flex:1.5, flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                
                            </View>
                            <View style={{flex:3, flexDirection:'row'}}>
                                <View style={{flex:1}}>
                                    {/* item ชิ้นที่ 1*/}
                                    <View style={{flex:1}}>
                                        {itemWall1 ? componentItem(itemWall1) : <View></View>}
                                    </View>
                                   
                                    {/* item ชิ้นที่ 2*/}
                                    <View style={{flex:1}}>
                                        {itemWall2 ? componentItem(itemWall2) : <View></View>}
                                    </View>
                                </View>

                                <View style={{flex:1, justifyContent:'center'}}>
                                    {/* item ชิ้นที่ 3*/}
                                        {itemWall3 ? componentItem(itemWall3) : <View></View>}
                                </View>
                                
                            </View>
                            <View style={{flex:2}}>
                                
                            </View>
                        </View>
                        {/* itemType: table */}
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:1.5, flexDirection:'row', marginBottom:20}}>
                                <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                                    {itemTable1 ? componentItem(itemTable1) : <View></View>}
                                </View>
                                <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                                    {itemTable2 ? componentItem(itemTable2) : <View></View>}
                                </View>
                                <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                                    {itemTable3 ? componentItem(itemTable3) : <View></View>}
                                </View>
                            </View>
                            <View style={{flex:1}}></View>
                        </View>
                        <View style={{flex:1}}>
                            
                        </View>
                    </View>
                    <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                        {petImageData ? (
                            <Image source={{uri: petImageData.petImage}} 
                            style={{width: 110, height:130,justifyContent:'center',alignContent:'center'}} />
                        ) : null}
                    </View>
                </View>
                
            </ImageBackground>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    toggleModal();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>Downgrade card has been used.</Text>
                        <TouchableOpacity onPress={toggleModal} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}