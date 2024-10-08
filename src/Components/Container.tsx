import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles'
import { useNavigation } from '@react-navigation/native'
import RowComponent from './RowComponent'
import Ionicons from '@expo/vector-icons/Ionicons';
import TextComponent from './TextComponent'
import SpaceComponent from './SpaceComponent'
import { fontFamilies } from '../constants/fontFamilies'

interface Props {
    title?: string,
    back?: boolean,
    right?:ReactNode,
    children:ReactNode,
    isScroll?:boolean
}
const Container = (props : Props) => {
    const {title, back, right , children, isScroll} = props
    const navigation:any = useNavigation()
  return (
    
    <View style={[globalStyles.container]}>
      {title && <RowComponent
        styles={{
          paddingVertical:16,
          justifyContent:'center',
          alignItems:'center',
          paddingTop:40
        }}
      >
        {back && <TouchableOpacity
         onPress={()=> navigation.goBack()}
         style={{padding:4}}
         >
          <Ionicons name="chevron-back-sharp" size={28} color="white" />

        </TouchableOpacity>}

        <View style={{flex:1}}>
          {title && <TextComponent
            flex={0}
            text={title}
            styles={{
              textAlign:'center',
              fontSize:18,
              fontFamily:fontFamilies.bold
            }}
            />}
        </View>
      </RowComponent>}
      
            {isScroll?(
              <ScrollView style={{flex:1}}
              showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
              showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
            >
                {children}
            </ScrollView>
            ):<View style={{flex:1}}>{children}</View>
            }
            
    </View>

  )
}

export default Container