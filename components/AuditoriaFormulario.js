import React from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "../styles/FormularioStyles";

export default function AuditoriaFormulario({
  mostrarFormulario,
  setMostrarFormulario,

  editando,
  guardarEdicion,
  crearAuditoria,

  codigoAuditoria,

  tipo,
  setTipo,

  norma,
  setNorma,

  auditor,
  setAuditor,

  responsableAuditado,
  setResponsableAuditado,

  alcance,
  setAlcance,

  criterioAuditoria,
  setCriterioAuditoria,

  fecha,
  setFecha,

  resultado,
  setResultado,

  conclusion,
  setConclusion,
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
            ? "✏️ Editar Auditoría"
            : "📝 Nueva Auditoría"}
        </Text>

        <Text style={styles.expandIcon}>
          {mostrarFormulario
            ? "▲"
            : "▼"}
        </Text>

      </TouchableOpacity>

      {mostrarFormulario && (

        <>

          <TextInput
            style={[
              styles.input,
              { backgroundColor: "#F1F5F9", color: "#64748B" },
            ]}
            placeholder="Se genera automáticamente al guardar"
            value={codigoAuditoria}
            editable={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Tipo (Interna / Externa / Certificación)"
            value={tipo}
            onChangeText={setTipo}
          />

          <TextInput
            style={styles.input}
            placeholder="Norma (ISO 9001, ISO 14001...)"
            value={norma}
            onChangeText={setNorma}
          />

          <TextInput
            style={styles.input}
            placeholder="Auditor"
            value={auditor}
            onChangeText={setAuditor}
          />

          <TextInput
            style={styles.input}
            placeholder="Responsable auditado"
            value={responsableAuditado}
            onChangeText={
              setResponsableAuditado
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Alcance de auditoría"
            value={alcance}
            onChangeText={setAlcance}
          />

          <TextInput
            style={styles.input}
            placeholder="Criterio de auditoría"
            value={criterioAuditoria}
            onChangeText={
              setCriterioAuditoria
            }
          />

          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            value={fecha}
            onChangeText={setFecha}
          />

          <TextInput
            style={styles.input}
            placeholder="Resultado"
            value={resultado}
            onChangeText={
              setResultado
            }
          />

          <TextInput
            style={[
              styles.input,
              {
                height: 100,
                textAlignVertical:
                  "top",
              },
            ]}
            placeholder="Conclusión de auditoría"
            value={conclusion}
            onChangeText={
              setConclusion
            }
            multiline
          />

          <TouchableOpacity
            style={styles.button}
            onPress={
              editando
                ? guardarEdicion
                : crearAuditoria
            }
          >

            <Text
              style={
                styles.buttonText
              }
            >
              {editando
                ? "Actualizar Auditoría"
                : "Crear Auditoría"}
            </Text>

          </TouchableOpacity>

        </>

      )}

    </View>

  );
}