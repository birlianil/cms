import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import ChatBubble from '../components/ChatBubble';
import AppButton from '../components/AppButton';
import AppCard from '../components/AppCard';
import AppText from '../components/AppText';
import AppChip from '../components/AppChip';
import { getAssistantReply } from '../services/mockAIService';
import { ChatMessage, getChatMessages, setChatMessages } from '../services/mockState';
import { useTheme } from '../theme';
import ScreenContainer from '../components/ScreenContainer';
import AppHeader from '../components/AppHeader';

export default function AIAssistantScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(getChatMessages());
  const { Colors, Spacing } = useTheme();

  useEffect(() => {
    setMessages(getChatMessages());
  }, []);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', text: input };
    const ai = getAssistantReply({}, input);
    const aiMsg: ChatMessage = { id: `a-${Date.now()}`, role: 'assistant', text: ai.message, tag: ai.tag, escalation: ai.escalation };
    setMessages((prev) => {
      const next = [...prev, userMsg, aiMsg];
      setChatMessages(next);
      return next;
    });
    setInput('');
  };

  return (
    <ScreenContainer padded={false}>
      <AppHeader title="Assistant" subtitle="Ask about visits, care plans, diabetes, weight." />
      <View style={[styles.banner, { backgroundColor: Colors.primarySoft }]}>
        <AppText tone="accent" weight="bold" style={styles.bannerText}>AI-generated. Not medical advice. Escalate to clinicians when unsure.</AppText>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => (
          <View style={styles.messageRow}>
            <ChatBubble role={item.role} text={item.text} tag={item.tag} />
            {item.escalation && <AppText tone="danger" weight="bold" style={styles.escalation}>Urgent care recommended.</AppText>}
          </View>
        )}
        contentContainerStyle={{ padding: 16, paddingBottom: 140, maxWidth: 900, width: '100%', alignSelf: 'center' }}
      />
      <View style={[styles.inputContainer, { backgroundColor: Colors.surface, borderTopColor: Colors.border }]}>
        <View style={{ maxWidth: 900, width: '100%', alignSelf: 'center' }}>
          <AppCard>
            <AppText weight="medium" style={styles.prompt}>Topics: logistics, care plan, diabetes, weight</AppText>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.sm }}>
              <AppChip label="Visit logistics" variant="neutral" />
              <AppChip label="Care plan" variant="neutral" />
              <AppChip label="Diabetes/weight" variant="neutral" />
            </View>
            <TextInput
              style={[styles.input, { borderColor: Colors.border, color: Colors.textPrimary, backgroundColor: Colors.surface }]}
              placeholder="Type a question..."
              placeholderTextColor={Colors.textMuted}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={send}
              returnKeyType="send"
            />
            <AppButton title="Send" onPress={send} />
          </AppCard>
        </View>
      </View>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  banner: { padding: 12 },
  bannerText: { textAlign: 'center' },
  prompt: { marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 8 },
  escalation: { marginLeft: 12, marginBottom: 8 },
  inputContainer: { padding: 16, borderTopWidth: 1 },
  messageRow: { width: '100%', alignItems: 'stretch', maxWidth: 900, alignSelf: 'center' },
});
