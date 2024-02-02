import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
 
 
export const CalendarScreen = ({navigation})=>{
    const [selectedDate, setSelectedDate] = useState('');
    console.log(selectedDate)
 
    const onDayPress = (day) => {
      setSelectedDate(day.dateString);
      
    };
   
    return (
      <View style={styles.container}>
        <Calendar
          onDayPress = {onDayPress}
          markedDates = {{
            [selectedDate]: {selected: true, selectedColor: '#0ABAB5'},
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