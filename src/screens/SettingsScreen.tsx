import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppCard from '../components/AppCard';
import AppText from '../components/AppText';
import { useTheme } from '../theme';

export default function SettingsScreen() {
  const { Colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      <View style={styles.content}>
        <AppCard title="About this demo" subtitle="CMS-aligned concept, no real PHI">
          <AppText>Not medical advice. For demonstration only.</AppText>
          <AppText style={{ marginTop: 8 }}>Version: 1.0.0</AppText>
          <AppText tone="muted" style={{ marginTop: 8 }}>
            Legal: Uses mock data and mock identity. Production apps must comply with HIPAA/CMS requirements and integrate approved identity,
            credentials, and FHIR endpoints.
          </AppText>
          <AppText tone="muted" style={{ marginTop: 8 }}>
            Trial access: Medicare beneficiaries receive full-feature trial (mock). Discovery: app can be surfaced via Medicare.gov recommendation (mock).
          </AppText>
        </AppCard>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, paddingHorizontal: 16 }, content: { maxWidth: 900, width: '100%', alignSelf: 'center', paddingVertical: 16 } });
