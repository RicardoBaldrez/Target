import { router, useLocalSearchParams } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Transaction() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ID: {id}</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}
