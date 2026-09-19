import React from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "../styles/FormularioStyles";

export default function IncidenciaFormulario({
  mostrarFormulario,
  setMostrarFormulario,

  editando,
  guardarEdicion,
  crearIncidencia,

  numeroIncidencia,

  area,
  setArea,

  proceso,
  setProceso,

  turno,
  setTurno,

  ubicacion,
  setUbicacion,

  categoria,
  setCategoria,

  subcategoria,
  setSubcategoria,

  origen,
  setOrigen,

  problema,
  setProblema,

  sku,
  setSku,

  cantidadAfectada,
  setCantidadAfectada,

  impactoEconomico,
  setImpactoEconomico,

  responsable,
  setResponsable,

  fechaCompromiso,
  setFechaCompromiso,

  causaRaiz,
  setCausaRaiz,

  accionInmediata,
  setAccionInmediata,

  accionCorrectiva,
  setAccionCorrectiva,

  accionPreventiva,
  setAccionPreventiva,
}) {
return (
  <View style={styles.card}>
    <TouchableOpacity
      style={styles.sectionHeader}
      onPress={() =>
        setMostrarFormulario(
          !mostrarFormulario
        )
      }
    >
      <Text style={styles.cardTitle}>
        {editando
          ? "✏️ Editar Incidencia"
          : "📝 Nueva Incidencia"}
      </Text>

      <Text style={styles.expandIcon}>
        {mostrarFormulario
          ? "▲"
          : "▼"}
      </Text>
    </TouchableOpacity>

    {mostrarFormulario && (
      <>
        {/* IDENTIFICACIÓN */}

        <TextInput
          style={[
            styles.input,
            { backgroundColor: "#F1F5F9", color: "#64748B" },
          ]}
          placeholder="Se genera automáticamente al guardar"
          value={numeroIncidencia}
          editable={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Área"
          value={area}
          onChangeText={setArea}
        />

        <TextInput
          style={styles.input}
          placeholder="Proceso"
          value={proceso}
          onChangeText={
            setProceso
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Turno"
          value={turno}
          onChangeText={setTurno}
        />

        <TextInput
          style={styles.input}
          placeholder="Ubicación"
          value={ubicacion}
          onChangeText={
            setUbicacion
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Categoría"
          value={categoria}
          onChangeText={
            setCategoria
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Subcategoría"
          value={subcategoria}
          onChangeText={
            setSubcategoria
          }
        />

        <Text style={styles.sectionSubtitle}>
          Origen
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 12,
          }}
        >
          {["Interna", "Cliente", "Proveedor", "Auditoría"].map(
            (op) => (
              <TouchableOpacity
                key={op}
                onPress={() => setOrigen(op)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor:
                    origen === op
                      ? "#1D4ED8"
                      : "#E2E8F0",
                }}
              >
                <Text
                  style={{
                    color:
                      origen === op
                        ? "#FFFFFF"
                        : "#334155",
                    fontWeight: "600",
                  }}
                >
                  {op}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="SKU / Referencia"
          value={sku}
          onChangeText={setSku}
        />

        {/* IMPACTO */}

        <TextInput
          style={styles.input}
          placeholder="Cantidad afectada"
          keyboardType="numeric"
          value={
            cantidadAfectada
          }
          onChangeText={
            setCantidadAfectada
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Impacto económico (€)"
          keyboardType="numeric"
          value={
            impactoEconomico
          }
          onChangeText={
            setImpactoEconomico
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Responsable"
          value={responsable}
          onChangeText={
            setResponsable
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Fecha compromiso (dd/mm/yyyy)"
          value={
            fechaCompromiso
          }
          onChangeText={
            setFechaCompromiso
          }
        />

        {/* DESCRIPCIÓN */}

        <TextInput
          style={[
            styles.input,
            {
              minHeight: 100,
            },
          ]}
          placeholder="Descripción detallada de la incidencia"
          multiline
          textAlignVertical="top"
          value={problema}
          onChangeText={
            setProblema
          }
        />

        {/* CAUSA RAÍZ */}

        <TextInput
          style={[
            styles.input,
            {
              minHeight: 100,
            },
          ]}
          placeholder="Análisis de causa raíz"
          multiline
          textAlignVertical="top"
          value={causaRaiz}
          onChangeText={
            setCausaRaiz
          }
        />

        {/* CONTENCIÓN */}

        <TextInput
          style={[
            styles.input,
            {
              minHeight: 100,
            },
          ]}
          placeholder="Acción inmediata / contención"
          multiline
          textAlignVertical="top"
          value={
            accionInmediata
          }
          onChangeText={
            setAccionInmediata
          }
        />

        {/* ACCIÓN CORRECTIVA */}

        <TextInput
          style={[
            styles.input,
            {
              minHeight: 100,
            },
          ]}
          placeholder="Acción correctiva"
          multiline
          textAlignVertical="top"
          value={
            accionCorrectiva
          }
          onChangeText={
            setAccionCorrectiva
          }
        />

        {/* ACCIÓN PREVENTIVA */}

        <TextInput
          style={[
            styles.input,
            {
              minHeight: 100,
            },
          ]}
          placeholder="Acción preventiva"
          multiline
          textAlignVertical="top"
          value={
            accionPreventiva
          }
          onChangeText={
            setAccionPreventiva
          }
        />

        <TouchableOpacity
          style={styles.button}
          onPress={
            editando
              ? guardarEdicion
              : crearIncidencia
          }
        >
          <Text
            style={
              styles.buttonText
            }
          >
            {editando
              ? "Actualizar Incidencia"
              : "Crear Incidencia"}
          </Text>
        </TouchableOpacity>
      </>
    )}
  </View>
);
}