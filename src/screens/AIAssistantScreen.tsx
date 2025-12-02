import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import ChatBubble from '../components/ChatBubble';
import PrimaryButton from '../components/PrimaryButton';
import Card from '../components/Card';
import { getAssistantReply } from '../services/mockAIService';

type Message = { id: string; role: 'user' | 'assistant'; text: string; tag?: 'Educational' | 'Guidance'; escalation?: boolean };

export default function AIAssistantScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm0', role: 'assistant', text: 'Hi! I can help with visit prep, diabetes, weight, and logistics. What do you need?', tag: 'Educational' },
  ]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', text: input };
    const ai = getAssistantReply({}, input);
    const aiMsg: Message = { id: `a-${Date.now()}`, role: 'assistant', text: ai.message, tag: ai.tag, escalation: ai.escalation };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>AI-generated. Not medical advice. Escalate to clinicians when unsure.</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => (
          <View>
            <ChatBubble role={item.role} text={item.text} tag={item.tag} />
            {item.escalation && <Text style={styles.escalation}>Urgent care recommended.</Text>}
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
      <Card>
        <Text style={styles.prompt}>Topics: logistics, care plan, diabetes, weight</Text>
        <TextInput
          style={styles.input}
          placeholder="Type a question..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={send}
          returnKeyType="send"
        />
        <PrimaryButton title="Send" onPress={send} />
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  banner: { backgroundColor: '#FEF3C7', padding: 10 },
  bannerText: { color: '#92400E', textAlign: 'center', fontWeight: '600' },
  prompt: { marginBottom: 6, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12, marginBottom: 8 },
  escalation: { color: '#DC2626', marginLeft: 12, marginBottom: 8, fontWeight: '700' },
});
