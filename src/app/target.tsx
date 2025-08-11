import { View, Text, Button } from "react-native";
import { router } from "expo-router";

import { PageHeader } from "@/components/PageHeader";

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira."
      />
      <Button title="Back" onPress={() => router.back()} />
    </View>
  );
}
