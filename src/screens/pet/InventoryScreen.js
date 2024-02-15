import React from 'react';
import { Text, View, ScrollView, Image,TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';

export const InventoryScreen=({})=>{
    return(
        <SafeAreaView style={{ flex:1,backgroundColor:'#2C6264',paddingHorizontal:15,paddingVertical:5}}>
            <View style={{flexDirection:'row-reverse',height:30}}>
                <View style={{width:'30%',height:'80%',borderWidth:2,borderRadius:15,backgroundColor:'#fffffa'}}>
                    <Image source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1206277501626617856/Dollar_Coin.png?ex=65db6c77&is=65c8f777&hm=a72f70bdba7584048fdfd739bb0d289c5a47b48c1614e5fd75ed3083f44c3dfa&=&format=webp&quality=lossless&width=27&height=27'}}
                    width={20} height={20}></Image>
                    {/* ใส่เงิน */}
                </View>
            </View>
            <ScrollView style={{ width:'100%',backgroundColor:'#FFFFFF',borderRadius:16,paddingHorizontal:5}}>
            <View style={{height:100,flexDirection:'row',alignContent:'center',justifyContent:'center',marginVertical:10}}>
                    <View style={{height:'100%',width:'30%'}}>
                        <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                            <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                                <TouchableOpacity>
                                    <Image source={{uri:'https://media.discordapp.net/attachments/1202281623585034250/1206324627442245712/image_7.png?ex=65db985b&is=65c9235b&hm=56e75cfd84bdb8f87558692181e24b33f978a8dc0efe24ebbbc4cf5e53ca54c6&=&format=webp&quality=lossless&width=187&height=187'}}
                                    width={110} height={100}></Image>
                                </TouchableOpacity>
                            </View>
                        </Shadow>
                    </View>
                    <View style={{height:'100%',width:'30%',marginHorizontal:10}}>
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
            </ScrollView>
        </SafeAreaView>
    )
}