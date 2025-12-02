import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import Card from '../../components/Card';
import { signInWithEmail } from '../../services/mockAuthService';

type Props = { navigation?: any; onContinue: () => void };

export default function SignInScreen({ onContinue }: Props) {
  const [email, setEmail] = useState('alex@demo.com');
  const handleEmail = () => {
    signInWithEmail(email);
    onContinue();
  };
  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.title}>Verify your identity</Text>
        <Text style={styles.text}>Demo-only: fake sign in, no real PHI.</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize="none" />
        <PrimaryButton title="Continue with Email" onPress={handleEmail} />
        <PrimaryButton title="Use digital ID (mock mDL + passkey)" variant="secondary" onPress={() => { signInWithEmail(email); onContinue(); }} />
      </Card>
      <Text style={styles.caption}>In production: integrate CMS-approved IAL2/AAL2 identity and passkeys.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontWeight: '700', fontSize: 20, marginBottom: 8 },
  text: { marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 10, marginVertical: 8 },
  caption: { textAlign: 'center', color: '#6B7280', marginTop: 12 },
});
