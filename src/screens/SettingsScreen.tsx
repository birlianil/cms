import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../components/Card';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.title}>About this demo</Text>
        <Text>This is a CMS-aligned concept demo. No real PHI, no real CMS/EHR integration.</Text>
        <Text>Not medical advice. For demonstration only.</Text>
        <Text style={{ marginTop: 8 }}>Version: 1.0.0</Text>
        <Text style={{ marginTop: 8 }}>Legal: Uses mock data and mock identity. Production apps must comply with HIPAA/CMS requirements and integrate approved identity, credentials, and FHIR endpoints.</Text>
        <Text style={{ marginTop: 8 }}>Trial access: Medicare beneficiaries receive full-feature trial (mock). Discovery: app can be surfaced via Medicare.gov recommendation (mock).</Text>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontWeight: '700', fontSize: 18, marginBottom: 8 } });
