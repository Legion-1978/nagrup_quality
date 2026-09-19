import React from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import styles from "../styles/FormularioStyles";

export default function ProcedimientoFormulario({
  mostrarFormulario,
  setMostrarFormulario,

  editando,

  guardarEdicion,
  crearProcedimiento,

  codigo,

  titulo,
  setTitulo,

  descripcion,
  setDescripcion,

  objetivo,
  setObjetivo,

  alcance,
  setAlcance,

  proceso,
  setProceso,

  responsable,
  setResponsable,

  departamento,
  setDepartamento,

  tipo,
  setTipo,

  categoria,
  setCategoria,

  propietarioProceso,
  setPropietarioProceso,

  aprobador,
  setAprobador,

  riesgo,
  setRiesgo,

  criticidad,
  setCriticidad,

  version,
  setVersion,

  estado,
  setEstado,

  fechaEmision,
  setFechaEmision,

  fechaRevision,
  setFechaRevision,

  fechaProximaRevision,
  setFechaProximaRevision,

  observaciones,
  setObservaciones,
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
            ? "✏️ Editar Procedimiento"
            : "📄 Nuevo Procedimiento"}
        </Text>

        <Text style={styles.expandIcon}>
          {mostrarFormulario
            ? "▲"
            : "▼"}
        </Text>
      </TouchableOpacity>

      {mostrarFormulario && (

        <ScrollView
          showsVerticalScrollIndicator={false}
        >

          {/* IDENTIFICACIÓN */}

          <Text style={styles.sectionTitle}>
            📋 Identificación
          </Text>

          <TextInput
            style={[
              styles.input,
              { backgroundColor: "#F1F5F9", color: "#64748B" },
            ]}
            placeholder="Se genera automáticamente al guardar"
            value={codigo}
            editable={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Título"
            value={titulo}
            onChangeText={setTitulo}
          />

          <TextInput
            style={styles.input}
            placeholder="Tipo de procedimiento"
            value={tipo}
            onChangeText={setTipo}
          />

          <TextInput
            style={styles.input}
            placeholder="Categoría"
            value={categoria}
            onChangeText={setCategoria}
          />

          <TextInput
            style={styles.input}
            placeholder="Versión"
            value={version}
            onChangeText={setVersion}
          />

          <TextInput
            style={styles.input}
            placeholder="Estado"
            value={estado}
            onChangeText={setEstado}
          />

          {/* CONTROL DOCUMENTAL (ISO 7.5) */}

          <Text style={styles.sectionTitle}>
            🗂️ Control Documental (ISO 9001 - 7.5)
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Propietario del proceso"
            value={propietarioProceso}
            onChangeText={setPropietarioProceso}
          />

          <TextInput
            style={styles.input}
            placeholder="Aprobador"
            value={aprobador}
            onChangeText={setAprobador}
          />

          <TextInput
            style={[
              styles.input,
              {
                height: 90,
                textAlignVertical: "top",
              },
            ]}
            placeholder="Riesgo asociado"
            value={riesgo}
            onChangeText={setRiesgo}
            multiline
          />

          <Text style={styles.sectionSubtitle}>
            Criticidad
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 12,
            }}
          >
            {["Baja", "Media", "Alta"].map((nivel) => (
              <TouchableOpacity
                key={nivel}
                onPress={() => setCriticidad(nivel)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor:
                    criticidad === nivel
                      ? "#1D4ED8"
                      : "#E2E8F0",
                }}
              >
                <Text
                  style={{
                    color:
                      criticidad === nivel
                        ? "#FFFFFF"
                        : "#334155",
                    fontWeight: "600",
                  }}
                >
                  {nivel}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* RESPONSABLES */}

          <Text style={styles.sectionTitle}>
            👤 Responsables
          </Text>

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
            placeholder="Departamento"
            value={departamento}
            onChangeText={
              setDepartamento
            }
          />

          {/* DESCRIPCIÓN */}

          <Text style={styles.sectionTitle}>
            📝 Contenido
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                height: 100,
                textAlignVertical: "top",
              },
            ]}
            placeholder="Descripción"
            value={descripcion}
            onChangeText={
              setDescripcion
            }
            multiline
          />

          <TextInput
            style={[
              styles.input,
              {
                height: 90,
                textAlignVertical: "top",
              },
            ]}
            placeholder="Objetivo"
            value={objetivo}
            onChangeText={setObjetivo}
            multiline
          />

          <TextInput
            style={[
              styles.input,
              {
                height: 90,
                textAlignVertical: "top",
              },
            ]}
            placeholder="Alcance"
            value={alcance}
            onChangeText={setAlcance}
            multiline
          />

          <TextInput
            style={[
              styles.input,
              {
                height: 120,
                textAlignVertical: "top",
              },
            ]}
            placeholder="Proceso"
            value={proceso}
            onChangeText={setProceso}
            multiline
          />

          {/* FECHAS */}

          <Text style={styles.sectionTitle}>
            📅 Fechas
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Fecha emisión (DD/MM/YYYY)"
            value={fechaEmision}
            onChangeText={
              setFechaEmision
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Fecha revisión (DD/MM/YYYY)"
            value={fechaRevision}
            onChangeText={
              setFechaRevision
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Fecha próxima revisión (DD/MM/YYYY)"
            value={fechaProximaRevision}
            onChangeText={
              setFechaProximaRevision
            }
          />

          {/* OBSERVACIONES */}

          <Text style={styles.sectionTitle}>
            📌 Observaciones
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                height: 100,
                textAlignVertical: "top",
              },
            ]}
            placeholder="Observaciones"
            value={observaciones}
            onChangeText={
              setObservaciones
            }
            multiline
          />

          <TouchableOpacity
            style={styles.button}
            onPress={
              editando
                ? guardarEdicion
                : crearProcedimiento
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              {editando
                ? "Actualizar Procedimiento"
                : "Crear Procedimiento"}
            </Text>
          </TouchableOpacity>

        </ScrollView>

      )}
    </View>
  );
}