import { Patient } from '../types/fhir';

let currentUser: Patient | null = null;

export function signInWithEmail(email: string): Patient {
  currentUser = { id: 'patient-1', name: 'Alex Patient', email, dob: '1985-04-02' };
  return currentUser;
}

export function signInWithDigitalID(): Patient {
  currentUser = { id: 'patient-1', name: 'Alex Patient', email: 'alex@demo.com', dob: '1985-04-02' };
  return currentUser;
}

export function getCurrentUser() {
  return currentUser;
}
