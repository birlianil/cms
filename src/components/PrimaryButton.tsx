import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

type Props = { title: string; onPress: () => void; variant?: 'primary' | 'secondary'; disabled?: boolean };

// Backwards-compatible button; prefer AppButton for new work.
export default function PrimaryButton({ title, onPress, variant = 'primary', disabled }: Props) {
  const { Colors, Spacing, Radii } = useTheme();
  const isPrimary = variant === 'primary';
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isPrimary ? Colors.accent : Colors.surface,
          borderColor: Colors.accent,
          opacity: disabled ? 0.6 : 1,
          borderRadius: Radii.md,
          paddingVertical: Spacing.sm,
          paddingHorizontal: Spacing.lg,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity: 0.9
    >
      <Text style={[styles.text, { color: isPrimary ? '#fff' : Colors.accent }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { marginVertical: 6, borderWidth: 1, alignItems: 'center' },
  text: { fontWeight: '700', fontSize: 15 },
});
