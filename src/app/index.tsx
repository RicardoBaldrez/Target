import { View } from "react-native";

import { Target } from "@/components/Target/Target";
import { HomeHeader } from "@/components/HomeHeader/HomeHeader";
import { List } from "@/components/List";

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
  {
    id: "2",
    name: "Cadeira ergonômica",
    percentage: "50%",
    current: "R$ 900,00",
    target: "R$ 1.200,00",
  },
  {
    id: "3",
    name: "Viagem Amsterdã",
    percentage: "40%",
    current: "R$ 4.000,00",
    target: "R$ 12.000,00",
  },
];

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summary} />
      <List
        title="Metas"
        data={targets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Target data={item} />}
        emptyMessage="Nenhuma meta cadastradaß"
        containerStyle={{ paddingHorizontal: 24 }}
      />
    </View>
  );
}
