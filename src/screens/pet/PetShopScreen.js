import { View,TouchableOpacity,Image,Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export const PetShopScreen = ({navigation}) => {

    /*--------------------------Driver--------------------------------r*/
    const [coinBalance, setCoinBalance] = useState(20000);//แทนด้วยเงินทั้งหมด user
    const [rubyBalance, setRubyBalance] = useState(2000);//แทนด้วยเพชรทั้งหมด user
    const [keyBalance, setKeyBalance] = useState(10);//แทนด้วยกุญแจทั้งหมด user
    const [mysteryBoxGuarantee, setMysteryBoxGuarantee] = useState(8);
    /*-----------------------------------------------------------------*/

    const reportBuyItem = (item) => {
    if (item.category === 'กล่องสุ่ม') {
        if (mysteryBoxGuarantee === 1) {
            setMysteryBoxGuarantee(item.guarantee);
            alert('Congratulations! You have received many decorative items');
            console.log(`Item purchased: ${item.subCategory}`);
        }else {
            if (item.itemCurrencyType === 'coin') {
                if (coinBalance >= item.price) {
                    setCoinBalance(coinBalance - item.price);
                    setMysteryBoxGuarantee(mysteryBoxGuarantee - 1);
                    console.log(`Item purchased: ${item.subCategory}`);
                    alert('Purchased Complete!');
                } else {
                    console.log('Insufficient coins to buy this item');
                    alert('Purchased Incomplete!\nbecause Insufficient coins to buy this item');
                }
            } else if (item.itemCurrencyType === 'ruby') {
                if (rubyBalance >= item.price) {
                    setRubyBalance(rubyBalance - item.price);
                    setMysteryBoxGuarantee(mysteryBoxGuarantee - 1);
                    console.log(`Item purchased: ${item.subCategory}`);
                    alert('Purchased Complete!');
                } else {
                    console.log('Insufficient rubies to buy this item');
                    alert('Purchased Incomplete !\nbecause Insufficient rubies to buy this item');
                }
            }
        }
    } else {
        if (item.itemCurrencyType === 'coin') {
            if (coinBalance >= item.price) {
                setCoinBalance(coinBalance - item.price);
                console.log(`Item purchased: ${item.subCategory}`);
                alert('Purchased Complete!');
            } else {
                console.log('Insufficient coins to buy this item');
                alert('Purchased Incomplete!\nbecause Insufficient coins to buy this item');
            }
        } else if (item.itemCurrencyType === 'ruby') {
            if (rubyBalance >= item.price) {
                setRubyBalance(rubyBalance - item.price);
                console.log(`Item purchased: ${item.subCategory}`);
                alert('Purchased Complete!');
            } else {
                console.log('Insufficient rubies to buy this item');
                alert('Purchased Incomplete !\nbecause Insufficient rubies to buy this item');
            }
        }
    }
    
    };

    const reportBuyItemWithKey = (item) => {
        if (mysteryBoxGuarantee === 1) {
            setMysteryBoxGuarantee(item.guarantee);
            alert('Congratulations! You have received many decorative items');
            console.log(`Item purchased: ${item.guarantee}`);
        }else{
            if (item.useKeyItem && keyBalance > 0) {
                setKeyBalance(keyBalance - 1);
                setMysteryBoxGuarantee(mysteryBoxGuarantee - 1);
                console.log(`Item purchased with key: ${item.subCategory}`);
            }else{
                console.log('Insufficient key to buy this item');
                alert('Purchased Incomplete !\nbecause Insufficient key to buy this item');
            }
        }
    }

    const renderItem = ({ item }) => {
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
                            <Text style={mysteryStyles.textGuaranteeDetaill}>เปิดอีก {mysteryBoxGuarantee} กล่องเพื่อรับตำนาน</Text>
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
                                <Text style={mysteryStyles.textDetaillMysteryStyle}>ได้รับกุญแจฟรีอีก</Text>
                                <Image
                                    source={{uri:'https://cdn.discordapp.com/attachments/1202281623585034250/1206574676889964544/Future.png?ex=65dc813c&is=65ca0c3c&hm=91793190f65c0af9f8ea7a5e0d3cc5dcd306b8d01dc7a5bb77309227684b95f6&'}}
                                    width={13}
                                    height={13}
                                />
                                <Text style={mysteryStyles.textDetaillMysteryStyle}>24:00:00</Text>
                            </View>
                        </View>
                    </View>
            </View>
            )
        } else if (item.category === 'อาหารและยา') {
           renderStyle = (
                <View style={styles.ViewTouchableBoxCategoryHealthy}>
                    <TouchableOpacity
                        style={styles.TouchableItemBox}
                        onPress={() =>{
                            reportBuyItem(item)
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
                        onPress={() => reportBuyItem(item)}
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
                            <Text style={styles.headerText}>อาหารและยา</Text>
                        </View>
                        <View style={{flex:4}}>
                            <FlatList
                                data={ItemsHealthy}
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

const ItemsHealthy = [
    {
        category: "อาหารและยา",
        itemCurrencyType: 'coin',
        subCategory: "อาหารกระป๋อง",
        price:20,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206567181060407296/image_5.png?ex=65dc7a40&is=65ca0540&hm=db2165be9862cfa9d8f5a5b73ef7c5ad94f94a0c50c219cc12cbd8a1d6ca9d9f&"
    },
    {
        category: "อาหารและยา",
        itemCurrencyType: 'coin',
        subCategory: "เนื้อย่าง",
        price:20,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206324628101009518/image_6.png?ex=65db985b&is=65c9235b&hm=7be66bf7cb801e1ef6fe8f8b88b61d656231e3c743631b111fdbb93b382e9370&"
    },
    {
        category: "อาหารและยา",
        itemCurrencyType: 'coin',
        subCategory: "ยารักษาโรค",
        price:20,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206324627689701426/image_8.png?ex=65db985b&is=65c9235b&hm=a340996c31feba10dc7472225d4a01ae70508549ee5034991353f240e7f4cf67&"
    },
    {
        category: "อาหารและยา",
        itemCurrencyType: 'coin',
        subCategory: "item4",
        price:40,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206478806697644073/mdi_question-mark-box.png?ex=65dc27f2&is=65c9b2f2&hm=3d2d6d159ad2baddce1ff22fac67a825e39342b292178493cc1b28eee62190eb&"
    },
    {
        category: "อาหารและยา",
        itemCurrencyType: 'coin',
        subCategory: "item5",
        price:40,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206478806697644073/mdi_question-mark-box.png?ex=65dc27f2&is=65c9b2f2&hm=3d2d6d159ad2baddce1ff22fac67a825e39342b292178493cc1b28eee62190eb&"
    },
    {
        category: "อาหารและยา",
        itemCurrencyType: 'coin',
        subCategory: "item6",
        price:40,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206478806697644073/mdi_question-mark-box.png?ex=65dc27f2&is=65c9b2f2&hm=3d2d6d159ad2baddce1ff22fac67a825e39342b292178493cc1b28eee62190eb&"
    }
]

const ItemsFurniture = [
    {
        category: "ของตกแต่ง",
        itemCurrencyType: 'ruby',
        subCategory: "ถาดอาหาร",
        price:20,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206324628738281612/image_4.png?ex=65db985b&is=65c9235b&hm=4ac7aca6abe32643ae4bad667b91ad24cfe0b9606894f8e07ef0d7445f1c972b&"
    },
    {
        category: "ของตกแต่ง",
        itemCurrencyType: 'ruby',
        subCategory: "ตุ๊กตา",
        price:20,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206324627442245712/image_7.png?ex=65db985b&is=65c9235b&hm=56e75cfd84bdb8f87558692181e24b33f978a8dc0efe24ebbbc4cf5e53ca54c6&"
    },
    {
        category: "ของตกแต่ง",
        itemCurrencyType: 'ruby',
        subCategory: "item3",
        price:40,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206478806697644073/mdi_question-mark-box.png?ex=65dc27f2&is=65c9b2f2&hm=3d2d6d159ad2baddce1ff22fac67a825e39342b292178493cc1b28eee62190eb&"
    },
    {
        category: "ของตกแต่ง",
        itemCurrencyType: 'ruby',
        subCategory: "item4",
        price:40,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206478806697644073/mdi_question-mark-box.png?ex=65dc27f2&is=65c9b2f2&hm=3d2d6d159ad2baddce1ff22fac67a825e39342b292178493cc1b28eee62190eb&"
    },
    {
        category: "ของตกแต่ง",
        itemCurrencyType: 'ruby',
        subCategory: "item5",
        price:80,
        photoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1206478806697644073/mdi_question-mark-box.png?ex=65dc27f2&is=65c9b2f2&hm=3d2d6d159ad2baddce1ff22fac67a825e39342b292178493cc1b28eee62190eb&"
    }
]