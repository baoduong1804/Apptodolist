import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles'

interface Props {
    children:ReactNode,
    isNotpadding?:boolean,
    styles?:StyleProp<ViewStyle>
}
const SectionComponent = (props: Props) => {
    const {children,styles,isNotpadding} = props
  return (
    <View style={[isNotpadding ? {}: globalStyles.section,styles]}>
        {children}
    </View>
  )
}

export default SectionComponent