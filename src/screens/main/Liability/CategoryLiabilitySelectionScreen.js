import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { useEffect, useState } from "react";
import { retrieveCategory } from "../../../firebase/UserModel";
import { resetIcon } from "../../../navigators/IncomeStackNav";
import { useDispatch } from 'react-redux';
import { setSelectedItems, setItemCategory, setItemData } from '../../../redux/variableSlice'
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { RemoveCategoryIcon } from "../../../firebase/UserModel";
import { setEditStatus } from "../../../redux/variableSlice";
import { useSelector } from "react-redux";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const { width } = Dimensions.get('window');

export const CategoryLiabilitySelectionScreen = ({navigation})=>{

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;
    //console.log(userUID);

    const editStatus = useSelector((state)=>state.variables.isEdit)
    //console.log(editStatus);

    const selectedItems = useSelector(state => state.variables.selectedItems);
    //console.log(selectedItems);

    const dispatch = useDispatch();

    const [isEdit, setIsEdit] = useState(false);
    
    const [category1, setCategory1] = useState([]);
    const [category2, setCategory2] = useState([]);
    const [category3, setCategory3] = useState([]);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'work', title: 'หนี้ระยะสั้น' },
        { key: 'assets', title: 'หนี้สินระยะยาว' },
    ]);
    

    useEffect(() => {
        retrieveData();
    }, [isEdit]);

    const success = ()=>{
        setIsEdit(false)
        dispatch(setEditStatus(false));
    }

    const retrieveData = async () => {
        try {
            const categoryData = await retrieveCategory(userUID);
            const items1 = categoryData.filter(item => item.category === "หนี้สินระยะสั้น");
            const items2 = categoryData.filter(item => item.category === "หนี้สินระยะยาว");
            setCategory1(items1);
            setCategory2(items2);
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };

    const renderItem = ({ item }) => {
        const isSelected = selectedItems.includes(item);
        return (
            <TouchableOpacity style={styles.itemContainer}
                disabled={editStatus && item.subCategory === 'เพิ่ม'}
                onPress={() => handleItemPress(item)}
            >
                <View style={styles.itemContent}>
                    <Image source={isSelected ? require('../../../assets/circleGreen.png') : require('../../../assets/circle.png')} style={styles.icon} />
                    <Image style={styles.image} source={{ uri: item.photoURL }} />
                </View>
                <Text style={styles.itemText}>{item.subCategory}</Text>
            </TouchableOpacity>
        );
    };

    const handleItemPress = (item) => {
        if (!editStatus) {
            if (item.subCategory !== 'เพิ่ม') {
                dispatch(setItemData(item));
                navigation.navigate('AddInputScreen');
            } else {
                dispatch(setItemCategory(item.category));
                navigation.navigate('AddCategoryScreen');
            }
        } else {
            const isItemSelected = selectedItems.includes(item);
            dispatch(setSelectedItems(isItemSelected
                ? selectedItems.filter(selectedItem => selectedItem !== item)
                : [...selectedItems, item]
            ));
        }
    };

    const WorkRoute = () => (
        <View style={styles.routeContainer}>
            <FlatList
                data={category1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    );

    const AssetsRoute = () => (
        <View style={styles.routeContainer}>
            <FlatList
                data={category2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    );

    const renderScene = SceneMap({
        work: WorkRoute,
        assets: AssetsRoute,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.label}
        />
    );

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => {
                    if (isEdit) {
                        dispatch(setSelectedItems([]));
                        dispatch(setEditStatus(false));
                        setIsEdit(false);
                    } else {
                        navigation.navigate('FinancialScreen');
                    }
                }}>
                    {isEdit ? (
                        <Image source={require('../../../assets/cancelIcon.png')} style={styles.icon} />
                    ) : (
                        <IconAntDesign name="arrowleft" size={30} color="#ffffff" />
                    )}
                </TouchableOpacity>
                <Text style={styles.title}>หนี้สิน</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => {
                    if (!isEdit) {
                        dispatch(setEditStatus(true));
                        setIsEdit(true);
                    } else {
                        RemoveCategoryIcon(userUID, selectedItems, success);
                    }
                }}>
                    {isEdit ? (
                        <Image source={require('../../../assets/trashIcon.png')} style={{width: 30,height: 30}} />
                    ) : (
                        <IconFeather name="edit" size={30} color="#ffffff" />
                    )}
                </TouchableOpacity>
            </View>
            <View style={{height:15}}></View>
            <TabView style={{marginHorizontal:16}}
            renderLabel={({ route, focused, color }) => (
                <Text style={{ color, margin: 8 }}>
                  AAAAA
                </Text>
              )}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width }}
                renderTabBar={renderTabBar}
                
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#0ABAB5',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'ZenOldMincho-Regular',
        fontSize: 24,
        color: '#ffffff',
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabBar: {
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        textAlign:'center',
        backgroundColor: '#0ABAB5',
    },
    indicator: {
        backgroundColor: '#ffffff',
        height: 4,
    },
    label: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign:'center'
    },
    routeContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
    },
    itemContent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
        marginRight: 10,
    },
    icon: {
        width: 25,
        height: 25,
        position: 'absolute',
        zIndex: 1,
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        color:'#100D40'
    },
})