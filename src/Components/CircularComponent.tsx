import { View, Text } from 'react-native'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'
import { colors } from '../constants/colors'
import { globalStyles } from '../styles/globalStyles'
import { fontFamilies } from '../constants/fontFamilies'

interface Props {
    color?:string,
    value:number,
    maxValue?:number,
    radius?:number
}
const CircularComponent = (props:Props) => {
    const {color, value, maxValue,radius} = props
  return (
    <CircularProgress  
        value={value}
        radius={radius ?? 60}
        maxValue={100}
        duration={1000}
        inActiveStrokeColor={colors.green}
        inActiveStrokeOpacity={0.15}
        progressValueColor={colors.text}
        valueSuffix={'%'} 
        titleStyle={{
            fontFamily:fontFamilies.semiBold
        }
        }
    />
  )
}

export default CircularComponent