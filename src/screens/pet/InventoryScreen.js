
import { View,Text, Image, FlatList, TouchableOpacity} from "react-native";
import { useEffect, useState } from "react";
import { retrieveInventory } from "../../firebase/RetrieveData";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedItems, setItemCategory, setItemData } from '../../redux/variableSlice'
import { Shadow } from "react-native-shadow-2";
import { SafeAreaView } from 'react-native-safe-area-context';

export const InventoryScreen=({navigation})=>{

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;
    //console.log(userUID);

    const editStatus = useSelector((state)=>state.variables.isEdit)
    //console.log(editStatus);

    const selectedItems = useSelector(state => state.variables.selectedItems);
    //console.log(selectedItems);

    const dispatch = useDispatch();

    const [isEdit, setIsEdit] = useState(false);

    const [inventory1, setInventory] = useState([]);
  
    
    useEffect(() => {
        retrieveData();
    },[]);

    const retrieveData = async () => {
        try {
            const items1 = [];
            const inventoryData =  retrieveInventory('g5EHx1YxAeQ2wsREKMRB') 
            items1.push(inventoryData);
            console.log(items1);
            setInventory(items1);
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };

    
 /*    const renderItem = ({ item }) => {
        const isSelected = selectedItems.includes(item);
        
        return(
            <TouchableOpacity style={{width:'20%', height:'50%', alignItems:'center', marginVertical:5}}
                onPress={() => handleItemPress(item)}
            >
                <View style={{justifyContent:'center', alignItems:'center'}}>
                     {isSelected ? (
                        <Image source={require('../../assets/circleGreen.png')} width={25} height={25} />
                        ) : (
                        <Image source={require('../../assets/circle.png')} width={25} height={25} />                      
                    )}
                    <Image style={{position:'absolute'}} source={{uri: item.ItemURI}} width={23} height={23}/>                   
                </View>            
                <Text style={{fontSize:12, fontWeight:'bold'}}>{item.ItemID}</Text>    
            </TouchableOpacity>

        )
    }; */
/* 
    const handleItemPress = (item) => {
        if (!editStatus) {
            if(item.subCategory != 'เพิ่ม'){
                dispatch(setItemData(item))
                navigation.navigate('AddInputScreen');
            }else{
                dispatch(setItemCategory(item.category));
                navigation.navigate('AddCategoryScreen');
            }

            
        } else {
            const isItemSelected = selectedItems.includes(item);
    
            if (isItemSelected) {
                dispatch(setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item)));
            } else {
                dispatch(setSelectedItems([...selectedItems, item]));
                //console.log(selectedItems);
            }
        }
    }; */
    



    return(
        <SafeAreaView style={{ flex:1,backgroundColor:'#2C6264',paddingHorizontal:15,paddingVertical:5}}>
            <View style={{flexDirection:'row-reverse',height:30}}>
                <View style={{width:'30%',height:'80%',borderWidth:2,borderRadius:15,backgroundColor:'#fffffa'}}>
                    <Image source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1206277501626617856/Dollar_Coin.png?ex=65db6c77&is=65c8f777&hm=a72f70bdba7584048fdfd739bb0d289c5a47b48c1614e5fd75ed3083f44c3dfa&=&format=webp&quality=lossless&width=27&height=27'}}
                    width={20} height={20}></Image>
                    {/* ใส่เงิน */}
                </View>
            </View>
            <View style={{ width:'100%',backgroundColor:'#FFFFFF',borderRadius:16,paddingHorizontal:5}}>
            <View style={{height:100,flexDirection:'row',alignContent:'center',justifyContent:'center',marginVertical:10}}>
                <View style={{flex:3}}>
                    <FlatList
/*                         data={inventory1}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                        numColumns={5} */
                   />
                </View> 
{/*                     <View style={{height:'100%',width:'30%'}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <TouchableOpacity
                                     onPress={()=>{
                                     navigation.navigate('DecorationFirstPosition');                           
                                     }}
                                >
                                    <Image source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1206324627442245712/image_7.png?ex=65db985b&is=65c9235b&hm=56e75cfd84bdb8f87558692181e24b33f978a8dc0efe24ebbbc4cf5e53ca54c6&=&format=webp&quality=lossless&width=187&height=187'}}
                                    width={110} height={100}></Image>

                                </TouchableOpacity>
                            </View>
                        </Shadow>
                    </View> */}
                {/*     <View style={{height:'100%',width:'30%',marginHorizontal:10}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                            <TouchableOpacity>
                                <Image source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1206324628738281612/image_4.png?ex=65db985b&is=65c9235b&hm=4ac7aca6abe32643ae4bad667b91ad24cfe0b9606894f8e07ef0d7445f1c972b&=&format=webp&quality=lossless&width=581&height=640'}}
                                        width={110} height={100}></Image>
                            </TouchableOpacity>
                            </View>
                        </Shadow>
                    </View>
                    <View style={{height:'100%',width:'30%'}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View>
                </View>
                <View style={{height:100,flexDirection:'row',alignContent:'center',justifyContent:'center',marginVertical:10}}>
                    <View style={{height:'100%',width:'30%'}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View>
                    <View style={{height:'100%',width:'30%',marginHorizontal:10}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View>
                    <View style={{height:'100%',width:'30%'}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View>
                </View>
                <View style={{height:100,flexDirection:'row',alignContent:'center',justifyContent:'center',marginVertical:10}}>
                    <View style={{height:'100%',width:'30%'}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View>
                    <View style={{height:'100%',width:'30%',marginHorizontal:10}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55 }}></Text>
                            </View>
                        </Shadow>
                    </View>
                    <View style={{height:'100%',width:'30%'}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View>
                </View>
                <View style={{height:100,flexDirection:'row',alignContent:'center',justifyContent:'center',marginVertical:10}}>
                    <View style={{height:'100%',width:'30%'}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View>
                    <View style={{height:'100%',width:'30%',marginHorizontal:10}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View>
                    <View style={{height:'100%',width:'30%'}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View>
                </View>
                <View style={{height:100,flexDirection:'row',alignContent:'center',justifyContent:'center',marginVertical:10}}>
                    <View style={{height:'100%',width:'30%'}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View>
                    <View style={{height:'100%',width:'30%',marginHorizontal:10}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View>
                    <View style={{height:'100%',width:'30%'}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View>
                </View>
                <View style={{height:100,flexDirection:'row',alignContent:'center',justifyContent:'center',marginVertical:10}}>
                    <View style={{height:'100%',width:'30%'}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View>
                    <View style={{height:'100%',width:'30%',marginHorizontal:10}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View>
                    <View style={{height:'100%',width:'30%'}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View>
                </View>
                <View style={{height:100,flexDirection:'row',alignContent:'center',justifyContent:'center',marginVertical:10}}>
                    <View style={{height:'100%',width:'30%'}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View>
                    <View style={{height:'100%',width:'30%',marginHorizontal:10}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View>
                    <View style={{height:'100%',width:'30%'}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <Text style={{ margin: 55}}></Text>
                            </View>
                        </Shadow>
                    </View> */}
                </View>
            </View>
        </SafeAreaView>
    )
}