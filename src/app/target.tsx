import { router } from "expo-router/build/exports";
import { View, Text, Button } from "react-native";

export default function Target() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Target!!!</Text>
      <Button
        title="Back"
        onPress={() => router.back()}
      />
    </View>
  )
}