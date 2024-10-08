import { View, Text, Image } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { colors } from '../constants/colors'

interface Props{
    uidsLength:number
}
const AvatarGroup = (props:Props) => {
    const {uidsLength} = props
    const imageURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb8ocX1uyxWlO0NGGjiwM4w00ooWe9e3DMoA&s'
    const imageStyle = {
        width:35,
        height:35,
        borderRadius:100,
        borderWidth:2,
        borderColor:'white',
    }
    return (
   <RowComponent styles={{justifyContent:'flex-start'}}>
    {Array.from({length:uidsLength}).map(
        (item,index) => 
            index < 3 && (
                <Image
                    source={{uri:imageURL}}
                    key={`image${index}`}
                    style={[imageStyle,{
                        marginLeft: index > 0 ? -15 : 0
                    }]}
                />
            )
    )}

    {uidsLength > 3 && (
        <View style={[imageStyle,{
            backgroundColor:'white',
            justifyContent:'center',
            alignItems:'center',
            marginLeft:-15
        }]}>
            <TextComponent flex={0} styles={{lineHeight:35}}  color={colors.bgColor} 
                text={`+${uidsLength - 3 > 9 ? '9': uidsLength -3}`}/>
        </View>
    )}
   </RowComponent>
  )
}

export default AvatarGroup