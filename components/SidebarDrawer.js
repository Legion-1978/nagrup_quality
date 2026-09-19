import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({
  currentScreen,
  navigate,
}) {
  const { usuarioActual } = useAuth();

  const menuItems = [
    {
      section: "CUADRO DE MANDO",
      items: [
        {
          permiso: "dashboard",
          title: "Dashboard",
          screen: "Dashboard",
          icon: "view-dashboard-outline",
        },
        {
          permiso: "otif",
          title: "OTIF",
          screen: "OTIF",
          icon: "truck-fast-outline",
        },
      ],
    },
    {
      section: "CALIDAD",
      items: [
        {
          permiso: "incidencias",
          title: "Incidencias",
          screen: "Incidencias",
          icon: "alert-circle-outline",
        },
        {
          permiso: "reclamaciones",
          title: "Reclamaciones",
          screen: "Reclamaciones",
          icon: "package-variant-closed",
        },
        {
          permiso: "proveedores",
          title: "NC Proveedores",
          screen: "Proveedores",
          icon: "factory",
        },
        {
          permiso: "auditorias",
          title: "Auditorías",
          screen: "Auditorias",
          icon: "clipboard-check-outline",
        },
        {
          permiso: "satisfaccion",
          title: "Satisfacción Cliente",
          screen: "Satisfaccion",
          icon: "emoticon-happy-outline",
        },
      ],
    },
    {
      section: "OPERATIONAL EXCELLENCE",
      items: [
        {
          permiso: "mejoras",
          title: "Mejoras",
          screen: "Mejoras",
          icon: "chart-line",
        },
        {
          permiso: "formacion",
          title: "Formación",
          screen: "Formacion",
          icon: "school-outline",
        },
        {
          permiso: "procedimientos",
          title: "Procedimientos",
          screen: "Procedimientos",
          icon: "file-document-outline",
        },
      ],
    },
    {
      section: "FINANZAS",
      items: [
        {
          permiso: "costes",
          title: "Coste Calidad",
          screen: "CosteNoCalidad",
          icon: "currency-eur",
        },
      ],
    },
    {
      section: "ADMINISTRACIÓN",
      items: [
        {
          permiso: "configuracion",
          title: "Configuración",
          screen: "Configuracion",
          icon: "cog-outline",
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* CABECERA */}

      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {usuarioActual?.nombre?.charAt(0) || "U"}
          </Text>
        </View>

        <View>
          <Text style={styles.logo}>NAGRUP</Text>

          <Text style={styles.user}>
            {usuarioActual?.nombre || "Usuario"}
          </Text>
        </View>
      </View>

      {/* MENÚ */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        {menuItems.map((section) => (
          <View key={section.section}>
            <Text style={styles.section}>
              {section.section}
            </Text>

            {section.items.map((item) => {
              // Si quieres ignorar permisos temporalmente
              // comenta este bloque

              if (
                usuarioActual?.permisos &&
                !usuarioActual.permisos[item.permiso]
              ) {
                return null;
              }

              const active =
                currentScreen === item.screen;

              return (
                <Pressable
                  key={item.screen}
                  onPress={() => {
                    navigate(item.screen);
                  }}
                  style={({ pressed }) => [
                    styles.item,
                    active && styles.itemActive,
                    pressed && styles.itemPressed,
                  ]}
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={22}
                    color={
                      active
                        ? "#2563EB"
                        : "#64748B"
                    }
                  />

                  <Text
                    style={[
                      styles.itemText,
                      active &&
                        styles.itemTextActive,
                    ]}
                  >
                    {item.title}
                  </Text>

                  {active && (
                    <View
                      style={
                        styles.activeIndicator
                      }
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {/* FOOTER */}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          NAGRUP QUALITY HUB
        </Text>

        <Text style={styles.footerVersion}>
          v1.0
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 290,
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 18,
  },

  logo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },

  user: {
    marginTop: 2,
    fontSize: 13,
    color: "#64748B",
  },

  section: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 1,
    marginTop: 22,
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 2,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 12,
  },

  itemPressed: {
    opacity: 0.75,
  },

  itemActive: {
    backgroundColor: "#EFF6FF",
  },

  itemText: {
    marginLeft: 14,
    fontSize: 15,
    color: "#334155",
    fontWeight: "500",
    flex: 1,
  },

  itemTextActive: {
    color: "#2563EB",
    fontWeight: "600",
  },

  activeIndicator: {
    width: 4,
    height: 24,
    borderRadius: 2,
    backgroundColor: "#2563EB",
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    padding: 16,
  },

  footerText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },

  footerVersion: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 2,
  },
});