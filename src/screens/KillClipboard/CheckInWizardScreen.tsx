import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AppCard from '../../components/AppCard';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import AppChip from '../../components/AppChip';
import AppInput from '../../components/AppInput';
import AppHeader from '../../components/AppHeader';
import ScreenContainer from '../../components/ScreenContainer';
import { useTheme } from '../../theme';
import { getDigitalCredential, getPrevisitData, getSmartHealthLinks, submitCheckIn } from '../../services/mockFHIRService';

const steps = ['Demographics', 'Insurance + Digital Card', 'History', 'Consent & Credential'];

export default function CheckInWizardScreen({ navigation, route }: any) {
  const { Colors, Spacing } = useTheme();
  const { appointment } = route.params;
  const pre = getPrevisitData();
  const credential = getDigitalCredential();
  const links = getSmartHealthLinks();
  const insuranceLink = links.find((l) => l.type === 'insurance');
  const historyLink = links.find((l) => l.type === 'history');
  const [step, setStep] = useState(0);
  const [historyNotes, setHistoryNotes] = useState(pre.history.join(', '));
  const [consented, setConsented] = useState(false);

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      submitCheckIn({ appointmentId: appointment.id, answers: { history: historyNotes, consented: String(consented) } });
      navigation.navigate('Arrival', { appointment });
    }
  };

  return (
    <ScreenContainer padded={false}>
      <View style={[styles.content, { paddingHorizontal: Spacing.md }]}>
        <AppHeader title="Digital check-in" subtitle={`Step ${step + 1} of ${steps.length}: ${steps[step]}`} />
        <AppCard>
          {step === 0 && (
            <>
              <AppText variant="title" weight="bold" style={{ marginBottom: 6 }}>Demographics (FHIR Patient · US Core)</AppText>
              <AppText>Name: {pre.demographics.name}</AppText>
              <AppText>DOB: {pre.demographics.dob}</AppText>
              <AppText>Email: {pre.demographics.email}</AppText>
            </>
          )}
          {step === 1 && (
            <>
              <AppText variant="title" weight="bold" style={{ marginBottom: 6 }}>Insurance (FHIR Coverage · US Core)</AppText>
              <AppText>Payer: {pre.coverage.payer}</AppText>
              <AppText>Member ID: {pre.coverage.memberId}</AppText>
              <AppText>Group: {pre.coverage.group}</AppText>
              <View style={{ marginTop: 8, gap: 6 }}>
                {insuranceLink && <AppChip label={`Digital card QR: ${insuranceLink.qrHint}`} variant="accent" />}
                {insuranceLink && <AppChip label={`Smart Health Link: ${insuranceLink.url}`} variant="neutral" />}
              </View>
            </>
          )}
          {step === 2 && (
            <>
              <AppText variant="title" weight="bold" style={{ marginBottom: 6 }}>Health History (FHIR Condition/AllergyIntolerance · US Core)</AppText>
              <AppInput
                value={historyNotes}
                onChangeText={setHistoryNotes}
                multiline
                label="Conditions / allergies"
                placeholder="Update conditions/allergies"
                style={{ minHeight: 90, textAlignVertical: 'top' }}
              />
              {historyLink && <AppChip label={`Share via QR/SHL: ${historyLink.qrHint}`} variant="neutral" />}
            </>
          )}
          {step === 3 && (
            <>
              <AppText variant="title" weight="bold" style={{ marginBottom: 6 }}>Consent & credential</AppText>
              <AppText>I authorize sharing my verified identity, coverage, and health history with the provider for this visit.</AppText>
              <AppText tone="muted" style={{ marginTop: 8 }}>
                Credential: {credential.issuer} · {credential.ial} · {credential.aal}
              </AppText>
              <AppText tone="muted">Passkey bound: {credential.passkeyBound ? 'Yes' : 'No'} · Status: {credential.status}</AppText>
              <AppChip label={`Consent captured: ${consented ? 'Yes' : 'No'}`} variant={consented ? 'success' : 'neutral'} style={{ marginTop: 8 }} />
              <AppButton title={consented ? 'Toggle to No' : 'Toggle to Yes'} variant="secondary" onPress={() => setConsented(!consented)} />
            </>
          )}
          <AppButton title={step === steps.length - 1 ? 'Submit Check-In' : 'Next'} onPress={next} />
        </AppCard>
      </View>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, maxWidth: 900, width: '100%', alignSelf: 'center' },
});
