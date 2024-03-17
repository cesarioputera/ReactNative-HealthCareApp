import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import { theme } from '../components/Theme'
import { Avatar, Button, Card, Dialog, Modal, RadioButton, Text } from 'react-native-paper';
import useDoctorDetail from '../hooks/useDoctorDetail';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Schedule } from '../models/Schedule';


const renderScheduleItem = (schedules: Schedule[]) => {
  return schedules.map((schedule) => {
    return <RadioButton.Item key={schedule.label} label={schedule.label} value={schedule.timestamp.toString()} disabled={!schedule.available} />
  })
}

const DoctorDetailScreen = () => {
  const { doctor, selectedDate, generateSchedules, schedules, selectedSchedule, setSelectedSchedule, createAppointment } = useDoctorDetail()

  //DatePicker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  //SchedulePicker
  const [schedulePickerValue, setSchedulePickerValue] = React.useState('');
  const [isSchedulePickerVisible, setSchedulePickerVisible] = React.useState(false);

  const handleConfirm = (date: Date) => {
    generateSchedules(date);
    hideDatePicker();
  };

  const showSchedulePicker = () => setSchedulePickerVisible(true);
  const onScheduleSelected = () => {
    const selected = schedules?.find(obj => obj.timestamp == parseInt(schedulePickerValue))
    setSelectedSchedule(selected)
    setSchedulePickerVisible(false);
  }
  const minDate = new Date()

  return (
    <View style={styles.container}>
      {(() => {
        if (doctor) {
          return (
            <View>
              <Avatar.Image size={200} source={{ uri: doctor?.imgUrl }} style={{ alignSelf: 'center', margin: 16 }} />
              <Text variant="headlineLarge">{doctor?.name}</Text>
              <Text variant="titleMedium">{doctor?.specialist} Specialist</Text>
              <Text variant="titleMedium">@ {doctor?.clinicName} {doctor?.clinicLocation}</Text>
            </View>
          )
        }
      })()}

      <Text variant="titleLarge" style={{ marginTop: 48 }}>Set Appointment</Text>

      <Button mode='contained-tonal' style={{ marginTop: 16 }} onPress={showDatePicker}>{selectedDate ? (selectedDate as Date).toDateString() : 'Choose Date'}</Button>

      <Button disabled={selectedDate ? false : true} mode='contained-tonal' style={{ marginTop: 16 }} onPress={showSchedulePicker}>{selectedSchedule ? selectedSchedule.label : 'Choose Time'}</Button>

      <Button disabled={schedulePickerValue ? false : true} mode='contained' style={{ marginTop: 16 }} onPress={createAppointment}>Create Appointment</Button>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={minDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {(() => {
        return (
          <Dialog visible={isSchedulePickerVisible} onDismiss={onScheduleSelected}>
            <Dialog.Title>Choose time</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group onValueChange={value => setSchedulePickerValue(value)} value={schedulePickerValue}>
                {schedules ? renderScheduleItem(schedules) : null}
              </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={onScheduleSelected}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        )
      })()}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
    alignSelf: 'center',
  },
})
export default DoctorDetailScreen;