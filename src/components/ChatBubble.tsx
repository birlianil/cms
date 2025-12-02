import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

type Props = { role: 'user' | 'assistant'; text: string; tag?: 'Educational' | 'Guidance' };

export default function ChatBubble({ role, text, tag }: Props) {
  const { Colors } = useTheme();
  const isUser = role === 'user';
  return (
    <View style={[styles.container, { alignSelf: isUser ? 'flex-end' : 'flex-start' }]}>
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isUser ? Colors.primary : Colors.card,
            borderColor: Colors.border,
          },
        ]}
      >
        {!!tag && <Text style={[styles.tag, { color: Colors.secondary }]}>{tag}</Text>}
        <Text style={{ color: isUser ? '#fff' : Colors.text }}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 4, maxWidth: '80%' },
  bubble: { padding: 12, borderRadius: 12, borderWidth: 1 },
  tag: { fontSize: 12, fontWeight: '700', marginBottom: 4 },
});
