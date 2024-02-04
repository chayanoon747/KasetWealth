import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { setSelectedDate } from '../../../redux/variableSlice';
import { useDispatch, useSelector } from 'react-redux';
 
 
export const CalendarScreen = ({navigation})=>{

  const dispatch = useDispatch();

  const [localSelectedDate, setLocalSelectedDate] = useState('');
 
  const onDayPress = (day) => {
    setLocalSelectedDate(day.dateString);
    dispatch(setSelectedDate(day.dateString))
  };
   
  return (
    <View style={styles.container}>
      <Calendar
        onDayPress = {onDayPress}
        markedDates = {{
          [localSelectedDate]: {selected: true, selectedColor: '#0ABAB5'},
        }}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 50,
  },
});