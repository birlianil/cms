import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppCard from '../../components/AppCard';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import AppChip from '../../components/AppChip';
import AppHeader from '../../components/AppHeader';
import ScreenContainer from '../../components/ScreenContainer';
import { useTheme } from '../../theme';

type Props = { navigation?: any; onAuthed: () => void };

export default function ConsentScreen({ onAuthed }: Props) {
  const { Colors } = useTheme();
  const allow = () => {
    onAuthed();
  };
  return (
    <ScreenContainer>
      <AppHeader title="Connect to CMS Aligned Network (Mock)" subtitle="Authorize mock FHIR data sharing" />
      <View style={styles.center}>
        <AppCard>
          <AppText>Scope: demographics, coverage, appointments, visit summaries.</AppText>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            <AppChip label="FHIR Patient" variant="neutral" />
            <AppChip label="FHIR Coverage" variant="neutral" />
            <AppChip label="FHIR Encounter" variant="neutral" />
          </View>
          <AppButton title="Allow" onPress={allow} />
          <AppButton title="Decline" variant="secondary" onPress={allow} />
        </AppCard>
        <AppText tone="muted" style={styles.caption}>Demo-only; no real data leaves the device.</AppText>
      </View>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  center: { width: '100%', maxWidth: 520, alignSelf: 'center' },
  caption: { textAlign: 'center', marginTop: 12 },
});
