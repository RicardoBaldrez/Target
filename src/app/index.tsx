import { router } from "expo-router/build/exports";
import { View, Text, Button } from "react-native";


export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Init Expo Router</Text>
      <Button
        title="Target"
        onPress={() => router.navigate("/target")}
      />
      <Button
        title="Transaction"
        onPress={() => router.navigate("/transaction/768090")}
      />
      <Button
        title="Progress"
        onPress={() => router.navigate("/in-progress/12")} // Example ID
      />
    </View>
  )
}