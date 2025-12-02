import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Card from '../../components/Card';
import PrimaryButton from '../../components/PrimaryButton';
import { getDigitalCredential, getPrevisitData, getSmartHealthLinks, submitCheckIn } from '../../services/mockFHIRService';

const steps = ['Demographics', 'Insurance + Digital Card', 'History', 'Consent & Credential'];

export default function CheckInWizardScreen({ navigation, route }: any) {
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
    <View style={styles.container}>
      <Text style={styles.progress}>Step {step + 1} of {steps.length}: {steps[step]}</Text>
      <Card>
        {step === 0 && (
          <>
            <Text style={styles.title}>Demographics (FHIR: Patient)</Text>
            <Text>Name: {pre.demographics.name}</Text>
            <Text>DOB: {pre.demographics.dob}</Text>
            <Text>Email: {pre.demographics.email}</Text>
          </>
        )}
        {step === 1 && (
          <>
            <Text style={styles.title}>Insurance (FHIR: Coverage)</Text>
            <Text>Payer: {pre.coverage.payer}</Text>
            <Text>Member ID: {pre.coverage.memberId}</Text>
            <Text>Group: {pre.coverage.group}</Text>
            <Text style={styles.hint}>Digital insurance card QR: {insuranceLink?.qrHint}</Text>
            <Text style={styles.hint}>Smart Health Link: {insuranceLink?.url}</Text>
          </>
        )}
        {step === 2 && (
          <>
            <Text style={styles.title}>Health History (FHIR: Condition)</Text>
            <TextInput
              style={styles.input}
              value={historyNotes}
              onChangeText={setHistoryNotes}
              multiline
              placeholder="Update conditions/allergies"
            />
            <Text style={styles.hint}>Share via QR/SHL: {historyLink?.qrHint}</Text>
          </>
        )}
        {step === 3 && (
          <>
            <Text style={styles.title}>Consent & credential</Text>
            <Text>I authorize sharing my verified identity, coverage, and health history with the provider for this visit.</Text>
            <Text style={[styles.hint, { marginTop: 8 }]}>Credential: {credential.issuer} · {credential.ial} · {credential.aal}</Text>
            <Text style={styles.hint}>Passkey bound: {credential.passkeyBound ? 'Yes' : 'No'} · Status: {credential.status}</Text>
            <Text style={{ marginTop: 10 }}>Consent captured: {consented ? 'Yes' : 'No'}</Text>
            <PrimaryButton title={consented ? 'Toggle to No' : 'Toggle to Yes'} variant="secondary" onPress={() => setConsented(!consented)} />
          </>
        )}
        <PrimaryButton title={step === steps.length - 1 ? 'Submit Check-In' : 'Next'} onPress={next} />
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  progress: { marginBottom: 12, fontWeight: '600' },
  title: { fontWeight: '700', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12, minHeight: 80, marginVertical: 8 },
  hint: { color: '#6B7280', marginTop: 6 },
});
