import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../components/Card';
import { getVisitSummary } from '../../services/mockFHIRService';

export default function VisitSummaryScreen({ route }: any) {
  const { appointment } = route.params;
  const summary = getVisitSummary(appointment.id);
  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.title}>Visit Summary (FHIR: Encounter)</Text>
        <Text style={styles.subtitle}>Diagnoses</Text>
        {summary.diagnoses.map((d) => <Text key={d}>• {d}</Text>)}
        <Text style={styles.subtitle}>Instructions</Text>
        {summary.instructions.map((i) => <Text key={i}>• {i}</Text>)}
        <Text style={styles.subtitle}>Medications</Text>
        {summary.medications.map((m) => <Text key={m}>• {m}</Text>)}
        <Text style={styles.subtitle}>Follow-ups</Text>
        {summary.followUps.map((f) => <Text key={f}>• {f}</Text>)}
        {summary.visitLink && (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.subtitle}>Share back (Smart Health Link)</Text>
            <Text>{summary.visitLink.label}</Text>
            <Text style={styles.caption}>QR: {summary.visitLink.qrHint} · URL: {summary.visitLink.url}</Text>
          </View>
        )}
      </Card>
      <Text style={styles.caption}>In production: fetched via FHIR and rendered; downloadable Smart Health Link.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  subtitle: { marginTop: 10, fontWeight: '700' },
  caption: { color: '#6B7280', marginTop: 12 },
});
