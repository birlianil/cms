import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import AppText from './AppText';

type Props = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
  headerRight?: React.ReactNode;
}>;

export default function AppCard({ title, subtitle, headerRight, children, style }: Props) {
  const { Colors, Spacing, Radii, Shadows } = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: Colors.surface,
          borderColor: Colors.border,
          padding: Spacing.lg,
          borderRadius: Radii.md,
          ...Shadows.sm,
        },
        style,
      ]}
    >
      {(title || subtitle || headerRight) && (
        <View style={[styles.header, { marginBottom: Spacing.sm }]}>
          <View style={{ flex: 1 }}>
            {title && <AppText variant="subtitle" weight="bold">{title}</AppText>}
            {subtitle && <AppText tone="muted">{subtitle}</AppText>}
          </View>
          {headerRight}
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginVertical: 8, borderWidth: 1 },
  header: { flexDirection: 'row', alignItems: 'center' },
});
