/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, View } from 'react-native';

import { Button } from '@/components/Button';
import { CurrencyInput } from '@/components/CurrencyInput';
import { Input } from '@/components/Input';
import { PageHeader } from '@/components/PageHeader';
import { useTargetDatabase } from '@/database/useTargetDatabase';

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);

  const params = useLocalSearchParams<{ id?: string }>();
  const { create } = useTargetDatabase();

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert('Atenção', 'Preencha todos os campos');
    }

    setIsProcessing(true);

    if (params.id) {
      console.log('update');
    } else {
      handleCreateTarget();
    }
  }

  async function handleCreateTarget() {
    try {
      await create({ name, amount });

      Alert.alert('Sucesso', 'Meta criada com sucesso!', [
        {
          text: 'Ok',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar meta.');
      console.log('🚀 ~ handleCreateTarget ~ error:', error);
      setIsProcessing(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira."
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para a praia, Apple Watch"
          value={name}
          onChangeText={setName}
        />
        <CurrencyInput
          label="Valor do alvo (R$)"
          value={amount}
          onChangeValue={setAmount}
        />
        <Button
          title="Salvar"
          onPress={handleSave}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  );
}
