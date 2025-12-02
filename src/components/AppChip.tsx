import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

type Variant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
type Props = { label: string; variant?: Variant; style?: ViewStyle };

export default function AppChip({ label, variant = 'neutral', style }: Props) {
  const { Colors, Spacing, Radii } = useTheme();

  const bgByVariant: Record<Variant, string> = {
    neutral: Colors.surfaceAlt,
    accent: Colors.primarySoft,
    success: '#E6F4EA',
    warning: '#FFF4E0',
    danger: '#FDECEC',
  };
  const textByVariant: Record<Variant, string> = {
    neutral: Colors.textSecondary,
    accent: Colors.accent,
    success: Colors.success,
    warning: Colors.warning,
    danger: Colors.danger,
  };

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: bgByVariant[variant],
          borderRadius: Radii.pill,
          paddingHorizontal: Spacing.sm,
          paddingVertical: Spacing.xs,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: textByVariant[variant] }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { alignSelf: 'flex-start' },
  text: { fontSize: 12, fontWeight: '600' },
});
