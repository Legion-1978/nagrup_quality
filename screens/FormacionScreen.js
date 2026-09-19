import React, {
  useMemo,
  useState,
} from "react";

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";

import KPIBox from "../components/KPIBox";
import ScreenLayout from "../components/ScreenLayout";

import FormacionFormulario from "../components/FormacionFormulario";
import FormacionTabla from "../components/FormacionTabla";
import FormacionDetalleModal from "../components/FormacionDetalleModal";

import { useQuality } from "../context/QualityContext";
import { useAuth } from "../context/AuthContext";
import {
  generarSiguienteId,
  PREFIJOS_ID,
} from "../utils/correlativos";

import {
  calcularKPIsFormacion,
} from "../utils/formacionKPI";

import { formacionSchema } from "../schemas/formacionSchema";
import { validar } from "../schemas/validar";
import { mostrarMensaje } from "../utils/mensajes";

export default function FormacionScreen() {

  const {
    formaciones = [],
    actualizarFormaciones,
  } = useQuality();

  const { tienePermisoEdicion } = useAuth();

  const puedeEditar = tienePermisoEdicion("formacion");

  const [
    mostrarFormulario,
    setMostrarFormulario,
  ] = useState(false);

  const [
    editando,
    setEditando,
  ] = useState(null);

  const [
    busqueda,
    setBusqueda,
  ] = useState("");

  const [
    detalleFormacion,
    setDetalleFormacion,
  ] = useState(null);

  const [
    mostrarDetalle,
    setMostrarDetalle,
  ] = useState(false);

  /* EMPLEADO */

  const [empleado, setEmpleado] =
    useState("");

  const [
    codigoEmpleado,
    setCodigoEmpleado,
  ] = useState("");

  const [puesto, setPuesto] =
    useState("");

  const [
    departamento,
    setDepartamento,
  ] = useState("");

  /* FORMACIÓN */

  const [curso, setCurso] =
    useState("");

  const [
    categoria,
    setCategoria,
  ] = useState("");

  const [
    proveedor,
    setProveedor,
  ] = useState("");

  const [
    modalidad,
    setModalidad,
  ] = useState("Presencial");

const [
  nuevoComentario,
  setNuevoComentario,
] = useState("");

  const [
    responsable,
    setResponsable,
  ] = useState("");

  const [horas, setHoras] =
    useState("");

  const [coste, setCoste] =
    useState("");

  /* FECHAS */

  const [
    fechaInicio,
    setFechaInicio,
  ] = useState("");

  const [
    fechaFin,
    setFechaFin,
  ] = useState("");

  const [
    fechaRenovacion,
    setFechaRenovacion,
  ] = useState("");

  /* EVALUACIÓN */

  const [
    metodoEvaluacion,
    setMetodoEvaluacion,
  ] = useState("");

  const [
    resultadoEvaluacion,
    setResultadoEvaluacion,
  ] = useState("");

  const [nota, setNota] =
    useState("");

  const [
    competencia,
    setCompetencia,
  ] = useState("");

  /* CERTIFICACIÓN */

  const [
    certificado,
    setCertificado,
  ] = useState(false);

  const [
    numeroCertificado,
    setNumeroCertificado,
  ] = useState("");

  const [
    organismoEmisor,
    setOrganismoEmisor,
  ] = useState("");

  const [
    fechaCertificacion,
    setFechaCertificacion,
  ] = useState("");

  const [
    requiereRenovacion,
    setRequiereRenovacion,
  ] = useState(false);

  const [
    vigenciaMeses,
    setVigenciaMeses,
  ] = useState("");

  const [
    vencimiento,
    setVencimiento,
  ] = useState("");

  /* HABILITACIONES LOGÍSTICAS */

  const [adr, setAdr] =
    useState("");

  const [
    carretillas,
    setCarretillas,
  ] = useState("");

  const [
    manipulacionCargas,
    setManipulacionCargas,
  ] = useState("");

  const [
    seguridadVial,
    setSeguridadVial,
  ] = useState("");

  const [
    puenteGrua,
    setPuenteGrua,
  ] = useState("");

  const [
    maquinaria,
    setMaquinaria,
  ] = useState("");

  /* ISO / RIESGO */

  const [
    obligatoria,
    setObligatoria,
  ] = useState(false);

  const [
    criticidad,
    setCriticidad,
  ] = useState("Media");

  const [
    evidenciaDisponible,
    setEvidenciaDisponible,
  ] = useState(false);

  const [eficaz, setEficaz] =
    useState(false);

  /* ISO */

  const [
    requisitoLegal,
    setRequisitoLegal,
  ] = useState("");

  /* OBSERVACIONES */

  const [
    observaciones,
    setObservaciones,
  ] = useState("");

  const limpiarFormulario = () => {

    setEmpleado("");
    setCodigoEmpleado("");

    setPuesto("");
    setDepartamento("");

    setCurso("");
    setCategoria("");

    setProveedor("");

    setModalidad(
      "Presencial"
    );

    setResponsable("");

    setHoras("");
    setCoste("");

    setFechaInicio("");
    setFechaFin("");
    setFechaRenovacion("");

    setMetodoEvaluacion("");
    setResultadoEvaluacion("");

    setNota("");

    setCompetencia("");

    setCertificado(false);

    setNumeroCertificado("");
    setOrganismoEmisor("");
    setFechaCertificacion("");
    setRequiereRenovacion(false);
    setVigenciaMeses("");
    setVencimiento("");

    setAdr("");
    setCarretillas("");
    setManipulacionCargas("");
    setSeguridadVial("");
    setPuenteGrua("");
    setMaquinaria("");

    setObligatoria(false);
    setCriticidad("Media");
    setEvidenciaDisponible(false);
    setEficaz(false);

    setRequisitoLegal("");

    setObservaciones("");

    setEditando(null);
  };

  const crearFormacion = async () => {

    if (!puedeEditar) {
      return;
    }

    const validacion = validar(formacionSchema, {
      empleado,
      puesto,
      departamento,
      curso,
      categoria,
      proveedor,
      modalidad,
      responsable,
      horas,
      coste,
      fechaInicio,
      fechaFin,
      fechaRenovacion,
      metodoEvaluacion,
      resultadoEvaluacion,
      nota,
      competencia,
      certificado,
      numeroCertificado,
      organismoEmisor,
      fechaCertificacion,
      requiereRenovacion,
      vigenciaMeses,
      vencimiento,
      adr,
      carretillas,
      manipulacionCargas,
      seguridadVial,
      puenteGrua,
      maquinaria,
      obligatoria,
      criticidad,
      evidenciaDisponible,
      eficaz,
      requisitoLegal,
      observaciones,
    });

    if (!validacion.ok) {
      mostrarMensaje("Validación", validacion.mensaje);
      return;
    }

    const id = await generarSiguienteId(
      PREFIJOS_ID.FORMACION
    );

    const nueva = {

      id,

      empleado,

      codigoEmpleado,

      puesto,

      departamento,

      curso,

      categoria,

      proveedor,

      modalidad,

      responsable,

      horas: Number(horas || 0),

      coste: Number(coste || 0),

      fechaInicio,

      fechaFin,

      fechaRenovacion,

      metodoEvaluacion,

      resultadoEvaluacion,

      nota,

      competencia,

      certificado,

      numeroCertificado,

      organismoEmisor,

      fechaCertificacion,

      requiereRenovacion,

      vigenciaMeses,

      vencimiento,

      adr,

      carretillas,

      manipulacionCargas,

      seguridadVial,

      puenteGrua,

      maquinaria,

      obligatoria,

      criticidad,

      evidenciaDisponible,

      eficaz,

      requisitoLegal,

      observaciones,

      estadoFormacion:
        "Planificada",

      evidencias: [],

      comentarios: [],

      historial: [],
    };

    actualizarFormaciones([
      ...formaciones,
      nueva,
    ]);

    limpiarFormulario();

    setMostrarFormulario(
      false
    );
  };

  const guardarEdicion = () => {

    if (!puedeEditar) {
      return;
    }

    const validacion = validar(formacionSchema, {
      empleado,
      puesto,
      departamento,
      curso,
      categoria,
      proveedor,
      modalidad,
      responsable,
      horas,
      coste,
      fechaInicio,
      fechaFin,
      fechaRenovacion,
      metodoEvaluacion,
      resultadoEvaluacion,
      nota,
      competencia,
      certificado,
      numeroCertificado,
      organismoEmisor,
      fechaCertificacion,
      requiereRenovacion,
      vigenciaMeses,
      vencimiento,
      adr,
      carretillas,
      manipulacionCargas,
      seguridadVial,
      puenteGrua,
      maquinaria,
      obligatoria,
      criticidad,
      evidenciaDisponible,
      eficaz,
      requisitoLegal,
      observaciones,
    });

    if (!validacion.ok) {
      mostrarMensaje("Validación", validacion.mensaje);
      return;
    }

    const lista =
      formaciones.map(
        item =>

          item.id === editando
            ? {
                ...item,

                empleado,

                codigoEmpleado,

                puesto,

                departamento,

                curso,

                categoria,

                proveedor,

                modalidad,

                responsable,

                horas:
                  Number(
                    horas || 0
                  ),

                coste:
                  Number(
                    coste || 0
                  ),

                fechaInicio,

                fechaFin,

                fechaRenovacion,

                metodoEvaluacion,

                resultadoEvaluacion,

                nota,

                competencia,

                certificado,

                numeroCertificado,

                organismoEmisor,

                fechaCertificacion,

                requiereRenovacion,

                vigenciaMeses,

                vencimiento,

                adr,

                carretillas,

                manipulacionCargas,

                seguridadVial,

                puenteGrua,

                maquinaria,

                obligatoria,

                criticidad,

                evidenciaDisponible,

                eficaz,

                requisitoLegal,

                observaciones,
              }
            : item
      );

    actualizarFormaciones(lista);

    limpiarFormulario();

    setMostrarFormulario(
      false
    );
  };

  const eliminar = id => {

    if (!puedeEditar) {
      return;
    }

    actualizarFormaciones(
      formaciones.filter(
        item =>
          item.id !== id
      )
    );
  };

  const cambiarEstado = id => {

    if (!puedeEditar) {
      return;
    }

    const estados = [
      "Planificada",
      "En Curso",
      "Completada",
    ];

    const lista =
      formaciones.map(
        item => {

          if (
            item.id !== id
          ) {
            return item;
          }

          const indice =
            estados.indexOf(
              item.estadoFormacion
            );

          return {
            ...item,

            estadoFormacion:
              estados[
                indice ===
                estados.length - 1
                  ? 0
                  : indice + 1
              ],
          };
        }
      );

    actualizarFormaciones(lista);
  };

  const verDetalle = (
    formacion
  ) => {

    setDetalleFormacion(
      formacion
    );

    setMostrarDetalle(
      true
    );
  };

  const editarFormacion = (
    formacion
  ) => {

    if (!puedeEditar) {
      return;
    }

    setEditando(
      formacion.id
    );

    setEmpleado(
      formacion.empleado || ""
    );

    setCodigoEmpleado(
      formacion.codigoEmpleado || ""
    );

    setPuesto(
      formacion.puesto || ""
    );

    setDepartamento(
      formacion.departamento ||
        ""
    );

    setCurso(
      formacion.curso || ""
    );

    setCategoria(
      formacion.categoria || ""
    );

    setProveedor(
      formacion.proveedor || ""
    );

    setModalidad(
      formacion.modalidad ||
        "Presencial"
    );

    setResponsable(
      formacion.responsable ||
        ""
    );

    setHoras(
      String(
        formacion.horas || ""
      )
    );

    setCoste(
      String(
        formacion.coste || ""
      )
    );

    setFechaInicio(
      formacion.fechaInicio ||
        ""
    );

    setFechaFin(
      formacion.fechaFin || ""
    );

    setFechaRenovacion(
      formacion.fechaRenovacion ||
        ""
    );

    setMetodoEvaluacion(
      formacion.metodoEvaluacion ||
        ""
    );

    setResultadoEvaluacion(
      formacion.resultadoEvaluacion ||
        ""
    );

    setNota(
      String(
        formacion.nota || ""
      )
    );

    setCompetencia(
      formacion.competencia ||
        ""
    );

    setCertificado(
      formacion.certificado ||
        false
    );

    setNumeroCertificado(
      formacion.numeroCertificado ||
        ""
    );

    setOrganismoEmisor(
      formacion.organismoEmisor || ""
    );

    setFechaCertificacion(
      formacion.fechaCertificacion || ""
    );

    setRequiereRenovacion(
      formacion.requiereRenovacion || false
    );

    setVigenciaMeses(
      String(formacion.vigenciaMeses || "")
    );

    setVencimiento(
      formacion.vencimiento || ""
    );

    setAdr(formacion.adr || "");

    setCarretillas(
      formacion.carretillas || ""
    );

    setManipulacionCargas(
      formacion.manipulacionCargas || ""
    );

    setSeguridadVial(
      formacion.seguridadVial || ""
    );

    setPuenteGrua(
      formacion.puenteGrua || ""
    );

    setMaquinaria(
      formacion.maquinaria || ""
    );

    setObligatoria(
      formacion.obligatoria || false
    );

    setCriticidad(
      formacion.criticidad || "Media"
    );

    setEvidenciaDisponible(
      formacion.evidenciaDisponible || false
    );

    setEficaz(
      formacion.eficaz || false
    );

    setRequisitoLegal(
      formacion.requisitoLegal ||
        ""
    );

    setObservaciones(
      formacion.observaciones ||
        ""
    );

    setMostrarDetalle(
      false
    );

    setMostrarFormulario(
      true
    );
  };

const agregarComentario = () => {

  if (!puedeEditar) {
    return;
  }

  if (
    !nuevoComentario.trim() ||
    !detalleFormacion
  ) {
    return;
  }

  const comentario = {
    autor: "Usuario",
    texto: nuevoComentario,
    fecha:
      new Date().toLocaleDateString(
        "es-ES"
      ),
  };

  const nuevasFormaciones =
    formaciones.map(item =>

      item.id ===
      detalleFormacion.id

        ? {
            ...item,

            comentarios: [
              ...(item.comentarios ||
                []),

              comentario,
            ],
          }

        : item
    );

  actualizarFormaciones(
    nuevasFormaciones
  );

  setDetalleFormacion({
    ...detalleFormacion,

    comentarios: [
      ...(detalleFormacion.comentarios ||
        []),

      comentario,
    ],
  });

  setNuevoComentario("");
};

const agregarEvidencia = () => {

  if (!puedeEditar) {
    return;
  }

  if (!detalleFormacion) {
    return;
  }

  const evidencia = {
    id:
      "EVD-" +
      Date.now(),

    nombre:
      "Nueva Evidencia",

    fecha:
      new Date().toLocaleDateString(
        "es-ES"
      ),
  };

  const nuevasFormaciones =
    formaciones.map(item =>

      item.id ===
      detalleFormacion.id

        ? {
            ...item,

            evidencias: [
              ...(item.evidencias ||
                []),

              evidencia,
            ],
          }

        : item
    );

  actualizarFormaciones(
    nuevasFormaciones
  );

  setDetalleFormacion({
    ...detalleFormacion,

    evidencias: [
      ...(detalleFormacion.evidencias ||
        []),

      evidencia,
    ],
  });
};

const eliminarEvidencia = (
  evidenciaId
) => {

  if (!puedeEditar) {
    return;
  }

  if (!detalleFormacion) {
    return;
  }

  const nuevasFormaciones =
    formaciones.map(item =>

      item.id ===
      detalleFormacion.id

        ? {
            ...item,

            evidencias:
              item.evidencias?.filter(
                evidencia =>
                  evidencia.id !==
                  evidenciaId
              ) || [],
          }

        : item
    );

  actualizarFormaciones(
    nuevasFormaciones
  );

  setDetalleFormacion({
    ...detalleFormacion,

    evidencias:
      detalleFormacion.evidencias?.filter(
        evidencia =>
          evidencia.id !==
          evidenciaId
      ) || [],
  });
};

  const formacionesFiltradas =
    formaciones.filter(
      item => {

        const texto =
          busqueda.toLowerCase();

        return (

          item.empleado
            ?.toLowerCase()
            .includes(texto)

          ||

          item.curso
            ?.toLowerCase()
            .includes(texto)

          ||

          item.responsable
            ?.toLowerCase()
            .includes(texto)

          ||

          item.estadoFormacion
            ?.toLowerCase()
            .includes(texto)

          ||

          item.departamento
            ?.toLowerCase()
            .includes(texto)

        );
      }
    );

  const kpis = useMemo(
    () =>
      calcularKPIsFormacion(
        formaciones
      ),
    [formaciones]
  );

return (
  <ScreenLayout>

    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>
          🎓 Formación
        </Text>

        <Text style={styles.subtitle}>
          Gestión de competencias, cursos y certificaciones ISO
        </Text>
      </View>

{/* KPI PRINCIPALES */}

<View style={styles.kpiContainer}>

  <KPIBox
    style={styles.kpiCard}
    title="Total"
    value={kpis.total}
    detail="Formaciones registradas"
    icon="🎓"
    color="#2563eb"
    cardStyle={styles.kpiTotal}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Planificadas"
    value={kpis.planificadas}
    detail="Pendientes inicio"
    icon="📋"
    color="#7c3aed"
    cardStyle={styles.kpiPlanificadas}
  />

  <KPIBox
    style={styles.kpiCard}
    title="En Curso"
    value={kpis.enCurso}
    detail="Actualmente activas"
    icon="🚀"
    color="#f97316"
    cardStyle={styles.kpiCurso}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Completadas"
    value={kpis.completadas}
    detail="Finalizadas"
    icon="✅"
    color="#16a34a"
    cardStyle={styles.kpiCompletadas}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Cumplimiento"
    value={`${kpis.cumplimiento}%`}
    detail="Plan formativo"
    icon="📊"
    color="#dc2626"
    cardStyle={styles.kpiCumplimiento}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Horas"
    value={kpis.horasTotales}
    detail="Horas impartidas"
    icon="⏱️"
    color="#0891b2"
    cardStyle={styles.kpiHoras}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Certificados"
    value={kpis.certificados}
    detail="Emitidos"
    icon="📜"
    color="#16a34a"
    cardStyle={styles.kpiCertificados}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Sin Certificar"
    value={kpis.sinCertificar}
    detail="Pendientes"
    icon="⚠️"
    color="#dc2626"
    cardStyle={styles.kpiPendientes}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Obligatorias"
    value={kpis.obligatorias}
    detail="ISO / Legal"
    icon="✅"
    color="#2563eb"
    cardStyle={styles.kpiObligatorias}
  />

</View>

      {/* RESUMEN */}

      <View style={styles.summaryCard}>

        <Text style={styles.cardTitle}>
          📊 Resumen Formativo
        </Text>

        <View style={styles.summaryRow}>
          <Text>Total Formaciones</Text>
          <Text style={styles.summaryValue}>
            {kpis.total}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>Horas Totales</Text>
          <Text style={styles.summaryValue}>
            {kpis.horasTotales}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>Coste Total</Text>
          <Text style={styles.summaryValue}>
            {Number(
              kpis.costeTotal || 0
            ).toLocaleString("es-ES")} €
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>Certificados</Text>
          <Text style={styles.summaryValue}>
            {kpis.certificados}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>Aprobadas</Text>
          <Text style={styles.summaryValue}>
            {kpis.evaluacionesAprobadas}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>Próximas Renovaciones</Text>
          <Text style={styles.summaryValue}>
            {kpis.proximasRenovaciones}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>Responsable Principal</Text>
          <Text style={styles.summaryValue}>
            {kpis.responsablePrincipal}
          </Text>
        </View>

      </View>

      {/* FORMULARIO */}

      {puedeEditar && (
      <FormacionFormulario

        mostrarFormulario={mostrarFormulario}
        setMostrarFormulario={setMostrarFormulario}

        editando={editando}

        guardarEdicion={guardarEdicion}
        crearFormacion={crearFormacion}

        empleado={empleado}
        setEmpleado={setEmpleado}

        codigoEmpleado={codigoEmpleado}
        setCodigoEmpleado={setCodigoEmpleado}

        puesto={puesto}
        setPuesto={setPuesto}

        departamento={departamento}
        setDepartamento={setDepartamento}

        curso={curso}
        setCurso={setCurso}

        categoria={categoria}
        setCategoria={setCategoria}

        proveedor={proveedor}
        setProveedor={setProveedor}

        modalidad={modalidad}
        setModalidad={setModalidad}

        responsable={responsable}
        setResponsable={setResponsable}

        horas={horas}
        setHoras={setHoras}

        coste={coste}
        setCoste={setCoste}

        fechaInicio={fechaInicio}
        setFechaInicio={setFechaInicio}

        fechaFin={fechaFin}
        setFechaFin={setFechaFin}

        fechaRenovacion={fechaRenovacion}
        setFechaRenovacion={setFechaRenovacion}

        metodoEvaluacion={metodoEvaluacion}
        setMetodoEvaluacion={setMetodoEvaluacion}

        resultadoEvaluacion={resultadoEvaluacion}
        setResultadoEvaluacion={
          setResultadoEvaluacion
        }

        nota={nota}
        setNota={setNota}

        competencia={competencia}
        setCompetencia={setCompetencia}

        certificado={certificado}
        setCertificado={setCertificado}

        numeroCertificado={numeroCertificado}
        setNumeroCertificado={
          setNumeroCertificado
        }

        organismoEmisor={organismoEmisor}
        setOrganismoEmisor={setOrganismoEmisor}

        fechaCertificacion={fechaCertificacion}
        setFechaCertificacion={setFechaCertificacion}

        requiereRenovacion={requiereRenovacion}
        setRequiereRenovacion={setRequiereRenovacion}

        vigenciaMeses={vigenciaMeses}
        setVigenciaMeses={setVigenciaMeses}

        vencimiento={vencimiento}
        setVencimiento={setVencimiento}

        adr={adr}
        setAdr={setAdr}

        carretillas={carretillas}
        setCarretillas={setCarretillas}

        manipulacionCargas={manipulacionCargas}
        setManipulacionCargas={setManipulacionCargas}

        seguridadVial={seguridadVial}
        setSeguridadVial={setSeguridadVial}

        puenteGrua={puenteGrua}
        setPuenteGrua={setPuenteGrua}

        maquinaria={maquinaria}
        setMaquinaria={setMaquinaria}

        obligatoria={obligatoria}
        setObligatoria={setObligatoria}

        criticidad={criticidad}
        setCriticidad={setCriticidad}

        evidenciaDisponible={evidenciaDisponible}
        setEvidenciaDisponible={setEvidenciaDisponible}

        eficaz={eficaz}
        setEficaz={setEficaz}

        requisitoLegal={requisitoLegal}
        setRequisitoLegal={
          setRequisitoLegal
        }

        observaciones={observaciones}
        setObservaciones={
          setObservaciones
        }

      />
      )}

      {!puedeEditar && (
        <View style={styles.summaryCard}>
          <Text style={{ color: "#64748b" }}>
            🔒 Acceso de solo lectura: puedes consultar la
            formación, pero no crear, editar ni borrar registros.
          </Text>
        </View>
      )}

      {/* TABLA */}

      <FormacionTabla
        formacionesFiltradas={
          formacionesFiltradas
        }
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        verDetalle={verDetalle}
        editarFormacion={editarFormacion}
        cambiarEstado={cambiarEstado}
        eliminar={eliminar}
        soloLectura={!puedeEditar}
      />

      <View
        style={{ height: 50 }}
      />

    </ScrollView>

    {/* MODAL */}

<FormacionDetalleModal
  visible={mostrarDetalle}
  detalleFormacion={detalleFormacion}

  nuevoComentario={
    nuevoComentario
  }

  setNuevoComentario={
    setNuevoComentario
  }

  agregarComentario={
    agregarComentario
  }

  agregarEvidencia={
    agregarEvidencia
  }

  eliminarEvidencia={
    eliminarEvidencia
  }

  editarFormacion={
    editarFormacion
  }

  soloLectura={!puedeEditar}

  onClose={() =>
    setMostrarDetalle(false)
  }
/>

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
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
  },

  subtitle: {
    color: "#64748b",
    marginTop: 5,
    fontSize: 14,
  },

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

kpiTotal: {
  backgroundColor: "#eff6ff",
},

kpiPlanificadas: {
  backgroundColor: "#faf5ff",
},

kpiCurso: {
  backgroundColor: "#fff7ed",
},

kpiCompletadas: {
  backgroundColor: "#f0fdf4",
},

kpiCumplimiento: {
  backgroundColor: "#ecfdf5",
},

kpiHoras: {
  backgroundColor: "#f0f9ff",
},

kpiCertificados: {
  backgroundColor: "#f0fdf4",
},

kpiPendientes: {
  backgroundColor: "#fef2f2",
},

kpiObligatorias: {
  backgroundColor: "#eff6ff",
},

  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  summaryValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
});