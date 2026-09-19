import React, {
  useMemo,
} from "react";

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";

import KPIBox from "../components/KPIBox";
import ScreenLayout from "../components/ScreenLayout";

import { useQuality } from "../context/QualityContext";

import {
  calcularCosteNoCalidad,
} from "../utils/costesNoCalidadKPI";

export default function CosteNoCalidadScreen() {

  const {
    incidencias = [],
    reclamaciones = [],
    ncProveedores = [],
  } = useQuality();

  const kpis = useMemo(
    () =>
      calcularCosteNoCalidad({
        incidencias,
        reclamaciones,
        ncProveedores,
      }) || {},
    [
      incidencias,
      reclamaciones,
      ncProveedores,
    ]
  );

  const {

    totalCasos = 0,

    costeIncidencias = 0,
    costeClientes = 0,
    costeProveedores = 0,

    recuperado = 0,

    costeBruto = 0,

    saldoEconomico = 0,

    costeMedio = 0,

    porcentajeIncidencias = 0,
    porcentajeClientes = 0,
    porcentajeProveedores = 0,

  } = kpis;

  const costeTotal =
    Number(costeBruto) || 0;

  const importeRecuperado =
    Number(recuperado) || 0;

  const impactoEconomico =
    Number(saldoEconomico) || 0;

  const pendienteRecuperar =
    Math.max(
      0,
      costeTotal - importeRecuperado
    );

  const origenPrincipal =
    [
      {
        nombre: "Incidencias",
        importe: costeIncidencias,
      },
      {
        nombre: "Reclamaciones",
        importe: costeClientes,
      },
      {
        nombre: "NC Proveedores",
        importe: costeProveedores,
      },
    ].sort(
      (a, b) =>
        b.importe - a.importe
    )[0];

return (
  <ScreenLayout>

    <ScrollView style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.title}>
          💸 Coste de No Calidad
        </Text>

        <Text style={styles.subtitle}>
          Seguimiento económico de incidencias, reclamaciones y proveedores
        </Text>

      </View>

      {/* KPI PRINCIPALES */}

      <View style={styles.kpiContainer}>

        <KPIBox
          style={styles.kpiCard}
          title="Coste Total"
          value={`${costeTotal.toLocaleString("es-ES")} €`}
          detail={`${totalCasos} casos`}
          icon="💰"
          color="#dc2626"
        />

        <KPIBox
          style={styles.kpiCard}
          title="Recuperado"
          value={`${importeRecuperado.toLocaleString("es-ES")} €`}
          detail="Importe recuperado"
          icon="✅"
          color="#16a34a"
        />

        <KPIBox
          style={styles.kpiCard}
          title="Pendiente"
          value={`${pendienteRecuperar.toLocaleString("es-ES")} €`}
          detail="Pendiente recuperar"
          icon="⚠️"
          color="#f97316"
        />

        <KPIBox
          style={styles.kpiCard}
          title="Coste Medio"
          value={`${costeMedio.toLocaleString(
            "es-ES",
            {
              maximumFractionDigits: 2,
            }
          )} €`}
          detail="Por caso"
          icon="📈"
          color="#2563eb"
        />

      </View>

      {/* RESUMEN */}

      <View style={styles.summaryCard}>

        <Text style={styles.cardTitle}>
          📋 Resumen General
        </Text>

        <View style={styles.summaryRow}>
          <Text>Casos Totales</Text>
          <Text style={styles.summaryValue}>
            {totalCasos}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>⚠️ Incidencias</Text>
          <Text style={styles.summaryValue}>
            {incidencias.length}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>📦 Reclamaciones</Text>
          <Text style={styles.summaryValue}>
            {reclamaciones.length}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>🚚 NC Proveedores</Text>
          <Text style={styles.summaryValue}>
            {ncProveedores.length}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>Origen Principal</Text>
          <Text style={styles.summaryValue}>
            {origenPrincipal?.nombre || "-"}
          </Text>
        </View>

      </View>

      {/* DISTRIBUCIÓN ECONÓMICA */}

      <View style={styles.summaryCard}>

        <Text style={styles.cardTitle}>
          💰 Distribución Económica
        </Text>

        <View style={styles.summaryRow}>
          <Text>⚠️ Incidencias</Text>
          <Text style={styles.summaryValue}>
            {costeIncidencias.toLocaleString("es-ES")} €
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>📦 Reclamaciones</Text>
          <Text style={styles.summaryValue}>
            {costeClientes.toLocaleString("es-ES")} €
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>🚚 NC Proveedores</Text>
          <Text style={styles.summaryValue}>
            {costeProveedores.toLocaleString("es-ES")} €
          </Text>
        </View>

      </View>

      {/* INDICADORES FINANCIEROS */}

      <View style={styles.summaryCard}>

        <Text style={styles.cardTitle}>
          📊 Indicadores Financieros
        </Text>

        <View style={styles.summaryRow}>
          <Text>Saldo Económico</Text>

          <Text
            style={[
              styles.summaryValue,
              {
                color:
                  impactoEconomico >= 0
                    ? "#16a34a"
                    : "#dc2626",
              },
            ]}
          >
            {impactoEconomico.toLocaleString("es-ES")} €
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>Pendiente Recuperar</Text>

          <Text
            style={[
              styles.summaryValue,
              {
                color: "#ea580c",
              },
            ]}
          >
            {pendienteRecuperar.toLocaleString("es-ES")} €
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>% Incidencias</Text>
          <Text style={styles.summaryValue}>
            {porcentajeIncidencias}%
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>% Reclamaciones</Text>
          <Text style={styles.summaryValue}>
            {porcentajeClientes}%
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>% Proveedores</Text>
          <Text style={styles.summaryValue}>
            {porcentajeProveedores}%
          </Text>
        </View>

      </View>

      <View style={{ height: 50 }} />

    </ScrollView>

  </ScreenLayout>
);
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    padding: 16,
  },

  header: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 18,
    marginBottom: 20,
    elevation: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
  },

  subtitle: {
    marginTop: 6,
    color: "#64748b",
    fontSize: 14,
  },

  /* KPI */

kpiContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "stretch",
  marginBottom: 20,
},

kpiCard: {
  width: "31%",
  flexGrow: 0,
  flexShrink: 0,
  marginBottom: 10,
},

  /* TARJETAS */

  summaryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 16,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  summaryValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0f172a",
  },
});