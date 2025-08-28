/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */

import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, View } from 'react-native';

import { TransactionTypes } from '../../utils/TransactionTypes';

import { Button } from '@/components/Button';
import { CurrencyInput } from '@/components/CurrencyInput';
import { Input } from '@/components/Input';
import { PageHeader } from '@/components/PageHeader';
import { TransactionType } from '@/components/TransactionType';
import { useTransactionsDatabase } from '@/database/useTransactionsDatabase';

export default function Transaction() {
  const [amount, setAmount] = useState(0);
  const [observation, setObservation] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedType, setSelectedType] = useState(TransactionTypes.Input);

  const { id } = useLocalSearchParams<{ id: string }>();
  const { create } = useTransactionsDatabase();

  async function handleCreateTransaction() {
    try {
      if (amount <= 0) {
        return Alert.alert('Atenção', 'Preencha o valor da transação');
      }

      setIsCreating(true);

      await create({
        target_id: Number(id),
        amount: selectedType === TransactionTypes.Output ? amount * -1 : amount,
        observation,
      });

      Alert.alert('Sucesso!', 'Transação criada com sucesso!', [
        {
          text: 'Ok',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.log('🚀 ~ handleCreateTransaction ~ error:', error);
      Alert.alert('Erro ao criar transação', 'Tente novamente mais tarde');
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={selectedType} onChange={setSelectedType} />
        <CurrencyInput
          value={amount}
          label="Valor (R$)"
          onChangeValue={setAmount}
        />
        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDP de 110% no banco XPTO"
          value={observation}
          onChangeText={setObservation}
        />
        <Button
          title="Salvar"
          isProcessing={isCreating}
          onPress={handleCreateTransaction}
        />
      </View>
    </View>
  );
}
