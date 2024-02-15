import React from "react";
import { View,ImageBackground, Image, TouchableOpacity } from "react-native";


export const EditHomeScreen =({navigation})=>{
    return(
        <View style={{flex:1}}>
            <ImageBackground source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1207709035797946448/pxArt_1.png?ex=65e0a1b0&is=65ce2cb0&hm=22d1404ba545efff694fcb96da06d26072e6b17849dd3daa83cd8100a6641ac8&=&format=webp&quality=lossless&width=390&height=640'}}
            resizeMode="cover" style={{flex: 1}}>
                <View style={{height:140,margin:5,flexDirection:'row'}}>
                    <View style={{justifyContent:'flex-start',height:'20%',width:'65%',margin:5,flexDirection:'row',justifyContent:'flex-start'}}>
                        
                    </View>
                    <View style={{height:"auto",width:'30%',margin:5,flexDirection:'column',alignItems:'flex-end'}}>
                        <View style={{height:"50%",width:"50%",margin:5,alignItems:'center'}}>
                            <TouchableOpacity  
                             onPress={()=>{
                                navigation.navigate('InventoryScreen')
                             }}
                            >
                                <Image source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1207721814902710292/Home.png?ex=65e0ad97&is=65ce3897&hm=20d1865de6eeab0c3cdd396eefdfad956f7c30490f80677bd7823ca9ec294a3d&=&format=webp&quality=lossless&width=60&height=60'}}
                                width={55} height={55}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
            </ImageBackground>
        </View>
    )
}