import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image,TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';
import { retrieveInventory } from '../../firebase/RetrieveData';
import { useDispatch, useSelector } from 'react-redux';
import { setEditItemLocation } from '../../redux/variableSlice';

export const InventoryScreen=({navigation})=>{

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const dispatch = useDispatch()

    const [inventory, setInventory] = useState([])

    useEffect(()=>{
        getDataInventory()
    },[])

    const getDataInventory = async()=>{
        const inventoryData = await retrieveInventory(userUID);
        const itemNotPlace = [];
        inventoryData.all.forEach((element)=>{
            if(element.itemLocation == '0' || element.itemType == 'forUse'){
                itemNotPlace.push(element)
            }
        })
        setInventory(itemNotPlace);
    }

    const handleItemPress = (item) => {
        dispatch(setEditItemLocation(true))
        navigation.navigate('EditHomeScreen', { itemSelected: item});
    };

    const renderItem = ({ item })=>{
        if(item.itemType == 'forUse'){
            return(
                <View style={{height:100,width:'35%',flexDirection:'row', marginBottom:15}}>
                    <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                        <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                            <Image source={{uri: item.itemPhotoURL}}
                                width={90} height={90} resizeMode="contain" style={{flex:1, margin:5}}></Image>
                        </View>
                    </Shadow>
                </View>
            ) 
        }
        else{
            return(
                <View style={{height:100,width:'35%',flexDirection:'row', marginBottom:15}}>
                    <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                        <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                            <TouchableOpacity
                                onPress={()=>{
                                    handleItemPress(item);
                            }}>
                                <Image source={{uri: item.itemPhotoURL}}
                                width={90} height={90} resizeMode="contain" style={{flex:1, margin:5}}></Image>
                            </TouchableOpacity>
                        </View>
                    </Shadow>
                </View>
            ) 
        }
        
    }


    return(
        <SafeAreaView style={{ flex:1,backgroundColor:'#2C6264',paddingHorizontal:15,paddingVertical:5}}>
            <View style={{flexDirection:'row-reverse',height:30}}>
                <View style={{width:'30%',height:'80%',borderWidth:2,borderRadius:15,backgroundColor:'#fffffa'}}>
                    <Image source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1206277501626617856/Dollar_Coin.png?ex=65db6c77&is=65c8f777&hm=a72f70bdba7584048fdfd739bb0d289c5a47b48c1614e5fd75ed3083f44c3dfa&=&format=webp&quality=lossless&width=27&height=27'}}
                    width={20} height={20}>

                    </Image>
                    {/* ใส่เงิน */}
                </View>
            </View>
            <ScrollView style={{width:'100%',backgroundColor:'#FFFFFF',borderRadius:16}}>
                <FlatList style={{margin:10}}
                    data={inventory}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                    horizontal={false}
                    numColumns={3}
                />
            </ScrollView>
        </SafeAreaView>
    )
}