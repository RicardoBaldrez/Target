import { Text, TextInput, TextInputProps, View } from 'react-native';

import { styles } from './InputStyles';

import { colors } from '@/theme';

type Props = TextInputProps & {
  label: string;
};

export function Input({ label, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...rest}
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
      />
    </View>
  );
}
