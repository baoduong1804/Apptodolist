import { View, Text } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import TextComponent from './TextComponent'
import RowComponent from './RowComponent'
import { fontFamilies } from '../constants/fontFamilies'

interface Props {
    size?:'small'|'default'|'large',
    color?:string,
    percent:number
}
const ProgressBarComponent = (props:Props) => {
    const {size,color,percent} = props
    const  heightContent = size === 'small' ? 6: size === 'large' ? 10 : 8
  return (
    <View style={{marginVertical:12}}>

        <View style={{
            height:heightContent,
            width:'100%',
            backgroundColor:colors.blackBlur,
            borderRadius:100,
        }}>
            <View style={{
                backgroundColor:color??colors.green,
                height:heightContent,
                width:percent > 100 ? '100%':`${percent}%`,
                borderRadius:100
            }}/>
        </View>
        <RowComponent justify='space-between'>
            <TextComponent text='Progress' size={14} styles={{marginTop:4}}/>
            <TextComponent font={fontFamilies.bold} flex ={0} size={14} text={`${percent}%`}/>
        </RowComponent>
    </View>
  )
}

export default ProgressBarComponent