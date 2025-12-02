import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from './AppText';
import { useTheme } from '../theme';

type Props = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

export default function AppHeader({ title, subtitle, action }: Props) {
  const { Spacing } = useTheme();
  return (
    <View style={[styles.container, { marginBottom: Spacing.md }]}>
      <View style={{ flex: 1 }}>
        <AppText variant="heading" weight="bold">{title}</AppText>
        {subtitle && <AppText tone="muted">{subtitle}</AppText>}
      </View>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
});
