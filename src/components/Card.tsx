import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

type Props = PropsWithChildren<{ style?: ViewStyle }>;

export default function Card({ children, style }: Props) {
  const { Colors, Spacing, Radii, Shadows } = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: Colors.surface,
          padding: Spacing.lg,
          borderColor: Colors.border,
          borderRadius: Radii.md,
          ...Shadows.sm,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginVertical: 8, borderWidth: 1 },
});
