/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
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
  const { create, show, update, remove } = useTargetDatabase();

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert('Atenção', 'Preencha todos os campos');
    }

    setIsProcessing(true);

    if (params.id) {
      handleUpdateTarget();
    } else {
      handleCreateTarget();
    }
  }

  async function handleUpdateTarget() {
    try {
      await update({ id: Number(params.id), name, amount });
      Alert.alert('Sucesso', 'Meta atualizada com sucesso!', [
        {
          text: 'Ok',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.log('🚀 ~ handleUpdateTarget ~ error:', error);
      Alert.alert('Não', 'Não foi possível atualizar a meta');
    } finally {
      setIsProcessing(false);
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

  async function handleDeleteTarget() {
    if (!params.id) {
      return;
    }

    Alert.alert('Remover', 'Deseja realmente remover?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: deleteTarget },
    ]);
  }

  async function deleteTarget() {
    try {
      setIsProcessing(true);

      await remove(Number(params.id));
      Alert.alert('Sucesso', 'Meta removida com sucesso!', [
        {
          text: 'Ok',
          onPress: () => router.replace('/'),
        },
      ]);
    } catch (error) {
      console.log('🚀 ~ remove ~ error:', error);
      Alert.alert('Erro', 'Não foi possível remover a meta.');
    } finally {
      setIsProcessing(false);
    }
  }

  async function fetchDetails(id: number) {
    try {
      const response = await show(id);
      setName(response.name);
      setAmount(response.amount);
    } catch (error) {
      console.log('🚀 ~ fetchDetails ~ error:', error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes da meta.');
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchDetails(Number(params.id));
    }
  }, [params.id]);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira."
        rightButton={
          params.id
            ? { icon: 'delete', onPress: handleDeleteTarget }
            : undefined
        }
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
