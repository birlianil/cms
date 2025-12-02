import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import SectionHeader from '../components/SectionHeader';
import {
  getDigitalCredential,
  getDiscoveryApps,
  getMedicareNotices,
  getSecurityChecklist,
  getSmartHealthLinks,
} from '../services/mockFHIRService';

export default function MedicareConnectivityScreen({ navigation }: any) {
  const credential = getDigitalCredential();
  const links = getSmartHealthLinks();
  const notices = getMedicareNotices();
  const discovery = getDiscoveryApps();
  const checklist = getSecurityChecklist();

  return (
    <View style={styles.container}>
      <SectionHeader title="CMS Connectivity" subtitle="Identity, Medicare comms, discovery, and security (demo-only)" />
      <Card>
        <Text style={styles.title}>Digital credential (IAL2/AAL2 mock)</Text>
        <Text>Issuer: {credential.issuer}</Text>
        <Text>IAL: {credential.ial} | AAL: {credential.aal}</Text>
        <Text>Passkey bound: {credential.passkeyBound ? 'Yes' : 'No'}</Text>
        <Text>Status: {credential.status} (refreshed {credential.lastRefreshed})</Text>
        <Text style={styles.caption}>In production: invoke wallet / mDL / passkey to fetch a verifiable credential.</Text>
      </Card>

      <Card>
        <Text style={styles.title}>FHIR data exchange links</Text>
        {links.map((link) => (
          <View key={link.id} style={styles.row}>
            <View>
              <Text style={styles.bold}>{link.label}</Text>
              <Text style={styles.muted}>QR hint: {link.qrHint}</Text>
              <Text style={styles.muted}>SHL: {link.url}</Text>
            </View>
          </View>
        ))}
        <Text style={styles.caption}>Supports QR, Smart Health Card/Links for intake and visit hand-back.</Text>
      </Card>

      <Card>
        <Text style={styles.title}>Medicare communications (mock)</Text>
        <FlatList
          data={notices}
          keyExtractor={(n) => n.id}
          renderItem={({ item }) => (
            <View style={styles.noticeRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.bold}>{item.title}</Text>
                <Text style={styles.muted}>{item.type} · {item.date}</Text>
              </View>
              <Text style={styles.action}>{item.action}</Text>
            </View>
          )}
        />
        <Text style={styles.caption}>Shows Medicare.gov notices, EOBs, and fraud alerts when connected.</Text>
      </Card>

      <Card>
        <Text style={styles.title}>Discovery & trial access</Text>
        {discovery.map((app) => (
          <View key={app.id} style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bold}>{app.name}</Text>
              <Text style={styles.muted}>{app.category}</Text>
              <Text>{app.trial} {app.cost ? `· ${app.cost}` : ''}</Text>
            </View>
          </View>
        ))}
        <PrimaryButton title="Launch AI assistant" variant="secondary" onPress={() => navigation.navigate('Assistant')} />
      </Card>

      <Card>
        <Text style={styles.title}>Security checklist (demo)</Text>
        {checklist.map((item) => (
          <Text key={item.id}>• {item.label} — {item.status}</Text>
        ))}
        <Text style={styles.caption}>For CMS review: disclose data sources, agreements, and security posture.</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontWeight: '700', marginBottom: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6 },
  bold: { fontWeight: '700' },
  muted: { color: '#6B7280' },
  caption: { color: '#6B7280', marginTop: 8 },
  noticeRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  action: { color: '#2563EB', fontWeight: '700' },
});
