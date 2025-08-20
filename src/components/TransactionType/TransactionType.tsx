import { View } from 'react-native';

import { Option } from './Option';
import { styles } from './TransactionTypeStyles';

import { colors } from '@/theme';
import { TransactionTypes } from '@/utils/TransactionTypes';

type Props = {
  selected: TransactionTypes;
  // eslint-disable-next-line no-unused-vars
  onChange: (type: TransactionTypes) => void;
};

export function TransactionType({ selected, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Option
        title="Guardar"
        icon="arrow-upward"
        selectedColor={colors.blue[500]}
        isSelected={selected === TransactionTypes.Input}
        onPress={() => onChange(TransactionTypes.Input)}
      />
      <Option
        title="Resgatar"
        icon="arrow-downward"
        selectedColor={colors.red[400]}
        isSelected={selected === TransactionTypes.Output}
        onPress={() => onChange(TransactionTypes.Output)}
      />
    </View>
  );
}
