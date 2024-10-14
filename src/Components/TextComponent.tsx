import { View, Text, StyleProp, TextStyle, TextInput } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { fontFamilies } from '../constants/fontFamilies'
import { colors } from '../constants/colors'

interface Props {
    text:string,
    size?:number,
    font?:string,
    color?:string,
    flex?:number,
    maxLength?:number,
    line?:number,
    styles?: StyleProp<TextStyle>
}
const TextComponent = (props: Props) => {
    const {text,size,font,color,flex,styles,maxLength,line} = props
    
  return (
      <Text 
      numberOfLines={line}
      style={[globalStyles.text,{
        flex: flex ?? 1,
        fontFamily:font ?? fontFamilies.regular,
        fontSize: size ?? globalStyles.text.fontSize,
        color: color ?? colors.desc
        
      },
      styles
    ]}>{text}</Text>
  )
}

export default TextComponent