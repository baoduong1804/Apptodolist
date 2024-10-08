import { View, Text, ImageBackground } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles'

interface Props {
    children:ReactNode,
    color?:string
}
const CardImageComponent = (props:Props) => {
    const {children,color} = props
  return (
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
}

export default CardImageComponent