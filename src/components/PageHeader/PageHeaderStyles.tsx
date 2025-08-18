import { StyleSheet } from 'react-native';

import { colors, fontFamily } from '@/theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    marginBottom: 7,
    color: colors.black,
    fontFamily: fontFamily.bold,
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
  },
});

export default styles;
