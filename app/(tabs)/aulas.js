import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const lessons = [
  "Matemática ➗",
  "História ⌛",
  "Física 🔭",
  "Biologia 🧬",
];

export default function LessonsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Matérias Favoritas</Text>
        <Text style={styles.description}>
          Esta aba serve para armazenar minhas matérias favoritas da escola!
        </Text>

        <View style={styles.list}>
          {lessons.map((lesson, index) => (
            <View key={lesson} style={styles.listItem}>
              <Text style={styles.badge}>{index + 1}</Text>
              <Text style={styles.listText}>{lesson}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#090922",
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#ffffff",
  },
  list: {
    gap: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#090922",
    borderColor: "#f0a7ff",
    borderWidth: 1,
    borderStyle: 'solid'
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    textAlign: "center",
    lineHeight: 32,
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff",
    backgroundColor: "#f0a7ff",
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: "#ffffff",
  },
});
