import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import Card from '../../components/Card';
import { getSmartHealthLinks } from '../../services/mockFHIRService';

export default function ArrivalScreen({ navigation, route }: any) {
  const { appointment } = route.params;
  const insuranceLink = getSmartHealthLinks().find((l) => l.type === 'insurance');
  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.title}>You're checked in</Text>
        <Text>{appointment.date}</Text>
        <Text>{appointment.location}</Text>
        <Text>Provider: {appointment.provider}</Text>
        {insuranceLink && <Text style={styles.caption}>Front desk can scan QR: {insuranceLink.qrHint}</Text>}
        <PrimaryButton title="I'm here" onPress={() => navigation.navigate('VisitSummary', { appointment })} />
      </Card>
      <Text style={styles.caption}>QR/Smart Health Link could be shown here for front-desk scan (mocked).</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  caption: { textAlign: 'center', color: '#6B7280', marginTop: 12 },
});
