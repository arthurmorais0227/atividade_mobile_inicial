import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#090922",
          borderBottomWidth: 1,
          borderBottomColor: "#f0a7ff",
        },
        headerTitleStyle: {
          color:"#ffffff",
          fontWeight: "bold"
        },

        tabBarStyle: {
          backgroundColor: "#090922",
          borderTopWidth: 1,
          borderTopColor: "#f0a7ff",
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: "#f0a7ff",
        tabBarInactiveBackgroundColor: "#090922",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          headerTitle: "Projeto Base",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="aulas"
        options={{
          title: "Aulas",
          headerTitle: "Conteúdo",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="interface"
        options={{
          title: "Interface",
          headerTitle: "Interface",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="shapes-outline" size={size} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="sobre"
        options={{
          title: "Sobre",
          headerTitle: "Sobre",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" size={size} color={color}/>
          ),
        }}
      />
    </Tabs>
  );
}
