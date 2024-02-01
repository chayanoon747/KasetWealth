import { View, Text, StyleSheet, ScrollView, Image, FlatList, Touchable, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow }  from 'react-native-shadow-2';
import { useEffect, useState } from "react";
import { retrieveCategory } from "../../../firebase/UserModel";
import { resetIcon } from "../../../navigators/IncomeStackNav";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedItems, setItemCategory } from '../../../redux/variableSlice'

export const CategorySelectionScreen = ({navigation})=>{
    
    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;
    console.log(userUID);

    const editStatus = useSelector((state)=>state.variables.isEdit)
    console.log(editStatus);

    const selectedItems = useSelector(state => state.variables.selectedItems);
    console.log(selectedItems);

    const dispatch = useDispatch();
    
    const [category1, setCategory1] = useState([]);
    const [category2, setCategory2] = useState([]);
    const [category3, setCategory3] = useState([]);
    

    useEffect(() => {
        retrieveData();
    }, []);

    const retrieveData = async () => {
        try {
            const items1 = [];
            const items2 = [];
            const items3 = [];

            const categoryData = await retrieveCategory(userUID);
            for (const item of categoryData) {
                if (item.category == "รายได้จากการทำงาน") {
                    items1.push(item);
                }
            }

            for (const item of categoryData) {
                if (item.category == "รายได้จากสินทรัพย์") {
                    items2.push(item);
                }
            }
            for (const item of categoryData) {
                if (item.category == "รายได้อื่นๆ") {
                    items3.push(item);
                }
            }
            setCategory1(items1);
            setCategory2(items2);
            setCategory3(items3);
            //setCategory1([categoryData][0]);
            //console.log(category1);
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };

    const renderItem = ({ item }) => {
        const isSelected = selectedItems.includes(item);
       
        return(
            <TouchableOpacity style={{width:'20%', height:'50%', alignItems:'center', marginVertical:5}}
                onPress={() => handleItemPress(item)}
            >
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    {isSelected ? (
                        <Image source={require('../../../assets/circleGreen.png')} width={25} height={25} />
                        ) : (
                        <Image source={require('../../../assets/circle.png')} width={25} height={25} />
                    )}
                    <Image style={{position:'absolute'}} source={{uri: item.photoURL}} width={23} height={23}/>
                </View>
                
                <Text style={{fontSize:12, fontWeight:'bold'}}>{item.subCategory}</Text>
            </TouchableOpacity>
        )
    };

    const handleItemPress = (item) => {
        if (!editStatus) {
            if(item.subCategory != 'เพิ่ม'){
                navigation.navigate('AddInputScreen', { itemData: item });
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
            }
        }
    };
    

    return(
        <SafeAreaView style={{flex:1, paddingHorizontal:20, backgroundColor:'#fffffa'}}>
            <View style={{flex:1, marginVertical:10}}>
                <Shadow style={{width:'100%', height:'100%'}} distance={10} startColor={"#0ABAB5"} offset={[8,6]}>
                    <View style={styles.box}>
                        <View style={styles.boxhead}>
                            <Text style={styles.headerText}>รายได้จากการทำงาน</Text>
                        </View>
                        <View style={{flex:3}}>
                            <FlatList
                                data={category1}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                                numColumns={5}
                            />
                        </View>
                    </View>
                </Shadow>
            </View>
            
            <View style={{flex:1, marginVertical:10}}>
                <Shadow style={{width:'100%', height:'100%'}} distance={10} startColor={"#0ABAB5"} offset={[8,6]}>
                    <View style={styles.box}>
                        <View style={styles.boxhead}>
                            <Text style={styles.headerText}>รายได้จากสินทรัพย์</Text>
                        </View>
                        <View style={{flex:3}}>
                            <FlatList
                                data={category2}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                                numColumns={5}
                            />
                            
                        </View>
                    </View>
                </Shadow>
            </View>

            <View style={{flex:1, marginVertical:10}}>
                <Shadow style={{width:'100%', height:'100%'}} distance={10} startColor={"#0ABAB5"} offset={[8,6]}>
                    <View style={styles.box}>
                        <View style={styles.boxhead}>
                            <Text style={styles.headerText}>รายได้อื่นๆ</Text>
                        </View>
                        <View style={{flex:3}}>
                            <FlatList
                                data={category3}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                                numColumns={5} 
                            />
                        </View>
                    </View>
                </Shadow>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    headerText:{
        fontFamily:'ZenOldMincho-Bold', 
        textAlign:'center', 
        fontSize:17, 
        fontWeight: 'bold', 
        color:'#0ABAB5'
    },
    box:{
        flex:1, 
        borderRadius:15,
        borderWidth:1, 
        borderColor:'#000000',
        backgroundColor:'#fffffa'
    },
    boxhead:{
        flex:1, 
        borderTopLeftRadius:15, 
        borderBottomWidth:1, 
        borderColor:'#000000',  
        borderTopRightRadius:15, 
        justifyContent:'center', 
        backgroundColor:'#fffffa'
    }
})