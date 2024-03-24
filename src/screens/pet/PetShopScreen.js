import { View,TouchableOpacity,Image,Text, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { setIsUpdate } from "../../redux/variableSlice";
import { addItem2Inventory, checkDuplicateItem, retrieveCurrencyPet, addFurniture2Inventory, updateMoneyBalance, updateRubyBalance, updateGuarantee} from "../../firebase/UserModel";
import { retrieveInventory } from "../../firebase/RetrieveData";

export const PetShopScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;
    const isUpdate = useSelector((state)=>state.variables.isUpdate);
    const [coinBalance, setCoinBalance] = useState();//แทนด้วยเงินทั้งหมด user
    const [rubyBalance, setRubyBalance] = useState();//แทนด้วยเพชรทั้งหมด user
    const [mysteryBoxGuaranteeNormal, setmysteryBoxGuaranteeNormal] = useState();
    const [inventory, setInventory] = useState();

    useEffect(() => {
        retrieveCurrency();
        handleRetriveInventory()
    }, [coinBalance,rubyBalance,isUpdate]);

    const handleRetriveInventory = async () => {
        const data = await retrieveInventory(userUID);
        setInventory(data);
    }

    //ดึงข้อมูล currency และ เลขการันตี
    const retrieveCurrency = async () => {
        try {
            const currencyData = await retrieveCurrencyPet(userUID);
            if (currencyData) {
                setCoinBalance(currencyData.Money);
                setRubyBalance(currencyData.Ruby);
                setmysteryBoxGuaranteeNormal(currencyData.Guarantee)
            } else {
                console.log("No currency data found.");
            }
        } catch (error) {
            console.error("Error retrieving currency data:", error);
        }
    };

    //รายละเอียดการซื้อและคำนวนเงินและเพชร
    const reportBuyItem = (item) => {
        if (item.itemType === 'กล่องสุ่ม') {
            if (item.itemName === 'CardBoard') {
                if (mysteryBoxGuaranteeNormal === 1) {
                    const newRubyBalance = rubyBalance - item.itemPrice;
                    const updatedMysteryBoxCount = mysteryBoxGuaranteeNormal - 1;
                    const newRandomMoney = randomMoney(item);
                    const newCoinBalance = coinBalance + newRandomMoney;
                    // อัปเดตยอดเงินใน Firebase และ เลขการันตี
                    setRubyBalance(newRubyBalance);
                    setmysteryBoxGuaranteeNormal(updatedMysteryBoxCount);
                    updateGuarantee(userUID, updatedMysteryBoxCount)
                    updateRubyBalance(userUID, newRubyBalance)
                        .catch((error) => {
                            console.error("Error updating ruby balance:", error);
                            alert('Purchased Incomplete!');
                            // คืนค่าเพชรกลับไปเป็นค่าเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตค่า
                            setRubyBalance(rubyBalance);
                    })
                    setCoinBalance(newCoinBalance);
                    updateMoneyBalance(userUID, newCoinBalance)
                        .then(() => {
                            console.log(`Item Purchased: ${item.itemName}`);
                            alert('Purchased Complete!\nจำนวนเงินที่สุ่มได้คือ ' + newRandomMoney);
                        })
                        .catch((error) => {
                            console.error("Error updating money balance:", error);
                            alert('Purchased Incomplete!');
                            // คืนค่าเงินกลับไปเป็นเงินเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตเงิน
                            setCoinBalance(coinBalance);
                        })
                            alert('Congratulations! You have received many decorative items\n'+newRandomMoney);
                            console.log(`Item Purchased: ${item.itemName}`);
                }else {
                    if (item.itemCurrencyType === 'coin') {
                        if (coinBalance >= item.itemPrice) {
                            const newCoinBalance = coinBalance - item.itemPrice;
                            const updatedMysteryBoxCount = mysteryBoxGuaranteeNormal - 1;
                            const newRandomMoney = randomMoney(item);
                            const newCoinBalance1 = newCoinBalance + newRandomMoney;
                    
                            // อัปเดตยอดเงินและจำนวนกล่องลับใน Firebase
                            setCoinBalance(newCoinBalance);
                            setmysteryBoxGuaranteeNormal(updatedMysteryBoxCount);
                            setCoinBalance(newCoinBalance1);
                            updateMoneyBalance(userUID, newCoinBalance1)
                                .then(() => {
                                    console.log(`Item Purchased: ${item.itemName}`);
                                    alert('Purchased Complete!\nจำนวนเงินที่สุ่มได้คือ ' + newRandomMoney);
                                })
                                .catch((error) => {
                                console.error("Error updating money balance:", error);
                                alert('Purchased Incomplete!');
                                // คืนค่าเงินกลับไปเป็นเงินเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตเงิน
                                setCoinBalance(coinBalance);
                            })
                            updateGuarantee(userUID, updatedMysteryBoxCount);
                        } else {
                            console.log('Insufficient coins to buy this item');
                            alert('Purchased Incomplete!\nInsufficient coins to buy this item');
                        }
                    }else if (item.itemCurrencyType === 'ruby') {
                        if (rubyBalance >= item.itemPrice) {
                            const newRubyBalance = rubyBalance - item.itemPrice;
                            const updatedMysteryBoxCount = mysteryBoxGuaranteeNormal - 1;
                            const newRandomMoney = randomMoney(item);
                            const newCoinBalance = coinBalance + newRandomMoney;

                            // อัปเดตยอดเงินใน Firebase และ เลขการันตี
                            setRubyBalance(newRubyBalance);
                            setmysteryBoxGuaranteeNormal(updatedMysteryBoxCount);
                            updateGuarantee(userUID, updatedMysteryBoxCount)
                            updateRubyBalance(userUID, newRubyBalance)
                                .catch((error) => {
                                    console.error("Error updating ruby balance:", error);
                                    alert('Purchased Incomplete!');
                                    // คืนค่าเพชรกลับไปเป็นค่าเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตค่า
                                    setRubyBalance(rubyBalance);
                            })
                            setCoinBalance(newCoinBalance);
                            updateMoneyBalance(userUID, newCoinBalance)
                                .then(() => {
                                    console.log(`Item Purchased: ${item.itemName}`);
                                    alert('Purchased Complete!\nจำนวนเงินที่สุ่มได้คือ ' + newRandomMoney);
                                })
                                .catch((error) => {
                                    console.error("Error updating money balance:", error);
                                    alert('Purchased Incomplete!');
                                    // คืนค่าเงินกลับไปเป็นเงินเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตเงิน
                                    setCoinBalance(coinBalance);
                                })
                        } else {
                            console.log('Insufficient rubies to buy this item');
                            alert('Purchased Incomplete !\nbecause Insufficient rubies to buy this item');
                        }
                    }   
                }
            }
        } else {
            if (item.itemCurrencyType === 'coin') {
                if (coinBalance >= item.itemPrice) {
                    const newCoinBalance = coinBalance - item.itemPrice;
                    setCoinBalance(newCoinBalance);//ในแอป
                    updateMoneyBalance(userUID, newCoinBalance)//ในฐานข้อมูล
                        .then(() => {
                            console.log(`Item itemPurchesed: ${item.itemName}`);
                            alert('Purchased Complete!');
                        })
                        .catch((error) => {
                            console.error("Error updating money balance:", error);
                            alert('Purchased Incomplete!');
                            // คืนค่าเงินกลับไปเป็นเงินเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตเงิน
                            setCoinBalance(coinBalance);
                        });
                } else {
                    console.log('Insufficient coins to buy this item');
                    alert('Purchased Incomplete!\nInsufficient coins to buy this item');
                }
            } else if (item.itemCurrencyType === 'ruby') {
                if (rubyBalance >= item.itemPrice) {
                    const newRubyBalance = rubyBalance - item.itemPrice;
                    setRubyBalance(newRubyBalance);
                    updateRubyBalance(userUID, newRubyBalance)
                        .then(() => {
                            console.log(`Item itemPurchesed: ${item.itemName}`);
                            alert('Purchased Complete!');
                        })
                    .catch((error) => {
                        console.error("Error updating ruby balance:", error);
                        alert('Purchased Incomplete!');
                        // คืนค่าเพชรกลับไปเป็นค่าเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตค่า
                        setRubyBalance(rubyBalance);
                    })
                } else {
                    console.log('Insufficient rubies to buy this item');
                    alert('Purchased Incomplete !\nbecause Insufficient rubies to buy this item');
                }
            }
        }
    };
    
    //ส่งประเภทไอเทมกดใช้ไป inventory
    const buyItem2Inventory = (item) => {
        addItem2Inventory(userUID,item)
            .then(()=>{
                dispatch(setIsUpdate(!isUpdate))
            })
    }

    //ส่งประเภทไอเทมของตกแต่งไป inventory
    const buyFur2Inventory = (item) => {
        addFurniture2Inventory(userUID,item)
            .then(()=>{
                dispatch(setIsUpdate(!isUpdate))
            })
    }

    //เปลี่ยนเลขรับประกันเงิน
    const changeGuarantee = (item) => {
        if (item.itemName === 'CardBoard') {
            return mysteryBoxGuaranteeNormal
        }
    }
    
    //ข้อความรายละเอียดการสุ่ม
    const infoAlert = () => {
        alert('การสุ่มเงินจะสุ่มระหว่าง 100 ถึง 1,000\nเมื่อเปิดจนครบการันตีจะได้เงินมูลค่า 1,000 แน่นอน');
    }

    //สุ่มเงินขั้นต่ำ 100 สูงสุด 1000 การันตี 1000
    const randomMoney = (item) => {
        let randomAmount;
            if (mysteryBoxGuaranteeNormal === 1) {
                randomAmount = 1000;
            }else{
                // สุ่มตัวเลขในช่วง 100 ถึง 1000
                randomAmount = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
            }
            
        return randomAmount;
    }

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
        let isDuplicateURL = false;
        if (inventory && inventory.all) {
            isDuplicateURL = inventory.all.find(element => element.itemName === item.itemName) !== undefined;
        }else{
            isDuplicateURL = false
        }
        console.log(isDuplicateURL);
        if (item.itemType === 'กล่องสุ่ม') {
            renderStyle = (
                <View style={mysteryStyles.viewTouchableBoxCategoryMysteryBox}>
                    <View 
                        style={mysteryStyles.view136}>
                        <View style={mysteryStyles.viewImage}>
                            <Image
                                style={mysteryStyles.imageItemBox}
                                source={{uri: item.itemPhotoURL}}
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
                            <View style={mysteryStyles.viewPriceButton}>
                                <TouchableOpacity
                                    style={mysteryStyles.touchableMysteryItemBox}
                                    onPress={() => {
                                        reportBuyItem(item)
                                    }}
                                >
                                    <View style={mysteryStyles.viewTextPriceButton}>
                                        <Text style={mysteryStyles.textDetaillMysteryStyle}>เปิด {item.itemPrice}</Text>
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
        } else if (item.itemType === 'forUse') {
           renderStyle = (
                <View style={styles.ViewTouchableBoxCategoryHealthy}>
                    <TouchableOpacity
                        style={styles.TouchableItemBox}
                        onPress={() => {
                            if (rubyBalance >= item.itemPrice) {
                                checkDuplicateItem(userUID, item)
                                .then(isDuplicate => {
                                    // console.log('สถานะของ isDuplicate คือ: ' + isDuplicate);
                                    // alert('สถานะของ isDuplicate คือ: ' + isDuplicate);
                                    if (!isDuplicate) {
                                        // console.log('สถานะของ checkDuplicateItem คือ: ' + isDuplicate);
                                        // alert('สถานะของ checkDuplicateItem คือ: ' + isDuplicate);
                                        reportBuyItem(item);
                                        buyItem2Inventory(item);
                                    } else {
                                        console.log('ไอเทมชิ้นนี้อนุญาติให้มีแค่ 1 ชิ้นใน Inventory เท่านั้น');
                                        alert('ไอเทมชิ้นนี้อนุญาติให้มีแค่ 1 ชิ้น\nใน Inventory เท่านั้น');
                                    }
                                })
                                .catch(error => {
                                    console.error('Error checking duplicate item:', error);
                                    // ทำการจัดการข้อผิดพลาดที่เกิดขึ้น
                                });
                            }else{
                                console.log('Insufficient rubies to buy this item');
                                alert('Purchased Incomplete !\nbecause Insufficient rubies to buy this item');
                            }
                        }}
                        
                    >
                        <View>
                            <View style={styles.viewImageItemBox}>
                                <Image
                                    style={styles.ImageItemBox}
                                    source={{ uri: item.itemPhotoURL }}
                                    width={40}
                                    height={40}
                                />
                            </View>
                            <View style={styles.itemName}>
                                <Text style={styles.textStyleItem}>{item.itemName}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.itemPrice}>
                        <Text>{item.itemPrice}</Text>
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
                            if (coinBalance >= item.itemPrice) {
                                checkDuplicateItem(userUID, item)
                                .then(isDuplicate => {
                                    // console.log('สถานะของ isDuplicate คือ: ' + isDuplicate);
                                    // alert('สถานะของ isDuplicate คือ: ' + isDuplicate);
                                    if (!isDuplicate) {
                                        // console.log('สถานะของ checkDuplicateItem คือ: ' + isDuplicate);
                                        // alert('สถานะของ checkDuplicateItem คือ: ' + isDuplicate);
                                        buyFur2Inventory(item);
                                        reportBuyItem(item);
                                    } else {
                                        console.log('คุณมีไอเทมชิ้นนี้ใน Inventory แล้ว ไม่สามารถซื้อสินค้าซ้ำได้');
                                        alert('คุณมีไอเทมชิ้นนี้ใน Inventory แล้ว\nไม่สามารถซื้อสินค้าซ้ำได้');
                                    }
                                })
                                .catch(error => {
                                    console.error('Error checking duplicate on press item:', error);
                                    // ทำการจัดการข้อผิดพลาดที่เกิดขึ้น
                                });
                            }else{
                                console.log('Insufficient coins to buy this item');
                                alert('Purchased Incomplete!\nInsufficient coins to buy this item');
                            }
                            
                        }}
                        
                    >
                        <View style={{flex:1}}>
                            <View style={styles.viewImageItemBox}>
                                <Image
                                    style={styles.ImageItemBox}
                                    source={{
                                        /*
                                        uri: checkDuplicateItem(userUID,item)
                                            ? item.itemSoldoutURL
                                            : item.itemPhotoURL
                                        */
                                        ///*
                                        
                                        uri: isDuplicateURL === true
                                            ? item.itemSoldoutURL
                                            : item.itemPhotoURL
                                        //*/
                                    }}
                                    width={150}
                                    height={150}
                                />
                            </View>
                            <View style={styles.itemName}>
                                <Text style={styles.textStyleItem}>{item.itemName}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.itemPrice}>
                        <Text>{item.itemPrice}</Text>
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
                        <View style={{flex:4,alignItems: 'center'}}>
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
        borderColor:'#000000'
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
        alignItems:'center',
        //backgroundColor:'green'
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
        itemType: "กล่องสุ่ม",
        itemCurrencyType: 'ruby',
        itemName: "CardBoard",
        itemPrice:20,
        itemGuarantee:8,
        itemPhotoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1206324628419649566/image_7_box.png?ex=65db985b&is=65c9235b&hm=9be1bf2dd2ce56b8eb47d27a176c2a2b159ba320b64ed52f2c1ff1351237f4a4&"
    }
]

const UseItem = [
    {
        itemType: "forUse",
        itemCurrencyType: 'ruby',
        itemName: "บัตรกันลดขั้น",
        itemPrice:20,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206567181060407296/image_5.png?ex=65dc7a40&is=65ca0540&hm=db2165be9862cfa9d8f5a5b73ef7c5ad94f94a0c50c219cc12cbd8a1d6ca9d9f&"
     }
]

const ItemsFurniture = [
    {
        itemType: "table",
        itemCurrencyType: 'coin',
        itemName: "ตุ๊กตา",
        itemPrice:700,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206324627442245712/image_7.png?ex=65db985b&is=65c9235b&hm=56e75cfd84bdb8f87558692181e24b33f978a8dc0efe24ebbbc4cf5e53ca54c6&",
        itemSoldoutURL:'https://cdn.discordapp.com/attachments/1202281623585034250/1214901618450104360/bearSoldout.png?ex=65facc4d&is=65e8574d&hm=f06e8a147fc2196316cf7e05b6248315bbcb3b6c3d7106a1684906e0cf7d2aa2&'
    },
    {
        itemType: "wall",
        itemCurrencyType: 'coin',
        itemName: "รูปกรอบสีขาว",
        itemPrice:299,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1212732293790306314/18bit.png?ex=65f2e7f6&is=65e072f6&hm=c0f6b916de070ba9354ffe8efec6b16be305f2cac382bbea0f6897d38a0fc6cc&",
        itemSoldoutURL:'https://cdn.discordapp.com/attachments/1202281623585034250/1213057759226888252/WhiteborderSoldout.png?ex=65f41713&is=65e1a213&hm=196f75ce894902b500850cc3528daaaeedb68d9560d3eed6ff965ae2d81cbc99&'
    },
    {
        itemType: "wall",
        itemCurrencyType: 'coin',
        itemName: "รูปกรอบสีทอง",
        itemPrice:899,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1212732291126788126/28bit.png?ex=65f2e7f5&is=65e072f5&hm=f4f622506c53800754b06a1c1c2351d27554e0e908350b276d7b4018a8efb212&",
        itemSoldoutURL:'https://cdn.discordapp.com/attachments/1202281623585034250/1214901619473252434/GoldborderSoldout.png?ex=65facc4d&is=65e8574d&hm=72d402f623631779c2b2e3cd33ca715d9dd5ad7071c97a573d5f4657bcaf7408&'
    },
    {
        itemType: "table",
        itemCurrencyType: 'coin',
        itemName: "หอคอย",
        itemPrice:999,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1212732292187816016/vecteezy_eiffel-tower-in-pixel-art-style_22267390-removebg-preview.png?ex=65f2e7f5&is=65e072f5&hm=de7983c3d3f2d1d89918e90a116baba033cf4c81a71b70aff3b8e4378a5ad397&",
        itemSoldoutURL:'https://cdn.discordapp.com/attachments/1202281623585034250/1214901619020275752/towerSoldout.png?ex=65facc4d&is=65e8574d&hm=000b4a2ce92ddce6a63d0222cc9ced492cddae3712b58ea8901c60d632527b5c&'
    },
    {
        itemType: "wall",
        itemCurrencyType: 'coin',
        itemName: "นาฬิกา",
        itemPrice:80,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1212732291806400603/pngtree-new-year-wall-clock-in-pixel-style-png-image_2492384-removebg-preview.png?ex=65f2e7f5&is=65e072f5&hm=7525930320856e7bed0259bae37381f6bfa2a7f457bb7f74c48bf55664cba2e2&",
        itemSoldoutURL:'https://cdn.discordapp.com/attachments/1202281623585034250/1214901618097651732/clockSoldout.png?ex=65facc4d&is=65e8574d&hm=37a7c4165aea919762612c0ff6f922410cc151214ec0f80dc67a608a2cc06324&'
    },
    {
        itemType: "table",
        itemCurrencyType: 'coin',
        itemName: "โทรศัพท์",
        itemPrice:500,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1212732293236662332/vecteezy_vector-pixel-art-retro-phone-for-game-development_7816880-removebg-preview.png?ex=65f2e7f6&is=65e072f6&hm=ce77499120775e3e4942a1c98f3dddbda326be0a99199685e9e92cadba6362e6&",
        itemSoldoutURL:'https://cdn.discordapp.com/attachments/1202281623585034250/1214901620131762176/phoneSoldout.png?ex=65facc4e&is=65e8574e&hm=293e7ec89a863c3e8ff45484ecde8813410fa2335225092b00f3f108af919770&'
    },
    {
        itemType: "table",
        itemCurrencyType: 'coin',
        itemName: "นาฬิกาทราย",
        itemPrice:150,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1212732292519174154/vecteezy_hourglass-pixel-art-vector-illustration-design-for-games_8081723-removebg-preview.png?ex=65f2e7f6&is=65e072f6&hm=725dd7101b3678b7c6568bf6603616350bc2489ce7cedc89320cb8e03b8980bb&",
        itemSoldoutURL:'https://cdn.discordapp.com/attachments/1202281623585034250/1214901617690939453/hourglassSoldout.png?ex=65facc4d&is=65e8574d&hm=6d9c9ff0f49710ffb9ea65b374b94a0d49748139141fc36d1f86c0c55bb76a39&'
    },
    {
        itemType: "table",
        itemCurrencyType: 'coin',
        itemName: "แจกัน",
        itemPrice:120,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1212732291420393522/images-removebg-preview.png?ex=66055cf5&is=65f2e7f5&hm=51ffc00d54e0668c1d39ecaba7d6d31306a16bc5df63b7611289081579cbe448&",
        itemSoldoutURL:'https://cdn.discordapp.com/attachments/1202281623585034250/1214901618747772938/flowerSoldout.png?ex=660406cd&is=65f191cd&hm=b9f5744384bd38f681c2a885d7629291586f2bd61e9588cea7965eae2dccb379&'
    }
]