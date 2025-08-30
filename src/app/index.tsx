/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, StatusBar, View } from 'react-native';

import { Loading } from '../components/Loading';
import { useTransactionsDatabase } from '../database/useTransactionsDatabase';

import { Button } from '@/components/Button';
import { HomeHeader, HomeHeaderProps } from '@/components/HomeHeader';
import { List } from '@/components/List';
import { Target, TargetProps } from '@/components/Target';
import { useTargetDatabase } from '@/database/useTargetDatabase';
import { numberToCurrency } from '@/utils/numberToCurrency';

export default function Index() {
  const [isFetching, setIsFetching] = useState(true);
  const [summaryValues, setSummaryValues] = useState<HomeHeaderProps>();
  const [targets, setTargets] = useState<TargetProps[]>([]);
  const { listByClosestTarget } = useTargetDatabase();
  const { summary } = useTransactionsDatabase();

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await listByClosestTarget();

      return response.map(item => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: item.percentage.toFixed(0) + '%',
        target: numberToCurrency(item.amount),
      }));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as metas');
      console.log(error);
    }
  }

  async function fetchSummary(): Promise<HomeHeaderProps> {
    try {
      const response = await summary();
      return {
        total: numberToCurrency(response.input + response.output),
        input: { label: 'Entradas', value: numberToCurrency(response.input) },
        output: { label: 'Saídas', value: numberToCurrency(response.output) },
      };
    } catch (error) {
      console.log('🚀 ~ fetchSummary ~ error:', error);
      Alert.alert('Erro', 'Não foi possível carregar o resumo');
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();
    const summaryDataPromise = fetchSummary();

    const [targetData, summaryData] = await Promise.all([
      targetDataPromise,
      summaryDataPromise,
    ]);

    setTargets(targetData);
    setSummaryValues(summaryData);
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
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={summaryValues} />
      <List
        title="Metas"
        data={targets}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        emptyMessage="Nenhuma meta cadastrada"
        containerStyle={{ paddingHorizontal: 24 }}
      />
      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button
          title="Adicionar Meta"
          onPress={() => router.navigate('/target')}
        />
      </View>
    </View>
  );
}
