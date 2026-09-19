import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import styles from "../styles/FormularioStyles";

export default function FormacionFormulario({
  mostrarFormulario,
  setMostrarFormulario,

  editando,

  guardarEdicion,
  crearFormacion,

  empleado,
  setEmpleado,

  puesto,
  setPuesto,

  departamento,
  setDepartamento,

  curso,
  setCurso,

  categoria,
  setCategoria,

  proveedor,
  setProveedor,

  modalidad,
  setModalidad,

  responsable,
  setResponsable,

  horas,
  setHoras,

  coste,
  setCoste,

  fechaInicio,
  setFechaInicio,

  fechaFin,
  setFechaFin,

  fechaRenovacion,
  setFechaRenovacion,

  metodoEvaluacion,
  setMetodoEvaluacion,

  resultadoEvaluacion,
  setResultadoEvaluacion,

  nota,
  setNota,

  competencia,
  setCompetencia,

  certificado,
  setCertificado,

  numeroCertificado,
  setNumeroCertificado,

  organismoEmisor,
  setOrganismoEmisor,

  fechaCertificacion,
  setFechaCertificacion,

  requiereRenovacion,
  setRequiereRenovacion,

  vigenciaMeses,
  setVigenciaMeses,

  vencimiento,
  setVencimiento,

  adr,
  setAdr,

  carretillas,
  setCarretillas,

  manipulacionCargas,
  setManipulacionCargas,

  seguridadVial,
  setSeguridadVial,

  puenteGrua,
  setPuenteGrua,

  maquinaria,
  setMaquinaria,

  obligatoria,
  setObligatoria,

  criticidad,
  setCriticidad,

  evidenciaDisponible,
  setEvidenciaDisponible,

  eficaz,
  setEficaz,

  requisitoLegal,
  setRequisitoLegal,

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
            ? "✏️ Editar Formación"
            : "🎓 Nueva Formación"}
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
          {/* EMPLEADO */}

          <Text style={styles.sectionTitle}>
            👤 Empleado
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Empleado"
            value={empleado}
            onChangeText={setEmpleado}
          />

          <TextInput
            style={styles.input}
            placeholder="Puesto"
            value={puesto}
            onChangeText={setPuesto}
          />

          <TextInput
            style={styles.input}
            placeholder="Departamento"
            value={departamento}
            onChangeText={setDepartamento}
          />

          {/* FORMACIÓN */}

          <Text style={styles.sectionTitle}>
            🎓 Formación
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Curso"
            value={curso}
            onChangeText={setCurso}
          />

          <TextInput
            style={styles.input}
            placeholder="Categoría"
            value={categoria}
            onChangeText={setCategoria}
          />

          <TextInput
            style={styles.input}
            placeholder="Proveedor"
            value={proveedor}
            onChangeText={setProveedor}
          />

          <TextInput
            style={styles.input}
            placeholder="Modalidad"
            value={modalidad}
            onChangeText={setModalidad}
          />

          <TextInput
            style={styles.input}
            placeholder="Responsable"
            value={responsable}
            onChangeText={setResponsable}
          />

          <TextInput
            style={styles.input}
            placeholder="Horas"
            value={horas}
            onChangeText={setHoras}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Coste"
            value={coste}
            onChangeText={setCoste}
            keyboardType="numeric"
          />

          {/* FECHAS */}

          <Text style={styles.sectionTitle}>
            📅 Fechas
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Fecha Inicio"
            value={fechaInicio}
            onChangeText={setFechaInicio}
          />

          <TextInput
            style={styles.input}
            placeholder="Fecha Fin"
            value={fechaFin}
            onChangeText={setFechaFin}
          />

          <TextInput
            style={styles.input}
            placeholder="Próxima Renovación"
            value={fechaRenovacion}
            onChangeText={setFechaRenovacion}
          />

          {/* EVALUACIÓN */}

          <Text style={styles.sectionTitle}>
            ✅ Evaluación
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Método de Evaluación"
            value={metodoEvaluacion}
            onChangeText={setMetodoEvaluacion}
          />

          <TextInput
            style={styles.input}
            placeholder="Resultado Evaluación"
            value={resultadoEvaluacion}
            onChangeText={setResultadoEvaluacion}
          />

          <TextInput
            style={styles.input}
            placeholder="Nota"
            value={nota}
            onChangeText={setNota}
          />

          <TextInput
            style={styles.input}
            placeholder="Competencia Adquirida"
            value={competencia}
            onChangeText={setCompetencia}
          />

          {/* CERTIFICACIÓN */}

          <Text style={styles.sectionTitle}>
            📜 Certificación
          </Text>

          <TouchableOpacity
            style={styles.input}
            onPress={() => setCertificado(!certificado)}
          >
            <Text>
              Certificado: {certificado ? "Sí" : "No"}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Número Certificado"
            value={numeroCertificado}
            onChangeText={setNumeroCertificado}
          />

          <TextInput
            style={styles.input}
            placeholder="Organismo emisor"
            value={organismoEmisor}
            onChangeText={setOrganismoEmisor}
          />

          <TextInput
            style={styles.input}
            placeholder="Fecha certificación (DD-MM-YYYY)"
            value={fechaCertificacion}
            onChangeText={setFechaCertificacion}
          />

          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              setRequiereRenovacion(!requiereRenovacion)
            }
          >
            <Text>
              ¿Requiere renovación periódica?:{" "}
              {requiereRenovacion ? "Sí" : "No"}
            </Text>
          </TouchableOpacity>

          {requiereRenovacion && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Vigencia (meses)"
                keyboardType="numeric"
                value={vigenciaMeses}
                onChangeText={setVigenciaMeses}
              />

              <TextInput
                style={styles.input}
                placeholder="Fecha de vencimiento (DD-MM-YYYY)"
                value={vencimiento}
                onChangeText={setVencimiento}
              />
            </>
          )}

          {/* HABILITACIONES LOGÍSTICAS */}

          <Text style={styles.sectionTitle}>
            🚚 Habilitaciones Logísticas
          </Text>

          <Text style={styles.sectionSubtitle}>
            Indicar fecha de vigencia si aplica, o dejar vacío
            si no procede para este puesto
          </Text>

          <TextInput
            style={styles.input}
            placeholder="ADR (mercancías peligrosas)"
            value={adr}
            onChangeText={setAdr}
          />

          <TextInput
            style={styles.input}
            placeholder="Carné de carretillas elevadoras"
            value={carretillas}
            onChangeText={setCarretillas}
          />

          <TextInput
            style={styles.input}
            placeholder="Manipulación manual de cargas"
            value={manipulacionCargas}
            onChangeText={setManipulacionCargas}
          />

          <TextInput
            style={styles.input}
            placeholder="Seguridad vial"
            value={seguridadVial}
            onChangeText={setSeguridadVial}
          />

          <TextInput
            style={styles.input}
            placeholder="Puente grúa"
            value={puenteGrua}
            onChangeText={setPuenteGrua}
          />

          <TextInput
            style={styles.input}
            placeholder="Otra maquinaria"
            value={maquinaria}
            onChangeText={setMaquinaria}
          />

          {/* ISO */}

          <Text style={styles.sectionTitle}>
            ✅ Cumplimiento ISO
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Requisito Legal"
            value={requisitoLegal}
            onChangeText={setRequisitoLegal}
          />

          <TouchableOpacity
            style={styles.input}
            onPress={() => setObligatoria(!obligatoria)}
          >
            <Text>
              Formación obligatoria: {obligatoria ? "Sí" : "No"}
            </Text>
          </TouchableOpacity>

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

          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              setEvidenciaDisponible(!evidenciaDisponible)
            }
          >
            <Text>
              Evidencia documental disponible:{" "}
              {evidenciaDisponible ? "Sí" : "No"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.input}
            onPress={() => setEficaz(!eficaz)}
          >
            <Text>
              Eficacia validada (ISO 7.2 / 10.2):{" "}
              {eficaz ? "Sí" : "No"}
            </Text>
          </TouchableOpacity>

          {/* OBSERVACIONES */}

          <Text style={styles.sectionTitle}>
            📝 Observaciones
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
            onChangeText={setObservaciones}
            multiline
          />

          <TouchableOpacity
            style={styles.button}
            onPress={
              editando
                ? guardarEdicion
                : crearFormacion
            }
          >
            <Text style={styles.buttonText}>
              {editando
                ? "Actualizar Formación"
                : "Crear Formación"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}