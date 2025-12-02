import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AppCard from '../../components/AppCard';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import AppHeader from '../../components/AppHeader';
import ScreenContainer from '../../components/ScreenContainer';
import { signInWithEmail } from '../../services/mockAuthService';
import { useTheme } from '../../theme';

type Props = { navigation?: any; onContinue: () => void };

export default function SignInScreen({ onContinue }: Props) {
  const { Colors } = useTheme();
  const [email, setEmail] = useState('alex@demo.com');
  const handleEmail = () => {
    signInWithEmail(email);
    onContinue();
  };
  return (
    <ScreenContainer>
      <AppHeader title="Verify your identity" subtitle="Demo-only: fake sign in, no real PHI." />
      <View style={styles.center}>
        <AppCard>
          <AppInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          <AppButton title="Continue with Email" onPress={handleEmail} />
          <AppButton title="Use digital ID (mock mDL + passkey)" variant="secondary" onPress={handleEmail} />
        </AppCard>
        <AppText tone="muted" style={styles.caption}>In production: integrate CMS-approved IAL2/AAL2 identity and passkeys.</AppText>
      </View>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  center: { width: '100%', maxWidth: 520, alignSelf: 'center' },
  caption: { textAlign: 'center', marginTop: 12 },
});
