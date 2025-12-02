import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getUpcomingAppointments } from '../../services/mockFHIRService';
import Card from '../../components/Card';

export default function AppointmentListScreen({ navigation }: any) {
  const data = getUpcomingAppointments();
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CheckInWizard', { appointment: item })}>
            <Card>
              <Text style={styles.title}>{item.reason}</Text>
              <Text>{item.date}</Text>
              <Text>{item.location}</Text>
              <Text>Provider: {item.provider}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontWeight: '700', marginBottom: 4 } });
