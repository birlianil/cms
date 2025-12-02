import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { useTheme } from '../theme';
import AppText from './AppText';

type Props = TextInputProps & {
  label?: string;
  helperText?: string;
  errorText?: string;
};

export default function AppInput({ label, helperText, errorText, style, ...rest }: Props) {
  const { Colors, Spacing, Radii } = useTheme();
  return (
    <View style={{ marginBottom: Spacing.md }}>
      {label && <AppText style={{ marginBottom: 6 }} weight="medium">{label}</AppText>}
      <TextInput
        style={[
          styles.input,
          {
            borderColor: errorText ? Colors.danger : Colors.border,
            backgroundColor: Colors.surface,
            borderRadius: Radii.md,
            padding: Spacing.md,
            color: Colors.textPrimary,
          },
          style,
        ]}
        placeholderTextColor={Colors.textMuted}
        {...rest}
      />
      {helperText && !errorText && <AppText tone="muted" variant="caption" style={{ marginTop: 4 }}>{helperText}</AppText>}
      {errorText && <AppText tone="danger" variant="caption" style={{ marginTop: 4 }}>{errorText}</AppText>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1 },
});
