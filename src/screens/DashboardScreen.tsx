import React from 'react';
import { StyleSheet, View } from 'react-native'
import { theme } from '../components/Theme'
import { Card, Text, Button } from 'react-native-paper';
import useDashboard from '../hooks/useDashboard';
import CustomButton from '../components/CustomButton';

const DashboardScreen = () => {
  const { user, appointment, onCreateAppointmentPressed, onLogoutPressed } = useDashboard()
  return (
    <View style={styles.container} >
      <Text variant="titleLarge" style={{ alignSelf: 'flex-start', marginBottom: 24, }}>Welcome back {user?.fullName}</Text>

      <Card mode='contained' style={{ width: '100%', marginBottom: 24 }}>
        {(() => {
          if (appointment) {
            return (
              <Card.Content>
                <Text variant="titleLarge">Your upcoming appointment!</Text>
                <Text variant="titleMedium">Doctor: {appointment?.doctorName}</Text>
                <Text variant="titleMedium">Location: {appointment?.clinicName}</Text>
                <Card.Actions style={{ alignItems: 'flex-end' }}>
                  <Button>Open Map</Button>
                </Card.Actions>
              </Card.Content>
            )
          } else {
            return (
              <Card.Content style={{ alignItems: 'center' }}>
                <Text variant="titleLarge" >You've no appointment</Text>
                <Text variant="titleMedium">Stay healthy!</Text>
              </Card.Content>
            )
          }
        })()}
      </Card>

      <Card mode='elevated' style={{ width: '100%', marginBottom: 24 }}>
        <Card.Content>
          <Text variant="titleLarge">Patient Information!</Text>
          <Text variant="titleMedium">Full Name: {user?.fullName}</Text>
          <Text variant="titleMedium">Email: {user?.email}</Text>
          <Text variant="titleMedium">Phone Number: {user?.phoneNumber}</Text>

          <Card.Actions style={{ alignItems: 'flex-end' }}>
            <Button>Edit Information</Button>
          </Card.Actions>
        </Card.Content>
      </Card>

      <CustomButton mode="contained"  onPress={onCreateAppointmentPressed}>
        Create Appointment!
      </CustomButton>

      <CustomButton mode="outlined" onPress={onLogoutPressed} >
        Logout
      </CustomButton>

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
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
})
export default DashboardScreen;