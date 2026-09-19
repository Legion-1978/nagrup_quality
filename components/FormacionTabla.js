import React from "react";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "../styles/TablaStyles";

export default function FormacionTabla({
  formacionesFiltradas,

  busqueda,
  setBusqueda,

  verDetalle,
  editarFormacion,
  cambiarEstado,
  eliminar,
  soloLectura,
}) {

return (
  <View style={styles.card}>

    <Text style={styles.cardTitle}>
      📋 Registro de Formaciones
    </Text>

    <TextInput
      style={styles.input}
      placeholder="🔍 Buscar empleado, curso, ADR, PRL..."
      value={busqueda}
      onChangeText={setBusqueda}
    />

    <ScrollView
      horizontal
      nestedScrollEnabled
      showsHorizontalScrollIndicator
    >
      <View
        style={{
          minWidth: 2200,
        }}
      >

        <View style={styles.tableHeader}>

          <Text
            style={[
              styles.headerCell,
              { width: 100 },
            ]}
          >
            Código
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 180 },
            ]}
          >
            Empleado
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 160 },
            ]}
          >
            Puesto
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 180 },
            ]}
          >
            Departamento
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 300 },
            ]}
          >
            Curso
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 180 },
            ]}
          >
            Categoría
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 160 },
            ]}
          >
            Horas
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 140 },
            ]}
          >
            Inicio
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 140 },
            ]}
          >
            Fin
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 180 },
            ]}
          >
            Renovación
          </Text>

          <Text
            style={[
              styles.headerCell,
              { width: 180 },
            ]}
          >
            Competencia
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
              { width: 420 },
            ]}
          >
            Gestión
          </Text>

        </View>

        {formacionesFiltradas.length === 0 ? (

          <View
            style={{
              padding: 20,
              backgroundColor: "#fff",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#64748b",
              }}
            >
              No existen formaciones registradas
            </Text>
          </View>

        ) : (

          formacionesFiltradas
            .slice()
            .reverse()
            .map((item) => (

              <View
                key={item.id}
                style={styles.tableRow}
              >

                <Text
                  style={[
                    styles.cell,
                    { width: 100 },
                  ]}
                >
                  {item.id}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    {
                      width: 180,
                      fontWeight: "700",
                    },
                  ]}
                >
                  {item.empleado}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 160 },
                  ]}
                >
                  {item.puesto || "-"}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 180 },
                  ]}
                >
                  {item.departamento || "-"}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 300 },
                  ]}
                >
                  {item.curso}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 180 },
                  ]}
                >
                  {item.categoria || "-"}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 160 },
                  ]}
                >
                  {item.horas || "0"}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 140 },
                  ]}
                >
                  {item.fechaInicio || "-"}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 140 },
                  ]}
                >
                  {item.fechaFin || "-"}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 180 },
                  ]}
                >
                  {item.fechaRenovacion || "-"}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { width: 180 },
                  ]}
                >
                  {item.resultadoEvaluacion || "-"}
                </Text>

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
                        item.estadoFormacion === "Completada"
                          ? "#dcfce7"
                          : item.estadoFormacion === "Planificada"
                          ? "#dbeafe"
                          : item.estadoFormacion === "En Curso"
                          ? "#fef9c3"
                          : "#fee2e2",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "700",
                      }}
                    >
                      {item.estadoFormacion || "-"}
                    </Text>
                  </View>
                </View>

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
                          editarFormacion(item)
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
                        style={[
                          styles.actionButton,
                          {
                            backgroundColor: "#fee2e2",
                          },
                        ]}
                        onPress={() =>
                          eliminar(item.id)
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