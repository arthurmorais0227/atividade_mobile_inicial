import { Tabs, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View, Text, StyleSheet, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";

const itensMenu = [
  { title: "Início", icon: "home-outline", path: "/" },
  { title: "Aulas", icon: "book-outline", path: "/aulas" },
  { title: "Interface", icon: "shapes-outline", path: "/interface" },
  { title: "Sobre", icon: "information-circle-outline", path: "/sobre" },
  { title: "API", icon: "cloud-download-outline", path: "/api" },
  { title: "Post", icon: "create-outline", path: "/post" },
  { title: "Delete", icon: "trash-outline", path: "/delete" },
  { title: "Update", icon: "refresh-outline", path: "/update" },
];

export default function TabsLayout() {
  const [menuAberto, setMenuAberto] = useState(false);
  const translateX = useRef(new Animated.Value(-320)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: menuAberto ? 0 : -320,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: menuAberto ? 1 : 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [menuAberto]);

  const abrirRota = (path) => {
    setMenuAberto(false);
    router.push(path);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#090922",
            borderBottomWidth: 1,
            borderBottomColor: "#f0a7ff",
          },
          headerTitleStyle: {
            color: "#ffffff",
            fontWeight: "bold",
          },
          headerLeft: () => (
            <Pressable
              onPress={() => setMenuAberto(true)}
              style={styles.botaomenu}
              hitSlop={10}
            >
              <Ionicons name="menu" size={24} color="#ffffff" />
            </Pressable>
          ),
          tabBarStyle: { display: "none" },
          tabBarShowLabel: false,
          tabBarButton: () => null,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Início",
            headerTitle: "Projeto Base",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="aulas"
          options={{
            title: "Aulas",
            headerTitle: "Conteúdo",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="interface"
          options={{
            title: "Interface",
            headerTitle: "Interface",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="shapes-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="sobre"
          options={{
            title: "Sobre",
            headerTitle: "Sobre",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="information-circle-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="api"
          options={{
            title: "API",
            headerTitle: "API",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cloud-download-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="post"
          options={{
            title: "Post",
            headerTitle: "Publicações",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="create-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="delete"
          options={{
            title: "Delete",
            headerTitle: "Excluir Filme",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="trash-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="update"
          options={{
            title: "Update",
            headerTitle: "Atualizar Filme",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="refresh-outline" size={size} color={color} />
            ),
          }}
        />

      </Tabs>

      <Animated.View
        pointerEvents={menuAberto ? "auto" : "none"}
        style={[styles.overlay, { opacity: overlayOpacity }]}
      >
        <Pressable
          style={StyleSheet.absoluteFillObject}
          onPress={() => setMenuAberto(false)}
        />
      </Animated.View>

      <Animated.View
        pointerEvents={menuAberto ? "auto" : "none"}
        style={[styles.drawer, { transform: [{ translateX }] }]}
      >
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitulo}>Menu</Text>
          <Pressable onPress={() => setMenuAberto(false)}>
            <Ionicons name="close" size={26} color="#ffffff" />
          </Pressable>
        </View>

        {itensMenu.map((item) => (
          <Pressable
            key={item.title}
            style={styles.itemMenu}
            onPress={() => abrirRota(item.path)}
          >
            <Ionicons name={item.icon} size={20} color="#f0a7ff" />
            <Text style={styles.itemTexto}>{item.title}</Text>
          </Pressable>
        ))}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  botaomenu: {
    marginLeft: 12,
    padding: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: "#090922",
    borderRightWidth: 1,
    borderRightColor: "#f0a7ff",
    paddingTop: 50,
    paddingHorizontal: 12,
    zIndex: 2,
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#f0a7ff",
    marginBottom: 12,
  },
  drawerTitulo: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 20,
  },
  itemMenu: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(240,167,255,0.2)",
  },
  itemTexto: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
