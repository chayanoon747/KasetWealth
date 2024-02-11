import { View, Text, Image, TouchableOpacity,ScrollView, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AssetLiabilityDetailScreen } from "./AssetLiabilityDetailScreen";
import { useDispatch } from "react-redux";
import { setItemTransactionType } from "../../redux/variableSlice";
import { useSelector } from 'react-redux'
import RNSpeedometer from 'react-native-speedometer';
import { useEffect, useState } from "react";
import { retrieveDataIncome, retrieveDataExpenses, retrieveDataExpensesSavings, retrieveDataAsset, retrieveDataLiability } from "../../firebase/RetrieveData"; 
import { getNetWealth, getNetCashFlow, getSurvivalRatio, getRatioMeasureShortLiability } from '../../Calculate/Calculate'
import { getBasicLiquidityRatio, getLiabilityToAssetRatio, getDebtRepaymentRatioFromIncome} from "../../Calculate/Calculate"
import { getSavingsRatio, getInvestmentAssetRatio, getIncomeFromInvestmentAssetRatio, getFinancialFreedomRatio} from "../../Calculate/Calculate"
//

export const OverviewScreen = ()=>{
    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;
    console.log(userUID);
    
    //
    const [incomeValuesAll, setIncomeValuesAll] = useState()
    const [incomeWorkValue, setIncomeWorkValue] = useState()
    const [incomeAssetValue, setIncomeAssetValue] = useState()
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

    useEffect(() => {
        getDataIncome();
        console.log("income All: "+incomeValuesAll);
        console.log("income Work: "+incomeWorkValue);
        console.log("income Asset: "+incomeAssetValue);
        console.log("income Other: "+incomeOtherValue);
        getDataExpenses();
        getDataExpensesSavings();
        console.log("expenses All: "+expensesValuesAll);
        console.log("expenses Variable: "+expensesVariableValue);
        console.log("expenses Fixed: "+expensesFixedValue);
        console.log("expenses Saving And Investment: "+expensesSavingsAndInvestmentValue);
        console.log("expenses Saving: "+expensesSavingsValue)
        getDataAsset();
        console.log("asset All: "+assetValues);
        console.log("asset Liquid: "+assetLiquidValue);
        console.log("asset Invest: "+assetInvestValue);
        console.log("asset Personal: "+assetPersonalValue);
        getDataLiability();
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
    }, [incomeValuesAll,expensesValuesAll,assetValues,liabilityValues,netWealthValue,netCashFlow,survivalRatio,ratioMeasureShortLiability,basicLiquidityRatio,liabilityToAssetRatio,debtRepaymentRatioFromIncome,savingsRatio,investmentAssetRatio,incomeFromInvestmentAssetRatio,financialFreedomRatio]);

    const getDataIncome = async()=>{
        try{
            const itemsDataIncome = await retrieveDataIncome(userUID);
            setIncomeWorkValue(getIncomeWorkValue(itemsDataIncome));
            setIncomeAssetValue(getIncomeAssetValue(itemsDataIncome));
            setIncomeOtherValue(getIncomeOtherValue(itemsDataIncome));
            setIncomeValuesAll(incomeWorkValue+incomeAssetValue+incomeOtherValue);
        } catch (error) {
            console.error('Error getDataIncome:', error);
        }
    }

    const getDataExpenses = async()=>{
        try{
            const itemsDataExpenses = await retrieveDataExpenses(userUID);
            setExpensesVariableValue(getExpensesVaribleValues(itemsDataExpenses));
            setExpensesFixedValue(getExpensesFixedValues(itemsDataExpenses));
            setExpensesSavingsAndInvestmentValue(getExpensesSavingAndInvestmentValues(itemsDataExpenses));
            setExpensesValuesAll(expensesVariableValue+expensesFixedValue+expensesSavingsAndInvestmentValue);
        } catch (error) {
            console.error('Error getDataExpenses:', error);
        }
    }
    // ค่าใช้จ่ายจากการออม
    const getDataExpensesSavings = async()=>{
        try{
            const itemsDataExpensesSavings = await retrieveDataExpensesSavings(userUID);
            setExpensesSavingsValue(getExpensesSavingsValue(itemsDataExpensesSavings));
        } catch (error) {
            console.error('Error get Data Expenses Savings:', error);
        }
    }
    //
    const getDataAsset = async()=>{
        try{
            const itemsDataAsset = await retrieveDataAsset(userUID);
            setAssetLiquidValue(getAssetLiquidValue(itemsDataAsset));
            setAssetInvestValue(getAssetInvestValue(itemsDataAsset));
            setAssetPersonalValue(getAssetPersonalValue(itemsDataAsset));
            setAssetValues(assetLiquidValue+assetInvestValue+assetPersonalValue);
        } catch (error){
            console.error('Error getDataAsset:', error);
        }
    }

    const getDataLiability = async()=>{
        try{
            const itemsDataLiability = await retrieveDataLiability(userUID);
            setLiabilityShortValues(getLiabilityShortValue(itemsDataLiability));
            setLiabilityLongValues(getLiabilityLongValue(itemsDataLiability));
            setLiabilityValues(liabilityShortValues+liabilityLongValues);
        } catch (error){
            console.error('Error getDataLiability:', error);
        }
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
            //การออมมีการเปลี่ยนค่อยทำทีหลัง
            setSavingsRatio(getSavingsRatio(expensesSavingsValue,incomeValuesAll));
            setInvestmentAssetRatio(getInvestmentAssetRatio(assetInvestValue,assetValues));
            setIncomeFromInvestmentAssetRatio(getIncomeFromInvestmentAssetRatio(incomeAssetValue,incomeValuesAll));
            setFinancialFreedomRatio(getFinancialFreedomRatio(incomeAssetValue,expensesValuesAll));
        } catch (error){
            console.error('Error getAllCalculationFormular:', error);
        }
    }
    //รับค่ารายได้
    const getIncomeWorkValue = (itemsDataIncome)=>{
        let incomeWorkValue = 0;
        itemsDataIncome.work.forEach(element => {
            incomeWorkValue += parseFloat(element.value);
        });
        
        return incomeWorkValue;
    }
    const getIncomeAssetValue = (itemsDataIncome)=>{
        let incomeAssetValue = 0;
        itemsDataIncome.asset.forEach(element => {
            incomeAssetValue += parseFloat(element.value);
        });
        
        return incomeAssetValue;
    }
    const getIncomeOtherValue = (itemsDataIncome)=>{
        let incomeOtherValue = 0;
        itemsDataIncome.other.forEach(element => {
            incomeOtherValue += parseFloat(element.value);
        });
        return incomeOtherValue;
    }

    //รับค่าใช้จ่าย
    const getExpensesVaribleValues = (itemsDataExpenses)=>{
        let expensesVariableValue = 0;
        itemsDataExpenses.variable.forEach(element => {
            expensesVariableValue += parseFloat(element.value);
        });
        
        return expensesVariableValue;
    }
    const getExpensesFixedValues = (itemsDataExpenses)=>{
        let expensesFixedValue = 0;
        itemsDataExpenses.fixed.forEach(element => {
            expensesFixedValue += parseFloat(element.value);
        });
        
        return expensesFixedValue;
    }
    const getExpensesSavingAndInvestmentValues = (itemsDataExpenses)=>{
        let expensesSavingAndInvestmentValue = 0;
        itemsDataExpenses.savingsAndinvestment.forEach(element => {
            expensesSavingAndInvestmentValue += parseFloat(element.value);
        });
        return expensesSavingAndInvestmentValue;
    }
    const getExpensesSavingsValue = (itemsDataExpensesSavings)=>{
        let expensesSavingValue = 0;
        itemsDataExpensesSavings.savings.forEach(element => {
            expensesSavingValue += parseFloat(element.value);
        });
        return expensesSavingValue;
    }

    //รับค่าสินทรัพย์ 3 ประเภท
    const getAssetLiquidValue = (itemsDataAsset)=>{
        let assetLiquidValue = 0;
        itemsDataAsset.liquid.forEach(element => {
            assetLiquidValue += parseFloat(element.value);
        });
        return assetLiquidValue;
    }
    const getAssetInvestValue = (itemsDataAsset)=>{
        let assetInvestValue = 0;
        itemsDataAsset.invest.forEach(element => {
            assetInvestValue += parseFloat(element.value);
        });
        return assetInvestValue;
    }
    const getAssetPersonalValue = (itemsDataAsset)=>{
        let assetPersonalValue = 0;
        itemsDataAsset.personal.forEach(element => {
            assetPersonalValue += parseFloat(element.value);
        });
        return assetPersonalValue;
    }

    //รับค่าหนี้สิน ทั้ง 2 ประเภท
    const getLiabilityShortValue = (itemsDataLiability)=>{
        let liabilityShortValue = 0;
        itemsDataLiability.short.forEach(element =>{
            liabilityShortValue += parseFloat(element.value);
        });
        return liabilityShortValue;
    }
    const getLiabilityLongValue = (itemsDataLiability)=>{
        let liabilityLongValue = 0;
        itemsDataLiability.long.forEach(element =>{
            liabilityLongValue += parseFloat(element.value);
        });
        return liabilityLongValue;
    }
    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{flex:1, padding:10}}>
                <View style={{height:295, borderRadius:16,borderWidth:1,backgroundColor:'#FFFFFA', borderColor:'#A9A9A9', marginBottom:10}}>
                    <TouchableOpacity style={{height:65, borderTopLeftRadius:15, borderTopRightRadius:15, justifyContent:'center', paddingLeft:20, backgroundColor:'#B3DBD8'}}>
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
