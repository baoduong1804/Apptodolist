import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { fontFamilies } from "../constants/fontFamilies";

export const globalStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.bgColor,
        paddingHorizontal:20,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontFamily:fontFamilies.regular,
        fontSize:16,
        color:colors.desc
    },
    inputContainer:{
        backgroundColor:colors.gray,
        paddingHorizontal:14,
        paddingVertical:14,
        borderRadius:12,
    },
    section:{
        marginBottom:16
    },
    tag:{
        paddingHorizontal:20,
        paddingVertical:4,
        borderRadius:100,
        backgroundColor:colors.blue
    },
    card:{
        borderRadius:12
    },
    iconContainer:{
        backgroundColor:colors.blackBlur,
        height:44,
        width:44,
        borderRadius:22,
        justifyContent:'center',
        alignItems:'center'
    }
})