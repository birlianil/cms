import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppCard from '../components/AppCard';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import AppChip from '../components/AppChip';
import AppHeader from '../components/AppHeader';
import ScreenContainer from '../components/ScreenContainer';
import {
  getDigitalCredential,
  getMedicareNotices,
  getPatientProfile,
  getSmartHealthLinks,
  getUpcomingAppointments,
} from '../services/mockFHIRService';
import { useTheme } from '../theme';

export default function HomeScreen({ navigation }: any) {
  const { Colors, Spacing } = useTheme();
  const patient = getPatientProfile();
  const next = getUpcomingAppointments()[0];
  const credential = getDigitalCredential();
  const notices = getMedicareNotices();
  const links = getSmartHealthLinks();
  const unread = notices.filter((n) => !n.read).length;

  return (
    <ScreenContainer>
      <AppHeader
        title="Welcome back"
        subtitle={`Hi ${patient.name}, here is your day at a glance.`}
        action={<AppChip label="Mock environment" variant="neutral" />}
      />

      <AppCard>
        <View style={{ backgroundColor: Colors.primarySoft, padding: Spacing.md, borderRadius: 12, marginBottom: Spacing.md }}>
          <AppText variant="title" weight="bold">Next visit</AppText>
          <AppText weight="medium">{next.date}</AppText>
          <AppText tone="secondary" style={{ marginBottom: 6 }}>{next.location}</AppText>
          <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
            <AppChip label={`Insurance QR: ${links.find((l) => l.type === 'insurance')?.qrHint || 'N/A'}`} variant="accent" />
            <AppChip label={`History QR: ${links.find((l) => l.type === 'history')?.qrHint || 'N/A'}`} variant="neutral" />
          </View>
          <AppText tone="muted">FHIR Appointment · Coverage · Condition (US Core) via SHL/QR</AppText>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: Spacing.sm }}>
            <AppButton title="Check-in" onPress={() => navigation.navigate('KillTheClipboard')} />
            <AppButton title="Assistant" variant="secondary" onPress={() => navigation.navigate('Assistant')} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' }}>
          <AppCard style={{ flex: 1, minWidth: 220 }} title="Identity ready" subtitle="IAL2/AAL2 (mock)">
            <AppText tone="secondary">{credential.issuer}</AppText>
            <AppText style={{ marginTop: 4 }}>
              IAL: {credential.ial} · AAL: {credential.aal} · Passkey: {credential.passkeyBound ? 'bound' : 'unbound'}
            </AppText>
            <AppButton title="CMS connectivity" variant="secondary" onPress={() => navigation.navigate('CMS')} />
          </AppCard>
          <AppCard style={{ flex: 1, minWidth: 220 }} title="Medicare" subtitle="Stay notified">
            <AppText weight="medium">{unread} unread Medicare.gov notices</AppText>
            <AppButton title="View notices" variant="secondary" onPress={() => navigation.navigate('CMS')} />
          </AppCard>
        </View>

        <View style={{ flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' }}>
          <AppCard style={{ flex: 1, minWidth: 220 }} title="Care & coaching" subtitle="AI + chronic care">
            <AppButton title="Ask AI Assistant" variant="secondary" onPress={() => navigation.navigate('Assistant')} />
            <AppButton title="Diabetes & weight" variant="secondary" onPress={() => navigation.navigate('Diabetes')} />
          </AppCard>
          <AppCard style={{ flex: 1, minWidth: 220 }} title="Data exchange" subtitle="SHL/QR ready">
            <AppChip label="FHIR intake" variant="neutral" />
            <AppChip label="Visit hand-back" variant="accent" style={{ marginTop: 6 }} />
          </AppCard>
        </View>
      </AppCard>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16, paddingVertical: 12, maxWidth: 900, alignSelf: 'center', width: '100%' },
});
