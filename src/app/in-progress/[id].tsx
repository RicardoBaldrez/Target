/* eslint-disable no-undef */
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, View } from 'react-native';

import { Button } from '@/components/Button';
import { List } from '@/components/List';
import { Loading } from '@/components/Loading';
import { PageHeader } from '@/components/PageHeader';
import { Progress } from '@/components/Progress';
import { Transaction, TransactionProps } from '@/components/Transaction';
import { useTargetDatabase } from '@/database/useTargetDatabase';
import { numberToCurrency } from '@/utils/numberToCurrency';
import { TransactionTypes } from '@/utils/TransactionTypes';

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
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: '',
    current: 'R$ 0,00',
    target: 'R$ 0,00',
    percentage: 0,
  });
  const { id } = useLocalSearchParams<{ id: string }>();

  const { show } = useTargetDatabase();

  async function fetchDetails() {
    try {
      const response = await show(Number(id));

      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      });
    } catch (error) {
      console.log('🚀 ~ fetchDetails ~ error:', error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes da meta');
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails();
    await Promise.all([fetchDetailsPromise]);
    setIsFetching(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={details.name}
        rightButton={{
          icon: 'edit',
          onPress: () => router.navigate(`/target?id=${id}`),
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
