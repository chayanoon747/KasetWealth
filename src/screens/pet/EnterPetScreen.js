import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { retrieveAllDataPetName } from '../../firebase/UserModel';
import { addPetImage } from '../../firebase/UserModel';

export const EnterPetScreen = ({ navigation }) => {
  const [petNameExists, setPetNameExists] = useState(null);
  const [tapText, setTapText] = useState('');
  const guageValues = useSelector(state => state.variables); 

  const { guageWealth, guageRiability } = guageValues || {};

  console.log('Guage Wealth:', guageWealth);
  console.log('Guage Riability:', guageRiability);

  const user = useSelector((state) => state.auths);
  const userUID = user[0].uid;

  useEffect(() => {
    checkPetName();
  }, []);

  const checkPetName = async () => {
    try {
      const petName = await retrieveAllDataPetName(userUID);
      setPetNameExists(petName || '');
      setTapText(petName ? 'Tap to Start...' : 'Tap to Hatching...');
    } catch (error) {
      console.error('Error checking pet name:', error);
    }
  };

  const handleTapToHatching = async () => {
    const lockedGroups = [
        ["Pet_0", "Pet_1", "Pet_2"],
        ["Pet_3", "Pet_4", "Pet_5"],
        ["Pet_6", "Pet_7", "Pet_8"]
    ];
    //สุ่มและ save ลงไปใน firebase 3 รูปเลย
    const petImages = [
        "https://cdn.discordapp.com/attachments/951838870272606259/1212575825313009704/Pet_0.png?ex=65f2563d&is=65dfe13d&hm=23c0a7fcdfedb02c4791b7fb5ffadd45aeb2ee2eae31c142d84ac270e9680f0b&",
        "https://cdn.discordapp.com/attachments/951838870272606259/1212575822494433310/Pet_3.png?ex=65f2563c&is=65dfe13c&hm=f10dcc3b12e52562c6b2cd4942769901a26a71467af8a47eeb70405a3f8e5770&",
        "https://cdn.discordapp.com/attachments/951838870272606259/1212575823593480303/Pet_6.png?ex=65f2563c&is=65dfe13c&hm=939c460a311959ad83763b8a79e7c26672a89ef83046f948869f1860c421ab98&"
    ];

    const totalGuage = (guageWealth * 0.4) + (guageRiability * 0.6);
    console.log('Total Guage:', totalGuage);

    let selectedPetImages = [];
    if (totalGuage > 7) {
        selectedPetImages = [
            "https://cdn.discordapp.com/attachments/951838870272606259/1212575821961633792/Pet_2.png?ex=65f2563c&is=65dfe13c&hm=ed5ef5ba169ab06ef14460df026824f971e4b8ea6b6e4282f860be445fa743ec&",
            "https://cdn.discordapp.com/attachments/951838870272606259/1212575823182430240/Pet_5.png?ex=65f2563c&is=65dfe13c&hm=ae90041eea1d433283bce0f115b2690651d84aa1a92c0454f44af168d0a8e6c2&",
            "https://cdn.discordapp.com/attachments/951838870272606259/1212575825031995453/Pet_8.png?ex=65f2563d&is=65dfe13d&hm=4abd6e465bf94434d243ed720947d8c942edcc7c23c02fce39a3e16368847731&"
        ];
    } else if (totalGuage > 4) {
        selectedPetImages = [
            "https://cdn.discordapp.com/attachments/951838870272606259/1212575825631641610/Pet_1.png?ex=65f2563d&is=65dfe13d&hm=12a70f75a9dd25990a1d5c69b97a4791fe87973691f4ef53a03eac2b2f49e550&",
            "https://cdn.discordapp.com/attachments/951838870272606259/1212575822880444446/Pet_4.png?ex=65f2563c&is=65dfe13c&hm=1f97c8297a59dd27a9757cbc057463edff4910e2726879d0b52b6f48e120da7e&",
            "https://cdn.discordapp.com/attachments/951838870272606259/1212575824549515264/Pet_7.png?ex=65f2563d&is=65dfe13d&hm=4fbaa0d3de4efd154f63eeae6ed811e4c3fa3c36f5826803cd698daefdcf4098&"
        ];
    } else {
        selectedPetImages = petImages;
    }

    let lockedGroupIndex = -1;
    for (let i = 0; i < lockedGroups.length; i++) {
        if (lockedGroups[i].includes(petNameExists)) {
            lockedGroupIndex = i;
            break;
        }
    }

    if (lockedGroupIndex !== -1) {
        selectedPetImages = selectedPetImages.filter(image => lockedGroups[lockedGroupIndex].includes(image));
    }

    const randomNumber = Math.floor(Math.random() * selectedPetImages.length);
    const petImage = selectedPetImages[randomNumber];

    if (petNameExists === '') {
        try {
            await addPetImage(userUID, { value: petImage });
            navigation.navigate('EnterNameScreen');
        } catch (error) {
            console.error('Error adding pet image:', error);
            Alert.alert('Failed to add pet image. Please try again.');
        }
    } else {
      navigation.navigate('ExpainingScreen');
    }
  };

  /*
  const handleTapToHatching = async () => {
    const petImages = [
        "https://cdn.discordapp.com/attachments/951838870272606259/1212575825313009704/Pet_0.png?ex=65f2563d&is=65dfe13d&hm=23c0a7fcdfedb02c4791b7fb5ffadd45aeb2ee2eae31c142d84ac270e9680f0b&",
        "https://cdn.discordapp.com/attachments/951838870272606259/1212575825631641610/Pet_1.png?ex=65f2563d&is=65dfe13d&hm=12a70f75a9dd25990a1d5c69b97a4791fe87973691f4ef53a03eac2b2f49e550&",
        "https://cdn.discordapp.com/attachments/951838870272606259/1212575821961633792/Pet_2.png?ex=65f2563c&is=65dfe13c&hm=ed5ef5ba169ab06ef14460df026824f971e4b8ea6b6e4282f860be445fa743ec&",
        "https://cdn.discordapp.com/attachments/951838870272606259/1212575822494433310/Pet_3.png?ex=65f2563c&is=65dfe13c&hm=f10dcc3b12e52562c6b2cd4942769901a26a71467af8a47eeb70405a3f8e5770&",
        "https://cdn.discordapp.com/attachments/951838870272606259/1212575822880444446/Pet_4.png?ex=65f2563c&is=65dfe13c&hm=1f97c8297a59dd27a9757cbc057463edff4910e2726879d0b52b6f48e120da7e&"
    ];

    const randomNumber = Math.floor(Math.random() * petImages.length);
    const petImage = petImages[randomNumber];

    if (petNameExists === '') {
        try {
            await addPetImage(userUID, { value: petImage });
            navigation.navigate('EnterNameScreen');
        } catch (error) {
            console.error('Error adding pet image:', error);
            Alert.alert('Failed to add pet image. Please try again.');
        }
    } else {
        navigation.navigate('ExpainingScreen');
    }
};
*/
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0ABAB5' }}>
      <View style={{ flex: 1, alignItems: 'flex-end', padding: '2%' }}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={require('../../assets/exitIcon.png')} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 25,
          margin: 5,
          borderWidth: 1,
          borderColor: '#000000',
          backgroundColor: '#ffffff',
          borderRadius: 9,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Text
            style={{
              fontFamily: 'ZenOldMincho-Bold',
              fontSize: 48,
              color: '#000000',
              textAlign: 'center',
              paddingHorizontal: 10,
              paddingTop: 5,
            }}
          >
            Money Monster
          </Text>
          <Text
            style={{
              fontFamily: 'ZenOldMincho-Regular',
              fontSize: 24,
              color: '#0ABAB5',
              textAlign: 'center',
              paddingHorizontal: 10,
              paddingTop: 10,
            }}
          >
            อสูรเงินฝาก
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'Top', alignContent: 'Top', flexDirection: 'column' }}>
          <View style={{ justifyContent: 'center', alignContent: 'center', flexDirection: 'row' }}>
            <View
              style={{
                borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                borderWidth: 1,
                borderColor: '#000000',
                width: Dimensions.get('window').width * 0.5,
                height: Dimensions.get('window').width * 0.5,
                backgroundColor: '#0ABAB5',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/petAssets/Pet_8.png')}
                style={{ width: 250, height: 250, justifyContent: 'center', alignContent: 'center' }}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity 
            style={{ flex: 1 }}
            onPress={handleTapToHatching}
            >
            <Text
                style={{
                fontFamily: 'ZenOldMincho-Black',
                fontSize: 24,
                color: '#000000',
                textAlign: 'center',
                paddingTop: 20,
                }}
            >
                {tapText}
            </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
