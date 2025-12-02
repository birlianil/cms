import React, { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

export default function Card({ children }: PropsWithChildren) {
  const { Colors, Spacing } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: Colors.card, padding: Spacing.md, borderColor: Colors.border }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, marginVertical: 8, borderWidth: 1, shadowOpacity: 0.08, shadowRadius: 4, elevation: 1 },
});
