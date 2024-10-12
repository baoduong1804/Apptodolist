import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles'

interface Props {
    children:ReactNode,
    color?:string,
    onPress?: () => void
}
const CardImageComponent = (props:Props) => {
    const {children,color,onPress} = props
    const renderCard = (
        <ImageBackground 
        style={[globalStyles.card,{flex:1}]}
        imageStyle={{borderRadius:12}}
        source={require('../../assets/images/card-bg.png')}>
            <View style={{
                flex:1,
                padding:12,
                borderRadius:12,
                backgroundColor: color ?? '#BC2FFECC',
            }}>
                {children}
            </View>
    </ImageBackground>
    )
  return onPress ? (
    <TouchableOpacity onPress={onPress}>{renderCard}</TouchableOpacity>
  ):renderCard
}

export default CardImageComponent