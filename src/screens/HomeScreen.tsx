import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import {
  getDigitalCredential,
  getMedicareNotices,
  getPatientProfile,
  getSmartHealthLinks,
  getUpcomingAppointments,
} from '../services/mockFHIRService';

export default function HomeScreen({ navigation }: any) {
  const patient = getPatientProfile();
  const next = getUpcomingAppointments()[0];
  const credential = getDigitalCredential();
  const notices = getMedicareNotices();
  const links = getSmartHealthLinks();
  const unread = notices.filter((n) => !n.read).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {patient.name}</Text>

      <Card>
        <Text style={styles.subtitle}>Identity ready</Text>
        <Text>{credential.issuer}</Text>
        <Text>IAL: {credential.ial} · AAL: {credential.aal} · Passkey: {credential.passkeyBound ? 'bound' : 'unbound'}</Text>
        <PrimaryButton title="View CMS connectivity" variant="secondary" onPress={() => navigation.navigate('CMS')} />
      </Card>

      <Card>
        <Text style={styles.subtitle}>Next visit</Text>
        <Text>{next.date}</Text>
        <Text>{next.location}</Text>
        <Text>Share: {links.find((l) => l.type === 'insurance')?.qrHint} / {links.find((l) => l.type === 'history')?.qrHint}</Text>
        <PrimaryButton title="Start digital check-in" onPress={() => navigation.navigate('KillTheClipboard')} />
      </Card>

      <Card>
        <Text style={styles.subtitle}>Medicare program</Text>
        <Text>{unread} unread Medicare.gov notices</Text>
        <PrimaryButton title="View notices" variant="secondary" onPress={() => navigation.navigate('CMS')} />
      </Card>

      <Card>
        <Text style={styles.subtitle}>Care & coaching</Text>
        <PrimaryButton title="Ask AI Assistant" variant="secondary" onPress={() => navigation.navigate('Assistant')} />
        <PrimaryButton title="View diabetes & weight dashboard" variant="secondary" onPress={() => navigation.navigate('Diabetes')} />
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  subtitle: { fontWeight: '700', marginBottom: 6 },
});
