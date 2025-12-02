import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../components/Card';
import PrimaryButton from '../../components/PrimaryButton';
import { signInWithDigitalID } from '../../services/mockAuthService';

type Props = { navigation?: any; onContinue: () => void };

export default function DigitalIDScreen({ onContinue }: Props) {
  const handleContinue = () => {
    signInWithDigitalID();
    onContinue();
  };
  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.title}>Mock Digital Credential</Text>
        <Text style={styles.text}>Issuer: CMS-approved ID Provider (mock)</Text>
        <Text style={styles.text}>IAL2 equivalent: verified</Text>
        <Text style={styles.text}>AAL2: passkey bound (mock)</Text>
        <Text style={styles.text}>Patient: Alex Patient</Text>
        <PrimaryButton title="Use this credential" onPress={handleContinue} />
      </Card>
      <Text style={styles.caption}>A real app would invoke wallet / mDL / passkey APIs here.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 6 },
  text: { marginVertical: 4 },
  caption: { color: '#6B7280', textAlign: 'center', marginTop: 12 },
});
