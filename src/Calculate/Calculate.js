//ความมั่งคั่งสุทธิ (สินทรัพย์รวม - หนี้สินรวม)
export const getNetWealth = (assetValues,liabilityValues)=>{
    let netWealthValue = assetValues - liabilityValues;
    return netWealthValue;
}
//กระแสเงินสดสุทธิ (รายได้รวม - ค่าใช้จ่ายรวม)
export const getNetCashFlow = (incomeValuesAll,expensesValuesAll)=>{
    let netCashFlowValue = incomeValuesAll - expensesValuesAll;
    return netCashFlowValue;
}
// retrive รายได้จากการทำงาน //ทำแล้ว
//อัตราส่วนความอยู่รอด (รายได้จากการทำงาน+รายได้จากสินทรัพย์)/ค่าใช้จ่ายรวม
export const getSurvivalRatio = (incomeWorkValue,incomeAssetValue,expensesValuesAll)=>{
    let survivalRatioValue = ( (incomeWorkValue+incomeAssetValue)/expensesValuesAll ).toFixed(2);
    return survivalRatioValue;
}
//อัตราส่วนวัดความสามารถในการชำระหนี้ระยะสั้น (สินทรัพย์สภาพคล่อง/หนี้สินระยะสั้น)
export const getRatioMeasureShortLiability = (assetLiquidValue,liabilityShortValues)=>{
    let ratioMeasureShortLiabilityValue = ( assetLiquidValue/liabilityShortValues ).toFixed(2);
    return ratioMeasureShortLiabilityValue;
}
//อัตราส่วนสภาพคล่องพื้นฐาน (สินทรัพย์สภาพคล่อง/ค่าใช้จ่ายรวม)
export const getBasicLiquidityRatio = (assetLiquidValue,expensesValuesAll)=>{
    let basicLiquidityRatioValue = (assetLiquidValue/expensesValuesAll).toFixed(2);
    return basicLiquidityRatioValue;
}
//อัตราส่วนหนี้สินต่อสินทรัพย์ (หนี้สินรวม/สินทรัพย์รวม)
export const getLiabilityToAssetRatio = (liabilityValues,assetValues)=>{
    let liabilityToAssetRatioValue = (liabilityValues/assetValues).toFixed(2);
    return liabilityToAssetRatioValue;
}
//ยังไม่ได้ทำ retrive การชำระหนี้สิน (อยู่ในค่าใช้จ่าย) //Hard code ก่อน ยังทำไม่ได้
//อัตราส่วนการชำระคืนหนี้สินจากรายได้ (การชำระหนี้สิน/รายได้รวม)
export const getDebtRepaymentRatioFromIncome = (debtSettlementValue,incomeValuesAll)=>{
    let debtRepaymentRatioFromIncomeValue = (debtSettlementValue/incomeValuesAll).toFixed(2);
    return debtRepaymentRatioFromIncomeValue;
}
//ยังไม่ได้ทำ retrive การออม (อยู่ในค่าใช้จ่าย) //Hard code ก่อน ยังทำไม่ได้
//อัตราส่วนการออม (เงินออม/รายได้รวม)
export const getSavingsRatio = (savingsValue,incomeValuesAll)=>{
    let savingsRatioValue = (savingsValue/incomeValuesAll).toFixed(2);
    return savingsRatioValue;
}
//อัตราส่วนสินทรัพย์ลงทุน (สินทรัพย์ลงทุน / สินทรัพย์รวม)
export const getInvestmentAssetRatio = (assetInvestValue,assetValues)=>{
    let investmentAssetRatioValue = (assetInvestValue/assetValues).toFixed(2);
    return investmentAssetRatioValue;
}
//ยังไม่ได้ทำ retrive รายได้จากสินทรัพย์ (อยู่ในรายได้ subcategory รายได้จากสินทรัพย์)
//อัตราส่วนการสร้างรายได้จากสินทรัพย์ลงทุน (รายได้จากสินทรัพย์ลงทุน/ รายรับรวม)
export const getIncomeFromInvestmentAssetRatio =(incomeAssetValue,incomeValuesAll)=>{
    let incomeFromInvestmentAssetRatioValue = (incomeAssetValue/incomeValuesAll).toFixed(2);
    return incomeFromInvestmentAssetRatioValue;
}
//ยังไม่ได้ทำ retrive รายได้จากสินทรัพย์ (อยู่ในรายได้ subcategory รายได้จากสินทรัพย์)
//อัตราส่วนอิสรภาพทางการเงิน (รายได้จากสินทรัพย์ลงทุน/รายจ่ายรวม)
export const getFinancialFreedomRatio =(incomeAssetValue,expensesValuesAll)=>{
    let financialFreedomRatioValue = (incomeAssetValue/expensesValuesAll).toFixed(2);
    return financialFreedomRatioValue;
}
