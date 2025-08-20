import { MaterialIcons } from '@expo/vector-icons';
import { ColorValue, Pressable, PressableProps, Text } from 'react-native';

import { styles } from '../TransactionTypeStyles';

import { colors } from '@/theme';

type Props = PressableProps & {
  isSelected: boolean;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  selectedColor: ColorValue;
};

export function Option({
  icon,
  title,
  isSelected,
  selectedColor,
  ...rest
}: Props) {
  return (
    <Pressable
      style={[styles.option, isSelected && { backgroundColor: selectedColor }]}
      {...rest}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={isSelected ? colors.white : colors.gray[500]}
      />
      <Text style={[styles.titleOption, isSelected && { color: colors.white }]}>
        {title}
      </Text>
    </Pressable>
  );
}
