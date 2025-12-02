import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getUpcomingAppointments } from '../../services/mockFHIRService';
import AppCard from '../../components/AppCard';
import AppText from '../../components/AppText';
import AppChip from '../../components/AppChip';
import AppHeader from '../../components/AppHeader';
import ScreenContainer from '../../components/ScreenContainer';
import { useTheme } from '../../theme';

export default function AppointmentListScreen({ navigation }: any) {
  const { Colors } = useTheme();
  const data = getUpcomingAppointments();
  return (
    <ScreenContainer padded={false}>
      <FlatList
        data={data}
        ListHeaderComponent={<AppHeader title="Upcoming appointments" subtitle="Select to start digital check-in" />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 24, maxWidth: 900, width: '100%', alignSelf: 'center' }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CheckInWizard', { appointment: item })} activeOpacity={0.85}>
            <AppCard>
              <AppText variant="title" weight="bold">{item.reason}</AppText>
              <AppText tone="secondary">{item.date}</AppText>
              <AppText tone="secondary">{item.location}</AppText>
              <AppText style={{ marginBottom: 6 }}>Provider: {item.provider}</AppText>
              <AppChip label="FHIR Appointment · US Core" variant="neutral" />
            </AppCard>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
});
