import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Shadow } from "react-native-shadow-2";
import { useDispatch } from 'react-redux';
import { setItemPhotoURL } from "../../redux/variableSlice";
import { setItemCategory } from "../../redux/variableSlice";

export const CategoryGoal = ({navigation})=>{
    const dispatch = useDispatch();

    const firstRenderItemEditCategoryIconScreen = ({ item }) => (
    
                <View style={styles.thirdContainer}>
                    <TouchableOpacity style={styles.checkTouchableOpacityContainer}
                      onPress={() => handleItemPress(item)}
                    >
                      <View style={styles.imageContainer}>
                          <Image source={require('../../assets/game_backgroundIcon.png')} style={styles.gameBackgroundIcon} />
                          <Image source={{uri: item.photoURL}} style={styles.gameIcons} />
                      </View>
                      <Text style={styles.BigText}>{item.category}</Text>
                        <Text style={styles.smallText}>{item.subCategory}</Text>

                    </TouchableOpacity>

                    <View style={{width:'25%'}}></View>


                     
                </View>
    );
    
    const handleItemPress = (item) => {
        // ทำการนำข้อมูลไปยังหน้าถัดไป
        dispatch(setItemPhotoURL(item.photoURL));
        dispatch(setItemCategory(item.category));
        navigation.navigate('AddGoalScreen');
    };

    return(
       <SafeAreaView style={styles.container}>
            <View style={styles.secondContainer}>
                <FlatList
                    data={firstCategoryFinancial}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={firstRenderItemEditCategoryIconScreen}
                    numColumns={2}
                />
            </View>
            <View style={{height:180}}></View>
       </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#B3DBD8',
    },
    secondContainer: {
        flex:1,
        alignSelf:'center',
        justifyContent:'center',
        width:350,
        height:436,
        backgroundColor:'#2C6264',
        marginTop:'7.5%',
        paddingHorizontal:15,
        borderRadius:12
    },
    thirdContainer: {
        flex:1,
        flexDirection:'row',
        marginTop:'10%',
        marginHorizontal:'10%'
    },
    checkTouchableOpacityContainer: {
        backgroundColor:'transparent'
    },
    imageContainer: {
        justifyContent:'center', 
        alignItems:'center'
    },
    gameBackgroundIcon: {
        width: 100, 
        height:100
    },
    gameIcons: {
        width: 90, 
        height: 90, 
        position: 'absolute' 
    },
    BigText: {
        flex:1,
        width:'100%',
        color:'white',
        fontFamily:'ZenOldMincho-Regular', 
        marginTop:'5%', 
        fontSize:26,
        textAlign:'center'
    },
    smallText: {
        flex:1,
        color:'white',
        fontFamily:'ZenOldMincho-Regular', 
        marginBottom:'60%', 
        fontSize:12,
        textAlign:'center'
    }
    
  });

const firstCategoryFinancial = [
    {
        category: "รายได้",
        subCategory: "-หาเงินเพิ่ม",
        photoURL: 'https://cdn.discordapp.com/attachments/951838870272606259/1207602407794675772/game_income.png?ex=65e03e62&is=65cdc962&hm=df67dcce10c0cb83983a1cc4d62708513fdb7f3f12053eb5ce9c93d47678526d&'
    },
    {
        category: "ค่าใช้จ่าย",
        subCategory: "-ลดการจ่าย",
        photoURL: 'https://cdn.discordapp.com/attachments/951838870272606259/1207602407501078578/game_expense.png?ex=65e03e62&is=65cdc962&hm=1278b25c57492b3406555f08d57f4fe64d993cd67b8106a2e9f532cfa9cd3081&'
    },
    {
        category: "สินทรัพย์",
        subCategory: "-ได้รับผลตอบแทน",
        photoURL: 'https://cdn.discordapp.com/attachments/951838870272606259/1207602407194763314/game_asset.png?ex=65e03e62&is=65cdc962&hm=f8fb0accf16c53d8511d9995b2d095ce0319ae4837b78ce03e37559bcd5bff54&'
    },
    {
        category: "หนี้สิน",
        subCategory: "-ชำระหนี้สิน",
        photoURL: 'https://cdn.discordapp.com/attachments/951838870272606259/1207602409052962816/game_liability.png?ex=65e03e62&is=65cdc962&hm=41e5a8900c315d561f0120e140a9eac27cde927c447b4647253da29b93941214&'
    },
]
