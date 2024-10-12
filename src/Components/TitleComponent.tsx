import { View, Text, TextStyle, StyleProp } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { fontFamilies } from '../constants/fontFamilies'
import { colors } from '../constants/colors'
import TextComponent from './TextComponent'

interface Props {
    text:string,
    size?:number,
    font?:string,
    color?:string,
    styles?:StyleProp<TextStyle>,
    flex?:number
}
const TitleComponent = (props: Props) => {
    const {text,size,font,color,styles,flex} = props
  return (
  <TextComponent 
    size={size ?? 21}
    font={font??fontFamilies.semiBold}
    color={color ?? colors.text}
    text={text}
    styles={styles}
    flex={flex ?? 0}
  />
  )
}

export default TitleComponent