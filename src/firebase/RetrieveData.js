import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import uuid from 'react-native-uuid';

//ใช้ดึงวันที่ของรายการที่ทำ
export const  retrieveSelectedDataIncomeAndExp = (userUID, selectedDate)=>{
    const IncomeAndExpensestData = []

    return firestore()
    .collection('financials')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().transactions;
            //console.log(allData);
            allData.forEach(element => {
                if(element.date == selectedDate){
                    if(element.transactionType == 'รายได้'){
                        IncomeAndExpensestData.push(element)
                    }
                    if(element.transactionType == 'ค่าใช้จ่าย'){
                        IncomeAndExpensestData.push(element)
                    }
                }
            });

            return IncomeAndExpensestData
        }
    })
}
//ดึงข้อมูลมาเก็บใน List
export const  retrieveAllDataIncomeAndExpenses = (userUID)=>{
    const IncomeAndExpensestData = {
        income:[],
        expenses:[],
    }

    return firestore()
    .collection('financials')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().transactions;
            //console.log(allData);
            allData.forEach(element => {
                if(element.transactionType == 'รายได้'){
                    IncomeAndExpensestData.income.push(element)
                }
                if(element.transactionType == 'ค่าใช้จ่าย'){
                    IncomeAndExpensestData.expenses.push(element)
                }
            });

            return IncomeAndExpensestData
        }
    })
}
//ทำเพิ่มมา
export const retrieveDataIncome = (userUID)=>{
    const IncomeData ={
        work:[], //รายได้จากการทำงาน
        asset:[], //รายได้จากสินทรัพย์
        other:[]  //รายได้อื่นๆ
    }
    return firestore()
    .collection('financials')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().transactions;
            //console.log(allData);
            allData.forEach(element => {
                if(element.category == 'รายได้จากการทำงาน'){
                    IncomeData.work.push(element)
                }
                if(element.category == 'รายได้จากสินทรัพย์'){
                    IncomeData.asset.push(element)
                }
                if(element.category == 'รายได้อื่นๆ'){
                    IncomeData.other.push(element)
                }
            });

            return IncomeData
        }
    })
}
//ทำเพิ่มมา
export const retrieveDataExpenses = (userUID)=>{
    const ExpensesData ={
        variable:[], //ค่าใช้จ่ายผันแปร
        fixed:[],  //ค่าใช้จ่ายคงที่
        savingsAndinvestment:[]  //ค่าใช้จ่ายออมและลงทุน
    }
    return firestore()
    .collection('financials')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().transactions;
            //console.log(allData);
            allData.forEach(element => {
                if(element.category == 'ค่าใช้จ่ายผันแปร'){
                    ExpensesData.variable.push(element)
                }
                if(element.category == 'ค่าใช้จ่ายคงที่'){
                    ExpensesData.fixed.push(element)
                }
                if(element.category == 'ค่าใช้จ่ายออมและลงทุน'){
                    ExpensesData.savingsAndinvestment.push(element)
                }
            });

            return ExpensesData
        }
    })
}
// ทำเพิ่มมา เพื่อหา transaction ที่เป็น เงินออมเพื่อนำไปคำนวณ แต่น่าจะแก้ แต่ทำไว้ก่อน
export const retrieveDataExpensesSavings = (userUID)=>{
    const ExpensesSavingsData ={
        savings:[]
    }
    return firestore()
    .collection('financials')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().transactions;
            //console.log(allData);
            allData.forEach(element => {
                if(element.category == 'ค่าใช้จ่ายออมและลงทุน' && element.subCategory == 'เงินออม'){
                    ExpensesSavingsData.savings.push(element) 
                }
            });
            
            return ExpensesSavingsData
        }
    })
}

export const  retrieveDataAsset = (userUID)=>{
    const assetData = {
        liquid:[],
        invest:[],
        personal:[]
    }

    return firestore()
    .collection('financials')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().transactions;
            //console.log(allData);
            allData.forEach(element => {
                if(element.category == 'สินทรัพย์สภาพคล่อง'){
                    assetData.liquid.push(element)
                }
                if(element.category == 'สินทรัพย์ลงทุน'){
                    assetData.invest.push(element)
                }
                if(element.category == 'สินทรัพย์ส่วนตัว'){
                    assetData.personal.push(element)
                }
            });

            //console.log(assetData)
            return assetData
        }
    })
}



export const  retrieveDataLiability = (userUID)=>{
    const liabilityData = {
        short:[],
        long:[],
    }

    return firestore()
    .collection('financials')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().transactions;
            //console.log(allData);
            allData.forEach(element => {
                if(element.category == 'หนี้สินระยะสั้น'){
                    liabilityData.short.push(element)
                }
                if(element.category == 'หนี้สินระยะยาว'){
                    liabilityData.long.push(element)
                }
            });

            //console.log(liabilityData)
            return liabilityData
        }
    })
}