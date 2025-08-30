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
import { useTransactionsDatabase } from '@/database/useTransactionsDatabase';
import { numberToCurrency } from '@/utils/numberToCurrency';
import { TransactionTypes } from '@/utils/TransactionTypes';

export default function InProgress() {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: '',
    current: 'R$ 0,00',
    target: 'R$ 0,00',
    percentage: 0,
  });
  const { id } = useLocalSearchParams<{ id: string }>();

  const { show } = useTargetDatabase();
  const { listTransactionsByTargetId } = useTransactionsDatabase();

  async function fetchTargetDetails() {
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

  async function fetchTransactions() {
    try {
      const response = await listTransactionsByTargetId(Number(id));

      setTransactions(
        response.map(item => {
          return {
            id: String(item.id),
            value: numberToCurrency(item.amount),
            date: String(item.created_at),
            description: item.observation,
            type:
              item.amount < 0
                ? TransactionTypes.Output
                : TransactionTypes.Input,
          };
        })
      );
    } catch (error) {
      console.log('🚀 ~ fetchTransactions ~ error:', error);
      Alert.alert('Erro', 'Não foi possível carregar as transações');
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchTargetDetails();
    const fetchTransactionsPromise = fetchTransactions();
    await Promise.all([fetchDetailsPromise, fetchTransactionsPromise]);
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
