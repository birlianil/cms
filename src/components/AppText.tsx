import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

type Variant = 'heading' | 'title' | 'subtitle' | 'body' | 'caption' | 'overline';
type Tone = 'primary' | 'secondary' | 'muted' | 'accent' | 'danger' | 'success';

type Props = TextProps & { variant?: Variant; tone?: Tone; weight?: 'regular' | 'medium' | 'bold' };

export default function AppText({ children, variant = 'body', tone = 'primary', weight = 'regular', style, ...rest }: Props) {
  const { Colors, Typography } = useTheme();

  const sizeByVariant: Record<Variant, number> = {
    heading: Typography.heading,
    title: Typography.title,
    subtitle: Typography.subtitle,
    body: Typography.body,
    caption: Typography.caption,
    overline: Typography.overline,
  };

  const colorByTone: Record<Tone, string> = {
    primary: Colors.textPrimary,
    secondary: Colors.textSecondary,
    muted: Colors.textMuted,
    accent: Colors.accent,
    danger: Colors.danger,
    success: Colors.success,
  };

  const weightMap: Record<'regular' | 'medium' | 'bold', string> = {
    regular: Typography.weightRegular,
    medium: Typography.weightMedium,
    bold: Typography.weightBold,
  };

  return (
    <Text
      style={[
        styles.text,
        {
          fontSize: sizeByVariant[variant],
          color: colorByTone[tone],
          fontWeight: weightMap[weight],
          textTransform: variant === 'overline' ? 'uppercase' : 'none',
          letterSpacing: variant === 'overline' ? 0.5 : undefined,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: { lineHeight: 22 },
});
