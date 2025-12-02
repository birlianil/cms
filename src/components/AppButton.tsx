import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

type Variant = 'primary' | 'secondary' | 'ghost';
type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
};

export default function AppButton({ title, onPress, variant = 'primary', disabled, style, fullWidth }: Props) {
  const { Colors, Spacing, Radii } = useTheme();

  const bgByVariant: Record<Variant, string> = {
    primary: Colors.accent,
    secondary: Colors.surface,
    ghost: 'transparent',
  };
  const textByVariant: Record<Variant, string> = {
    primary: '#FFFFFF',
    secondary: Colors.accent,
    ghost: Colors.accent,
  };
  const borderByVariant: Record<Variant, string> = {
    primary: Colors.accent,
    secondary: Colors.accent,
    ghost: 'transparent',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      disabled={disabled}
      style={[
        styles.base,
        {
          backgroundColor: bgByVariant[variant],
          borderColor: borderByVariant[variant],
          opacity: disabled ? 0.5 : 1,
          borderWidth: variant === 'ghost' ? 0 : 1,
          paddingVertical: Spacing.sm,
          paddingHorizontal: Spacing.lg,
          borderRadius: Radii.md,
        },
        fullWidth ? { alignSelf: 'stretch' } : {},
        style,
      ]}
    >
      <Text style={[styles.text, { color: textByVariant[variant] }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  text: { fontWeight: '700', fontSize: 15 },
});
