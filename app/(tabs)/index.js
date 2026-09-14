import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Seja bem-vindo (a) ao meu APP!</Text>
          <Text style={styles.title}>Arthur Morais</Text>
          <Text style={styles.description}>
            Este aplicativo tem a ideia de servir como biblioteca das aulas dadas pelo professor Thiago com o intuito de aprender React Native!
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Coisas que gosto</Text>
          <Text style={styles.cardItem}>• Minha namorada ❤️</Text>
          <Text style={styles.cardItem}>• Futebol ⚽</Text>
          <Text style={styles.cardItem}>• Filmes 🎞️</Text>
          <Text style={styles.cardItem}>• Comer 🍕</Text>
        </View>

        <Link href="/modal" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Abrir modal de exemplo</Text>
          </Pressable>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#090922",
  },
  container: {
    padding: 24,
    gap: 20,
  },
  hero: {
    alignItems: "center",
    gap: 10,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#090922",
    borderColor: "#f0a7ff",
    borderWidth: 1,
    borderStyle: 'solid'
  },
  logo: {
    width: 200,
    height: 120,
    marginBottom: 4,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#ffffff",
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#ffffff",
    textAlign: "center",
  },
  card: {
    gap: 8,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#090922",
    borderColor: "#f0a7ff",
    borderWidth: 1,
    borderStyle: 'solid'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  cardItem: {
    fontSize: 15,
    color: "#ffffff",
  },
  button: {
    marginBottom: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#f0a7ff",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
});
