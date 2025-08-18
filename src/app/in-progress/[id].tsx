import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { Button } from '@/components/Button';
import { List } from '@/components/List';
import { PageHeader } from '@/components/PageHeader';
import { Progress } from '@/components/Progress';
import { Transaction, TransactionProps } from '@/components/Transaction';
import { TransactionTypes } from '@/utils/TransactionTypes';

const details = {
  current: 'R$ 580,00',
  target: 'R$ 1.790,00,00',
  percentage: 20,
};

const transactions: TransactionProps[] = [
  {
    id: '1',
    value: 'R$ 300,00',
    date: '12/04/25',
    description: 'Compra de Apple Watch',
    type: TransactionTypes.Input,
  },
  {
    id: '2',
    value: 'R$ 20,00',
    date: '12/04/25',
    type: TransactionTypes.Output,
  },
];

export default function InProgress() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Apple Watch"
        rightButton={{
          icon: 'edit',
          onPress: () => {},
        }}
      />
      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => () => {}} />
        )}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu dinheiro aqui."
      />
      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${id}`)}
      />
    </View>
  );
}
