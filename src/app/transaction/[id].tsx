/* eslint-disable react-native/no-inline-styles */

// import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { TransactionTypes } from '../../utils/TransactionTypes';

import { Button } from '@/components/Button';
import { CurrencyInput } from '@/components/CurrencyInput';
import { Input } from '@/components/Input';
import { PageHeader } from '@/components/PageHeader';
import { TransactionType } from '@/components/TransactionType';

export default function Transaction() {
  const [selectedType, setSelectedType] = useState(TransactionTypes.Input);

  // const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={selectedType} onChange={setSelectedType} />
        <CurrencyInput value={0} label="Valor (R$)" />
        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDP de 110% no banco XPTO"
        />
        <Button title="Salvar" />
      </View>
    </View>
  );
}
