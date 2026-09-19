import React from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import styles from "../styles/TablaStyles";

export default function ProveedorTabla({
  ncProveedores,
  verDetalle,
  editarNC,
  cambiarEstado,
  cambiarGravedad,
  borrar,
  soloLectura,
}) {
return (
  <View style={styles.card}>

    {/* ===================================================== */}
    {/* TÍTULO */}
    {/* ===================================================== */}

    <Text style={styles.cardTitle}>
      📋 Registro NC Proveedores
    </Text>

    {/* ===================================================== */}
    {/* TABLA SCROLL HORIZONTAL */}
    {/* ===================================================== */}

    <ScrollView
      horizontal
      nestedScrollEnabled
      showsHorizontalScrollIndicator
    >

      <View
        style={{
          minWidth: 1840,
        }}
      >

        {/* ===================================================== */}
        {/* CABECERA TABLA */}
        {/* ===================================================== */}

        <View style={styles.tableHeader}>

          <Text
            style={[
              styles.headerCell,
              { width: 120 },
            ]}
          >
            Código
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 120 },
            ]}
          >
            Fecha
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 220 },
            ]}
          >
            Proveedor
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 140 },
            ]}
          >
            Tipo NC
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 160 },
            ]}
          >
            Producto
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 180 },
            ]}
          >
            Estado
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 120 },
            ]}
          >
            Gravedad
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 120 },
            ]}
          >
            Impacto
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 120 },
            ]}
          >
            Coste
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 140 },
            ]}
          >
            Pendiente €
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 140 },
            ]}
          >
            Cierre
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 100 },
            ]}
          >
            Días
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 420 },
            ]}
          >
            Acciones
          </Text>

        </View>

        {/* ===================================================== */}
        {/* ESTADO VACÍO */}
        {/* ===================================================== */}

        {ncProveedores.length === 0 ? (

          <View
            style={{
              padding: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >
              No existen NC registradas
            </Text>
          </View>

        ) : (

          ncProveedores
            .slice()
            .sort((a, b) => {

              const prioridad = {
                Alta: 3,
                Media: 2,
                Baja: 1,
              };

              return (
                (prioridad[b.gravedad] || 0) -
                (prioridad[a.gravedad] || 0)
              );
            })
            .map((item) => (

              <View
                key={item.id}
                style={styles.tableRow}
              >

                {/* CÓDIGO */}

                <Text
                  style={[
                    styles.cell,
                    { width: 120 },
                  ]}
                >
                  {item.id}
                </Text>

                {/* FECHA */}

                <Text
                  style={[
                    styles.cell,
                    { width: 120 },
                  ]}
                >
                  {item.fecha}
                </Text>

                {/* PROVEEDOR */}

                <Text
                  style={[
                    styles.cell,
                    {
                      width: 220,
                      fontWeight: "700",
                    },
                  ]}
                >
                  {item.proveedor}
                </Text>

                {/* TIPO NC */}

                <Text
                  style={[
                    styles.cell,
                    {
                      width: 140,
                    },
                  ]}
                >
                  {item.tipoNC || "-"}
                </Text>

                {/* PRODUCTO */}

                <Text
                  style={[
                    styles.cell,
                    {
                      width: 160,
                    },
                  ]}
                >
                  {item.codigoProducto || "-"}
                </Text>

                {/* ESTADO */}

                <View
                  style={{
                    width: 180,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 20,
                      backgroundColor:
                        item.estado === "Cerrada"
                          ? "#dcfce7"
                          : item.estado ===
                            "Pendiente Proveedor"
                          ? "#fef9c3"
                          : item.estado ===
                            "Acción Correctiva"
                          ? "#ede9fe"
                          : "#fed7aa",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "700",
                        color:
                          item.estado === "Cerrada"
                            ? "#166534"
                            : item.estado ===
                              "Pendiente Proveedor"
                            ? "#854d0e"
                            : item.estado ===
                              "Acción Correctiva"
                            ? "#6d28d9"
                            : "#9a3412",
                      }}
                    >
                      {item.estado}
                    </Text>
                  </View>
                </View>

                {/* GRAVEDAD */}

                <View
                  style={{
                    width: 120,
                    alignItems: "center",
                  }}
                >
                  <Text>
                    {(item.gravedad || "Media") === "Alta"
                      ? "🔴 Alta"
                      : (item.gravedad || "Media") === "Baja"
                      ? "🟢 Baja"
                      : "🟠 Media"}
                  </Text>
                </View>

                {/* IMPACTO */}

                <View
                  style={{
                    width: 120,
                    alignItems: "center",
                  }}
                >
                  <Text>
                    {(item.impacto || "Medio") === "Crítico"
                      ? "🔴 Crítico"
                      : (item.impacto || "Medio") === "Alto"
                      ? "🟠 Alto"
                      : (item.impacto || "Medio") === "Bajo"
                      ? "🟢 Bajo"
                      : "🟡 Medio"}
                  </Text>
                </View>

                {/* COSTE */}

                <Text
                  style={[
                    styles.cell,
                    { width: 120 },
                  ]}
                >
                  {(item.costeNagrup || 0).toLocaleString("es-ES")} €
                </Text>

                {/* PENDIENTE RECUPERAR */}

                <Text
                  style={[
                    styles.cell,
                    {
                      width: 140,
                      color: "#dc2626",
                      fontWeight: "700",
                    },
                  ]}
                >
                  {Math.max(
                    0,
                    Number(item.costeNagrup || 0) -
                      Number(item.importeAbonado || 0)
                  ).toLocaleString("es-ES")} €
                </Text>

                {/* FECHA CIERRE */}

                <Text
                  style={[
                    styles.cell,
                    { width: 140 },
                  ]}
                >
                  {item.fechaCierre || "-"}
                </Text>

                {/* DÍAS RESOLUCIÓN */}

                <Text
                  style={[
                    styles.cell,
                    { width: 100 },
                  ]}
                >
                  {item.diasResolucion || 0}
                </Text>

                {/* ACCIONES */}

                <View
                  style={[
                    styles.actions,
                    {
                      width: 420,
                    },
                  ]}
                >

                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() =>
                      verDetalle(item)
                    }
                  >
                    <Text>👁️</Text>
                    <Text style={styles.actionLabel}>
                      Ver
                    </Text>
                  </TouchableOpacity>

                  {!soloLectura && (
                    <>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                          editarNC(item)
                        }
                      >
                        <Text>✏️</Text>
                        <Text style={styles.actionLabel}>
                          Editar
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                          cambiarEstado(item.id)
                        }
                      >
                        <Text>🔄</Text>
                        <Text style={styles.actionLabel}>
                          Estado
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                          cambiarGravedad(item.id)
                        }
                      >
                        <Text>⚠️</Text>
                        <Text style={styles.actionLabel}>
                          Severidad
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.actionButton,
                          {
                            backgroundColor:
                              "#fee2e2",
                          },
                        ]}
                        onPress={() =>
                          borrar(item.id)
                        }
                      >
                        <Text>🗑️</Text>
                        <Text style={styles.actionLabel}>
                          Borrar
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}

                </View>

              </View>
            ))
        )}

      </View>

    </ScrollView>

  </View>
);
}