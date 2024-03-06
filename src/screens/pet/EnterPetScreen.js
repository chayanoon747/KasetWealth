import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveAllDataPet } from '../../firebase/UserModel';
import { addPetImage } from '../../firebase/UserModel';
import { addPetImages } from '../../firebase/UserModel';
import { setTotalGuage } from '../../redux/variableSlice';
import { setTotalDifferenceDate, setEditItemLocation } from '../../redux/variableSlice';
import { addOnePetImage } from '../../firebase/UserModel';
import { addLastedDate } from '../../firebase/UserModel';

export const EnterPetScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [petNameExists, setPetNameExists] = useState(null);
  const [tapText, setTapText] = useState('');
  const [differenceDate, setDifferenceDate] = useState('');
  
  const guageValues = useSelector(state => state.variables); 

  const { guageWealth, guageRiability } = guageValues || {};
  const totalGuage = (guageWealth * 0.4) + (guageRiability * 0.6);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เนื่องจาก getMonth() เริ่มจาก 0
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  console.log('Guage Wealth:', guageWealth);
  console.log('Guage Riability:', guageRiability);
  console.log('Total Guage in EnterPetScreen:', totalGuage);

  const user = useSelector((state) => state.auths);
  const userUID = user[0].uid;

  const checkPetName = async () => {
    try {
      const PetData = await retrieveAllDataPet(userUID);
      setPetNameExists(PetData.petName || '');
      setTapText(PetData.petName ? 'Tap to Start...' : 'Tap to Hatching...');
      setDifferenceDate(findDateDifference(formattedDate, PetData.lastedDate));
      console.log('PetData:', PetData.lastedDate);
      console.log('DateDifference:',findDateDifference(formattedDate, PetData.lastedDate));
    } catch (error) {
      console.error('Error checking pet name:', error);
    }
  };

  useEffect(() => {
    dispatch(setEditItemLocation(false));
    checkPetName();
    dispatch(setTotalGuage(totalGuage));
  }, []);

  function findDateDifference(nowDate, oldDate) {
    if(nowDate !== undefined && oldDate !== undefined){
        // แยกปี, เดือน, และวันออกจาก string วันที่
        const [nowYear, nowMonth, nowDay] = nowDate.split('-').map(Number);
        const [oldYear, oldMonth, oldDay] = oldDate.split('-').map(Number);
    
        // สร้างวัตถุ Date สำหรับวันที่ปัจจุบันและวันที่เก่า
        const nowDateObj = new Date(nowYear, nowMonth - 1, nowDay); // เดือนต้องลบ 1 เนื่องจากเดือนใน JavaScript เริ่มนับจาก 0
        const oldDateObj = new Date(oldYear, oldMonth - 1, oldDay);
    
        // หาความแตกต่างในวัน
        const differenceTime = nowDateObj.getTime() - oldDateObj.getTime();
        const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24)); // หาผลต่างของวันที่เป็นจำนวนวัน
    
        return differenceDays; 
    }
  }

  /*
  const handleTapToHatching = async () => {
    const lockedGroups = [
        ["Pet_0", "Pet_1", "Pet_2"],
        ["Pet_3", "Pet_4", "Pet_5"],
        ["Pet_6", "Pet_7", "Pet_8"]
    ];
    //สุ่มและ save ลงไปใน firebase 3 รูปเลยดีกว่าแบบนี้งง?
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
      // 'Tap to Hatching...'
        try {
            await addPetImage(userUID, { value: petImage });
            navigation.navigate('EnterNameScreen');
        } catch (error) {
            console.error('Error adding pet image:', error);
            Alert.alert('Failed to add pet image. Please try again.');
        }
    } else {
      // 'Tap to Start...'
      navigation.navigate('ExpainingScreen');
    }
  };
  */
  
  
  const handleTapToHatching = async () => {
    dispatch(setTotalDifferenceDate(differenceDate ? differenceDate : 0));
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

    if (petNameExists === '') {
        try {
            await addPetImages(userUID, selectedPetImages);
            await addOnePetImage(userUID, selectedPetImages[0])
            addLastedDate(userUID, formattedDate)
            navigation.navigate('EnterNameScreen');
        } catch (error) {
            console.error('Error adding pet images:', error);
            Alert.alert('Failed to add pet images. Please try again.');
        }
    } else {
        if(differenceDate >= 7){
          navigation.navigate('ExpainingScreen');
        }else{
          navigation.navigate('PetBottomTabNav');
        }
    }
  };


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
