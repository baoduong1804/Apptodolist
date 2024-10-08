import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import Container from '../Components/Container'
import TextComponent from '../Components/TextComponent'

import DateTimePickerModal from "react-native-modal-datetime-picker";
 
const SearchScreen = ({navigation}:any) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date:Date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  return (
    <Container back title='Search Screen'>
      <View>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
    </Container>
  )
}

export default SearchScreen