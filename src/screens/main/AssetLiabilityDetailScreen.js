import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native"
import { useState, useEffect } from "react"
import { retrieveDataAsset, retrieveDataLiability } from "../../firebase/UserModel"
import { useSelector } from "react-redux"
import { SafeAreaView } from "react-native-safe-area-context"

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

    useEffect(()=>{
        getDataAsset();
        getDataLiability();
        setNetWealthValue(assetValues - liabilityValues)
        console.log(netWealthValue)
    },[assetValues, liabilityValues])

    const getDataAsset = async()=>{
        try{
            const itemsDataAsset = await retrieveDataAsset(userUID);
            setAssetData(itemsDataAsset);
            let height = 240 + (itemsDataAsset.liquid.length * 45) + (itemsDataAsset.invest.length * 45) + (itemsDataAsset.personal.length * 45)
            setAssetContainerHeight(height)
            //console.log(containerHeight)
            setAssetValues(getAssetValues(itemsDataAsset));
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
        
        return assetValues
    }

    const getLiabilityValues = (itemsDataLiability)=>{
        let liabilityValues = 0;
        itemsDataLiability.short.forEach(element => {
            liabilityValues += parseFloat(element.value);
        });
        itemsDataLiability.long.forEach(element => {
            liabilityValues += parseFloat(element.value);
        });
        
        return liabilityValues
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

    const componentGraph = ()=>{
        return(
            <View style={{flex:7}}>

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
                <View style={{flex:0.5}}>

                </View>
            </View>

            <View style={{height:selectedType == 'graph' ? 400 : (selectedDetail == 'asset' ? assetContainerHeight : liabilityContainerHeight), borderWidth:2, borderColor:'#a9a9a9', marginHorizontal:15, borderRadius:16, backgroundColor:'#ffffff'}}>
                <View style={{height:50}}>
                    <View style={{flex:1, flexDirection:'row'}}>
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
                        

                        <Text style={{flex:1, textAlignVertical:'bottom', textAlign:'right', marginRight:5}}>ข้อมูล ณ วันที่ 03-02-2024</Text>
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
    }
    
})