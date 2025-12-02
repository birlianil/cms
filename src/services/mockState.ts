// Simple in-memory state to persist session data across screens (demo-only).
// Replace with secure storage/state management when wiring real backends.

export type ChatMessage = { id: string; role: 'user' | 'assistant'; text: string; tag?: 'Educational' | 'Guidance'; escalation?: boolean };

type Trackers = { walked: boolean; meals: boolean };

const initialChat: ChatMessage[] = [
  { id: 'm0', role: 'assistant', text: 'Hi! I can help with visit prep, diabetes, weight, and logistics. What do you need?', tag: 'Educational' },
];

let chatMessages: ChatMessage[] = initialChat;
let trackers: Trackers = { walked: false, meals: false };

export function getChatMessages() {
  return chatMessages;
}

export function setChatMessages(next: ChatMessage[]) {
  chatMessages = next;
}

export function getTrackers(): Trackers {
  return trackers;
}

export function setTrackers(next: Trackers) {
  trackers = next;
}
