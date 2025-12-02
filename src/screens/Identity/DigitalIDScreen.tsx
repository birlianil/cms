import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppCard from '../../components/AppCard';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import AppChip from '../../components/AppChip';
import AppHeader from '../../components/AppHeader';
import ScreenContainer from '../../components/ScreenContainer';
import { signInWithDigitalID } from '../../services/mockAuthService';
import { useTheme } from '../../theme';

type Props = { navigation?: any; onContinue: () => void };

export default function DigitalIDScreen({ onContinue }: Props) {
  const { Colors } = useTheme();
  const handleContinue = () => {
    signInWithDigitalID();
    onContinue();
  };
  return (
    <ScreenContainer>
      <AppHeader title="Mock Digital Credential" subtitle="CMS-approved ID Provider (demo)" />
      <View style={styles.center}>
        <AppCard>
          <AppText>IAL2 equivalent: verified</AppText>
          <AppText>AAL2: passkey bound (mock)</AppText>
          <AppText>Patient: Alex Patient</AppText>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            <AppChip label="mDL" variant="accent" />
            <AppChip label="Passkey" variant="neutral" />
          </View>
          <AppButton title="Use this credential" onPress={handleContinue} />
        </AppCard>
        <AppText tone="muted" style={styles.caption}>A real app would invoke wallet / mDL / passkey APIs here.</AppText>
      </View>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  center: { width: '100%', maxWidth: 520, alignSelf: 'center' },
  caption: { textAlign: 'center', marginTop: 12 },
});
