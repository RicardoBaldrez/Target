import { View } from "react-native";

import { Target } from "@/components/Target/Target";
import { HomeHeader } from "@/components/HomeHeader/HomeHeader";

const summary = {
  total: "R$ 2.680,00",
  input: {
    label: "Entradas",
    value: "R$ 6.185,90",
  },
  output: {
    label: "Saídas",
    value: "-R$ 883,65",
  },
};

const targets = [
  {
    id: "1",
    name: "Apple Watch Series 7",
    percentage: "75%",
    current: "R$ 1.340,00",
    target: "R$ 3.280,00",
  },
];

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summary} />
      <Target data={targets[0]} />
    </View>
  );
}
