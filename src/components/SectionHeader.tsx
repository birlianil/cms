import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

type Props = { title: string; subtitle?: string };

export default function SectionHeader({ title, subtitle }: Props) {
  const { Colors, Typography } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: Colors.textPrimary, fontSize: Typography.subtitle }]}>{title}</Text>
      {subtitle && <Text style={{ color: Colors.textMuted }}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({ container: { marginTop: 8, marginBottom: 4 }, title: { fontWeight: '700' } });
