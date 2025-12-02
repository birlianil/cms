import {
  Appointment,
  Coverage,
  DiabetesMetrics,
  DiscoveryApp,
  DigitalCredential,
  MedicareNotice,
  Patient,
  PrevisitData,
  SecurityChecklistItem,
  SmartHealthLink,
  Task,
  VisitSummary,
} from '../types/fhir';

const patient: Patient = { id: 'patient-1', name: 'Alex Patient', email: 'alex@demo.com', dob: '1985-04-02' };
const coverage: Coverage = { payer: 'Mock Health Plan', memberId: 'A123456789', group: 'GRP-42', effective: '2023-01-01' };
const appointments: Appointment[] = [
  { id: 'apt-1', date: '2024-07-20 09:00', location: 'Medrics Clinic - Boston', reason: 'Annual Physical', provider: 'Dr. Rivera' },
  { id: 'apt-2', date: '2024-08-05 14:00', location: 'Medrics Clinic - Boston', reason: 'Diabetes follow-up', provider: 'Dr. Rivera' },
];
const credential: DigitalCredential = {
  issuer: 'CMS-approved ID Provider (mock)',
  ial: 'IAL2-equivalent',
  aal: 'AAL2 (passkey)',
  passkeyBound: true,
  status: 'active',
  lastRefreshed: '2024-06-15',
};
const smartHealthLinks: SmartHealthLink[] = [
  {
    id: 'shl-card',
    label: 'Digital insurance card (FHIR Coverage)',
    url: 'https://demo.health/shl/card/abc',
    qrHint: 'QR-CARD-001',
    type: 'insurance',
  },
  {
    id: 'shl-history',
    label: 'Pre-visit health history (FHIR Condition/Allergy)',
    url: 'https://demo.health/shl/history/xyz',
    qrHint: 'QR-HX-442',
    type: 'history',
  },
  {
    id: 'shl-visit',
    label: 'Visit summary hand-back (FHIR Encounter/DocumentReference)',
    url: 'https://demo.health/shl/visit/enc',
    qrHint: 'QR-VISIT-220',
    type: 'visit',
  },
];
const medicareNotices: MedicareNotice[] = [
  { id: 'mc-1', title: 'New Explanation of Benefits posted', type: 'EOB', date: '2024-07-01', action: 'View in Medicare.gov', read: false },
  { id: 'mc-2', title: 'Fraud alert: confirm recent claims', type: 'Fraud Alert', date: '2024-06-28', action: 'Acknowledge', read: false },
  { id: 'mc-3', title: 'Wellness visit reminder', type: 'Notice', date: '2024-06-20', action: 'Schedule', read: true },
];
const discoveryApps: DiscoveryApp[] = [
  { id: 'app-1', name: 'Medrics Patient Demo', category: 'Kill the Clipboard', trial: 'Free for Medicare patients', cost: 'Included' },
  { id: 'app-2', name: 'Chronic Care Coach', category: 'Diabetes & Obesity', trial: '30-day trial', cost: '$8/mo after' },
  { id: 'app-3', name: 'CMS Assistant', category: 'Conversational AI', trial: 'Free with consent', cost: 'Covered for beneficiaries' },
];
const securityChecklist: SecurityChecklistItem[] = [
  { id: 'sc-1', label: 'HIPAA-aligned safeguards (demo mock)', status: 'complete' },
  { id: 'sc-2', label: 'Explicit consent captured for data exchange', status: 'complete' },
  { id: 'sc-3', label: 'Data exchange uses FHIR (mock)', status: 'complete' },
  { id: 'sc-4', label: 'Audit trail/logging (demo only)', status: 'pending' },
];

export function getPatientProfile(): Patient {
  return patient;
}

export function getUpcomingAppointments(): Appointment[] {
  return appointments;
}

export function getPrevisitData(): PrevisitData {
  return { demographics: patient, coverage, history: ['Hypertension', 'Seasonal allergies'] };
}

export function submitCheckIn(_payload: { appointmentId: string; answers: Record<string, string> }) {
  // In production integrate to CMS Aligned Network FHIR endpoint here
  return { success: true, confirmation: 'Check-in submitted' };
}

export function getVisitSummary(_appointmentId: string): VisitSummary {
  return {
    diagnoses: ['Z00.00 - General adult medical exam', 'E11.9 - Type 2 diabetes without complications'],
    instructions: ['Increase daily steps to 8k', 'Follow DASH diet guidance', 'Follow-up labs in 3 months'],
    medications: ['Metformin 500mg BID', 'Lisinopril 10mg daily'],
    followUps: ['A1c recheck: 3 months', 'Nutrition consult: schedule in portal'],
    visitLink: smartHealthLinks.find((l) => l.type === 'visit'),
  };
}

export function getDiabetesMetrics(): DiabetesMetrics {
  return { hba1c: 6.3, bmi: 31.2, weightTrend: [210, 208, 206, 205], bp: '128/82' };
}

export function getTasksForChronicCare(): Task[] {
  return [
    { id: 't1', title: 'Schedule A1c lab', due: '2024-08-01', status: 'open' },
    { id: 't2', title: 'Log meals 5 days this week', due: '2024-07-25', status: 'open' },
    { id: 't3', title: '30 min walk today', due: 'Today', status: 'open' },
  ];
}

export function getDigitalCredential(): DigitalCredential {
  return credential;
}

export function getSmartHealthLinks(): SmartHealthLink[] {
  return smartHealthLinks;
}

export function getMedicareNotices(): MedicareNotice[] {
  return medicareNotices;
}

export function getDiscoveryApps(): DiscoveryApp[] {
  return discoveryApps;
}

export function getSecurityChecklist(): SecurityChecklistItem[] {
  return securityChecklist;
}
