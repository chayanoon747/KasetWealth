import { View, Text, Image, Touchable, TouchableOpacity} from "react-native";
import { showUser, updatephoneNumber, delelteUser } from "../../firebase/UserModel";
import { signOut } from "../../firebase/AuthModel";

export const MoreScreen = ({navigation})=>{
    return(
        <View style={{flex:1}}>
            <Text>MoreScreen</Text>

            {/* Log out button*/}
            <TouchableOpacity style={{alignItems:'center'}}
                onPress={()=>{
                    signOut()
                    navigation.navigate('SplashScreen')
                }} 
            >
                <Text>Log out</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignItems:'center'}}
                onPress={showUser} 
            >
                <Text>Show User</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignItems:'center'}}
                onPress={updatephoneNumber} 
            >
                <Text>Update Phone number</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignItems:'center'}}
                onPress={delelteUser} 
            >
                <Text>Delelte User</Text>
            </TouchableOpacity>
            
        </View>
    )
}