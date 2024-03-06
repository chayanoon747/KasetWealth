import { View,TouchableOpacity,Image,Text, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { getPetMoney,getPetRuby,updateMoney,updateRuby,addItemFurniture2Inventory,
    retrieveDataInventory,addUseIteme2Inventory, addItemValuetoFalse, addItemValuetoTrue } from "../../firebase/UserModel";
import uuid from 'react-native-uuid';
import { setIsUpdate } from "../../redux/variableSlice";
import { addPetImages } from '../../firebase/UserModel';
import { addOnePetImage } from "../../firebase/UserModel";

export const PetShopScreen = ({navigation}) => {

    /*----------------------ยังไม่เรียบร้อยดี-------------------------------*/
    /*--------------------------Driver---------------------------------*/
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;
    const isUpdate = useSelector((state)=>state.variables.isUpdate);
    const [isFirstItem,setisFirstItem] = useState();
    const [coinBalance, setCoinBalance] = useState(20000);//แทนด้วยเงินทั้งหมด user
    const [rubyBalance, setRubyBalance] = useState(2000);//แทนด้วยเพชรทั้งหมด user
    const [keyBalance, setKeyBalance] = useState(10);//แทนด้วยกุญแจทั้งหมด user
    const [mysteryBoxGuaranteeNormal, setmysteryBoxGuaranteeNormal] = useState(8);
    const [mysteryBoxGuaranteePrimiticBox, setmysteryBoxGuaranteePrimiticBox] = useState(20);
    const [mysteryBoxGuaranteeitem1, setmysteryBoxGuaranteeitem1] = useState(10);
    /*-----------------------------------------------------------------*/
    
    // useEffect(() => {
    //     getDataIncomeAndExpenses();
    //     getDataAsset();
    //     getDataLiability();
    // }, [coinBalance, rubyBalance, keyBalance, mysteryBoxGuaranteeNormal, isUpdate]);

    useEffect(() => {
        // getIsFirstItemData()
        //
        //
    }, [userUID,coinBalance,rubyBalance,keyBalance,isFirstItem,isUpdate]);

    const reportBuyItem = (item) => {
    if (item.category === 'กล่องสุ่ม') {
        if (item.subCategory === 'CardBoard') {
            if (mysteryBoxGuaranteeNormal === 1) {
                setmysteryBoxGuaranteeNormal(item.guarantee);
                alert('Congratulations! You have received many decorative items');
                console.log(`Item purchased: ${item.subCategory}`);
                // sendItemFurniture2Inventory(item)
            }else {
                if (item.itemCurrencyType === 'coin') {
                    if (coinBalance >= item.price) {
                        setCoinBalance(coinBalance - item.price);
                        setmysteryBoxGuaranteeNormal(mysteryBoxGuaranteeNormal - 1);
                        console.log(`Item purchased: ${item.subCategory}`);
                        alert('Purchased Complete!');
                    } else {
                        console.log('Insufficient coins to buy this item');
                        alert('Purchased Incomplete!\nbecause Insufficient coins to buy this item');
                    }
                } else if (item.itemCurrencyType === 'ruby') {
                    if (rubyBalance >= item.price) {
                        setRubyBalance(rubyBalance - item.price);
                        setmysteryBoxGuaranteeNormal(mysteryBoxGuaranteeNormal - 1);
                        console.log(`Item purchased: ${item.subCategory}`);
                        alert('Purchased Complete!');
                    } else {
                        console.log('Insufficient rubies to buy this item');
                        alert('Purchased Incomplete !\nbecause Insufficient rubies to buy this item');
                    }
                }   
            }
        }else if (item.subCategory === 'PrimiticBox') {
            if (mysteryBoxGuaranteePrimiticBox === 1) {
                setmysteryBoxGuaranteePrimiticBox(item.guarantee);
                alert('Congratulations! You have received many decorative items');
                console.log(`Item purchased: ${item.subCategory}`);
                // sendItemFurniture2Inventory(item)
            }else {
                if (item.itemCurrencyType === 'coin') {
                    if (coinBalance >= item.price) {
                        setCoinBalance(coinBalance - item.price);
                        setmysteryBoxGuaranteePrimiticBox(mysteryBoxGuaranteePrimiticBox - 1);
                        console.log(`Item purchased: ${item.subCategory}`);
                        alert('Purchased Complete!');
                    } else {
                        console.log('Insufficient coins to buy this item');
                        alert('Purchased Incomplete!\nbecause Insufficient coins to buy this item');
                    }
                } else if (item.itemCurrencyType === 'ruby') {
                    if (rubyBalance >= item.price) {
                        setRubyBalance(rubyBalance - item.price);
                        setmysteryBoxGuaranteePrimiticBox(mysteryBoxGuaranteePrimiticBox - 1);
                        console.log(`Item purchased: ${item.subCategory}`);
                        alert('Purchased Complete!');
                    } else {
                        console.log('Insufficient rubies to buy this item');
                        alert('Purchased Incomplete !\nbecause Insufficient rubies to buy this item');
                    }
                }   
            }
        }else{
            if (mysteryBoxGuaranteeitem1 === 1) {
                setmysteryBoxGuaranteeitem1(item.guarantee);
                alert('Congratulations! You have received many decorative items');
                console.log(`Item purchased: ${item.subCategory}`);
                // sendItemFurniture2Inventory(item)
            }else {
                if (item.itemCurrencyType === 'coin') {
                    if (coinBalance >= item.price) {
                        setCoinBalance(coinBalance - item.price);
                        setmysteryBoxGuaranteeitem1(mysteryBoxGuaranteeitem1 - 1);
                        console.log(`Item purchased: ${item.subCategory}`);
                        alert('Purchased Complete!');
                    } else {
                        console.log('Insufficient coins to buy this item');
                        alert('Purchased Incomplete!\nbecause Insufficient coins to buy this item');
                    }
                } else if (item.itemCurrencyType === 'ruby') {
                    if (rubyBalance >= item.price) {
                        setRubyBalance(rubyBalance - item.price);
                        setmysteryBoxGuaranteeitem1(mysteryBoxGuaranteeitem1 - 1);
                        console.log(`Item purchased: ${item.subCategory}`);
                        alert('Purchased Complete!');
                    } else {
                        console.log('Insufficient rubies to buy this item');
                        alert('Purchased Incomplete !\nbecause Insufficient rubies to buy this item');
                    }
                }   
            }
        }
    } else {
        if (item.itemCurrencyType === 'coin') {
            if (coinBalance >= item.price) {
                setCoinBalance(coinBalance - item.price);
                console.log(`Item purchased: ${item.subCategory}`);
                alert('Purchased Complete!');
                item.purchased = true
                item.quatity += 1;
            } else {
                console.log('Insufficient coins to buy this item');
                alert('Purchased Incomplete!\nbecause Insufficient coins to buy this item');
            }
        } else if (item.itemCurrencyType === 'ruby') {
            if (rubyBalance >= item.price) {
                setRubyBalance(rubyBalance - item.price);
                console.log(`Item purchased: ${item.subCategory}`);
                alert('Purchased Complete!');
                item.quatity += 1;
            } else {
                console.log('Insufficient rubies to buy this item');
                alert('Purchased Incomplete !\nbecause Insufficient rubies to buy this item');
            }
        }
    }

    };

    const reportBuyItemWithKey = (item) => {
        if (item.subCategory === 'CardBoard') {
            if (mysteryBoxGuaranteeNormal === 1) {
                setmysteryBoxGuaranteeNormal(item.guarantee);
                alert('Congratulations! You have received many decorative items');
                console.log(`Item purchased: ${item.guarantee}`);
            }else{
                if (item.useKeyItem && keyBalance > 0) {
                    setKeyBalance(keyBalance - 1);
                    setmysteryBoxGuaranteeNormal(mysteryBoxGuaranteeNormal - 1);
                    console.log(`Item purchased with key: ${item.subCategory}`);
                }else{
                    console.log('Insufficient key to buy this item');
                    alert('Purchased Incomplete !\nbecause Insufficient key to buy this item');
                }
            }
        }else if (item.subCategory === 'PrimiticBox') {
            if (mysteryBoxGuaranteePrimiticBox === 1) {
                setmysteryBoxGuaranteePrimiticBox(item.guarantee);
                alert('Congratulations! You have received many decorative items');
                console.log(`Item purchased: ${item.guarantee}`);
            }else{
                if (item.useKeyItem && keyBalance > 0) {
                    setKeyBalance(keyBalance - 1);
                    setmysteryBoxGuaranteePrimiticBox(mysteryBoxGuaranteePrimiticBox - 1);
                    console.log(`Item purchased with key: ${item.subCategory}`);
                }else{
                    console.log('Insufficient key to buy this item');
                    alert('Purchased Incomplete !\nbecause Insufficient key to buy this item');
                }
            }
        }else{
            if (mysteryBoxGuaranteeitem1 === 1) {
                setmysteryBoxGuaranteeitem1(item.guarantee);
                alert('Congratulations! You have received many decorative items');
                console.log(`Item purchased: ${item.guarantee}`);
            }else{
                if (item.useKeyItem && keyBalance > 0) {
                    setKeyBalance(keyBalance - 1);
                    setmysteryBoxGuaranteeitem1(mysteryBoxGuaranteeitem1 - 1);
                    console.log(`Item purchased with key: ${item.subCategory}`);
                }else{
                    console.log('Insufficient key to buy this item');
                    alert('Purchased Incomplete !\nbecause Insufficient key to buy this item');
                }
            }
        }
    }

    const changeGuarantee = (item) => {
        if (item.subCategory === 'CardBoard') {
            return mysteryBoxGuaranteeNormal
        }else if (item.subCategory === 'PrimiticBox') {
            return mysteryBoxGuaranteePrimiticBox
        }else{
            return mysteryBoxGuaranteeitem1
        }
    }

    const sendItemFurniture2Inventory = (item) =>{
        addItemFurniture2Inventory(userUID,item)
        .then(()=>{
            dispatch(setIsUpdate(!isUpdate))
        })
    }

    const sendUseItem2Inventory = (item) =>{
        addUseIteme2Inventory(userUID,item)
        .then(()=>{
            dispatch(setIsUpdate(!isUpdate))
        })
    }
    
    const infoAlert = () => {
        alert('แจ้งรายละเอียดเกี่ยงกับรางวัลจจากการสุ่ม');
    }

    // const getIsFirstItemData = async()=>{
    //     const itemsdata = await retrieveDataInventory(userUID);
    //     setisFirstItem(itemsdata.isFirstItem)
    //     console.log("First Item: "+isFirstItem)
    // }

    const randomPetCard = async () => { //บัตรสุ่มสัตว์เลี้ยง
        const allPetImages = [
            [
                "https://cdn.discordapp.com/attachments/1194490268959907870/1212777643217395752/1709219089933.png?ex=65f31232&is=65e09d32&hm=8f59fbde0a093d6ebd8c0d09bb0aca866d05ddd0436523f3cb9fdd14c13d7d70&",
                "https://cdn.discordapp.com/attachments/1194490268959907870/1212777643884281876/1709219087770.png?ex=65f31232&is=65e09d32&hm=c5ae60e774912a752c5f2148067f878d8a9cc777ca19820bb3d1ed076f484299&",
                "https://cdn.discordapp.com/attachments/1194490268959907870/1212777644178014218/1709219091612.png?ex=65f31232&is=65e09d32&hm=4c3c1004fdf3b24b61cbbbbab25f74b80e7608bd48dce323e8f69355198c5df7&"
            ],
            [
                "https://cdn.discordapp.com/attachments/1194490268959907870/1212777755846910032/1709219127470.png?ex=65f3124d&is=65e09d4d&hm=8a6c919660d3cfba4710525a32569bb88f0c1f96cb5bb4fb93037895e2f4e728&",
                "https://cdn.discordapp.com/attachments/1194490268959907870/1212777756136570880/1709219131704.png?ex=65f3124d&is=65e09d4d&hm=b784e67186a60b396af0d949e339901b8d5e31575b69d42076815b22d3a65c37&",
                "https://cdn.discordapp.com/attachments/1194490268959907870/1212777756425715812/1709219133893.png?ex=65f3124d&is=65e09d4d&hm=461dd465d5fb9a9d6b1aa186d791986dc02a9a98e36e36c6d79f5f8d0738b1b3&"
            ],
            [
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213005263385268264/Bear04-01.png?ex=65f3e62f&is=65e1712f&hm=1bc31960662fd06c8573e7cee5cb03d2398333f16f3b4ee12a51f21b9a382fad&",
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213005263146061875/Bear04-02.png?ex=65f3e62f&is=65e1712f&hm=a9f6fdb3949e8e13d153b464c5437c251779bda5af00b71372f7ef38971fa220&",
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213005263611887656/Bear04-03.png?ex=65f3e62f&is=65e1712f&hm=6f35b25aa402cb7a3b128386a438df69fd4df9f95862ec256a65992aa069786d&"
            ],
            [
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213006044624592916/Devil03-01.png?ex=65f3e6e9&is=65e171e9&hm=c51323259f207777c3088fe7cfccf66bde0d3d67c491d65e7508afeb2c0123e5&",
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213006044335177728/Devil03-02.png?ex=65f3e6e9&is=65e171e9&hm=d65ea4cfca21cb322ec67d0134128b089741b655faa809a3e0eda0b3a8557061&",
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213006534389272617/Devil03-03.png?ex=65f3e75e&is=65e1725e&hm=fe7d759e8a0624db3b770cb612470f4f033bf3bf687824b346aec55324d84538&"
            ],
        ];
    
        const randomIndex = Math.floor(Math.random() * allPetImages.length);
        const selectedPetImages = allPetImages[randomIndex];
        addPetImages(userUID, selectedPetImages);
        addOnePetImage(userUID, selectedPetImages[0])

    };

    const renderItem = ({ item, index }) => {
        let renderStyle;
        if (item.category === 'กล่องสุ่ม') {
            renderStyle = (
                <View style={mysteryStyles.viewTouchableBoxCategoryMysteryBox}>
                    <View 
                        style={mysteryStyles.view136}>
                        <View style={mysteryStyles.viewImage}>
                            <Image
                                style={mysteryStyles.imageItemBox}
                                source={{uri: item.photoURL}}
                                width={120}
                                height={120}
                            />
                        </View>
                        <View style={mysteryStyles.viewGuarantee}>
                            <Text style={mysteryStyles.textGuaranteeDetaill}>เปิดอีก {changeGuarantee(item)} กล่องเพื่อรับตำนาน</Text>
                        </View>
                    </View>
                    <View style={mysteryStyles.view164}>
                        <View style={mysteryStyles.viewTextTopic}>
                            <Text style={mysteryStyles.textTopic}>MysteryBox กล่องปริศนา</Text>
                        </View>
                        <View style={mysteryStyles.viewDetaillTextTopic}>
                                <Text style={styles.textDetailTopic}>เปิดกล่องปริศนาเพื่อลุ้นรับของตกแต่งมากมาย</Text>
                            </View>
                        <View style={mysteryStyles.viewTouchableOpacity}>
                            <View style={mysteryStyles.viewKeySecurity}>                        
                                <TouchableOpacity
                                    style={mysteryStyles.touchableMysteryKeyItemBox}
                                    onPress={() => {
                                        reportBuyItemWithKey(item)
                                    }}
                                >
                                    <Image
                                        source={{uri:'https://cdn.discordapp.com/attachments/1202281623585034250/1206575133574037564/Key_Security.png?ex=65dc81a8&is=65ca0ca8&hm=276c7a60b61d57555fd33c241e24f96320f0e046b906c122eadb202d0f901a8c&'}}
                                        width={29}
                                        height={29}
                                    />
                                </TouchableOpacity>
                                <View style={mysteryStyles.viewCountKeySecurity}>
                                    <Text style={mysteryStyles.textDetaillMysteryStyle}>มีอยู่: {keyBalance}</Text>
                                </View>
                            </View>
                            <View style={mysteryStyles.viewPriceButton}>
                                <TouchableOpacity
                                    style={mysteryStyles.touchableMysteryItemBox}
                                    onPress={() => {
                                        reportBuyItem(item)
                                    }}
                                >
                                    <View style={mysteryStyles.viewTextPriceButton}>
                                        <Text style={mysteryStyles.textDetaillMysteryStyle}>เปิด {item.price}</Text>
                                        <Image
                                            source={{
                                                uri: item.itemCurrencyType === 'coin'
                                                    ? 'https://cdn.discordapp.com/attachments/1202281623585034250/1206277501626617856/Dollar_Coin.png?ex=65db6c77&is=65c8f777&hm=a72f70bdba7584048fdfd739bb0d289c5a47b48c1614e5fd75ed3083f44c3dfa&'
                                                    : 'https://cdn.discordapp.com/attachments/1202281623585034250/1206277501387538524/Diamond.png?ex=65db6c77&is=65c8f777&hm=20833581ffe174c0c908177a5224439ae4146c9faceda2d6cae45c06b995b423&'
                                            }}
                                            width={15}
                                            height={15}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={mysteryStyles.viewResetTime}>
                            <View style={mysteryStyles.viewResetTimeText}>
                                <TouchableOpacity
                                    onPress={() =>{
                                        infoAlert()
                                    }}
                                >
                                    <Text style={mysteryStyles.textDetaillMysteryStyle}>รายละเอียดเพิ่มเติมคลิก</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>{
                                        infoAlert()
                                    }}
                                >
                                    <Image
                                        source={{uri:'https://cdn.discordapp.com/attachments/1202281623585034250/1213008042174586880/Vector.png?ex=65f3e8c5&is=65e173c5&hm=d1cecd3133b7e415b7dc3576772dcc0c9e2dec7463734ea748e35175a20f47c6&'}}
                                        width={13}
                                        height={13}
                                    />
                                </TouchableOpacity>
                                <View stryle={{}}>
                                    <Text style={mysteryStyles.textDetaillMysteryStyle}>   Page {index + 1}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
            </View>
            )
        } else if (item.category === 'ไอเทมกดใช้') {
           renderStyle = (
                <View style={styles.ViewTouchableBoxCategoryHealthy}>
                    <TouchableOpacity
                        style={styles.TouchableItemBox}
                        onPress={() =>{
                            reportBuyItem(item)
                            sendUseItem2Inventory(item)
                            console.log('pressed: ',item.subCategory)
                            if(item.subCategory === 'บัตรกันลดขั้น'){
                                addItemValuetoTrue(userUID)
                                console.log('ใช้บัตรกันลดขั้น: ',item.subCategory)
                            } else if (item.subCategory === 'บัตรสุ่มสัตว์เลี้ยง'){
                                randomPetCard()
                                console.log('ใช้บัตรสุ่มสัตว์เลี้ยง: ',item.subCategory)
                            }
                        }}
                    >
                        <View>
                            <View style={styles.viewImageItemBox}>
                                <Image
                                    style={styles.ImageItemBox}
                                    source={{ uri: item.photoURL }}
                                    width={40}
                                    height={40}
                                />
                            </View>
                            <View style={styles.itemName}>
                                <Text style={styles.textStyleItem}>{item.subCategory}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.itemPrice}>
                        <Text>{item.price}</Text>
                        <Image
                            source={{
                                uri: item.itemCurrencyType === 'coin'
                                    ? 'https://cdn.discordapp.com/attachments/1202281623585034250/1206277501626617856/Dollar_Coin.png?ex=65db6c77&is=65c8f777&hm=a72f70bdba7584048fdfd739bb0d289c5a47b48c1614e5fd75ed3083f44c3dfa&'
                                    : 'https://cdn.discordapp.com/attachments/1202281623585034250/1206277501387538524/Diamond.png?ex=65db6c77&is=65c8f777&hm=20833581ffe174c0c908177a5224439ae4146c9faceda2d6cae45c06b995b423&'
                            }}
                            width={14}
                            height={14}
                        />
                    </View>
                </View>
           )
        } else {
            renderStyle = (
                <View style={styles.ViewTouchableBoxCategoryFurniture}>
                    <TouchableOpacity
                        style={styles.TouchableItemBox}
                        onPress={() => {
                            if (!item.purchased) {
                                reportBuyItem(item)
                                sendItemFurniture2Inventory(item)
                            }else{
                                console.log('ไม่สามารถซื้อซ้ำได้');
                                alert('ไม่สามารถซื้อซ้ำได้');
                            }
                        }}
                    >
                        <View style={{flex:1}}>
                            <View style={styles.viewImageItemBox}>
                                <Image
                                    style={styles.ImageItemBox}
                                    source={{ uri: item.photoURL }}
                                    width={150}
                                    height={150}
                                />
                            </View>
                            <View style={styles.itemName}>
                                <Text style={styles.textStyleItem}>{item.subCategory}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.itemPrice}>
                        <Text>{item.price}</Text>
                        <Image
                            source={{
                                uri: item.itemCurrencyType === 'coin'
                                    ? 'https://cdn.discordapp.com/attachments/1202281623585034250/1206277501626617856/Dollar_Coin.png?ex=65db6c77&is=65c8f777&hm=a72f70bdba7584048fdfd739bb0d289c5a47b48c1614e5fd75ed3083f44c3dfa&'
                                    : 'https://cdn.discordapp.com/attachments/1202281623585034250/1206277501387538524/Diamond.png?ex=65db6c77&is=65c8f777&hm=20833581ffe174c0c908177a5224439ae4146c9faceda2d6cae45c06b995b423&'
                            }}
                            width={14}
                            height={14}
                        />
                    </View>
                </View>
            );
        }

        return renderStyle;
    };

    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#2C6264'}}>
            <View style={{flex:12,padding:5}}>
                <View style={{flex:0.5,marginHorizontal:19}}>
                    <View style={{flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:0.2}}>
                                <View style={styles.Emptybox}></View>
                            </View>
                            <View style={{flex:0.2}}>
                                <View style={styles.Emptybox}></View>
                            </View>
                                <View style={{flex:0.2}}>
                            <View style={styles.Emptybox}></View>
                            </View>
                            <View style={{flex:0.2,marginRight:4}}>
                                <View style={styles.Currencybox}>
                                    <Image source={{
                                        uri:'https://cdn.discordapp.com/attachments/1202281623585034250/1206277501626617856/Dollar_Coin.png?ex=65db6c77&is=65c8f777&hm=a72f70bdba7584048fdfd739bb0d289c5a47b48c1614e5fd75ed3083f44c3dfa&'}}
                                        width={22}
                                        height={22}
                                    />
                                    <Text style={styles.CurrencyText}>{coinBalance}</Text>
                                </View>
                            </View>
                            <View style={{flex:0.2}}>
                            <View style={styles.Currencybox}>
                                    <Image source={{
                                        uri:'https://cdn.discordapp.com/attachments/1202281623585034250/1206277501387538524/Diamond.png?ex=65db6c77&is=65c8f777&hm=20833581ffe174c0c908177a5224439ae4146c9faceda2d6cae45c06b995b423&'}}
                                        width={22}
                                        height={22}
                                    />
                                    <Text styl={styles.CurrencyText}>{rubyBalance}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:0.4}}></View>
                    </View>
                </View>
                <View style={{flex:3, marginVertical:5}}>
                <View style={styles.box}>
                        <View style={{flex:3}}>
                            <FlatList
                                data={itemsMysteryBox}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                                horizontal={true}
                            />
                        </View>
                    </View>
                </View>
                <View style={{flex:2, marginVertical:5}}>
                <View style={styles.box}>
                        <View style={styles.boxhead}>
                            <Text style={styles.headerText}>ไอเทมกดใช้</Text>
                        </View>
                        <View style={{flex:4}}>
                            <FlatList
                                data={UseItem}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                                horizontal={true}
                            />
                        </View>
                    </View>
                </View>
                <View style={{flex:4, marginVertical:5}}>
                    <View style={styles.box}>
                        <View style={styles.boxhead}>
                            <Text style={styles.headerText}>ของตกแต่ง</Text>
                        </View>
                        <View style={{flex:8}}>
                            <FlatList
                                data={ItemsFurniture}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                                horizontal={true}
                            />
                        </View>
                    </View>
                </View>
                <View style={{flex:1}}></View>
            </View>
        </SafeAreaView>
    )
}

const styles = {
    headerText:{
        fontFamily:'ZenOldMincho-Bold', 
        textAlign:'center', 
        fontSize:17, 
        fontWeight: 'bold', 
        color:'#ffffff'
    },
    CurrencyText:{
        fontSize:14,
        fontFamily:'Rubik-Light'
    },
    box:{
        flex:1,
        borderRadius:15,
        borderWidth:1, 
        borderColor:'#000000',
        backgroundColor:'#fffffa'
    },
    Emptybox:{
        flex:1, 
        borderRadius:15,
        borderWidth:1, 
        borderColor:'#2C6264',
        backgroundColor:'#2C6264'
    },
    Currencybox:{
        flex:1,
        flexDirection:'row',
        borderRadius:15,
        borderWidth:1, 
        borderColor:'#000000',
        backgroundColor:'#fffffa'
    },
    boxhead:{
        flex:1,
        borderRadius:14,  
        borderColor:'#000000', 
        justifyContent:'center', 
        backgroundColor:'#0ABAB5'
    },
    ViewTouchableBoxCategoryHealthy:{
        marginVertical:10,
        marginHorizontal:23
    },
    ViewTouchableBoxCategoryFurniture:{
        marginTop:10,
        marginHorizontal:20
    },
    TouchableItemBox:{
        flex:1,
        width:'100%',
        borderRadius:12,
        borderWidth:1, 
        borderColor:'#000000',
        backgroundColor:'#ffffff'
    },
    viewImageItemBox:{
        alignItems:'center'
    },
    ImageItemBox:{
        position:'relative'
    },
    textStyleItem:{
        fontFamily: 'ZenOldMincho-Bold',
        fontSize: 14,
    },
    itemName:{
        flexDirection:'row',
        justifyContent:'center',
        marginHorizontal:5
    },
    itemPrice:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
}

const mysteryStyles = {
    viewTouchableBoxCategoryMysteryBox:{
        flexDirection:'row'
    },
    view136:{
        flex:1.36,
        flexDirection:'column'
    },
    view164:{
        flex:1.64,
        flexDirection:'column'
    },
    viewImage:{
        flex:4.5,
        justifyContent:'center',
        alignItems:'center'
    },
    imageItemBox:{
        position:'relative',
        borderRadius:12,
        borderWidth:1, 
        borderColor:'#000000'
    },
    viewGuarantee:{
        flex:0.5
    },
    textGuaranteeDetaill:{
        fontFamily:'Rubik-Meduim',
        fontSize:10,
        justifyContent:'center',
        marginHorizontal:5
    },
    viewTextTopic:{
        flex:1
    },
    textTopic:{
        fontFamily:'Rubik-Meduim',
        fontSize:24,
        fontWeight:'bold',
        color:'#2C6264'
    },
    viewDetaillTextTopic:{
        flex:0.5
    },
    textDetailTopic:{
        fontFamily:'Rubik-Meduim',
        fontSize:12,
        color:'#2C6264'
    },
    viewTouchableOpacity:{
        flex:3.5,
        flexDirection:'row'
    },
    viewKeySecurity:{
        flex:1.35,
        flexDirection:'row'
    },
    touchableMysteryItemBox:{
        flex:1,
        width:'100%',
        borderRadius:12,
        borderWidth:1, 
        borderColor:'#000000',
        marginHorizontal:5,
        marginVertical:50,
        justifyContent:'center',
        alignItems:'center'
    },
    touchableMysteryKeyItemBox:{
        flex:1,
        width:'100%',
        height:'25%',
        borderRadius:12,
        borderWidth:1, 
        borderheight:12,
        borderColor:'#000000',
        marginHorizontal:5,
        marginVertical:50,
        justifyContent:'center',
        alignItems:'center'
    },
    viewCountKeySecurity:{
        justifyContent:'center',
        alignItems:'center'
    },
    textDetaillMysteryStyle:{
        fontFamily:'Rubik-Meduim',
        fontSize:12,
        color:'#2C6264',
        marginHorizontal:3
    },
    viewPriceButton:{
        flex:2.65,
        flexDirection:'row'
    },
    viewTextPriceButton:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    viewResetTime:{
        flex:0.5
    },
    viewResetTimeText:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
}

const itemsMysteryBox = [
    {
        category: "กล่องสุ่ม",
        itemCurrencyType: 'ruby',
        subCategory: "CardBoard",
        price:20,
        guarantee:8,
        useKeyItem: true,
        photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1206324628419649566/image_7_box.png?ex=65db985b&is=65c9235b&hm=9be1bf2dd2ce56b8eb47d27a176c2a2b159ba320b64ed52f2c1ff1351237f4a4&"
    },
    {
        category: "กล่องสุ่ม",
        itemCurrencyType: 'ruby',
        subCategory: "PrimiticBox",
        price:200,
        guarantee:20,
        useKeyItem: true,
        photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1206324629501775972/disco.png?ex=65db985c&is=65c9235c&hm=e180cb14e572d7f06aa07fdc6ac248f09766b7c0fa52fbba5576271ceb91eaf9&"
    },
    {
        category: "กล่องสุ่ม",
        itemCurrencyType: 'coin',
        subCategory: "item1",
        price:100,
        guarantee:10,
        useKeyItem: true,
        photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1206478806697644073/mdi_question-mark-box.png?ex=65dc27f2&is=65c9b2f2&hm=3d2d6d159ad2baddce1ff22fac67a825e39342b292178493cc1b28eee62190eb&"
    }
]

const UseItem = [
    {
        category: "ไอเทมกดใช้",
        itemCurrencyType: 'ruby',
        subCategory: "กระป๋องกันดาว",
        price:20,
        itemlocation: null,
        quatity:0,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206567181060407296/image_5.png?ex=65dc7a40&is=65ca0540&hm=db2165be9862cfa9d8f5a5b73ef7c5ad94f94a0c50c219cc12cbd8a1d6ca9d9f&"
     },
    {
        category: "ไอเทมกดใช้",
        itemCurrencyType: 'ruby',
        subCategory: "เนื้อย่าง",
        price:20,
        itemlocation: null,
        purchased: false,
        quatity:0,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206324628101009518/image_6.png?ex=65db985b&is=65c9235b&hm=7be66bf7cb801e1ef6fe8f8b88b61d656231e3c743631b111fdbb93b382e9370&"
    },
    {
        category: "ไอเทมกดใช้",
        itemCurrencyType: 'ruby',
        subCategory: "ยารักษาโรค",
        price:20,
        itemlocation: null,
        purchased: false,
        quatity:0,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206324627689701426/image_8.png?ex=65db985b&is=65c9235b&hm=a340996c31feba10dc7472225d4a01ae70508549ee5034991353f240e7f4cf67&"
    },
    {
        category: "ไอเทมกดใช้",
        itemCurrencyType: 'ruby',
        subCategory: "บัตรกันลดขั้น",
        price:40,
        itemlocation: null,
        purchased: false,
        quatity:0,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206478806697644073/mdi_question-mark-box.png?ex=65dc27f2&is=65c9b2f2&hm=3d2d6d159ad2baddce1ff22fac67a825e39342b292178493cc1b28eee62190eb&"
    },
    {
        category: "ไอเทมกดใช้",
        itemCurrencyType: 'ruby',
        subCategory: "บัตรสุ่มสัตว์เลี้ยง",
        price:40,
        itemlocation: null,
        purchased: false,
        quatity:0,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206478806697644073/mdi_question-mark-box.png?ex=65dc27f2&is=65c9b2f2&hm=3d2d6d159ad2baddce1ff22fac67a825e39342b292178493cc1b28eee62190eb&"
    },
    {
        category: "ไอเทมกดใช้",
        itemCurrencyType: 'ruby',
        subCategory: "item6",
        price:40,
        itemlocation: null,
        purchased: false,
        quatity:0,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206478806697644073/mdi_question-mark-box.png?ex=65dc27f2&is=65c9b2f2&hm=3d2d6d159ad2baddce1ff22fac67a825e39342b292178493cc1b28eee62190eb&"
    }
]

const ItemsFurniture = [
    {
        category: "ของตกแต่ง",
        itemCurrencyType: 'coin',
        subCategory: "ถาดอาหาร",
        price:130,
        itemlocation: "พื้น",
        purchased: false,
        quatity:0,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206324628738281612/image_4.png?ex=65db985b&is=65c9235b&hm=4ac7aca6abe32643ae4bad667b91ad24cfe0b9606894f8e07ef0d7445f1c972b&"
    },
    {
        category: "ของตกแต่ง",
        itemCurrencyType: 'coin',
        subCategory: "ตุ๊กตา",
        price:700,
        itemlocation: "โต๊ะ",
        purchased: false,
        quatity:0,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206324627442245712/image_7.png?ex=65db985b&is=65c9235b&hm=56e75cfd84bdb8f87558692181e24b33f978a8dc0efe24ebbbc4cf5e53ca54c6&"
    },
    {
        category: "ของตกแต่ง",
        itemCurrencyType: 'coin',
        subCategory: "รูปกรอบสีขาว",
        price:299,
        itemlocation: "ผนัง",
        purchased: false,
        quatity:0,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1212732293790306314/18bit.png?ex=65f2e7f6&is=65e072f6&hm=c0f6b916de070ba9354ffe8efec6b16be305f2cac382bbea0f6897d38a0fc6cc&"
    },
    {
        category: "ของตกแต่ง",
        itemCurrencyType: 'coin',
        subCategory: "รูปกรอบสีทอง",
        price:899,
        itemlocation: "ผนัง",
        purchased: false,
        quatity:0,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1212732291126788126/28bit.png?ex=65f2e7f5&is=65e072f5&hm=f4f622506c53800754b06a1c1c2351d27554e0e908350b276d7b4018a8efb212&"
    },
    {
        category: "ของตกแต่ง",
        itemCurrencyType: 'coin',
        subCategory: "หอคอย",
        price:999,
        itemlocation: "โต๊ะ",
        purchased: false,
        quatity:0,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1212732292187816016/vecteezy_eiffel-tower-in-pixel-art-style_22267390-removebg-preview.png?ex=65f2e7f5&is=65e072f5&hm=de7983c3d3f2d1d89918e90a116baba033cf4c81a71b70aff3b8e4378a5ad397&"
    },
    {
        category: "ของตกแต่ง",
        itemCurrencyType: 'coin',
        subCategory: "นาฬิกา",
        price:80,
        itemlocation: "ผนัง",
        purchased: false,
        quatity:0,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1212732291806400603/pngtree-new-year-wall-clock-in-pixel-style-png-image_2492384-removebg-preview.png?ex=65f2e7f5&is=65e072f5&hm=7525930320856e7bed0259bae37381f6bfa2a7f457bb7f74c48bf55664cba2e2&"
    },
    {
        category: "ของตกแต่ง",
        itemCurrencyType: 'coin',
        subCategory: "รถ",
        price:490,
        itemlocation: "พื้น",
        purchased: false,
        quatity:0,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1212732293500764181/vecteezy_yellow-old-car-in-pixel-art-style_27742890-removebg-preview.png?ex=65f2e7f6&is=65e072f6&hm=f2edfb4ffadd751974a3e860e10484261127861ecf441a97eb6c08fdb50b4baa&"
    },
    {
        category: "ของตกแต่ง",
        itemCurrencyType: 'coin',
        subCategory: "โทรศัพท์",
        price:500,
        itemlocation: "โต๊ะ",
        purchased: false,
        quatity:0,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1212732293236662332/vecteezy_vector-pixel-art-retro-phone-for-game-development_7816880-removebg-preview.png?ex=65f2e7f6&is=65e072f6&hm=ce77499120775e3e4942a1c98f3dddbda326be0a99199685e9e92cadba6362e6&"
    },
    {
        category: "ของตกแต่ง",
        itemCurrencyType: 'coin',
        subCategory: "ลูกบอล",
        price:200,
        itemlocation: "พื้น",
        purchased: false,
        quatity:0,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1212732292854714418/vecteezy_pixel-art-illustration-beach-ball-pixelated-beach-ball_31373463-removebg-preview.png?ex=65f2e7f6&is=65e072f6&hm=f08942e5c086460bb9b34a856bec397efd3cc7b51a4fb28d8caabd8493ab0181&"
    },
    {
        category: "ของตกแต่ง",
        itemCurrencyType: 'coin',
        subCategory: "นาฬิกาทราย",
        price:150,
        itemlocation: "โต๊ะ",
        purchased: false,
        quatity:0,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1212732292519174154/vecteezy_hourglass-pixel-art-vector-illustration-design-for-games_8081723-removebg-preview.png?ex=65f2e7f6&is=65e072f6&hm=725dd7101b3678b7c6568bf6603616350bc2489ce7cedc89320cb8e03b8980bb&"
    },
    {
        category: "ของตกแต่ง",
        itemCurrencyType: 'coin',
        subCategory: "แจกัน",
        price:120,
        itemlocation: "โต๊ะ",
        purchased: false,
        quatity:0,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1212732291420393522/images-removebg-preview.png?ex=65f2e7f5&is=65e072f5&hm=3192887baf542f8d70d372b3b57564eca10b95b523d622539a2c4c4369d421fa&"
    }
]