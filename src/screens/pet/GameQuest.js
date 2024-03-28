import { View, Text, Image, TouchableOpacity, StyleSheet,ScrollView, FlatList} from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { changeFinished,changeRewards,finalReward, retrieveFinishedQuest, retrieveAllDataQuestNew } from "../../firebase/UserModel";
import { retrievePersonalQuest,retrieveAllQuest,retrieveCurrentQuestTime,retrieveStampQuestTime } from "../../firebase/UserModel";
import { precheckDailyQuest, precheckPersonalQuest, precheckWeeklyQuest} from "../../firebase/UserModel";
import { retrieveAllDataPet } from "../../firebase/UserModel";
import { setCameFromNoti } from "../../redux/variableSlice";
import { setHasNotification } from "../../redux/variableSlice";

export const GameQuest = ({navigation})=>{
    const dispatch = useDispatch();

    const [petImageData, setPetImageData] = useState(null);

    const [allQuestSelected,setAllQuestSelected] = useState({})
    const [personalQuestSelected, setPersonalQuestSelected] = useState({})
    const [trackingFinishedQuest,setTrackingFinishedQuest] = useState({})

    const [dailyProgression,setDailyProgression] = useState({})
    const [weeklyProgression,setWeeklyProgression] = useState({})
    const [personalProgression,setPersonalProgression] = useState({})

    const [finish,setFinish] = useState(false)
    const [finishDailyProgression,setFinishDailyProgression] = useState(false)
    const [finishWeeklyProgression,setFinishWeeklyProgression] = useState(false)
    const [finishPersonalProgression,setFinishPersonalProgression] = useState(false)
    const [finishChangeButton,setFinishChangeButton] = useState(false)

    const [stampTime,setStampTime] = useState({})
    const [questRounds,setQuestRounds] = useState({})

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เนื่องจาก getMonth() เริ่มจาก 0
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedCurrentDate = `${year}-${month}-${day}`;
    
    const hasNotification = useSelector(state => state.variables.hasNotification);

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const totalGuage = useSelector(state => state.variables.totalGuage);
    console.log('Total Guage in GameQuest:', totalGuage);

    const totalDifferenceDate = useSelector(state => state.variables.totalDifferenceDate);
    console.log('differenceDate in GameQuest:', totalDifferenceDate);

    const isUpdate = useSelector((state)=>state.variables.isUpdate);
    
    const [questPersonalData, setQuestPersonalData] = useState([])
    const [questDaily, setQuestDaily] = useState([])
    const [questWeekly, setQuestWeekly] = useState([])
    const [questAll, setQuestAll] = useState([])
    const [questStateTrue, setQuestStateTrue] = useState([])

    useEffect(() => {
      getPQuestData()
      getAllQuest()
      getQuestData()
      if(finish){
        getProgression() 
        }
    if(finishDailyProgression){
        const checked = checkDailyQuest()
        handleChangedFinished(checked)
    }
    if(finishWeeklyProgression){
        const checked = checkWeeklyQuest()
        handleChangedFinished(checked)
    }
    if(finishPersonalProgression){
        const checked = checkPersonalQuest()
        handleChangedFinished(checked)
    }
      dispatch(setCameFromNoti(false))
      console.log("มาแล้ว")
    }, [isUpdate,finish,finishDailyProgression,finishWeeklyProgression,finishPersonalProgression,finishChangeButton,hasNotification]);

    const getQuestData = async()=>{
      try{
          const itemAllDataQuest = await retrieveAllDataQuestNew(userUID)
          setQuestPersonalData(itemAllDataQuest.personal)
          setQuestDaily(itemAllDataQuest.daily)
          setQuestWeekly(itemAllDataQuest.weekly)
          setQuestAll(itemAllDataQuest.all)
          setQuestStateTrue(itemAllDataQuest.statetrue)
          //setHasNotification(checkNotiRed(itemAllDataQuest.all))
          //console.log("daily: "+checkNotiRed(questDaily))
          //console.log("all: "+checkNotiRed(questAll))
          dispatch(setHasNotification(checkNotiRed(itemAllDataQuest.all)))
          console.log("successful retrieve")
      }catch (error) {
          console.error('Error getQuestData:', error);
      }  
    }
    function checkNotiRed(items) {
      return items.some(item => !item.rewardStatus && !item.seen && item.questState);
    }
    const getPQuestData = async()=>{
      try{
          const itemAllDataQuest = await retrievePersonalQuest(userUID)
          setPersonalQuestSelected(itemAllDataQuest)  
      }catch (error) {
          console.error('Error getQuestData:', error);
      }  
    }

    const getAllQuest = async()=>{
      try{
        const itemAllQuest = await retrieveAllQuest(userUID)
        setAllQuestSelected(itemAllQuest)
        const itemQuestFinished = await retrieveFinishedQuest(userUID)
        setTrackingFinishedQuest(itemQuestFinished)
        const itemTime = await retrieveStampQuestTime(userUID)
        setStampTime(itemTime)
        const itemTime2 = await retrieveCurrentQuestTime(userUID)
        setQuestRounds(itemTime2)
        setFinish(true)
      }catch (error) {
          console.error('Error getAllQuest:', error);
      }
    }

    const getProgression = async()=>{
      try{
          //onsole.log(allQuestSelected.Daily) มีข้อมูลแล้ว
          const itemDailyQuest = await precheckDailyQuest(userUID,allQuestSelected.Daily,formattedCurrentDate)
          setDailyProgression(itemDailyQuest)
          setFinishDailyProgression(true)
          const itemWeeklyQuest = await precheckWeeklyQuest(userUID,allQuestSelected.Weekly,questRounds)
          setWeeklyProgression(itemWeeklyQuest)
          setFinishWeeklyProgression(true)
          const itemPersonalQuest = await Promise.all(
            personalQuestSelected.map(async (element) => {
              const retObj = await precheckPersonalQuest(userUID, element);
              return retObj;
              })
            );
          setPersonalProgression(itemPersonalQuest)
          setFinishPersonalProgression(true) 
      }catch (error) {
          console.error('Error getProgression:',error);
      }
    }

    useEffect(() => {
      getImageData()
      dispatch(setCameFromNoti(false));
      getQuestData()
    }, [isUpdate,finishChangeButton,hasNotification]);   

    const getImageData = async()=>{
        try{
            const itemAllDataPet = await retrieveAllDataPet(userUID)
            setPetImageData(itemAllDataPet)
            
        }catch (error) {
            console.error('Error getImageData:', error);
        }  
    }

    const checkDailyQuest = ()=>{
      const updatedQuest=[]
      if(allQuestSelected.Daily != undefined){
        allQuestSelected.Daily.forEach(element=>{
          if(element.questState == false){
            if(element.transactionType == 'รายได้'){
              let incomeUnit =0
              dailyProgression.Income.forEach(element1=>{
                incomeUnit += element1.value
              })
              if(incomeUnit>=element.value){
                updatedQuest.push(element)
                console.log("daily quest income finished")
              }
            }
            if(element.transactionType == 'สินทรัพย์'){
              let assetUnit =0
              dailyProgression.Assest.forEach(element1=>{
                assetUnit += element1.value
              })
              if(assetUnit>=element.value){
                updatedQuest.push(element)
                console.log("daily quest asset finished")
              }
            }
            if(element.transactionType == 'ค่าใช้จ่าย'){
              let expenseUnit =0
              dailyProgression.Expense.forEach(element1=>{
                expenseUnit += element1.value 
              })
              if(expenseUnit<element.value ){
                const formattedCurrentDateAsDateObject = new Date(formattedCurrentDate)
                const formattedCurrentDatetimestamp = formattedCurrentDateAsDateObject.getTime()

                const stampTimeAsDateObject = new Date(stampTime)
                const stampTimetimestamp = stampTimeAsDateObject.getTime()
                const daydif = (formattedCurrentDatetimestamp-stampTimetimestamp)/86400000;
                if(daydif >= 1){
                  updatedQuest.push(element)
                  console.log("daily quest asset finished")
                }
              }
            }
            if(element.transactionType == 'หนี้สิน'){
              let debtUnit = 0
              dailyProgression.Debt.forEach(element1=>{
                debtUnit += element1.value
              })
              if(debtUnit>=element.value){
                updatedQuest.push(element)
                console.log("daily quest debt finished")
              }
            }
          }
        })
        console.log(updatedQuest)
        return updatedQuest
      }
    }

    //แก้ให้เป็นรายสัปดาห์
    const checkWeeklyQuest = ()=>{
      const updatedQuest=[]
      if(allQuestSelected.Weekly != undefined){
        allQuestSelected.Weekly.forEach(element=>{
          if(element.questState == false){
            if(element.transactionType == 'รายได้'){
              let incomeUnit =0
              weeklyProgression.Income.forEach(element1=>{
                incomeUnit += element1.value
              })
              if(incomeUnit>=element.value){
                updatedQuest.push(element)
                console.log("weekly quest income finished")
              }
            }
            if(element.transactionType == 'สินทรัพย์'){
              let assetUnit =0
              weeklyProgression.Assest.forEach(element1=>{
                assetUnit += element1.value
              })
              if(assetUnit>=element.value){
                updatedQuest.push(element)
                console.log("weekly quest asset finished")
              }
            }
            if(element.transactionType == 'ค่าใช้จ่าย'){
              let expenseUnit =0
              weeklyProgression.Expense.forEach(element1=>{
                expenseUnit += element1.value
              })
              if(expenseUnit<element.value ){
                const formattedCurrentDateAsDateObject = new Date(formattedCurrentDate)
                const formattedCurrentDatetimestamp = formattedCurrentDateAsDateObject.getTime()

                const questRoundsAsDateObject = new Date(questRounds)
                const questRoundstimestamp = questRoundsAsDateObject.getTime()
                const daydif = (formattedCurrentDatetimestamp-questRoundstimestamp)/86400000;
                if(daydif >= 7){
                  updatedQuest.push(element)
                  console.log("weekly quest asset finished")
                }
              }
            }
            if(element.transactionType == 'หนี้สิน'){
              let debtUnit = 0
              weeklyProgression.Debt.forEach(element1=>{
                debtUnit += element1.value
              })
              if(debtUnit>=element.value){
                updatedQuest.push(element)
                console.log("weekly quest debt finished")
              }
            }
          }
        })
        console.log(updatedQuest)
        return updatedQuest
      }
    }

    const checkPersonalQuest = ()=>{
      const updatedQuest=[]
      if(personalQuestSelected != undefined){
        personalQuestSelected.forEach(quest=>{
          if(quest.questState == false){
            personalProgression.forEach(progression =>{
              if(progression.Date == quest.addDate){
                if(quest.transactionType == 'รายได้'){
                  let incomeUnit = 0
                  progression.Income.forEach(element=>{
                    incomeUnit += element.value
                  })
                  if(incomeUnit>=quest.value){
                    updatedQuest.push(quest)
                    console.log("Personal quest income finished")
                  }
                }
                if(quest.transactionType == 'สินทรัพย์'){
                  let assestUnit =0
                  progression.Assest.forEach(element=>{
                    assestUnit += element.value
                  })
                  if(assestUnit>=quest.value){
                    updatedQuest.push(quest)
                    console.log("Personal quest assest finished")
                  }
                }
                if(quest.transactionType == 'หนี้สิน'){
                  let debtUnit =0
                  progression.Debt.forEach(element=>{
                    debtUnit += element.value
                  })
                  if(debtUnit>=quest.value){
                    updatedQuest.push(quest)
                    console.log("Personal quest debt finished")
                  }
                }
              }
            })
          }
        })
        console.log(updatedQuest)
        return updatedQuest
      }
    }

    const handleChangedFinished =async(checked)=>{
      await changeFinished(allQuestSelected,checked,userUID)
    }

    const handleDailyQuestReward = (index)=>{
      if((allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[index]&&allQuestSelected.Daily[index].questState) === false) {
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} disabled={true}>
          <Image source={require('../../assets/Vector.png')} style={{ width: 20, height: 20,alignSelf: 'center',transform: [{translateY: 10}] }}/>
          </TouchableOpacity>
      }
      if((allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[index]&&allQuestSelected.Daily[index].questState) === true && (allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[index]&&allQuestSelected.Daily[index].rewardStatus) === false){
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} 
        onPress={()=>{handleButton()}}>
          <Image source={require('../../assets/greenMark.png')} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
          </TouchableOpacity>
      }
      if((allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[index]&&allQuestSelected.Daily[index].questState) === true && (allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[index]&&allQuestSelected.Daily[index].rewardStatus) === true){
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} disabled={true}>
          <Image source={require('../../assets/grayMark.png')} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
          </TouchableOpacity>
      }
    }

    const handleWeeklyQuestReward = (index)=>{
      if((allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[index]&&allQuestSelected.Weekly[index].questState) === false) {
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} disabled={true}>
          <Image source={require('../../assets/Vector.png')} style={{ width: 20, height: 20,alignSelf: 'center',transform: [{translateY: 10}] }}/>
          </TouchableOpacity>
        }
      if((allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[index]&&allQuestSelected.Weekly[index].questState) === true && (allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[index]&&allQuestSelected.Weekly[index].rewardStatus) === false){
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} 
        onPress={()=>handleButton()}>
          <Image source={require('../../assets/greenMark.png')} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
          </TouchableOpacity>
        }
      if((allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[index]&&allQuestSelected.Weekly[index].questState) === true && (allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[index]&&allQuestSelected.Weekly[index].rewardStatus) === true){
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} disabled={true}>
          <Image source={require('../../assets/grayMark.png')} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
          </TouchableOpacity>
        }
    }

    const handlePQuestReward = (item)=>{
      if((item.questState) === false) {
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} disabled={true}>
          <Image source={require('../../assets/Vector.png')} style={{ width: 20, height: 20,alignSelf: 'center',transform: [{translateY: 10}] }}/>
          </TouchableOpacity>
      }
      if((item.questState) === true && (item === false)){
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} 
        onPress={()=>{handleButton()}}>
          <Image source={require('../../assets/greenMark.png')} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
          </TouchableOpacity>
      }
      if((item.questState) === true && (item.rewardStatus) === true){
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} disabled={true}>
          <Image source={require('../../assets/grayMark.png')} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
          </TouchableOpacity>
      }
    }

  const handleButton=async()=>{
    await finalReward(userUID,trackingFinishedQuest) 
    await changeRewards(userUID,trackingFinishedQuest)
    setFinishChangeButton(!finishChangeButton)
  }

    let selectedPetImageIndex = 0;
    if (totalGuage > 7) {
        selectedPetImageIndex = 2;
    } else if (totalGuage > 4) {
        selectedPetImageIndex = 1;
    }

    const renderItem = ({ item })=>{
      return(
        <View style={{flex:1, backgroundColor:'#B3DBD8',alignContent:'center',justifyContent:'center'}}>
                
          <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, 
          marginVertical:5,backgroundColor:'#ffffff', justifyContent: 'space-between',height: 60}}>

            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#9B51E0',alignSelf: 'center',transform: [{translateY: -5}] }}>
              <Image source={{uri:item.questPic}} style={{ width: 40, height: 40,alignSelf: 'center',justifyContent:'center' }}/>
            </View>

            <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
              <Text style={styles.headerText}>    {item.detail} {item.value} บาท</Text>
              <Text style={[styles.subHeaderText, {color: '#A9A9A9'}]}>    Personal Goal</Text>
              </View>
                    {handlePQuestReward(item)}
              </View>
    </View>

      ) 
  }

    return(
        <ScrollView style={{flex:1, padding:30, backgroundColor:'#B3DBD8'}}>
            <View style={{flex:1, borderWidth:1, borderColor:'#000000', borderRadius:16, marginVertical:10, backgroundColor:'#ffffff',height: 300}}>
              {petImageData ? (
                <Image source={{uri: petImageData.petImage}} 
                style={{width: 150, height:200,alignSelf: 'center',transform: [{translateY: 90}]}} />
              ) : null}
            </View>

            {/* Daliy Quest */}
            <View style={{flex:1, backgroundColor:'#B3DBD8'}}>
                {/* Daliy Quest */}
                <Text style={[styles.department, styles.boldText, {color: '#2C6264'}]}>Daliy Quest : ภารกิจรายวัน</Text>

                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, marginVertical:10,backgroundColor:'#ffffff', justifyContent: 'space-between',height: 60}}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#9B51E0',alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={{uri:allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[0] ?allQuestSelected.Daily[0].questPic:''}} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}>  {allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[0] ? allQuestSelected.Daily[0].detail:''} {allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[0]?allQuestSelected.Daily[0].value:''} บาท</Text>
                    <Text style={[styles.subHeaderText, {color: '#A9A9A9'}]}>    Daliy Quest</Text>
                    </View>
                    {handleDailyQuestReward(0)}
                </View>

                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, marginVertical:10,backgroundColor:'#ffffff',transform: [{translateY: -10}],height: 60}}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFA656',alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={{uri:allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[1] ?allQuestSelected.Daily[1].questPic:''}} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}> {allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[1] ? allQuestSelected.Daily[1].detail:''} {allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[1]?allQuestSelected.Daily[1].value:''} บาท</Text>
                    <Text style={[styles.subHeaderText, {color: '#A9A9A9'}]}>    Daliy Quest</Text>
                    </View>
                    {handleDailyQuestReward(1)}
                </View>
            
                
            </View>
            {/* Weekly Quest */}
            <View style={{flex:1, backgroundColor:'#B3DBD8',transform: [{translateY: 10}]}}>
                
                <Text style={[styles.department, {color: '#2C6264'},{transform: [{ translateY: -10 }]}]}>Weekly Quest : ภารกิจรายสัปดาห์</Text>

                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, marginVertical:10,backgroundColor:'#ffffff', justifyContent: 'space-between',height: 60}}>
                  <View style={{ width: 40, height: 40, borderRadius: 20,alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={{uri:allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[0] ?allQuestSelected.Weekly[0].questPic:''}} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
                  </View> 
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}> {allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[0] ? allQuestSelected.Weekly[0].detail:''} {allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[1]?allQuestSelected.Weekly[0].value:''} บาท</Text>
                    <Text style={[styles.subHeaderText, {color: '#A9A9A9'}]}>    Weekly Quest</Text>
                  </View>
                    {handleWeeklyQuestReward(0)}
                </View>
                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, marginVertical:10,backgroundColor:'#ffffff',transform: [{translateY: -10}],height: 60}}>
                <View style={{ width: 40, height: 40, borderRadius: 20,alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={{uri:allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[1] ?allQuestSelected.Weekly[1].questPic:''}} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
                  </View> 
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}>{allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[1] ? allQuestSelected.Weekly[1].detail:''} {allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[1]?allQuestSelected.Weekly[1].value:''} บาท</Text>
                    <Text style={[styles.subHeaderText, {color: '#A9A9A9'}]}>    Weekly Quest</Text>
                    </View>
                    {handleWeeklyQuestReward(1)}
                </View>
                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, marginVertical:10,backgroundColor:'#ffffff',transform: [{translateY: -20}],height: 60}}>
                <View style={{ width: 40, height: 40, borderRadius: 20,alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={{uri:allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[2] ?allQuestSelected.Weekly[2].questPic:''}} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
                  </View> 
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}>{allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[2] ? allQuestSelected.Weekly[2].detail:''} {allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[2]?allQuestSelected.Weekly[2].value:''} บาท</Text>
                    <Text style={[styles.subHeaderText, {color: '#A9A9A9'}]}>    Weekly Quest</Text>
                    </View>
                    {handleWeeklyQuestReward(2)}
                </View>
            
                
            </View>
            {/* Personal Goal */}
            <View style={{flex:1, backgroundColor:'#B3DBD8',justifyContent:'center',alignContent:'center'}}>
                
                <Text style={[styles.departmentPersonalGoal, styles.boldText, {color: '#2C6264'}]}>Personal Goal : เป้าหมายส่วนตัว</Text>

                <FlatList 
                    data={personalQuestSelected}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />

                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, 
                marginVertical:10,backgroundColor:'#ffffff', justifyContent: 'space-between',height: 60}}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#9B51E0',alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1213008385612578856/game_questionMark.png?ex=65fd2397&is=65eaae97&hm=fb59b4103f2f12567a56b031641d19a35b22c74048858b56b0b9e71671ebcc8e&=&format=webp&quality=lossless&width=210&height=210'}} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}>    ---</Text>
                    <Text style={[styles.subHeaderText,styles.boldText, {color: '#A9A9A9'}]}>    Personal Goal</Text>
                  </View>
                  <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, backgroundColor: '#0ABAB5',
                  alignSelf: 'center',transform: [{translateY: -5}] }}
                    onPress={()=>{
                      navigation.navigate('AddGoalScreen')
                    }}>
                    <Image source={require('../../assets/plus.png')} style={{ width: 20, height: 20,alignSelf: 'center',transform: [{translateY: 10}] }}/>
                  </TouchableOpacity>
                </View>
                


                
             
            </View>
            <View style = {{height:50}}>


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
    },
    departmentPersonalGoal: {
      fontFamily:'ZenOldMincho-Bold',
      fontSize:18,
      color:'#000000',
      marginBottom:20
    }
})