import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native'
import { theme } from '../components/Theme'
import { Card, Text, Button, Avatar } from 'react-native-paper';
import useDoctorList from '../hooks/useDoctorList';

const DoctorListScreen = () => {
  const { doctors, onClinicPressed } = useDoctorList()
  return (
    <View style={styles.container}>
      {(() => {
        if (doctors && doctors.length > 0) {
          return (
            <FlatList
              data={doctors}
              renderItem={({ item }) => (
                <Card onPress={() => onClinicPressed(item.id)} mode='elevated' style={{ width: '100%', marginBottom: 16 }}>

                  <Card.Content>
                    <View style={{ flexDirection: 'row' }}>
                      <Avatar.Image style={{}} source={{ uri: item?.imgUrl }} />
                      <View style={{ flexDirection: 'column', marginStart:24}}>
                        <Text variant="titleLarge">{item?.name}</Text>
                        <Text variant="titleMedium">{item?.specialist} Specialist</Text>
                      </View>
                    </View>
                    <Card.Actions style={{ alignItems: 'flex-end' }}>
                      <Button>See doctors</Button>
                    </Card.Actions>
                  </Card.Content>

                </Card>
              )}
              keyExtractor={(item) => item.id}
            />
          )
        } else {
          return (
            <Text style={{
              alignSelf: 'center', justifyContent: 'center'
            }} variant="titleLarge">There are no clinic nearby you</Text>
          )
        }
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
export default DoctorListScreen;