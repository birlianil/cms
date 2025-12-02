import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppCard from '../../components/AppCard';
import AppText from '../../components/AppText';
import AppChip from '../../components/AppChip';
import AppHeader from '../../components/AppHeader';
import ScreenContainer from '../../components/ScreenContainer';
import { getVisitSummary } from '../../services/mockFHIRService';
import { useTheme } from '../../theme';

export default function VisitSummaryScreen({ route }: any) {
  const { Colors } = useTheme();
  const { appointment } = route.params;
  const summary = getVisitSummary(appointment.id);
  return (
    <ScreenContainer padded={false}>
      <View style={styles.content}>
        <AppHeader title="Visit Summary" subtitle="FHIR Encounter/DocumentReference · US Core" />
        <AppCard>
          <AppText variant="subtitle" weight="bold" style={{ marginTop: 6 }}>Diagnoses</AppText>
          {summary.diagnoses.map((d) => <AppText key={d}>• {d}</AppText>)}
          <AppText variant="subtitle" weight="bold" style={{ marginTop: 12 }}>Instructions</AppText>
          {summary.instructions.map((i) => <AppText key={i}>• {i}</AppText>)}
          <AppText variant="subtitle" weight="bold" style={{ marginTop: 12 }}>Medications</AppText>
          {summary.medications.map((m) => <AppText key={m}>• {m}</AppText>)}
          <AppText variant="subtitle" weight="bold" style={{ marginTop: 12 }}>Follow-ups</AppText>
          {summary.followUps.map((f) => <AppText key={f}>• {f}</AppText>)}
          {summary.visitLink && (
            <View style={{ marginTop: 14 }}>
              <AppText variant="subtitle" weight="bold">Share back (Smart Health Link)</AppText>
              <AppText>{summary.visitLink.label}</AppText>
              <AppChip label={`QR: ${summary.visitLink.qrHint}`} variant="accent" style={{ marginTop: 6 }} />
              <AppText tone="muted" style={{ marginTop: 4 }}>URL: {summary.visitLink.url}</AppText>
            </View>
          )}
        </AppCard>
        <AppText tone="muted" style={styles.caption}>In production: fetched via FHIR and rendered; downloadable Smart Health Link.</AppText>
      </View>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  content: { maxWidth: 900, width: '100%', alignSelf: 'center', paddingVertical: 16 },
  caption: { marginTop: 12, textAlign: 'center' },
});
