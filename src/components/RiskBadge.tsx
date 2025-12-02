import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

type Props = { level: 'normal' | 'prediabetes' | 'diabetes' };

export default function RiskBadge({ level }: Props) {
  const { Colors } = useTheme();
  const map = {
    normal: { label: 'Normal Risk', color: Colors.success },
    prediabetes: { label: 'Pre-Diabetic', color: Colors.warning },
    diabetes: { label: 'Diabetic', color: Colors.danger },
  } as const;
  const cfg = map[level];
  return (
    <View style={[styles.badge, { backgroundColor: cfg.color + '22', borderColor: cfg.color }]}>
      <Text style={{ color: cfg.color, fontWeight: '700' }}>{cfg.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 12, borderWidth: 1, alignSelf: 'flex-start' },
});
