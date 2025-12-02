import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../components/Card';
import PrimaryButton from '../../components/PrimaryButton';

type Props = { navigation?: any; onAuthed: () => void };

export default function ConsentScreen({ onAuthed }: Props) {
  const allow = () => {
    onAuthed();
  };
  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.title}>Connect to CMS Aligned Network (Mock)</Text>
        <Text style={styles.text}>Authorize this app to retrieve and share your health data using FHIR.</Text>
        <Text style={styles.text}>Scope: demographics, coverage, appointments, visit summaries.</Text>
        <PrimaryButton title="Allow" onPress={allow} />
        <PrimaryButton title="Decline" variant="secondary" onPress={allow} />
      </Card>
      <Text style={styles.caption}>Demo-only; no real data leaves the device.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 6 },
  text: { marginVertical: 4 },
  caption: { color: '#6B7280', textAlign: 'center', marginTop: 12 },
});
