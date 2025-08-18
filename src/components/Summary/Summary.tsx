import { MaterialIcons } from '@expo/vector-icons';
import { ColorValue, Text, View } from 'react-native';

import { styles } from './SummaryStyles';

export type SummaryProps = {
  label: string;
  value: string;
};

type Props = {
  data: SummaryProps;
  icon: {
    color: ColorValue;
    name: keyof typeof MaterialIcons.glyphMap;
  };
  isLeft?: boolean;
};

export function Summary({ data, icon, isLeft = false }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.header, isLeft && { justifyContent: 'flex-end' }]}>
        <MaterialIcons size={16} name={icon.name} color={icon.color} />
        <Text style={styles.label}>{data.label}</Text>
      </View>

      <Text style={styles.value}>{data.value}</Text>
    </View>
  );
}
