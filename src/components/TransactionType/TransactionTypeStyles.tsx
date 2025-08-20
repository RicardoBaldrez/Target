import { StyleSheet } from 'react-native';

import { colors, fontFamily } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    height: 42,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: colors.gray[100],
  },
  option: {
    gap: 7,
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleOption: {
    fontSize: 14,
    color: colors.gray[500],
    fontFamily: fontFamily.medium,
  },
});
