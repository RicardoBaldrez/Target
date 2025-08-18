import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import { styles } from './ButtonStyles';

import { colors } from '@/theme';

type Props = TouchableOpacityProps & {
  title?: string;
  isProcessing?: boolean;
};

export function Button({ title, isProcessing = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      disabled={isProcessing}
      {...rest}
    >
      <Text style={styles.title}>
        {isProcessing ? (
          <ActivityIndicator color={colors.white} size="small" />
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  );
}
