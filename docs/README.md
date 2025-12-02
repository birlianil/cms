# CMS Patient Facing App Demo – Architecture & Flows

This doc summarizes the design, flows, and architecture for the CMS Patient Facing Apps demo. All data is mocked; no real PHI or network calls.

## Section A – High-Level Design & User Flows
- **Concept**: Medrics-style patient app demonstrating CMS Patient Facing Apps: Kill the Clipboard, Conversational AI Assistant, Diabetes & Obesity.
- **Navigation**: Auth (SignIn → DigitalID → Consent) → Main Tabs: Home, Check-In (KillTheClipboard stack), CMS, Assistant, Diabetes, Settings.
- **Kill the Clipboard flow**: Home → Check-In → pick appointment → Wizard (Demographics → Insurance+SHL → History → Consent+Credential) → Arrival (“I’m here”) → Visit Summary (SHL hand-back).
- **Conversational AI flow**: Assistant tab → disclaimer visible → ask questions → tagged responses (Educational/Guidance) → escalation banner on risky terms (e.g., “chest pain”).
- **Diabetes/Obesity flow**: Diabetes tab → metrics (HbA1c, BMI, BP, weight trend) → risk badge → tasks → coaching by risk → daily trackers.
- **CMS connectivity**: CMS tab → digital credential (IAL2/AAL2 mock) → Smart Health Links/QRs (insurance, history, visit) → Medicare notices (EOB/fraud) → discovery/trial cards → security checklist.
- **Settings**: Demo/legal disclaimers; trial/discovery statements.

## Section B – Architecture & Project Setup
- **Stack**: Expo SDK 54, React Navigation, TypeScript, hand-rolled UI components, SafeAreaProvider + ThemeProvider (`src/theme`).
- **State**: Local component state; mock services (`src/services`) simulate CMS Aligned Network/FHIR.
- **Folder structure**: `App.tsx`, `src/navigation`, `src/screens`, `src/components`, `src/services`, `src/theme`, `src/types`, `docs`.
- **Key deps**: `expo`, `react-native`, `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`, `react-native-safe-area-context`, `react-native-screens`, `react-native-svg`, `typescript`, `eslint-config-expo`.
- **App bootstrap**: `App.tsx` → `ThemeProvider` → `NavigationContainer` → `RootNavigator`.

## Section C – Core Screens (code refs)
- **Auth / Identity**: `src/screens/Identity/SignInScreen.tsx`, `DigitalIDScreen.tsx`, `ConsentScreen.tsx`.
- **Kill the Clipboard**: `src/screens/KillClipboard/AppointmentListScreen.tsx`, `CheckInWizardScreen.tsx`, `ArrivalScreen.tsx`, `VisitSummaryScreen.tsx`.
- **Assistant**: `src/screens/AIAssistantScreen.tsx` (disclaimer, tags, escalation).
- **Diabetes & Obesity**: `src/screens/DiabetesDashboardScreen.tsx`.
- **CMS connectivity**: `src/screens/MedicareConnectivityScreen.tsx`.
- **Home**: `src/screens/HomeScreen.tsx`; **Settings**: `src/screens/SettingsScreen.tsx`.
- **Navigation**: `src/navigation/RootNavigator.tsx`.

## Section D – Services, Types & Mock Data
- **Types**: `src/types/fhir.ts` (Patient, Coverage, Appointment, VisitSummary+SmartHealthLink, Tasks, DigitalCredential, MedicareNotice, etc.).
- **Auth service**: `src/services/mockAuthService.ts` (signInWithEmail, signInWithDigitalID, getCurrentUser).
- **FHIR service**: `src/services/mockFHIRService.ts` (patient profile, appointments, previsit data, check-in submit, visit summary with SHL hand-back, diabetes metrics, tasks, credential, Smart Health Links, Medicare notices, discovery apps, security checklist).
- **AI service**: `src/services/mockAIService.ts` (rule-based replies, escalation on risky terms).

## Section E – Theming & Reusable Components
- **Theme**: `src/theme/tokens.ts`, `src/theme/index.tsx` (primary color, spacing).
- **Components**: `Card`, `PrimaryButton`, `ChatBubble`, `RiskBadge`, `SectionHeader` in `src/components`.

## Section F – README & Demo Script
- **Usage**: See `README.md` for setup (`npm install`, `npm run web`), disclaimers, and a 5–10 minute demo script covering identity → Kill the Clipboard → Assistant → Diabetes → Settings.

## Integration Notes (demo-only)
- Identity/credentials are mocked; replace with CMS-approved IAL2/AAL2 provider + passkeys.
- Data exchange is mocked; integrate real FHIR endpoints via CMS Aligned Network and Smart Health Links/QR flows.
- AI is rule-based; replace with a compliant inference service and PHI-safe routing.
- HIPAA/CMS alignment is architectural only; no claim of production compliance.
