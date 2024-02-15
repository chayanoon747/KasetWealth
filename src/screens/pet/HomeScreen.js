import React from "react";
import { View,ImageBackground, Image, TouchableOpacity } from "react-native";


export const HomeScreen =({navigation})=>{
    return(
        <View style={{flex:1}}>
            <ImageBackground source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1207709035797946448/pxArt_1.png?ex=65e0a1b0&is=65ce2cb0&hm=22d1404ba545efff694fcb96da06d26072e6b17849dd3daa83cd8100a6641ac8&=&format=webp&quality=lossless&width=390&height=640'}}
            resizeMode="cover" style={{flex: 1}}>
                <View style={{height:140,margin:5,flexDirection:'row'}}>
                    <View style={{justifyContent:'flex-start',height:'20%',width:'65%',margin:5,flexDirection:'row',justifyContent:'flex-start'}}>
                        <View style={{height:'100%',width:'45%',borderWidth:2,borderRadius:15,backgroundColor:'#fffffa',justifyContent:'center'}}>
                            <Image source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1206277501626617856/Dollar_Coin.png?ex=65db6c77&is=65c8f777&hm=a72f70bdba7584048fdfd739bb0d289c5a47b48c1614e5fd75ed3083f44c3dfa&=&format=webp&quality=lossless&width=27&height=27'}}
                            height={20} width={20}></Image>
                            {/* จำนวนเงิน */}
                        </View>
                        <View style={{height:'100%',width:'30%',borderWidth:2,borderRadius:15,backgroundColor:'#fffffa',marginHorizontal:5,justifyContent:'center'}}>
                            <Image source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1206277501387538524/Diamond.png?ex=65db6c77&is=65c8f777&hm=20833581ffe174c0c908177a5224439ae4146c9faceda2d6cae45c06b995b423&=&format=webp&quality=lossless&width=26&height=26'}}
                            height={20} width={20}></Image>
                            {/* จำนวนเพรช */}
                        </View>
                    </View>
                    <View style={{height:"auto",width:'30%',margin:5,flexDirection:'column',alignItems:'flex-end'}}>
                        <View style={{height:"50%",width:"50%",margin:5,alignItems:'center'}}>
                            <TouchableOpacity  
                             onPress={()=>{
                                navigation.navigate('EditHomeScreen')
                             }}
                            >
                                <Image source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1207713872203616256/Home.png?ex=65e0a631&is=65ce3131&hm=ce9840c9b6e95a321abf9ee467fd55df4d49c8534957b6d6289e4fd2e3fc4bcd&=&format=webp&quality=lossless&width=60&height=60'}}
                                width={55} height={55}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:"50%",width:"50%",margin:5,alignItems:'center'}}>
                            <TouchableOpacity
                               
                            >
                                <Image source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1207713872434307123/material-symbols_share-outline.png?ex=65e0a631&is=65ce3131&hm=eac2284969ded4590296f0084b2be3164d36ceb3ab8cb8c9d3c39371565d7349&=&format=webp&quality=lossless&width=51&height=51'}}
                                width={55} height={55}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flex:1,justifyContent:'flex-end',alignItems:'center'}}>
                    {/* ใส่Pet */}
                    <View style={{backgroundColor:'transparent',width:100,height:100,marginBottom:60,alignItems:'center',justifyContent:'center'}}>
                        <Image source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1207720267858710558/pxArt_3_2.png?ex=65e0ac26&is=65ce3726&hm=13bc94ae729a6553a146e89a648ac57a273b98b845d281aa45ecdce0ae9e89ca&=&format=webp&quality=lossless&width=180&height=212'}}
                        width={110} height={130}></Image>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}