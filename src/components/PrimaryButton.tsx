import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

type Props = { title: string; onPress: () => void; variant?: 'primary' | 'secondary'; disabled?: boolean };

export default function PrimaryButton({ title, onPress, variant = 'primary', disabled }: Props) {
  const { Colors } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: variant === 'primary' ? Colors.primary : Colors.secondary, opacity: disabled ? 0.6 : 1 },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { padding: 14, borderRadius: 10, marginVertical: 6 },
  text: { color: '#fff', fontWeight: '600', textAlign: 'center' },
});
