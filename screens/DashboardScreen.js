
import React from "react";

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";

import KPIBox from "../components/KPIBox";
import ScreenLayout from "../components/ScreenLayout";
import { useAuth } from "../context/AuthContext";
import { useQuality } from "../context/QualityContext";
import { useLogistics } from "../context/LogisticsContext";
import { useConfig } from "../context/ConfigContext";

export default function DashboardScreen() {
  const auth = useAuth();
  const quality = useQuality();
  const logistics = useLogistics();
  const config = useConfig();

  const loading =
    auth.loading ||
    quality.loading ||
    logistics.loading ||
    config.loading;

  const { usuarioActual } = auth;

  const {
    incidencias = [],
    auditorias = [],
    reclamaciones = [],
    ncProveedores = [],
    mejoras = [],
    formaciones = [],
  } = quality;

  const { entregasOTIF = [] } = logistics;

  const { configuracionDashboard = {} } = config;

if (loading) {
  return (
    <View style={styles.loading}>
      <Text>Cargando Dashboard...</Text>
    </View>
  );
}

  // ==========================
  // OTIF
  // ==========================

  const totalEntregas =
    entregasOTIF.length;

  const entregasCorrectas =
    entregasOTIF.filter(
      item => item.otif === true
    ).length;

  const otif =
    totalEntregas === 0
      ? 0
      : (
          (entregasCorrectas /
            totalEntregas) *
          100
        ).toFixed(1);

  // ==========================
  // INCIDENCIAS
  // ==========================

const incAbiertas =
  incidencias.filter(
    x => x.estado !== "Cerrada"
  ).length;

const incCerradas =
  incidencias.filter(
    x => x.estado === "Cerrada"
  ).length;

  // ==========================
  // RECLAMACIONES
  // ==========================

const recAbiertas =
  reclamaciones.filter(
    x => x.estado !== "Cerrada"
  ).length;

const recCerradas =
  reclamaciones.filter(
    x => x.estado === "Cerrada"
  ).length;

  // ==========================
  // PROVEEDORES
  // ==========================

const provAbiertas =
  ncProveedores.filter(
    x => x.estado !== "Cerrada"
  ).length;

const provCerradas =
  ncProveedores.filter(
    x => x.estado === "Cerrada"
  ).length;

  // ==========================
  // AUDITORIAS
  // ==========================

const auditoriasPendientes =
  auditorias.filter(
    x => x.estado !== "Cerrada"
  ).length;

const auditoriasCerradas =
  auditorias.filter(
    x => x.estado === "Cerrada"
  ).length;

  // ==========================
  // MEJORAS
  // ==========================

const mejorasActivas =
  mejoras.filter(
    x => x.estado !== "Finalizada"
  ).length;

const mejorasFinalizadas =
  mejoras.filter(
    x => x.estado === "Finalizada"
  ).length;

  // ==========================
  // IMPACTO ECONOMICO
  // ==========================

  const beneficio =
    mejoras.reduce(
      (total, item) =>
        total +
        Number(
          item.beneficio || 0
        ),
      0
    );

  const costeIncidencias =
    incidencias.reduce(
      (total, item) =>
        total +
        Number(
          item.coste ||
            item.costeIncidencia ||
            0
        ),
      0
    );

  const costeReclamaciones =
    reclamaciones.reduce(
      (total, item) =>
        total +
        Number(item.coste || 0),
      0
    );

  const costeProveedores =
    ncProveedores.reduce(
      (total, item) =>
        total +
        Number(
          item.costeNagrup ||
            item.coste ||
            0
        ),
      0
    );

  const recuperado =
    ncProveedores.reduce(
      (total, item) =>
        total +
        Number(
          item.importeAbonado ||
          item.abonoProveedor ||
          0
        ),
      0
    );

  const balanceCalidad =
    recuperado -
    (
      costeIncidencias +
      costeReclamaciones +
      costeProveedores
    );

  const impactoNeto =
    beneficio +
    balanceCalidad;

return (
  <ScreenLayout>
    <ScrollView style={styles.container}>

      {/* ========================== */}
      {/* RESUMEN EJECUTIVO */}
      {/* ========================== */}

      <Text style={styles.section}>
        📊 Resumen Ejecutivo
      </Text>

      <View style={styles.row}>
        <KPIBox
          style={styles.dashboardKpi}
          title="OTIF"
          value={`${otif}%`}
          color="#16a34a"
          icon="🚛"
        />

        <KPIBox
          style={styles.dashboardKpi}
          title="Incidencias"
          value={incAbiertas}
          color="#f97316"
          icon="⚠️"
        />
      </View>

      <View style={styles.row}>
        <KPIBox
          style={styles.dashboardKpi}
          title="Reclamaciones"
          value={recAbiertas}
          color="#2563eb"
          icon="📦"
        />

        <KPIBox
          style={styles.dashboardKpi}
          title="NC Proveedor"
          value={provAbiertas}
          color="#dc2626"
          icon="🚚"
        />
      </View>

      <View style={styles.row}>
        <KPIBox
          style={styles.dashboardKpi}
          title="Auditorías"
          value={auditoriasPendientes}
          color="#10b981"
          icon="✅"
        />

        <KPIBox
          style={styles.dashboardKpi}
          title="Mejoras"
          value={mejorasActivas}
          color="#7c3aed"
          icon="📈"
        />
      </View>

      {/* ========================== */}
      {/* SERVICIO CLIENTE */}
      {/* ========================== */}

      <Text style={styles.section}>
        🚛 Servicio Cliente
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Rendimiento OTIF
        </Text>

        <Text
          style={{
            fontSize: 50,
            fontWeight: "800",
            textAlign: "center",
            color: "#16a34a",
            marginVertical: 15,
          }}
        >
          {otif}%
        </Text>

        <Text>
          Entregas registradas: {totalEntregas}
        </Text>

        <Text>
          Entregas OTIF: {entregasCorrectas}
        </Text>

        <Text>
          Objetivo: {configuracionDashboard.objetivoOTIF || 98}%
        </Text>
      </View>

      {/* ========================== */}
      {/* ESTADO CALIDAD */}
      {/* ========================== */}

      <Text style={styles.section}>
        📦 Estado Calidad
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Calidad Global
        </Text>

        <View style={styles.balanceRow}>
          <Text>⚠️ Incidencias</Text>
          <Text>{incidencias.length}</Text>
        </View>

        <View style={styles.balanceRow}>
          <Text>📦 Reclamaciones</Text>
          <Text>{reclamaciones.length}</Text>
        </View>

        <View style={styles.balanceRow}>
          <Text>🚚 NC Proveedores</Text>
          <Text>{ncProveedores.length}</Text>
        </View>

        <View style={styles.balanceRow}>
          <Text>📈 Mejoras</Text>
          <Text>{mejoras.length}</Text>
        </View>

        <View style={styles.balanceRow}>
          <Text>✅ Auditorías</Text>
          <Text>{auditorias.length}</Text>
        </View>
      </View>

      {/* ========================== */}
      {/* IMPACTO ECONÓMICO */}
      {/* ========================== */}

      <Text style={styles.section}>
        💰 Impacto Económico
      </Text>

      <View style={styles.row}>
        <KPIBox
          style={styles.dashboardKpi}
          title="Beneficio"
          value={`${beneficio.toLocaleString("es-ES")} €`}
          color="#16a34a"
          icon="💰"
        />

        <KPIBox
          style={styles.dashboardKpi}
          title="Impacto Neto"
          value={`${impactoNeto.toLocaleString("es-ES")} €`}
          icon="📊"
          color={
            impactoNeto >= 0
              ? "#16a34a"
              : "#dc2626"
          }
        />
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>
          📊 Balance Calidad
        </Text>

        <Text
          style={[
            styles.balanceValue,
            {
              color:
                balanceCalidad >= 0
                  ? "#16a34a"
                  : "#dc2626",
            },
          ]}
        >
          {balanceCalidad.toLocaleString("es-ES")} €
        </Text>

        <View style={styles.balanceRow}>
          <Text>⚠️ Incidencias</Text>
          <Text style={styles.bold}>
            {costeIncidencias.toLocaleString("es-ES")} €
          </Text>
        </View>

        <View style={styles.balanceRow}>
          <Text>📦 Reclamaciones</Text>
          <Text style={styles.bold}>
            {costeReclamaciones.toLocaleString("es-ES")} €
          </Text>
        </View>

        <View style={styles.balanceRow}>
          <Text>🚚 NC Proveedores</Text>
          <Text style={styles.bold}>
            {costeProveedores.toLocaleString("es-ES")} €
          </Text>
        </View>

        <View style={styles.balanceRow}>
          <Text>💰 Recuperado</Text>
          <Text style={styles.bold}>
            {recuperado.toLocaleString("es-ES")} €
          </Text>
        </View>
      </View>

      {/* ========================== */}
      {/* ALERTAS PRIORITARIAS */}
      {/* ========================== */}

      <Text style={styles.section}>
        🔥 Alertas Prioritarias
      </Text>

      <View style={styles.card}>
        {incAbiertas + recAbiertas + provAbiertas === 0 ? (
          <Text style={styles.ok}>
            ✅ No existen alertas prioritarias
          </Text>
        ) : (
          <>
            {incAbiertas > 0 && (
              <Text style={styles.alert}>
                ⚠️ {incAbiertas} incidencias abiertas
              </Text>
            )}

            {recAbiertas > 0 && (
              <Text style={styles.alert}>
                📦 {recAbiertas} reclamaciones abiertas
              </Text>
            )}

            {provAbiertas > 0 && (
              <Text style={styles.alert}>
                🚚 {provAbiertas} NC proveedores abiertas
              </Text>
            )}
          </>
        )}
      </View>

      {/* ========================== */}
      {/* FORMACIÓN */}
      {/* ========================== */}

      <Text style={styles.section}>
        🎓 Formación
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Formación Registrada
        </Text>

        <Text style={styles.bigNumber}>
          {formaciones.length}
        </Text>

        <Text>
          Registros de formación realizados
        </Text>
      </View>

      {/* ========================== */}
      {/* RESUMEN FINAL */}
      {/* ========================== */}

      <Text style={styles.section}>
        🎯 Resumen Ejecutivo
      </Text>

      <View style={styles.card}>
        <View style={styles.balanceRow}>
          <Text>🚛 OTIF</Text>
          <Text style={styles.bold}>{otif}%</Text>
        </View>

        <View style={styles.balanceRow}>
          <Text>⚠️ Incidencias abiertas</Text>
          <Text style={styles.bold}>{incAbiertas}</Text>
        </View>

        <View style={styles.balanceRow}>
          <Text>📦 Reclamaciones abiertas</Text>
          <Text style={styles.bold}>{recAbiertas}</Text>
        </View>

        <View style={styles.balanceRow}>
          <Text>🚚 NC proveedores</Text>
          <Text style={styles.bold}>{provAbiertas}</Text>
        </View>

        <View style={styles.balanceRow}>
          <Text>📈 Mejoras en curso</Text>
          <Text style={styles.bold}>{mejorasActivas}</Text>
        </View>

        <View style={styles.balanceRow}>
          <Text>✅ Auditorías pendientes</Text>
          <Text style={styles.bold}>{auditoriasPendientes}</Text>
        </View>

        <View style={styles.balanceRow}>
          <Text>🎓 Formaciones</Text>
          <Text style={styles.bold}>{formaciones.length}</Text>
        </View>
      </View>

    </ScrollView>
  </ScreenLayout>
);
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  dashboardKpi: {
  flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    padding: 16,
  },

  section: {
    fontSize: 22,
    fontWeight: "800",
    color: "#16163b",
    marginTop: 20,
    marginBottom: 15,
  },

  row: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 10,
  marginBottom: 12,
},

  balanceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
    marginTop: 10,
    marginBottom: 30,
    elevation: 4,
  },

  balanceTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#16163b",
  },

  balanceValue: {
    fontSize: 42,
    fontWeight: "800",
    marginVertical: 15,
  },

  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  card: {
  backgroundColor: "#ffffff",
  borderRadius: 20,
  padding: 20,
  marginBottom: 15,
  elevation: 4,
},

cardTitle: {
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 10,
  color: "#16163b",
},

bigNumber: {
  fontSize: 38,
  fontWeight: "800",
  color: "#16163b",
  marginBottom: 10,
},

alert: {
  color: "#dc2626",
  fontWeight: "700",
  marginBottom: 8,
},

ok: {
  color: "#16a34a",
  fontWeight: "700",
},

bold: {
  fontWeight: "700",
},
});