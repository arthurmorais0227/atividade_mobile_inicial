import { View, Text, StyleSheet, Image } from "react-native";
const arthurMoraisLogo = require("../../assets/pato.gif");
import {SafeAreaView} from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={arthurMoraisLogo}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Bem-vindo ao app!</Text>
      <Text style={styles.subtitle}>Meu primeiro App com o Prof. Thiago!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 400,
    height: 200,
    marginBottom: 4,
  },
  container: {
    flex: 1,
    backgroundColor: "#090922",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f0a7ff",
  },
  subtitle: {
    fontSize: 14,
    color: "#ffffff",
    marginTop: 8,
  },
});