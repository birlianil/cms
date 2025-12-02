# Medrics Patient Demo (CMS Patient Facing Apps)

Demo-only React Native (Expo + TypeScript) app showing CMS Patient Facing Apps concepts:
- Kill the Clipboard (digital check-in, digital insurance card, visit summary via mock FHIR)
- Conversational AI assistant with disclaimers and escalation
- Diabetes & Obesity prevention/management dashboard with coaching and tracking

## Prereqs
- Node 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`) optional if you prefer `npx expo start`

## Install & Run
```
cd medrics-patient-demo
npm install
npx expo start
```
Scan the QR with Expo Go or run on simulator (`i` for iOS, `a` for Android`). If you start from the parent directory, you can also run `npx expo start --project-root medrics-patient-demo`.

## SDK Compatibility
- This project targets Expo SDK 54 to match current Expo Go from the App Store. If you previously installed dependencies for an older SDK, run `rm -rf node_modules package-lock.json` (or `yarn.lock`) and reinstall.

## Notes / Disclaimers
- Mock data only; no real PHI; no real CMS/EHR connectivity.
- Mock identity (fake mDL/passkey); intended to show HIPAA/CMS-aligned architecture, not production compliance.
- AI assistant is rules-based; not a real LLM; not medical advice.

## Demo Script (5–10 min)
- Launch app → Sign in screen: show fake email entry and “digital ID” mock credential → Accept consent to connect to CMS Aligned Network (mock).
- Home: highlight next appointment card; tap “Start digital check-in”.
- Kill the Clipboard: select upcoming visit → run wizard (demographics, insurance, history, consent) → submit → “I’m here” arrival → Visit Summary shows diagnoses, instructions, meds, follow-ups.
- AI Assistant tab: ask “What’s my next appointment?” (guidance reply). Ask “Chest pain right now?” to trigger escalation banner. Note disclaimer bar.
- Diabetes & Obesity tab: show HbA1c/BMI metrics, risk badge (pre-diabetic), tasks, coaching cards, toggle “Walked 30 min”.
- Settings: reinforce demo-only, no medical advice, no real CMS/EHR link.
