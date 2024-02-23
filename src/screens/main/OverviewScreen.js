import { View, Text, Image, TouchableOpacity,ScrollView, StyleSheet, Animated} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AssetLiabilityDetailScreen } from "./AssetLiabilityDetailScreen";
import { useDispatch } from "react-redux";
import { setItemTransactionType, setIsUpdate, setStatus } from "../../redux/variableSlice";
import { useSelector } from 'react-redux'
import RNSpeedometer from 'react-native-speedometer';
import { useEffect, useState } from "react";
import { retrieveDataIncome, retrieveDataExpenses, retrieveDataExpensesSavings, retrieveDataAsset, retrieveDataLiability } from "../../firebase/RetrieveData"; 
import { getNetWealth, getNetCashFlow, getSurvivalRatio, getRatioMeasureShortLiability } from '../../Calculate/Calculate'
import { getBasicLiquidityRatio, getLiabilityToAssetRatio, getDebtRepaymentRatioFromIncome} from "../../Calculate/Calculate"
import { getSavingsRatio, getInvestmentAssetRatio, getIncomeFromInvestmentAssetRatio, getFinancialFreedomRatio} from "../../Calculate/Calculate"
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator} from "react-native-paper";
import { retrieveAllData } from "../../firebase/RetrieveData";
import { updateLastedDate ,updateGuageRiability } from "../../firebase/UserModel"

export const OverviewScreen = ({navigation})=>{

    const user = useSelector((state)=>state.auths);
    const isUpdate = useSelector((state)=>state.variables.isUpdate);
    const userUID = user[0].uid;
    //console.log(userUID);
    const status = useSelector((state)=>state.variables.status);

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true)
    const [isUpdateCurrent, setIsUpdateCurrent] = useState(true)
    //รับ transaction ทั้งหมดมาใส่แล้วค่อยมาวนหาวันเอง
    const [allItemTransaction,setAllItemTransaction] = useState([]);

    const [incomeValuesAll, setIncomeValuesAll] = useState()
    const [incomeWorkValue, setIncomeWorkValue] = useState()
    const [incomeAssetValue, setIncomeAssetValue] = useState()
    const [incomeInvestAssetValue, setIncomeInvestAssetValue] = useState()
    const [incomeOtherValue, setIncomeOtherValue] = useState()

    const [expensesValuesAll, setExpensesValuesAll] = useState()
    const [expensesVariableValue, setExpensesVariableValue] = useState()
    const [expensesFixedValue, setExpensesFixedValue] = useState()
    const [expensesSavingsAndInvestmentValue, setExpensesSavingsAndInvestmentValue] = useState()
    //ค่าใช้จ่ายจากการออม
    const [expensesSavingsValue,setExpensesSavingsValue] = useState();

    const [assetValues, setAssetValues] = useState()
    const [assetLiquidValue,setAssetLiquidValue] = useState();
    const [assetInvestValue,setAssetInvestValue] = useState();
    const [assetPersonalValue,setAssetPersonalValue] = useState();

    const [liabilityValues, setLiabilityValues] = useState()
    const [liabilityShortValues,setLiabilityShortValues] = useState();
    const [liabilityLongValues,setLiabilityLongValues] = useState();
    //

    //ค่าที่ต้องคำนวณ ทั้งหมด 11 สูตร 

    //ความมั่งคั่งสุทธิ
    const [netWealthValue, setNetWealthValue] = useState();
    //กระแสเงินสดสุทธิ
    const [netCashFlow,setNetCashFlow] = useState();
    //อัตราส่วนความอยู่รอด
    const [survivalRatio,setSurvivalRatio] = useState();
    //อัตราส่วนวัดความสามารถในการชำระหนี้ระยะสั้น
    const [ratioMeasureShortLiability,setRatioMeasureShortLiability] = useState();
    //อัตราส่วนสภาพคล่องพื้นฐาน
    const [basicLiquidityRatio,setBasicLiquidityRatio] = useState();
    //อัตราส่วนหนี้สินต่อสินทรัพย์
    const [liabilityToAssetRatio,setLiabilityToAssetRatio] = useState();
    //อัตราส่วนการชำระคืนหนี้สินจากรายได้
    const [debtRepaymentRatioFromIncome,setDebtRepaymentRatioFromIncome] = useState();
    //อัตราส่วนการออม
    const [savingsRatio,setSavingsRatio] = useState();
    //อัตราส่วนสินทรัพย์ลงทุน
    const [investmentAssetRatio,setInvestmentAssetRatio] = useState();
    //อัตราส่วนการสร้างรายได้จากสินทรัพย์ลงทุน
    const [incomeFromInvestmentAssetRatio,setIncomeFromInvestmentAssetRatio] = useState();
    //อัตราส่วนอิสรภาพทางการเงิน
    const [financialFreedomRatio,setFinancialFreedomRatio] = useState();
    //คะแนน(guage) สุขภาพทางการเงิน เต็ม 10 คะแนน
    const [guageWealth,setGuageWealth] = useState();

    //ใช้สำหรับคำนวน คะแนนความน่าเชื่อถือ
    const [lastedDate,setLastedDate] = useState();
    const [currentDate,setCurrentDate] = useState();
    const [isFirstTransaction,setIsFirstTransaction] = useState();
    //คะแนน ความน่าเชื่อถือ เต็ม 10 คะแนน
    const [guageRiability,setGuageRiability] = useState();
    useEffect(() => {
        setIsLoading(true)
        getAllData();
        //getDataIncome();
        console.log("income All: "+incomeValuesAll);
        console.log("income Work: "+incomeWorkValue);
        console.log("income Asset: "+incomeAssetValue);
        console.log("income Invest Asset: "+incomeInvestAssetValue);
        console.log("income Other: "+incomeOtherValue);
        //getDataExpenses();
        //getDataExpensesSavings();
        console.log("expenses All: "+expensesValuesAll);
        console.log("expenses Variable: "+expensesVariableValue);
        console.log("expenses Fixed: "+expensesFixedValue);
        console.log("expenses Saving And Investment: "+expensesSavingsAndInvestmentValue);
        console.log("expenses Saving: "+expensesSavingsValue)
        //getDataAsset();
        console.log("asset All: "+assetValues);
        console.log("asset Liquid: "+assetLiquidValue);
        console.log("asset Invest: "+assetInvestValue);
        console.log("asset Personal: "+assetPersonalValue);
        //getDataLiability();
        console.log("liability All: "+liabilityValues);
        console.log("liability Short: "+liabilityShortValues);
        console.log("liability Long: "+liabilityLongValues);
        getAllCalculationFormular();
        console.log("Net Wealth: "+netWealthValue);
        console.log("Net Cash Flow: "+netCashFlow);
        console.log("Survival Ratio: "+survivalRatio);
        console.log("Ratio Measure Short Liability: "+ratioMeasureShortLiability);
        console.log("Basic Liquidity Ratio: "+basicLiquidityRatio);
        console.log("Liability To Asset Ratio: "+liabilityToAssetRatio)
        console.log("Debt Repayment Ratio From Income: "+debtRepaymentRatioFromIncome);
        console.log("Savings Ratio: "+savingsRatio);
        console.log("Investment Asset Ratio: "+investmentAssetRatio);
        console.log("Income From Investment Asset Ratio: "+incomeFromInvestmentAssetRatio);
        console.log("Financial Freedom Ratio: "+financialFreedomRatio);

        setGuageWealth(getGuageWealth());
        console.log("guage wealth: "+guageWealth)
        console.log("lasted date: "+lastedDate)
        console.log("current date: " +currentDate)
        
        console.log("guage riability: "+guageRiability)
        setIsUpdateCurrent(!isUpdateCurrent)
        
        if (status) {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        } else {
            setTimeout(() => {
                setIsLoading(false);
                dispatch(setStatus(true));
            }, 5000);
        }

    }, [incomeValuesAll,expensesValuesAll,assetValues,liabilityValues, netWealthValue,netCashFlow,survivalRatio,ratioMeasureShortLiability,basicLiquidityRatio,liabilityToAssetRatio,debtRepaymentRatioFromIncome,savingsRatio,investmentAssetRatio,incomeFromInvestmentAssetRatio,financialFreedomRatio,guageWealth,currentDate,isFirstTransaction, isUpdate]);
    const getAllData = async()=>{
        const itemsdata = await retrieveAllData(userUID);
        setAllItemTransaction(itemsdata);
        setCurrentDate(itemsdata.currentDate)
        setLastedDate(itemsdata.lastedDate)
        setIsFirstTransaction(itemsdata.isFirstTransaction)
        setGuageRiability(itemsdata.guageRiability)
        setGuageRiability(getRiabilityGuage(lastedDate,currentDate,isFirstTransaction,allItemTransaction,itemsdata.guageRiability))
        // console.log("guage riability: "+guageRiability)
        //console.log(allItemTransaction)
        
        setIncomeWorkValue(getIncomeWorkValue(itemsdata.incomeWork))
        setIncomeAssetValue(getIncomeAssetValue(itemsdata.incomeAsset));
        setIncomeInvestAssetValue(getIncomeInvestAssetValue(itemsdata.incomeInvestAsset));
        setIncomeOtherValue(getIncomeOtherValue(itemsdata.incomeOther));
        setIncomeValuesAll(incomeWorkValue+incomeAssetValue+incomeOtherValue);

        setExpensesVariableValue(getExpensesVaribleValues(itemsdata.expensesVariable));
        setExpensesFixedValue(getExpensesFixedValues(itemsdata.expensesFixed));
        setExpensesSavingsAndInvestmentValue(getExpensesSavingAndInvestmentValues(itemsdata.expenseSavings, itemsdata.expenseInvest));
        setExpensesSavingsValue(getExpensesSavingsValue(itemsdata.expenseSavings))
        setExpensesValuesAll(expensesVariableValue+expensesFixedValue+expensesSavingsAndInvestmentValue);

        setAssetLiquidValue(getAssetLiquidValue(itemsdata.assetLiquid));
        setAssetInvestValue(getAssetInvestValue(itemsdata.assetInvest));
        setAssetPersonalValue(getAssetPersonalValue(itemsdata.assetPersonal));
        setAssetValues(assetLiquidValue+assetInvestValue+assetPersonalValue);

        setLiabilityShortValues(getLiabilityShortValue(itemsdata.liabilityShort));
        setLiabilityLongValues(getLiabilityLongValue(itemsdata.liabilityLong));
        setLiabilityValues(liabilityShortValues+liabilityLongValues);
        
        //รับ 3 ค่า lastedDate currentDate isFirstTransaction
        
    }
    
    const getAllCalculationFormular = async()=>{
        try{
            setNetWealthValue(getNetWealth(assetValues,liabilityValues));
            setNetCashFlow(getNetCashFlow(incomeValuesAll,expensesValuesAll));
            setSurvivalRatio(getSurvivalRatio(incomeWorkValue,incomeAssetValue,expensesValuesAll));
            setRatioMeasureShortLiability(getRatioMeasureShortLiability(assetLiquidValue,liabilityShortValues));
            setBasicLiquidityRatio(getBasicLiquidityRatio(assetLiquidValue,expensesValuesAll));
            setLiabilityToAssetRatio(getLiabilityToAssetRatio(liabilityValues,assetValues));
            //การชำระเงินคืนหนี้สินยังเป็น hardcode ต้องไปทำตรงนี้ก่อน
            setDebtRepaymentRatioFromIncome(getDebtRepaymentRatioFromIncome(1000,incomeValuesAll));
            setSavingsRatio(getSavingsRatio(expensesSavingsValue,incomeValuesAll));
            setInvestmentAssetRatio(getInvestmentAssetRatio(assetInvestValue,assetValues));
            setIncomeFromInvestmentAssetRatio(getIncomeFromInvestmentAssetRatio(incomeInvestAssetValue,incomeValuesAll));
            setFinancialFreedomRatio(getFinancialFreedomRatio(incomeInvestAssetValue,expensesValuesAll));
        } catch (error){
            console.error('Error getAllCalculationFormular:', error);
        }
    }
    //รับค่ารายได้
    const getIncomeWorkValue = (data)=>{
        let incomeWorkValue = 0;
        data.forEach(element => {
            incomeWorkValue += parseFloat(element.value);
        });
        
        return incomeWorkValue;
    }
    const getIncomeAssetValue = (data)=>{
        let incomeAssetValue = 0;
        data.forEach(element => {
            incomeAssetValue += parseFloat(element.value);
        });
        
        return incomeAssetValue;
    }
    const getIncomeInvestAssetValue = (data)=>{
        let incomeInvestAssetValue = 0;
        data.forEach(element => {
            incomeInvestAssetValue += parseFloat(element.value);
        });
        
        return incomeInvestAssetValue;
    }
    const getIncomeOtherValue = (data)=>{
        let incomeOtherValue = 0;
        data.forEach(element => {
            incomeOtherValue += parseFloat(element.value);
        });
        return incomeOtherValue;
    }

    //รับค่าใช้จ่าย
    const getExpensesVaribleValues = (data)=>{
        let expensesVariableValue = 0;
        data.forEach(element => {
            expensesVariableValue += parseFloat(element.value);
        });
        
        return expensesVariableValue;
    }
    const getExpensesFixedValues = (data)=>{
        let expensesFixedValue = 0;
        data.forEach(element => {
            expensesFixedValue += parseFloat(element.value);
        });
        
        return expensesFixedValue;
    }
    //เงินออม + ลงทุน
    const getExpensesSavingAndInvestmentValues = (dataSaving, dataInvest)=>{
        let expensesSavingAndInvestmentValue = 0;
        dataSaving.forEach(element => {
            expensesSavingAndInvestmentValue += parseFloat(element.value);
        });
        dataInvest.forEach(element => {
            expensesSavingAndInvestmentValue += parseFloat(element.value);
        });
        return expensesSavingAndInvestmentValue;
    }
    //เงินออม
    const getExpensesSavingsValue = (data)=>{
        let expensesSavingValue = 0;
        data.forEach(element => {
            expensesSavingValue += parseFloat(element.value);
        });
        return expensesSavingValue;
    }

    //รับค่าสินทรัพย์ 3 ประเภท
    const getAssetLiquidValue = (data)=>{
        let assetLiquidValue = 0;
        data.forEach(element => {
            assetLiquidValue += parseFloat(element.value);
        });
        return assetLiquidValue;
    }
    const getAssetInvestValue = (data)=>{
        let assetInvestValue = 0;
        data.forEach(element => {
            assetInvestValue += parseFloat(element.value);
        });
        return assetInvestValue;
    }
    const getAssetPersonalValue = (data)=>{
        let assetPersonalValue = 0;
        data.forEach(element => {
            assetPersonalValue += parseFloat(element.value);
        });
        return assetPersonalValue;
    }

    //รับค่าหนี้สิน ทั้ง 2 ประเภท
    const getLiabilityShortValue = (data)=>{
        let liabilityShortValue = 0;
        data.forEach(element =>{
            liabilityShortValue += parseFloat(element.value);
        });
        return liabilityShortValue;
    }
    const getLiabilityLongValue = (data)=>{
        let liabilityLongValue = 0;
        data.forEach(element =>{
            liabilityLongValue += parseFloat(element.value);
        });
        return liabilityLongValue;
    }
    //คิดคะแนน สุขภาพทางการเงิน
    const getGuageWealth = ()=>{
        let guageWealth = 0;
        //ความมั่งคั่งในปัจจุบัน
        if(netWealthValue > 0){
            guageWealth = guageWealth + 2/3
            console.log("netWealth 0.67")
        }
        if(netCashFlow > 0){
            guageWealth = guageWealth + 2/3
        }
        if(survivalRatio >= 1){
            guageWealth = guageWealth + 2/3
        }
        //สภาพคล่อง
        if(ratioMeasureShortLiability >=1){
            guageWealth = guageWealth + 1
        }
        if(basicLiquidityRatio > 6){
            guageWealth = guageWealth + 0.5
        }else if(basicLiquidityRatio >= 3 && basicLiquidityRatio <= 6){
            guageWealth = guageWealth + 1
        }else if(basicLiquidityRatio < 3){
            guageWealth = guageWealth + 0
        }
        //หนี้สินและความสามารถในการชำระหนี้
        if(liabilityToAssetRatio < 0.5){
            guageWealth = guageWealth + 1
        }
        if(debtRepaymentRatioFromIncome < 0.35){
            guageWealth = guageWealth + 1
        }
        //โอกาสในการสร้างความมั่งคั่ง (การออม)
        if(savingsRatio > 10){
            guageWealth = guageWealth + 2
        }
        //โอกาสในการสร้างความมั่งคั่ง (การลงทุน)
        if(investmentAssetRatio < 0.5 && assetInvestValue != 0){
            guageWealth = guageWealth + 2/3
        }
        if(incomeFromInvestmentAssetRatio > 0){
            guageWealth = guageWealth + 2/3
        }
        if(financialFreedomRatio > 0 && expensesValuesAll == 0 && incomeValuesAll > 0){
            guageWealth = guageWealth + 2/3
        }
        return guageWealth.toFixed(2)
    }
    //ฟังก์ชันที่ต้องใช้ในการคำนวณระยะห่างระหว่างวัน
    function findDateDifference(nowDate, oldDate) {
        if(nowDate !== undefined && oldDate !== undefined){
            // แยกปี, เดือน, และวันออกจาก string วันที่
            const [nowYear, nowMonth, nowDay] = nowDate.split('-').map(Number);
            const [oldYear, oldMonth, oldDay] = oldDate.split('-').map(Number);
        
            // สร้างวัตถุ Date สำหรับวันที่ปัจจุบันและวันที่เก่า
            const nowDateObj = new Date(nowYear, nowMonth - 1, nowDay); // เดือนต้องลบ 1 เนื่องจากเดือนใน JavaScript เริ่มนับจาก 0
            const oldDateObj = new Date(oldYear, oldMonth - 1, oldDay);
        
            // หาความแตกต่างในวัน
            const differenceTime = nowDateObj.getTime() - oldDateObj.getTime();
            const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24)); // หาผลต่างของวันที่เป็นจำนวนวัน
        
            return differenceDays; 
        }
    }
    //ฟังก์ชันในการเพิ่มจำนวนวัน
    function addDaysToDate(dateString, daysToAdd) {
        if(dateString !== undefined){
            const date = new Date(dateString); // แปลง string วันที่เป็นวัตถุ Date
            date.setDate(date.getDate() + daysToAdd); // เพิ่มจำนวนวันที่ต้องการให้กับวันที่
            
            // สร้างวันที่ใหม่
            const newDate = new Date(date);
            const year = newDate.getFullYear();
            const month = String(newDate.getMonth() + 1).padStart(2, '0'); // เพิ่มเลข 0 ข้างหน้าถ้าหลักเดี่ยว
            const day = String(newDate.getDate()).padStart(2, '0'); // เพิ่มเลข 0 ข้างหน้าถ้าหลักเดี่ยว
        
            return `${year}-${month}-${day}`;
        }
    }
    //รับ array รายการ transaction ในวัน dateinput
    function getOnDateItem (allItemTransaction, dateinput) {
        // สร้าง array เพื่อเก็บรายการ transaction ที่ตรงกับ dateinput
        let transactionsOnDate = [];
        
        // ใช้ forEach เพื่อวน loop ผ่านทุกๆ รายการ transaction ใน allItemTransaction
        allItemTransaction.transactionAll.forEach(transaction => {
            // เช็คว่าวันที่ของ transaction เท่ากับ dateinput หรือไม่
            if (transaction.date === dateinput) {
                // ถ้าตรงกัน ให้เพิ่ม transaction นี้เข้าไปใน array transactionsOnDate
                transactionsOnDate.push(transaction);
            }
        });
        console.log(transactionsOnDate)
        // ส่งคืนรายการ transaction ที่มีวันที่ตรงกับ dateinput
        return transactionsOnDate;
    }
    //เช็คว่ามี transaction ในวันนั้นหรือไม่
    function getCheckDataDateTransaction(itemOnDate){
        if (itemOnDate && itemOnDate.length > 0) {
            // มีการทำธุรกรรมในวันที่นี้
            return true;
        } else {
            // ไม่มีการทำธุรกรรมในวันที่นี้
            return false;
        }
    }

    const getRiabilityGuage = (lastedDate,currentDate,isFirstTransaction,alldata,oldGuageRiability)=>{
        if(lastedDate !== undefined && currentDate !== undefined && isFirstTransaction == false){
            let roundUpdate = Math.floor(findDateDifference(currentDate, lastedDate) / 3)
            if (roundUpdate < 1) {
                // คืนค่าเริ่มต้นของ oldGuageRiability
                return oldGuageRiability;
            }
            if(roundUpdate >= 1){
                if(isFirstTransaction == false){
                    // let roundUpdate = (findDateDifference(currentDate,lastedDate))/3
                    let riabilityGuage = oldGuageRiability

                    let lastedDateinput = lastedDate;
                    console.log(roundUpdate+" round Update Point")
                    if(roundUpdate >= 1){
                        for(let i = 0 ; i < roundUpdate ; i++){
                            let doTransaction = 0
                            
                            for(let j = 0 ; j < 3;j++){
                                //ทำใหม่
                                console.log(lastedDateinput)
                                let itemOnDate = getOnDateItem(alldata,lastedDateinput)
                                //ทำใหม่
                                let checkDoitemOnDate = getCheckDataDateTransaction(itemOnDate)     
                                //console.log(checkDoitemOnDate)
                                if(checkDoitemOnDate)
                                { 
                                    doTransaction += 1;
                                    console.log(lastedDateinput+" มีการทำรายการ")
                                    // เช็ควันถัดไป 1 วัน
                                }
                                lastedDateinput = addDaysToDate(lastedDateinput, 1);
                                //console.log(lastedDateinput);
                            }
                            if(doTransaction == 3){
                                riabilityGuage += 1
                            }else if(doTransaction == 2){
                                riabilityGuage += 0.5
                            }else if(doTransaction == 1){
                                riabilityGuage -= 0.5 
                            }else if(doTransaction == 0){
                                riabilityGuage -= 1 
                            }
                        }
                        if(riabilityGuage < 0){
                            riabilityGuage = 0
                        }
                        if(riabilityGuage > 10){
                            riabilityGuage = 10
                        }
                        
                        updateLastedDate(userUID,lastedDateinput,isFirstTransaction)
                        updateGuageRiability(userUID,riabilityGuage)
                        setLastedDate(lastedDateinput)
                        setGuageRiability(riabilityGuage)
                        return riabilityGuage
                    }
                }
            }
            
        }
        
    }

    const checkText = (value)=>{
        if(value == 'ไม่สามารถคำนวณได้เนื่องจากไม่มีหนี้สินระยะสั้น'){
            return 'ไม่สามารถคำนวณได้เนื่องจากไม่มีหนี้สินระยะสั้น'
        }
        else if(value == 'ไม่สามารถคำนวณได้เนื่องจากไม่มีค่าใช้จ่าย'){
            return 'ไม่สามารถคำนวณได้เนื่องจากไม่มีค่าใช้จ่าย'
        }
        else{
            return value + ' เท่า'
        }
    }


    return(
        <SafeAreaView style={{flex:1}}>
            {isLoading ? (<ActivityIndicator size='large' color="#0ABAB5" style={{marginVertical:'60%'}}></ActivityIndicator>) : (<ScrollView style={{flex:1, padding:10}}>
                <View style={{height:295, borderRadius:16,borderWidth:1,backgroundColor:'#FFFFFA', borderColor:'#A9A9A9', marginBottom:10}}>
                    <TouchableOpacity style={{height:65, borderTopLeftRadius:15, borderTopRightRadius:15, justifyContent:'center', paddingLeft:20, backgroundColor:'#B3DBD8'}}
                        onPress={()=>{
                            navigation.navigate('OverviewGuideScreen', {netWealthValue: netWealthValue, netCashFlow: netCashFlow, survivalRatio: survivalRatio, ratioMeasureShortLiability: ratioMeasureShortLiability, 
                            basicLiquidityRatio: basicLiquidityRatio, liabilityToAssetRatio: liabilityToAssetRatio, debtRepaymentRatioFromIncome: debtRepaymentRatioFromIncome, savingsRatio: savingsRatio, investmentAssetRatio: investmentAssetRatio,
                            incomeFromInvestmentAssetRatio: incomeFromInvestmentAssetRatio, financialFreedomRatio: financialFreedomRatio , guageWealth: guageWealth, guageRiability:guageRiability});
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
                                <RNSpeedometer value={guageWealth} size={150} minValue={0} maxValue={10} allowedDecimals={1} labels={[
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
                                <RNSpeedometer value={guageRiability} size={150} minValue={0} maxValue={10} allowedDecimals={1} labels={[
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
                                    <Text style={{flex:1, color:'#0ABAB5', fontFamily:'ZenOldMincho-Bold', fontSize:30}}>{netWealthValue}</Text>
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
                                <Text style={{flex:6, color:'#0ABAB5', fontFamily:'ZenOldMincho-Bold', fontSize:30,paddingTop:3, textAlign:'right'}}>{netCashFlow}</Text>
                            </View>

                            <View style={{flex:2,paddingHorizontal:20, flexDirection:'row',textAlign:'right', paddingTop:1}}>
                                    <Text style={{flex:4, color:'#000000',fontFamily:'ZenOldMincho-Regular', fontSize:12,paddingTop:8, textAlign:'right'}}>จากเกณฑ์ ควรเป็นค่า บวก</Text>
                            </View>
                        </View>                
                    </View>

                    <View style={{overflow:'hidden',height:200, backgroundColor:'#FFFFFA',borderBottomWidth:1,borderColor:'#D2DBD6', borderBottomLeftRadius:16, borderBottomRightRadius:16}}>
                        <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:30, paddingTop:20}}>
                            <Text style={styles.subHeaderText}> อัตราส่วนความอยู่รอด </Text>
                            <Text style={[styles.descibeText,{flex:1, paddingHorizontal:5,paddingTop:3, textAlign:'left'}]}>(รายได้จากการทำงาน+รายได้จากสินทรัพย์)/ค่าใช้จ่ายรวม)</Text>
                         </View>
                        <View style={{flex:5, flexDirection:'column', paddingHorizontal:10}}>

                            <View style={{flex:1,paddingHorizontal:20, flexDirection:'row',textAlign:'left', paddingTop:1}}>   
                                    <Text style={{flex:1, color:'#0ABAB5', fontFamily:'ZenOldMincho-Regular', fontSize:30}}>{survivalRatio} เท่า </Text>
                                    <Image source={require('../../assets/overview_3.png')} style={{width: 100, height:100}} />
                            </View>

                            <View style={{flex:2,paddingHorizontal:20, flexDirection:'row',textAlign:'left', paddingTop:1}}>
                                <Text style={{flex:1, color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> จากเกณฑ์ ควร มากกว่าหรือเท่ากับ 1 เท่า ของค่าใช้จ่ายรวม </Text>

                                <Text style={{flex:1, color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> </Text>
                            </View>
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
                                    <Text style={{flex:1, color:'#0ABAB5', fontFamily:'ZenOldMincho-Bold', fontSize:ratioMeasureShortLiability == 'ไม่สามารถคำนวณได้เนื่องจากไม่มีหนี้สินระยะสั้น' ? 14 : 30, paddingTop:10}}>{checkText(ratioMeasureShortLiability)}</Text>
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
                                <Text style={{color:'#FE0000', fontFamily:'ZenOldMincho-Regular', fontSize:basicLiquidityRatio == 'ไม่สามารถคำนวณได้เนื่องจากไม่มีค่าใช้จ่าย' ? 14 : 30,paddingTop:3, textAlign:'right'}}>{checkText(basicLiquidityRatio)}</Text>
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
                                <Text style={{color:'#FE0000', fontFamily:'ZenOldMincho-Regular', fontSize:30,paddingTop:3}}>{liabilityToAssetRatio} เท่า</Text>
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
                                <Text style={{color:'#FE0000', fontFamily:'ZenOldMincho-Regular', fontSize:30,paddingTop:3, textAlign:'right'}}>{debtRepaymentRatioFromIncome} เท่า</Text>
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
                            <Text style={{color:'#FE0000', fontFamily:'ZenOldMincho-Regular', fontSize:30,paddingTop:3}}>{savingsRatio} เท่า</Text>
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
                                <Text style={{color:'#FE0000', fontFamily:'ZenOldMincho-Regular', fontSize:30,paddingTop:3}}>{investmentAssetRatio} เท่า</Text>
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
                                <Text style={{color:'#FE0000', fontFamily:'ZenOldMincho-Regular', fontSize:30,paddingTop:3}}>{incomeFromInvestmentAssetRatio} เท่า</Text>
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
                                <Text style={{color:'#FE0000', fontFamily:'ZenOldMincho-Regular', fontSize:30,paddingTop:3}}>{financialFreedomRatio} เท่า</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12,paddingTop:3}}>จากเกณฑ์ ควรมีค่ามากกว่า 0</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Image source={require('../../assets/moneyFly.png')} style={{width: 100, height:100}} />
                            </View>
                        </View>    
                    </View>
                </View>
                <View style={{height:20}}></View>
            
            </ScrollView>)}
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
