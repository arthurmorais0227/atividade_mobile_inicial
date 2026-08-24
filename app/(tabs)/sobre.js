import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";

export default function ConfigScreen() {
  return (
<>
    <Text style={styles.subtitulo}>Uma página sobre mim!</Text>

    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.card}>
        <Image
          style={styles.imagem}
          source={{
            uri: "https://i.ibb.co/TBxjF0qZ/IMG-20260801-WA0030.jpg",
          }}
        />

        <Text style={styles.nome}>Arthur Morais</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.turma}>2TDS1</Text>
          <Text style={styles.curso}>Desenvolvimento de Sistemas</Text>
        </View>

        <Text style={styles.frase}>Trabalha na Inbrape e gosta de futebol</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.nome}>Mnhas redes sociais!</Text>

        <Link href="https://www.instagram.com/arthurrr_mn/" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Instagram</Text>
          </Pressable>
        </Link>

        <Link href="https://github.com/arthurmorais0227" asChild>
          <Pressable style={styles.button1}>
            <Text style={styles.buttonText2}>GitHub</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  subtitulo: {
    padding: 10,
    backgroundColor: "#090922",
    color: "#ffffff"
  },
  container: {
    flex: 1,
    backgroundColor: "#090922",
  },
  scrollContent: {
    paddingTop: 30,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  nome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f0a7ff",
    textAlign: "center",
    marginBottom: 10,
  },
  infoContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  turma: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  curso: {
    fontSize: 16,
    color: "#ffffff",
    fontStyle: "italic",
  },
  frase: {
    fontSize: 15,
    color: "#ffffff",
    marginTop: 20,
    textAlign: "center",
    lineHeight: 22,
    backgroundColor: "#090922",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f0a7ff",
  },
  imagem: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#f0a7ff",
  },
  card: {
    borderRadius: 10,
    padding: 30,
    borderWidth: 1,
    borderColor: "#f0a7ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#f0a7ff",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#090922",
  },
  button1: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#090922",
    borderWidth: 1,
    borderColor: "#f0a7ff",
  },
  buttonText2: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
});
