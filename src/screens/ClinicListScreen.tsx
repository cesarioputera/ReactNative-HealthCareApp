import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native'
import { theme } from '../components/Theme'
import { Card, Text, Button } from 'react-native-paper';
import useClinicList from '../hooks/useClinicList';

const ClinicListScreen = () => {
  const { clinics, onClinicPressed } = useClinicList()
  return (
    <View style={styles.container}>
      {(() => {
        if (clinics && clinics.length > 0) {
          return (
            <FlatList
              data={clinics}
              renderItem={({ item }) => (
                <Card onPress={() => onClinicPressed(item.id)} mode='elevated' style={{ width: '100%', marginBottom: 16 }}>
                  <Card.Cover style={{ margin: 16 }} source={{ uri: item?.imgUrl }} />
                  <Card.Content>
                    <Text variant="titleLarge">{item?.name}</Text>
                    <Text variant="titleMedium">Location: {item?.location}</Text>
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
export default ClinicListScreen;