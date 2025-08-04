import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./HomeHeaderStyles";
import { colors } from "@/theme/colors";

import { Separator } from "@/components/Separator";

export type HomeHeaderProps = {
  total: string;
}

type Props = {
  data: HomeHeaderProps;
}

export function HomeHeader({ data }: Props) {
  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.blue[500], colors.blue[800]]}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
        <Text style={styles.total}>{data.total}</Text>
      </View>

      <Separator color={colors.blue[400]} />
    </LinearGradient>
  );
}