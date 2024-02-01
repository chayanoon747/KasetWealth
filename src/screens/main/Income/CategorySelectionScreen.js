import { View, Text, StyleSheet, ScrollView, Image, FlatList, Touchable, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow }  from 'react-native-shadow-2';
import { useEffect, useState } from "react";
import { retrieveCategory } from "../../../firebase/UserModel";
import { useSelector } from 'react-redux'

export const CategorySelectionScreen = ({navigation})=>{
    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;
    console.log(userUID);

    const [category1, setCategory1] = useState([]);
    const [category2, setCategory2] = useState([]);
    const [category3, setCategory3] = useState([]);

    useEffect(() => {
        retrieveData();
    }, []);

    const retrieveData = async () => {
        try {
            const categoryData = await retrieveCategory(userUID);
            /*for (const categoryItem of categoryData) {
                
                
                if (categoryItem.category == "รายได้จากการทำงาน") {
                    
                    const dataForWork = categoryItem.data; 
                    console.log(dataForWork)
                    console.log("Found data for work:", dataForWork);
                }
            }*/
            setCategory1([categoryData][0]);
            //console.log(category1);
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };

    const renderItem = ({ item }) => (
        //console.log(category),
        <TouchableOpacity style={{flex:1, alignItems:'center', justifyContent:'center', padding:5}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Image source={require('../../../assets/circle.png')} width={25} height={25} style/>
                <Image style={{position:'absolute'}} source={{uri: item.photoURL}} width={25} height={25}/>
            </View>
            
            <Text style={{fontSize:12, fontWeight:'bold'}}>{item.subCategory}</Text>
        </TouchableOpacity>
    );

    return(
        <SafeAreaView style={{flex:1, paddingHorizontal:20, backgroundColor:'#fffffa'}}>
            <View style={{flex:1, marginVertical:10}}>
                <Shadow style={{width:'100%', height:'100%'}} distance={10} startColor={"#0ABAB5"} offset={[8,6]}>
                    <View style={styles.box}>
                        <View style={styles.boxhead}>
                            <Text style={styles.headerText}>รายได้จากการทำงาน</Text>
                        </View>
                        <View style={{flex:3}}>
                            <FlatList style={{flex:1}}
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
                            <Text style={styles.headerText}>รายได้อื่นๆ</Text>
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