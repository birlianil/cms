import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppCard from '../../components/AppCard';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import AppChip from '../../components/AppChip';
import AppHeader from '../../components/AppHeader';
import ScreenContainer from '../../components/ScreenContainer';
import { getSmartHealthLinks } from '../../services/mockFHIRService';
import { useTheme } from '../../theme';

export default function ArrivalScreen({ navigation, route }: any) {
  const { Colors } = useTheme();
  const { appointment } = route.params;
  const insuranceLink = getSmartHealthLinks().find((l) => l.type === 'insurance');
  return (
    <ScreenContainer padded={false}>
      <View style={styles.content}>
        <AppHeader title="You're checked in" subtitle={appointment.location} />
        <AppCard>
          <AppText weight="medium">{appointment.date}</AppText>
          <AppText tone="secondary">Provider: {appointment.provider}</AppText>
          {insuranceLink && <AppChip label={`Front desk QR (FHIR Coverage · SHL): ${insuranceLink.qrHint}`} variant="accent" style={{ marginTop: 8 }} />}
          <AppButton title="I'm here" onPress={() => navigation.navigate('VisitSummary', { appointment })} />
        </AppCard>
        <AppText tone="muted" style={styles.caption}>QR/Smart Health Link could be shown here for front-desk scan (mocked).</AppText>
      </View>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, justifyContent: 'center' },
  content: { maxWidth: 900, width: '100%', alignSelf: 'center' },
  caption: { textAlign: 'center', marginTop: 12 },
});
