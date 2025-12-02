import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme';

type Props = PropsWithChildren<{ padded?: boolean }>;

// Centers content with consistent padding and max width for web.
export default function ScreenContainer({ children, padded = true }: Props) {
  const { Colors, Spacing } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: padded ? Spacing.md : 0,
          paddingVertical: Spacing.md,
          width: '100%',
          maxWidth: 960,
          alignSelf: 'center',
        }}
      >
        {children}
      </View>
    </View>
  );
}
