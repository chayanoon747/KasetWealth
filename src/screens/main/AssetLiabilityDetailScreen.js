import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native"
import { useState, useEffect } from "react"
import { retrieveDataAsset, retrieveDataLiability } from "../../firebase/UserModel"
import { useSelector } from "react-redux"
import { SafeAreaView } from "react-native-safe-area-context"
import { addTransaction } from "../../firebase/UserModel"

export const AssetLiabilityDetailScreen = ({navigation})=>{

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const [selectedType,setSelectedType] = useState('graph')
    const [selectedDetail,setSelectedDetail] = useState('asset')
    const [assetData, setAssetData] = useState({})
    const [assetValues, setAssetValues] = useState()
    const [assetContainerHeight, setAssetContainerHeight] = useState()
    const [liabilityData, setLiabilityData] = useState({})
    const [liabilityValues, setLiabilityValues] = useState()
    const [liabilityContainerHeight, setLiabilityContainerHeight] = useState()
    const [netWealthValue, setNetWealthValue] = useState()
    //แยกหมวดหมู่ย่อย asset
    const [assetLiquidValue,setAssetLiquidValue] = useState();
    const [assetInvestValue,setAssetInvestValue] = useState();
    const [assetPersonalValue,setAssetPersonalValue] = useState();
    // แยกหมวดหมูย่อย liability
    const [liabilityShortValues,setLiabilityShortValues] = useState();
    const [liabilityLongValues,setliabilityLongValues] = useState();
    //

    useEffect(()=>{
        getDataAsset();
        getDataLiability();
        setNetWealthValue(assetValues - liabilityValues)
        console.log(netWealthValue)
    },[assetValues, liabilityValues])

    //test
    const newItemAssetSolid ={
        transactionType: "สินทรัพย์",
        category: "สินทรัพย์สภาพคล่อง",
        subCategory: "เงินฝากกระแสรายวัน",
        photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204095691962449960/bi_cash-coin.png?ex=65d37c7f&is=65c1077f&hm=3968a3f849ab80c7da271880ecd440c7ee1fd9f2bfd6fa1dcc4bce80e32d8958&"
    }
    const newInputAssetSolid = {
        detail: "",
        value: 1000000
    }
    const newItemAssetInvest ={
        transactionType: "สินทรัพย์",
        category: "สินทรัพย์ลงทุน",
        subCategory: "สลากออมทรัพย์",
        photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204096445297336380/mdi_cash-100.png?ex=65d37d33&is=65c10833&hm=5c6996464172ee977ad9d42e5a9aff1533fca2f41a4cccdaa08f1366632db63f&"
    }
    const newInputAssetInvest = {
        detail: "",
        value: 300000
    }

    const newItemAssetPersonal = {
        transactionType: "สินทรัพย์",
        category: "สินทรัพย์ส่วนตัว",
        subCategory: "รถ",
        photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204096811053097051/maki_car.png?ex=65d37d8a&is=65c1088a&hm=27cd8e75e3649648755c11196081e84ce80f48af01f7eb7aefd734b3c6e0273d&"
    }
    const newInputAssetPersonal ={
        detail: "",
        value: 300000
    }
    const newItemLiabilityShort = {
        transactionType: "หนี้สิน",
        category: "หนี้สินระยะสั้น",
        subCategory: "หนี้บัตรเครดิต",
        photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204097298175492166/bytesize_creditcard.png?ex=65d37dfe&is=65c108fe&hm=26d7f60e9e1280dd6f56506fce7bfefa3e42dfa0ad068dc4f35514f5c2de4c1f&"
    }
    const newInputLiabilityShort ={
        detail: "",
        value: 150000
    }

    const newItemLiabilityLong = {
        transactionType: "หนี้สิน",
        category: "หนี้สินระยะยาว",
        subCategory: "หนี้กยศ.",
        photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204097683652878406/Vector.png?ex=65d37e5a&is=65c1095a&hm=05a9a4d1fedfaae72cfa4d3a1c6515e40d812fba652ae0b62b53769028fdd73f&"
    }
    const newInputLiabilityLong ={
        detail: "",
        value: 150000
    }
    // useEffect(()=>{
    //     addTransaction(userUID,newItemAssetSolid,newInputAssetSolid, "2024-02-05");
    //     addTransaction(userUID,newItemAssetInvest,newInputAssetInvest,"2024-02-05");
    //     addTransaction(userUID,newItemAssetPersonal,newInputAssetPersonal, "2024-02-05");
    //     addTransaction(userUID,newItemLiabilityShort,newInputLiabilityShort, "2024-02-05");
    //     addTransaction(userUID,newItemLiabilityLong,newInputLiabilityLong, "2024-02-05");
    //     console.log('addTransaction success');
    // },[])
        
    const getDataAsset = async()=>{
        try{
            const itemsDataAsset = await retrieveDataAsset(userUID);
            setAssetData(itemsDataAsset);
            let height = 240 + (itemsDataAsset.liquid.length * 45) + (itemsDataAsset.invest.length * 45) + (itemsDataAsset.personal.length * 45)
            setAssetContainerHeight(height)
            //console.log(containerHeight)
            setAssetValues(getAssetValues(itemsDataAsset));
            setAssetLiquidValue(getAssetLiquidValue(itemsDataAsset));
            setAssetInvestValue(getAssetInvestValue(itemsDataAsset));
            setAssetPersonalValue(getAssetPersonalValue(itemsDataAsset));
        } catch (error) {
            console.error('Error getDataAsset:', error);
        }
    }

    const getDataLiability = async()=>{
        try{
            const itemsDataLiability = await retrieveDataLiability(userUID);
            setLiabilityData(itemsDataLiability);
            let height = 240 + (itemsDataLiability.short.length * 45) + (itemsDataLiability.long.length * 45)
            setLiabilityContainerHeight(height)
            //console.log(containerHeight)
            setLiabilityValues(getLiabilityValues(itemsDataLiability));
            setLiabilityShortValues(getLiabilityShortValues(itemsDataLiability));
            setliabilityLongValues(getLiabilityLongValues(itemsDataLiability));
        } catch (error) {
            console.error('Error getDataLiability:', error);
        }
    }

    const getAssetValues = (itemsDataAsset)=>{
        let assetValues = 0;
        itemsDataAsset.liquid.forEach(element => {
            assetValues += parseFloat(element.value);
        });
        itemsDataAsset.invest.forEach(element => {
            assetValues += parseFloat(element.value);
        });
        itemsDataAsset.personal.forEach(element => {
            assetValues += parseFloat(element.value);
        });
        //console.log("get asset success")
        return assetValues
    }
    const getAssetLiquidValue = (itemsDataAsset)=>{
        let assetLiquidValue = 0;
        itemsDataAsset.liquid.forEach(element => {
            assetLiquidValue += parseFloat(element.value);
        });
        //console.log("get asset liquid success")
        return assetLiquidValue;
    }
    //console.log(assetValues)
    const getAssetInvestValue = (itemsDataAsset)=>{
        let assetInvestValue = 0;
        itemsDataAsset.invest.forEach(element => {
            assetInvestValue += parseFloat(element.value);
        });
        //console.log("get asset Invest success")
        return assetInvestValue;
    }

    const getAssetPersonalValue = (itemsDataAsset)=>{
        let assetPersonalValue = 0;
        itemsDataAsset.personal.forEach(element => {
            assetPersonalValue += parseFloat(element.value);
        });
        //console.log("get asset Personal success")
        return assetPersonalValue;
    }
    const getLiabilityValues = (itemsDataLiability)=>{
        let liabilityValues = 0;
        itemsDataLiability.short.forEach(element => {
            liabilityValues += parseFloat(element.value);
        });
        itemsDataLiability.long.forEach(element => {
            liabilityValues += parseFloat(element.value);
        });
        //console.log("get liability success")
        return liabilityValues
    }
    const getLiabilityShortValues = (itemsDataLiability)=>{
        let liabilityShortValues = 0;
        itemsDataLiability.short.forEach(element => {
            liabilityShortValues += parseFloat(element.value);
        });
        //console.log("get liability short success")
        return liabilityShortValues
    }
    const getLiabilityLongValues = (itemsDataLiability)=>{
        let liabilityLongValues = 0;
        itemsDataLiability.long.forEach(element => {
            liabilityLongValues += parseFloat(element.value);
        });
        //console.log("get liability long success")
        return liabilityLongValues
    }
    
    const handleSelectedGraph = ()=>{
        setSelectedType('graph')
    }

    const handleSelectedMenuBar = ()=>{
        setSelectedType('menuBar')
    }

    const handleSelectedAsset = ()=>{
        setSelectedDetail('asset')
    }

    const handleSelectedLiability = ()=>{
        setSelectedDetail('liability')
    }

    const renderItem = ({ item })=>{
        return(
            <View style={{flex:1, flexDirection:'row', alignItems:'center', marginVertical:5}}>
                <View style={{flex:0.5, justifyContent:'center', alignItems:'center'}}>
                    <Image source={require('../../assets/circle.png')} width={25} height={25}/>
                    <Image source={{uri:item.photoURL}} width={25} height={25} style={{position:'absolute'}}/>
                </View>
                
                <Text style={{flex:2}}>{item.subCategory}</Text>
                <Text style={styles.textValue}>{item.value}</Text>
                <Text style={{paddingHorizontal:5}}>THB</Text>
            </View>
        )
        
    }
    
    const componentAsset = ()=>{
        return(
            <View style={{paddingLeft:20, marginVertical:10}}>
                <Text style={{marginVertical:5}}>สินทรัพย์สภาพคล่อง</Text>
                <FlatList style={{borderBottomWidth:1}}
                    data={assetData.liquid}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />

                <Text style={{marginVertical:5}}>สินทรัพย์ลงทุน</Text>
                <FlatList style={{borderBottomWidth:1}}
                    data={assetData.invest}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />

                <Text style={{marginVertical:5}}>สินทรัพย์ส่วนตัว</Text>
                <FlatList
                    data={assetData.personal}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />
            </View>
            
        )
    }

    const componentLiability = ()=>{
        return(
            <View style={{paddingLeft:20, marginVertical:10}}>
                <Text style={{marginVertical:5}}>หนี้ระยะสั้น</Text>
                <FlatList style={{borderBottomWidth:1}}
                    data={liabilityData.short}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />

                <Text style={{marginVertical:5}}>หนี้ระยะยาว</Text>
                <FlatList style={{borderBottomWidth:1}}
                    data={liabilityData.long}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />
            </View>
            
        )
    }

    const componentMenuBar = ()=>{
        return(
            <View style={{height:'100%'}}>
                <View style={{height:60, flexDirection:'row'}}>
                    <TouchableOpacity style={{flex:1, backgroundColor:selectedDetail == 'asset' ? '#b3d8d8' : '#d9d9d9', justifyContent:'center', alignItems:'center'}}
                        onPress={handleSelectedAsset}
                    >
                        <Text style={{fontWeight:'bold'}}>สินทรัพย์</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, backgroundColor:selectedDetail == 'liability' ? '#b3d8d8' : '#d9d9d9', justifyContent:'center', alignItems:'center'}}
                        onPress={handleSelectedLiability}
                    >
                        <Text style={{fontWeight:'bold'}}>หนี้สิน</Text>
                    </TouchableOpacity>
                </View>
                {selectedDetail == 'asset' ? componentAsset() : componentLiability()}

            </View>
        )
    }
   //console.log(-netWealthValue/assetValues*150); //150
   //console.log(-netWealthValue/liabilityValues*150) //75
    const componentGraph = ()=>{
        return(
            <View style ={{flex:1}}>
                {assetValues && liabilityValues && assetLiquidValue && assetInvestValue && assetPersonalValue && liabilityShortValues && liabilityShortValues &&(
                    <View style={{flex:1,backgroundColor:"#fffffA",marginTop:25,alignItems:'center'}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flexDirection:'column',width:65,marginHorizontal:20,marginBottom:20}}>
                                <Text style={styles.textHeaderGraph}>สินทรัพย์</Text>
                                <Text style={styles.textHeaderValueGraph}>{assetValues.toLocaleString()}</Text>
                                <Text style={styles.textHeaderValueGraph}>(100.00%)</Text>
                            </View>
                            <View style={{flexDirection:'column',width:65,marginHorizontal:20,marginBottom:20}}>
                                <Text style={styles.textHeaderGraph}>หนี้สิน</Text>
                                <Text style={styles.textHeaderValueGraph}>{liabilityValues.toLocaleString()}</Text>
                                <Text style={styles.textHeaderValueGraph}>({(liabilityValues/assetValues*100).toFixed(2)}%)</Text>
                            </View>
                            <View style={{flexDirection:'column',width:100,marginBottom:20}}>
                                <Text style={styles.textHeaderGraph}>ความมั่งคั่งสุทธิ</Text>
                                <Text style={styles.textHeaderValueGraph}>{netWealthValue.toLocaleString()}</Text>
                                <Text style={styles.textHeaderValueGraph}>({(netWealthValue/assetValues*100).toFixed(2)}%)</Text>
                            </View>
                        </View>
                        {/* 100% = height:150 เทียบเอา ตอนเอาค่ามาลงสร้างกราฟ */}
                    
                        <View style={{flexDirection: 'row',borderBottomWidth:1,borderBottomColor:'#D2DBD6'}}>
                            <View style={{flexDirection:'column-reverse',marginHorizontal:20}}>
                                {/* กรณีที่ค่า หนี้สิน > สินทรัพย์ ต้องมีการปรับสเกลกราฟใหม่ */}
                                {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 > 150 &&(
                                    <View style={{ height:assetPersonalValue/liabilityValues*150 , width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#FFFF00" }}>
                                        <Text style={styles.textValueinGraph}>{assetPersonalValue.toLocaleString()}</Text>
                                    </View>
                                )}
                                {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 > 150 &&(
                                    <View style={{ height:assetInvestValue/liabilityValues*150 , width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#EEE8AA" }}>
                                        <Text style={styles.textValueinGraph}>{assetInvestValue.toLocaleString()}</Text>
                                    </View>
                                )}
                                {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 > 150 &&(
                                    <View style={{ height:assetLiquidValue/liabilityValues*150 , width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#FFFACD" }}>
                                        <Text style={styles.textValueinGraph}>{assetLiquidValue.toLocaleString()}</Text>
                                    </View>
                                )}
                                {/* กรณีที่ค่า หนี้สิน <= สินทรัพย์ ใช้สเกลเดิม */}
                                {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 <= 150 && (
                                    <View style={{ height: assetPersonalValue / assetValues * 150, width: 65, flexDirection: 'column', justifyContent: 'flex-end',backgroundColor: "#FFFF00" }}>
                                        <Text style={styles.textValueinGraph}>{assetPersonalValue.toLocaleString()}</Text>
                                    </View>
                                )}
                                {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 <= 150 && (
                                    <View style={{ height: assetInvestValue / assetValues * 150, width: 65, flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: "#EEE8AA" }}>
                                        <Text style={styles.textValueinGraph}>{assetInvestValue.toLocaleString()}</Text>
                                    </View>
                                )}
                                {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 <= 150 && (
                                    <View style={{ height: assetLiquidValue / assetValues * 150, width: 65, flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: "#FFFACD" }}>
                                        <Text style={styles.textValueinGraph}>{assetLiquidValue.toLocaleString()}</Text>
                                    </View>
                                )}
                            </View>
                            <View style={{ flexDirection: 'column-reverse', marginHorizontal: 20 }}>
                                {/* กรณีที่ หนี้สิน > สินทรัพย์ ใช้สเกลเดิม*/}
                                {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 <= 150 && (
                                    <View style={{ height:liabilityShortValues/assetValues*150 , width: 65,flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#FF0000" }}>
                                        <Text style={styles.textValueinGraph}>{liabilityShortValues.toLocaleString()}</Text>
                                    </View>
                                )}
                                {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 <= 150 && (
                                    <View style={{ height:liabilityLongValues/assetValues*150 , width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#FF8C00" }}>
                                        <Text style={styles.textValueinGraph}>{liabilityLongValues.toLocaleString()}</Text>
                                    </View>
                                )}
                                {/* กรณีที่ หนี้สิน < สินทรัพย์ ต้องมีการปรับสเกลกราฟใหม่ */}
                                {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 > 150 && (
                                    <View style={{ height:liabilityShortValues/liabilityValues*150 , width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#FF0000" }}>
                                        <Text style={styles.textValueinGraph}>{liabilityShortValues.toLocaleString()}</Text>
                                    </View>
                                )}
                                {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 > 150 && (
                                    <View style={{ height:liabilityLongValues/liabilityValues*150 , width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#FF8C00" }}>
                                        <Text style={styles.textValueinGraph}>{liabilityLongValues.toLocaleString()}</Text>
                                    </View>
                                )}
                                
                            </View>
                            {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 < 150 && (
                                <View style={{ flexDirection: 'column-reverse', paddingHorizontal: 17.5 }}>
                                    {assetValues && liabilityLongValues && netWealthValue >= 0 && (
                                        <View style={{ height: netWealthValue/assetValues*150, width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#B3DBD8" }}>
                                            <Text style={styles.textValueinGraph}>{netWealthValue.toLocaleString()}</Text>
                                        </View>
                                    )}
                                </View>
                            )}
                            {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 > 150 && (
                                <View style={{ flexDirection: 'column-reverse', paddingHorizontal: 50 }}>
                                    {assetValues && liabilityLongValues && netWealthValue >= 0 && (
                                        <View style={{ height: netWealthValue/assetValues*150, width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#B3DBD8" }}>
                                            <Text style={styles.textValueinGraph}>{netWealthValue.toLocaleString()}</Text>
                                        </View>
                                    )}
                                </View>
                            )}
                           
                        </View>
                        {netWealthValue < 0 && -netWealthValue/assetValues*150 <= 150 && (
                            <View style={{ flexDirection: 'column-reverse', marginLeft: 210 }}>
                                {assetValues && liabilityLongValues && netWealthValue && (
                                    <View style={{ height: -netWealthValue/liabilityValues*150, width: 65,flexDirection: 'column-reverse',justifyContent:'flex-end', backgroundColor: "#B3DBD8" }}>
                                        <Text style={styles.textValueinGraph}>{netWealthValue.toLocaleString()}</Text>
                                    </View>
                                )}
                            </View>
                        )}
                        {netWealthValue < 0 && -netWealthValue/assetValues*150 > 150 && (
                            <View style={{ flexDirection: 'column-reverse',paddingHorizontal:50,marginLeft: 210 }}>
                                {assetValues && liabilityLongValues && netWealthValue && (
                                    <View style={{ height: -netWealthValue/liabilityValues*150, width: 65, flexDirection: 'column-reverse',justifyContent:'flex-end', backgroundColor: "#B3DBD8" }}>
                                        <Text style={styles.textValueinGraph}>{netWealthValue.toLocaleString()}</Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>

                    
                )}
                {assetValues && liabilityValues && assetLiquidValue && assetInvestValue && assetPersonalValue && liabilityShortValues && liabilityShortValues &&(
                    <View style={{flex:0.5,marginTop:100,flexDirection:'row',justifyContent:'center'}}>
                        <View style={{flex:0.25,flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}>
                            <View style={{width: 15,height: 15,borderRadius:15,marginBottom:15,backgroundColor: '#FFFACD'}}></View>
                            <View style={{width: 15,height: 15,borderRadius:15,marginBottom:15,backgroundColor: '#EEE8AA'}}></View>
                            <View style={{width: 15,height: 15,borderRadius:15,marginBottom:15,backgroundColor: '#FFFF00'}}></View>
                        </View>

                        <View style={{flexflexDirection: 'column',justifyContent:'center',marginHorizontal:8}}>
                            <Text style={styles.textDetail}>สินทรัพย์สภาพคล่อง ({(assetLiquidValue/assetValues*100).toFixed(2)}%)</Text>
                            <Text style={styles.textDetail}>สินทรัพย์ลงทุน ({(assetInvestValue/assetValues*100).toFixed(2)}%)</Text>
                            <Text style={styles.textDetail}>สินทรัพยส่วนตัว ({(assetPersonalValue/assetValues*100).toFixed(2)}%)</Text>
                        </View>
                        <View style={{flex:0.25,flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
                            <View style={{width: 15,height: 15,borderRadius:15,marginBottom:15,backgroundColor: '#FF0000'}}></View>
                            <View style={{width: 15,height: 15,borderRadius:15,marginBottom:15,backgroundColor: '#FF8C00'}}></View>
                            <View style={{width: 15,height: 15,borderRadius:15,marginBottom:15,backgroundColor: '#B3DBD8'}}></View>
                        </View>
                        <View style={{flexDirection: 'column',justifyContent:'center',marginHorizontal:8}}>
                            <Text style={styles.textDetail}>หนี้สินระยะสั้น ({(liabilityShortValues/assetValues*100).toFixed(2)}%)</Text>
                            <Text style={styles.textDetail}>หนี้สินระยะยาว ({(liabilityLongValues/assetValues*100).toFixed(2)}%)</Text>
                            <Text style={styles.textDetail}>ความมั่งคั่งสุทธิ ({(netWealthValue/assetValues*100).toFixed(2)}%)</Text>
                        </View>
                    </View> 
                )}
            </View>
            
        )
    }

    return(
        <ScrollView style={{backgroundColor:'#fffffa'}}>
            <View style={{height:140, borderWidth:1, borderColor:'#000000', borderRadius:16, marginVertical:30, marginHorizontal:40, backgroundColor:'#ffffff'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10}}>
                    <Text style={styles.headerText}>ความมั่งคั่งสุทธิ</Text>
                    <Text style={[styles.bodyText,{flex:1, textAlign:'right'}]}>ข้อมูล ณ ปัจจุบัน</Text>
                </View>

                <View style={{flex:1, paddingLeft:10, paddingTop:5}}>
                    <Text style={{flex:1, color:'#0ABAB5', fontFamily:'ZenOldMincho-Black', fontSize:16}}>{netWealthValue} THB</Text>
                </View>

                <View style={{flex:1.2, flexDirection:'row', paddingHorizontal:10}}>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <Text style={styles.subHeaderText}>สินทรัพย์รวม</Text>
                        <Text style={styles.subHeaderText}>{assetValues} THB</Text>
                    </View>

                    <View style={{flex:1, flexDirection:'column', paddingLeft:10, borderLeftWidth:1, borderColor:'#D2DBD6'}}>
                        <Text style={styles.subHeaderText}>หนี้สินรวม</Text>
                        <Text style={styles.subHeaderText}>{liabilityValues} THB</Text>
                    </View>
                </View>
                
                
            </View>

            <View style={{height:selectedType == 'graph' && netWealthValue >= 0 ? 470 : (selectedType === 'graph' && netWealthValue < 0 && -netWealthValue/assetValues*150 <= 150  ? 470+(-netWealthValue/liabilityValues*150):(selectedType === 'graph' && netWealthValue < 0 && -netWealthValue/liabilityValues*150 <=  150  ? 470+(-netWealthValue/liabilityValues*150):(selectedDetail == 'asset' ? assetContainerHeight : liabilityContainerHeight))), borderWidth:2, borderColor:'#a9a9a9', marginHorizontal:15, borderRadius:16, backgroundColor:'#ffffff'}}>
                <View style={{height:55}}>
                    <View style={{flex:1, flexDirection:'row',borderBottomWidth:1,borderColor:"#D2DBD6",borderBottomStartRadius:10,borderBottomEndRadius:10}}>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <TouchableOpacity style={{width:35, height:35, justifyContent:'center', alignItems:'center', margin:10}}
                                onPress={handleSelectedGraph}
                            >
                                {selectedType == 'graph' ? 
                                    <Image source={require('../../assets/circleGreen.png')} width={35} height={35}/> 
                                    :
                                    <Image source={require('../../assets/circle.png')} width={35} height={35}/>
                                }
                                <Image source={require('../../assets/barChartIcon.png')} width={30} height={30} style={{position:'absolute'}}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:35, height:35, justifyContent:'center', alignItems:'center', margin:10}}
                                onPress={handleSelectedMenuBar}
                            >
                                {selectedType == 'menuBar' ? 
                                    <Image source={require('../../assets/circleGreen.png')} width={35} height={35}/> 
                                    :
                                    <Image source={require('../../assets/circle.png')} width={35} height={35}/>
                                }
                                <Image source={require('../../assets/menuBarIcon.png')} width={30} height={30} style={{position:'absolute'}} />
                            </TouchableOpacity>
                        </View>
                        

                        <Text style={{flex:1, textAlignVertical:'bottom', textAlign:'right', marginRight:10}}>ข้อมูล ณ วันที่ 03-02-2024</Text>
                    </View>
                    
                </View>
                
                { selectedType == 'graph'? componentGraph() : componentMenuBar()}
                                
            </View>
        </ScrollView>
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
        fontSize:13,
        color:'#000000'
    },

    bodyText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:13,
        color:'#000000'
    },

    textValue:{
        flex:1,
        fontFamily:'ZenOldMincho-Regular',
        fontSize:13,
        color:'#0abab5',
        textAlign:'right'
    },
    textValueinGraph:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:10,
        color:'#000000',
        textAlign:'center',
        marginBottom:2
    },
    textHeaderGraph:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:15,
        color:'#000000',
        textAlign:'center',
        marginBottom:10
    },
    textHeaderValueGraph:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:12,
        color:'#000000',
        textAlign:'center',
        marginBottom:10
    },
    textDetail:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:11,
        color:'#000000',
        marginBottom:15,
        lineHeight: 15
    }
})