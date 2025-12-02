import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import SectionHeader from '../components/SectionHeader';
import AppCard from '../components/AppCard';
import AppText from '../components/AppText';
import AppChip from '../components/AppChip';
import AppButton from '../components/AppButton';
import AppHeader from '../components/AppHeader';
import ScreenContainer from '../components/ScreenContainer';
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
  const [notices, setNotices] = useState(getMedicareNotices());
  const discovery = getDiscoveryApps();
  const checklist = getSecurityChecklist();
  const [trialActive, setTrialActive] = useState(false);
  const unreadCount = useMemo(() => notices.filter((n) => !n.read).length, [notices]);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const markNoticeRead = (id: string) => {
    setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    setStatusMsg('Notice marked as read (mock).');
  };

  const startTrial = () => {
    if (trialActive) return;
    setTrialActive(true);
    setStatusMsg('Trial activated (mock) for Medicare beneficiaries.');
    Alert.alert('Trial activated (mock)', 'Medicare beneficiary trial is active for this demo session.');
  };
  const shareChecklist = () => {
    setStatusMsg('Security checklist shared with CMS reviewer (mock).');
    Alert.alert('Shared (mock)', 'Security checklist shared with CMS reviewer (demo-only).');
  };

  return (
    <ScreenContainer padded={false}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        <AppHeader title="CMS Connectivity" subtitle="Identity, Medicare comms, discovery, and security (demo-only)" />

        {statusMsg && <AppText style={styles.status}>{statusMsg}</AppText>}

        <AppCard title="Digital credential (IAL2/AAL2 mock)" subtitle="mDL + passkey (demo)">
          <AppText>Issuer: {credential.issuer}</AppText>
          <AppText>IAL: {credential.ial} | AAL: {credential.aal}</AppText>
          <AppText>Passkey bound: {credential.passkeyBound ? 'Yes' : 'No'}</AppText>
          <AppText>Status: {credential.status} (refreshed {credential.lastRefreshed})</AppText>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            <AppChip label="IAL2" variant="accent" />
            <AppChip label="AAL2" variant="neutral" />
          </View>
          <AppText tone="muted" style={styles.caption}>In production: invoke wallet / mDL / passkey to fetch a verifiable credential.</AppText>
        </AppCard>

        <AppCard title="FHIR data exchange links" subtitle="SHL/QR for intake and hand-back">
          {links.map((link) => (
            <View key={link.id} style={styles.row}>
              <View>
                <AppText weight="bold">{link.label}</AppText>
                <AppText tone="muted">QR hint: {link.qrHint}</AppText>
                <AppText tone="muted">SHL: {link.url}</AppText>
              </View>
            </View>
          ))}
          <AppText tone="muted" style={styles.caption}>Supports QR, Smart Health Card/Links for intake and visit hand-back.</AppText>
        </AppCard>

        <AppCard title="Discovery & trial access" subtitle="For Medicare beneficiaries">
          {discovery.map((app) => (
            <View key={app.id} style={styles.row}>
              <View style={{ flex: 1 }}>
                <AppText weight="bold">{app.name}</AppText>
                <AppText tone="muted">{app.category}</AppText>
                <AppText>{app.trial} {app.cost ? `· ${app.cost}` : ''}</AppText>
              </View>
            </View>
          ))}
          <AppChip label={`Trial status: ${trialActive ? 'Active (mock)' : 'Not started'}`} variant={trialActive ? 'success' : 'neutral'} />
          <AppButton title={trialActive ? 'Trial activated (mock)' : 'Start trial for Medicare patients'} onPress={startTrial} />
          <AppButton title="Launch AI assistant" variant="secondary" onPress={() => navigation.navigate('Assistant')} />
        </AppCard>

        <AppCard title={`Medicare communications (mock) — ${unreadCount} unread`} subtitle="Notices, EOBs, fraud alerts">
          {notices.map((item) => (
            <View key={item.id} style={styles.noticeRow}>
              <View style={{ flex: 1 }}>
                <AppText weight="bold">{item.title}</AppText>
                <AppText tone="muted">{item.type} · {item.date}</AppText>
                <AppText tone="muted">Action: {item.action}</AppText>
              </View>
              {item.read ? (
                <AppChip label="Read" variant="success" />
              ) : (
                <TouchableOpacity onPress={() => markNoticeRead(item.id)}>
                  <AppText style={styles.action}>Mark read</AppText>
                </TouchableOpacity>
              )}
            </View>
          ))}
          <AppText tone="muted" style={styles.caption}>Shows Medicare.gov notices, EOBs, and fraud alerts when connected.</AppText>
        </AppCard>

        <AppCard title="Security checklist (demo)">
          {checklist.map((item) => (
            <AppText key={item.id}>• {item.label} — {item.status}</AppText>
          ))}
          <AppButton title="Share with CMS reviewer (mock)" variant="secondary" onPress={shareChecklist} />
          <AppText tone="muted" style={styles.caption}>For CMS review: disclose data sources, agreements, and security posture.</AppText>
        </AppCard>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { padding: 16, paddingBottom: 32, maxWidth: 900, width: '100%', alignSelf: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6 },
  caption: { marginTop: 8 },
  noticeRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  action: { color: '#2563EB', fontWeight: '700' },
  readLabel: { color: '#16A34A', fontWeight: '700' },
  status: { backgroundColor: '#ECFDF3', color: '#166534', padding: 10, borderRadius: 8, marginBottom: 12, fontWeight: '600' },
});
