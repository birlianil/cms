import { AIReturn } from '../types/fhir';

export function getAssistantReply(_context: any, message: string): AIReturn {
  const lower = message.toLowerCase();
  if (lower.includes('chest pain') || lower.includes('suicidal')) {
    return {
      message: 'This sounds urgent. Please call 911 or seek emergency care immediately. This app does not provide emergency services.',
      tag: 'Guidance',
      escalation: true,
    };
  }
  if (lower.includes('logistics') || lower.includes('appointment')) {
    return { message: 'Your next visit is on July 20 at 9:00 AM at Medrics Clinic - Boston. Arrive 10 minutes early for vitals.', tag: 'Guidance' };
  }
  if (lower.includes('diabetes') || lower.includes('hba1c')) {
    return { message: 'Your last A1c was 6.3%. Maintain balanced meals (plate method) and walk 30 minutes daily.', tag: 'Guidance' };
  }
  if (lower.includes('weight') || lower.includes('nutrition')) {
    return { message: 'Focus on lean protein, veggies, and whole grains. Small calorie deficit over weeks is safer than crash diets.', tag: 'Educational' };
  }
  return { message: 'I can help with visit prep, labs, meds, diabetes, weight, or scheduling. How can I assist?', tag: 'Educational' };
}
