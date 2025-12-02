import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

type Props = { label: string; active?: boolean; style?: ViewStyle };

// Minimal circle icon for tabs/buttons without external icon packs.
export default function CircleIcon({ label, active, style }: Props) {
  const { Colors } = useTheme();
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: active ? Colors.accent : Colors.surfaceAlt,
          borderColor: active ? Colors.accent : Colors.border,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: active ? '#fff' : Colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  text: { fontWeight: '700', fontSize: 12 },
});
