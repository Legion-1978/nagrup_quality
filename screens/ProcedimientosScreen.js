import React, { useState } from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import KPIBox from "../components/KPIBox";
import ScreenLayout from "../components/ScreenLayout";
import ProcedimientoFormulario from "../components/ProcedimientoFormulario";
import ProcedimientoTabla from "../components/ProcedimientoTabla";
import ProcedimientoDetalleModal from "../components/ProcedimientoDetalleModal";
import { useQuality } from "../context/QualityContext";
import { useConfig } from "../context/ConfigContext";
import { useAuth } from "../context/AuthContext";
import {
  generarSiguienteId,
  PREFIJOS_ID,
} from "../utils/correlativos";
import { procedimientoSchema }
  from "../schemas/procedimientoSchema";
import { validar }
  from "../schemas/validar";
import { mostrarMensaje }
  from "../utils/mensajes";

export default function ProcedimientosScreen() {

  const {
    procedimientos = [],
    actualizarProcedimientos,
  } = useQuality();

  const { registrarActividad } = useConfig();

  const { tienePermisoEdicion } = useAuth();

  const puedeEditar = tienePermisoEdicion("procedimientos");

  /* =========================
     ESTADOS PRINCIPALES
  ========================= */

  const [
    mostrarFormulario,
    setMostrarFormulario,
  ] = useState(false);

  const [
    mostrarDetalle,
    setMostrarDetalle,
  ] = useState(false);

  const [
    detalleProcedimiento,
    setDetalleProcedimiento,
  ] = useState(null);

  const [busqueda, setBusqueda] =
    useState("");

  const [
    idEditando,
    setIdEditando,
  ] = useState(null);

  const [
    nuevoComentario,
    setNuevoComentario,
  ] = useState("");

  const editando =
    idEditando !== null;

  /* =========================
     DATOS DOCUMENTALES ISO
  ========================= */

  const [codigo, setCodigo] =
    useState("");

  const [titulo, setTitulo] =
    useState("");

  const [
    descripcion,
    setDescripcion,
  ] = useState("");

  const [objetivo, setObjetivo] =
    useState("");

  const [alcance, setAlcance] =
    useState("");

  const [proceso, setProceso] =
    useState("");

  const [
    responsable,
    setResponsable,
  ] = useState("");

  const [
    propietarioProceso,
    setPropietarioProceso,
  ] = useState("");

  const [
    aprobador,
    setAprobador,
  ] = useState("");

  const [
    departamento,
    setDepartamento,
  ] = useState("");

  const [tipo, setTipo] =
    useState("");

  const [categoria, setCategoria] =
    useState("");

  const [
    criticidad,
    setCriticidad,
  ] = useState("Media");

  const [riesgo, setRiesgo] =
    useState("");

  const [version, setVersion] =
    useState("1.0");

  const [estado, setEstado] =
    useState("Borrador");

  const [
    fechaEmision,
    setFechaEmision,
  ] = useState("");

  const [
    fechaRevision,
    setFechaRevision,
  ] = useState("");

  const [
    fechaProximaRevision,
    setFechaProximaRevision,
  ] = useState("");

  const [
    observaciones,
    setObservaciones,
  ] = useState("");

  /* =========================
     KPI ISO
  ========================= */

  const total =
    procedimientos.length;

  const vigentes =
    procedimientos.filter(
      p => p.estado === "Vigente"
    ).length;

  const pendientesAprobacion =
    procedimientos.filter(
      p =>
        p.estado ===
        "Pendiente Aprobación"
    ).length;

  const enRevision =
    procedimientos.filter(
      p =>
        p.estado ===
        "En Revisión"
    ).length;

  const borradores =
    procedimientos.filter(
      p =>
        p.estado ===
        "Borrador"
    ).length;

  const obsoletos =
    procedimientos.filter(
      p =>
        p.estado ===
        "Obsoleto"
    ).length;

  const criticidadAlta =
    procedimientos.filter(
      p =>
        p.criticidad ===
        "Alta"
    ).length;

  const criticidadMedia =
    procedimientos.filter(
      p =>
        p.criticidad ===
        "Media"
    ).length;

  const criticidadBaja =
    procedimientos.filter(
      p =>
        p.criticidad ===
        "Baja"
    ).length;

  const evidenciasTotales =
    procedimientos.reduce(
      (acc, item) =>
        acc +
        (item.evidencias?.length || 0),
      0
    );

  const comentariosTotales =
    procedimientos.reduce(
      (acc, item) =>
        acc +
        (item.comentarios?.length || 0),
      0
    );

  const cumplimiento =
    total === 0
      ? 0
      : (
          (vigentes / total) *
          100
        ).toFixed(1);

  /* =========================
     REVISIONES
  ========================= */

  const hoy = new Date();

  const revisionesProximas =
    procedimientos.filter(item => {

      const fechaTexto =
        item.fechaProximaRevision ||
        item.fechaRevision;

      if (!fechaTexto) {
        return false;
      }

      try {

        const partes =
          fechaTexto.includes("/")
            ? fechaTexto
                .split("/")
                .map(Number)
            : fechaTexto
                .split("-")
                .map(Number);

        const [dia, mes, anio] =
          partes;

        const fecha =
          new Date(
            anio,
            mes - 1,
            dia
          );

        const diferencia =
          Math.ceil(
            (fecha - hoy) /
            (
              1000 *
              60 *
              60 *
              24
            )
          );

        return (
          diferencia >= 0 &&
          diferencia <= 30
        );

      } catch {

        return false;

      }

    }).length;

  const revisionesVencidas =
    procedimientos.filter(item => {

      const fechaTexto =
        item.fechaProximaRevision ||
        item.fechaRevision;

      if (!fechaTexto) {
        return false;
      }

      try {

        const partes =
          fechaTexto.includes("/")
            ? fechaTexto
                .split("/")
                .map(Number)
            : fechaTexto
                .split("-")
                .map(Number);

        const [dia, mes, anio] =
          partes;

        const fecha =
          new Date(
            anio,
            mes - 1,
            dia
          );

        return fecha < hoy;

      } catch {

        return false;

      }

    }).length;

  /* =========================
     RESPONSABLE PRINCIPAL
  ========================= */

  const responsablesAgrupados =
    procedimientos.reduce(
      (acc, item) => {

        const nombre =
          item.responsable?.trim() ||
          "Sin asignar";

        acc[nombre] =
          (acc[nombre] || 0) + 1;

        return acc;

      },
      {}
    );

  const responsablePrincipal =
    Object.entries(
      responsablesAgrupados
    )
      .sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0] || "-";

  /* =========================
     LIMPIEZA FORMULARIO
  ========================= */

  const limpiarFormulario =
    () => {

      setCodigo("");
      setTitulo("");
      setDescripcion("");
      setObjetivo("");
      setAlcance("");
      setProceso("");

      setResponsable("");
      setPropietarioProceso("");
      setAprobador("");
      setDepartamento("");
      setTipo("");
      setCategoria("");

      setCriticidad("Media");
      setRiesgo("");

      setVersion("1.0");
      setEstado("Borrador");

      setFechaEmision("");
      setFechaRevision("");
      setFechaProximaRevision("");

      setObservaciones("");

      setIdEditando(null);

    };

/* =========================
   FILTROS
========================= */

const procedimientosFiltrados =
  procedimientos.filter(item => {

    const texto =
      (busqueda || "")
        .toLowerCase()
        .trim();

    return (

      String(item.codigo || "")
        .toLowerCase()
        .includes(texto)

      ||

      String(item.titulo || "")
        .toLowerCase()
        .includes(texto)

      ||

      String(item.proceso || "")
        .toLowerCase()
        .includes(texto)

      ||

      String(item.departamento || "")
        .toLowerCase()
        .includes(texto)

      ||

      String(item.responsable || "")
        .toLowerCase()
        .includes(texto)

      ||

      String(item.propietarioProceso || "")
        .toLowerCase()
        .includes(texto)

      ||

      String(item.aprobador || "")
        .toLowerCase()
        .includes(texto)

      ||

      String(item.tipo || "")
        .toLowerCase()
        .includes(texto)

      ||

      String(item.estado || "")
        .toLowerCase()
        .includes(texto)

      ||

      String(item.criticidad || "")
        .toLowerCase()
        .includes(texto)

      ||

      String(item.riesgo || "")
        .toLowerCase()
        .includes(texto)

      ||

      String(item.version || "")
        .toLowerCase()
        .includes(texto)

    );

  });

const guardarEdicion = () => {

  if (!puedeEditar) {
    return;
  }

  const resultado = validar(
    procedimientoSchema,
    {
      titulo,
      tipo,
      categoria,
      responsable,
      departamento,
      propietarioProceso,
      aprobador,
      descripcion,
      objetivo,
      alcance,
      proceso,
      version,
      estado,
      fechaEmision,
      fechaRevision,
      fechaProximaRevision,
    }
  );

  if (!resultado.ok) {

    mostrarMensaje(
      "Validación",
      resultado.mensaje
    );

    return;
  }

  const convertirFechaParaSQL = fecha => {

    const partes =
      fecha.split("/");

    if (partes.length !== 3) {
      return fecha;
    }

    const [
      dia,
      mes,
      anio,
    ] = partes;

    return `${anio}-${mes}-${dia}`;
  };

  actualizarProcedimientos(

    procedimientos.map(item =>

      item.id === idEditando

        ? {

            ...item,

            codigo,
            titulo,
            descripcion,

            objetivo,
            alcance,
            proceso,

            responsable,
            propietarioProceso,
            aprobador,

            departamento,
            tipo,
            categoria,

            criticidad,
            riesgo,

            version,
            estado,

            fechaEmision:
              convertirFechaParaSQL(
                fechaEmision
              ),

            fechaRevision:
              convertirFechaParaSQL(
                fechaRevision
              ),

            fechaProximaRevision:
              convertirFechaParaSQL(
                fechaProximaRevision
              ),

            observaciones,

            historial: [
              ...(item.historial || []),
              {
                accion:
                  "Procedimiento actualizado",

                fecha:
                  new Date().toLocaleDateString(
                    "es-ES"
                  ),
              },
            ],

          }

        : item

    )

  );

  registrarActividad?.(
    `✏️ Procedimiento actualizado ${codigo}`
  );

  limpiarFormulario();

  setMostrarFormulario(
    false
  );

  mostrarMensaje(
    "Correcto",
    "Procedimiento actualizado"
  );
};

const crearProcedimiento = async () => {

  if (!puedeEditar) {
    return;
  }

  const resultado = validar(
    procedimientoSchema,
    {
      titulo,
      tipo,
      categoria,
      responsable,
      departamento,
      propietarioProceso,
      aprobador,
      descripcion,
      objetivo,
      alcance,
      proceso,
      version,
      estado,
      fechaEmision,
      fechaRevision,
      fechaProximaRevision,
    }
  );

  if (!resultado.ok) {

    mostrarMensaje(
      "Validación",
      resultado.mensaje
    );

    return;
  }

  const convertirFechaParaSQL = fecha => {

    const partes =
      fecha.split("/");

    if (partes.length !== 3) {
      return fecha;
    }

    const [
      dia,
      mes,
      anio,
    ] = partes;

    return `${anio}-${mes}-${dia}`;
  };

  const codigoGenerado =
    await generarSiguienteId(
      PREFIJOS_ID.PROCEDIMIENTO
    );

  const nuevo = {

    id:
      codigoGenerado,

    codigo:
      codigoGenerado,

    titulo,
    descripcion,

    objetivo,
    alcance,
    proceso,

    responsable,
    propietarioProceso,
    aprobador,

    departamento,
    tipo,
    categoria,

    criticidad,
    riesgo,

    version,
    estado,

    fechaEmision:
      convertirFechaParaSQL(
        fechaEmision
      ),

    fechaRevision:
      convertirFechaParaSQL(
        fechaRevision
      ),

    fechaProximaRevision:
      convertirFechaParaSQL(
        fechaProximaRevision
      ),

    observaciones,

    evidencias: [],

    comentarios: [],

    historial: [
      {
        accion:
          "Procedimiento creado",

        fecha:
          new Date().toLocaleDateString(
            "es-ES"
          ),
      },
    ],
  };

  actualizarProcedimientos([
    ...procedimientos,
    nuevo,
  ]);

  registrarActividad?.(
    `📄 Nuevo procedimiento ${codigoGenerado}`
  );

  limpiarFormulario();

  setMostrarFormulario(
    false
  );

  mostrarMensaje(
    "Correcto",
    "Procedimiento creado"
  );
};

const verDetalle = item => {

  setDetalleProcedimiento(item);

  setMostrarDetalle(true);

};

const editarProcedimiento = item => {

  if (!puedeEditar) {
    return;
  }

  setIdEditando(item.id);

  setCodigo(item.codigo || "");
  setTitulo(item.titulo || "");
  setDescripcion(item.descripcion || "");

  setObjetivo(item.objetivo || "");
  setAlcance(item.alcance || "");
  setProceso(item.proceso || "");

  setResponsable(item.responsable || "");

  setPropietarioProceso(
    item.propietarioProceso || ""
  );

  setAprobador(
    item.aprobador || ""
  );

  setDepartamento(
    item.departamento || ""
  );

  setTipo(item.tipo || "");

  setCategoria(item.categoria || "");

  setCriticidad(
    item.criticidad || "Media"
  );

  setRiesgo(item.riesgo || "");

  setVersion(
    item.version || "1.0"
  );

  setEstado(
    item.estado || "Borrador"
  );

setFechaEmision(
  item.fechaEmision
    ? item.fechaEmision.includes("-")
      ? item.fechaEmision
          .split("-")
          .reverse()
          .join("/")
      : item.fechaEmision
    : ""
);

setFechaRevision(
  item.fechaRevision
    ? item.fechaRevision.includes("-")
      ? item.fechaRevision
          .split("-")
          .reverse()
          .join("/")
      : item.fechaRevision
    : ""
);

setFechaProximaRevision(
  item.fechaProximaRevision
    ? item.fechaProximaRevision.includes("-")
      ? item.fechaProximaRevision
          .split("-")
          .reverse()
          .join("/")
      : item.fechaProximaRevision
    : ""
);

  setObservaciones(
    item.observaciones || ""
  );

  setMostrarFormulario(true);

  setMostrarDetalle(false);

};

const cambiarEstado = id => {

  if (!puedeEditar) {
    return;
  }

  const estados = [
    "Borrador",
    "Pendiente Aprobación",
    "Vigente",
    "En Revisión",
    "Obsoleto",
  ];

  actualizarProcedimientos(

    procedimientos.map(item => {

      if (item.id !== id) {
        return item;
      }

      const actual =
        estados.indexOf(
          item.estado
        );

      const siguiente =
        (actual + 1) %
        estados.length;

      return {

        ...item,

        estado:
          estados[siguiente],

      };

    })

  );

};

const eliminar = id => {

  if (!puedeEditar) {
    return;
  }

  Alert.alert(
    "Eliminar",
    "¿Desea eliminar el procedimiento?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {

          actualizarProcedimientos(

            procedimientos.filter(
              item =>
                item.id !== id
            )

          );

        },
      },
    ]
  );

};

const agregarComentario = () => {

  if (!puedeEditar) {
    return;
  }

  if (
    !nuevoComentario.trim() ||
    !detalleProcedimiento
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

  actualizarProcedimientos(

    procedimientos.map(item =>

      item.id ===
      detalleProcedimiento.id

        ? {

            ...item,

            comentarios: [

              ...(item.comentarios || []),

              comentario,

            ],

          }

        : item

    )

  );

  setDetalleProcedimiento({

    ...detalleProcedimiento,

    comentarios: [

      ...(detalleProcedimiento.comentarios || []),

      comentario,

    ],

  });

  setNuevoComentario("");

};

const agregarEvidencia = () => {

  if (!puedeEditar) {
    return;
  }

  mostrarMensaje("info", "Pendiente", "La carga de archivos se implementará posteriormente.");

};


const eliminarEvidencia = evidenciaId => {

  if (!puedeEditar) {
    return;
  }

  if (!detalleProcedimiento) {
    return;
  }

  actualizarProcedimientos(

    procedimientos.map(item =>

      item.id ===
      detalleProcedimiento.id

        ? {

            ...item,

            evidencias:
              (
                item.evidencias || []
              ).filter(
                ev =>
                  ev.id !== evidenciaId
              ),

          }

        : item

    )

  );

};

return (
  <ScreenLayout>

    <ScrollView style={styles.container}>

      {/* CABECERA */}

      <View style={styles.header}>

        <Text style={styles.title}>
          📄 Procedimientos
        </Text>

        <Text style={styles.subtitle}>
          Gestión documental y control de procedimientos
        </Text>

      </View>

{/* KPI PRINCIPALES */}

<View style={styles.kpiContainer}>

  <KPIBox
    style={styles.kpiCard}
    title="Total"
    value={total}
    detail="Procedimientos"
    icon="📄"
    color="#2563eb"
    cardStyle={styles.kpiTotal}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Vigentes"
    value={vigentes}
    detail="Documentos activos"
    icon="✅"
    color="#16a34a"
    cardStyle={styles.kpiVigentes}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Revisión"
    value={enRevision}
    detail="Pendientes validar"
    icon="🔄"
    color="#f97316"
    cardStyle={styles.kpiRevision}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Borradores"
    value={borradores}
    detail="Sin publicar"
    icon="📝"
    color="#7c3aed"
    cardStyle={styles.kpiBorradores}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Obsoletos"
    value={obsoletos}
    detail="Fuera de uso"
    icon="🚫"
    color="#dc2626"
    cardStyle={styles.kpiObsoletos}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Cumplimiento"
    value={`${cumplimiento}%`}
    detail="Control documental"
    icon="📊"
    color="#0891b2"
    cardStyle={styles.kpiCumplimiento}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Evidencias"
    value={evidenciasTotales}
    detail="Archivos anexos"
    icon="📎"
    color="#7c3aed"
    cardStyle={styles.kpiEvidencias}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Comentarios"
    value={comentariosTotales}
    detail="Seguimiento"
    icon="💬"
    color="#0ea5e9"
    cardStyle={styles.kpiComentarios}
  />

  <KPIBox
    style={styles.kpiCard}
    title="Próximas"
    value={revisionesProximas}
    detail="Revisiones"
    icon="📅"
    color="#f59e0b"
    cardStyle={styles.kpiProximas}
  />

</View>

      {/* RESUMEN OPERATIVO */}

      <View style={styles.summaryCard}>

        <Text style={styles.cardTitle}>
          📊 Resumen Operativo
        </Text>

        <View style={styles.summaryRow}>
          <Text>📄 Total Procedimientos</Text>
          <Text style={styles.summaryValue}>
            {total}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>✅ Vigentes</Text>
          <Text style={styles.summaryValue}>
            {vigentes}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>🔄 En Revisión</Text>
          <Text style={styles.summaryValue}>
            {enRevision}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>📝 Borradores</Text>
          <Text style={styles.summaryValue}>
            {borradores}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>🚫 Obsoletos</Text>
          <Text style={styles.summaryValue}>
            {obsoletos}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>📊 Cumplimiento</Text>
          <Text style={styles.summaryValue}>
            {cumplimiento}%
          </Text>
        </View>

      </View>

      {/* INDICADORES AVANZADOS */}

      <View style={styles.summaryCard}>

        <Text style={styles.cardTitle}>
          📈 Indicadores Avanzados
        </Text>

        <View style={styles.summaryRow}>
          <Text>📎 Evidencias</Text>
          <Text style={styles.summaryValue}>
            {evidenciasTotales}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>💬 Comentarios</Text>
          <Text style={styles.summaryValue}>
            {comentariosTotales}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>📅 Revisiones Próximas</Text>
          <Text style={styles.summaryValue}>
            {revisionesProximas}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>🚨 Revisiones Vencidas</Text>
          <Text style={styles.summaryValue}>
            {revisionesVencidas}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>👤 Responsable Principal</Text>
          <Text style={styles.summaryValue}>
            {responsablePrincipal || "-"}
          </Text>
        </View>

      </View>

{/* FORMULARIO */}

{puedeEditar && (
  <ProcedimientoFormulario
    mostrarFormulario={mostrarFormulario}
    setMostrarFormulario={
      setMostrarFormulario
    }

    editando={idEditando !== null}

    guardarEdicion={
      guardarEdicion
    }

    crearProcedimiento={
      crearProcedimiento
    }

    codigo={codigo}

    titulo={titulo}
    setTitulo={setTitulo}

    descripcion={descripcion}
    setDescripcion={setDescripcion}

    objetivo={objetivo}
    setObjetivo={setObjetivo}

    alcance={alcance}
    setAlcance={setAlcance}

    proceso={proceso}
    setProceso={setProceso}

    responsable={responsable}
    setResponsable={setResponsable}

    departamento={departamento}
    setDepartamento={setDepartamento}

    tipo={tipo}
    setTipo={setTipo}

    categoria={categoria}
    setCategoria={setCategoria}

    propietarioProceso={propietarioProceso}
    setPropietarioProceso={setPropietarioProceso}

    aprobador={aprobador}
    setAprobador={setAprobador}

    riesgo={riesgo}
    setRiesgo={setRiesgo}

    criticidad={criticidad}
    setCriticidad={setCriticidad}

    version={version}
    setVersion={setVersion}

    estado={estado}
    setEstado={setEstado}

  fechaEmision={fechaEmision}
  setFechaEmision={
    setFechaEmision
  }

    fechaRevision={fechaRevision}
    setFechaRevision={
      setFechaRevision
    }

    fechaProximaRevision={
      fechaProximaRevision
    }

    setFechaProximaRevision={
      setFechaProximaRevision
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
      🔒 Acceso de solo lectura: puedes consultar los
      procedimientos, pero no crear, editar ni borrar
      registros.
    </Text>
  </View>
)}

      {/* TABLA */}

      <ProcedimientoTabla
        procedimientosFiltrados={
          procedimientosFiltrados
        }
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        verDetalle={verDetalle}
        editarProcedimiento={
          editarProcedimiento
        }
        cambiarEstado={
          cambiarEstado
        }
        eliminar={eliminar}
        soloLectura={!puedeEditar}
      />

      <View
        style={{
          height: 60,
        }}
      />

    </ScrollView>

    {/* MODAL */}

    <ProcedimientoDetalleModal
      visible={mostrarDetalle}
      detalleProcedimiento={
        detalleProcedimiento
      }
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
      editarProcedimiento={
        editarProcedimiento
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
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#16163b",
  },

  subtitle: {
    color: "#64748b",
    marginTop: 5,
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

kpiVigentes: {
  backgroundColor: "#f0fdf4",
},

kpiRevision: {
  backgroundColor: "#fff7ed",
},

kpiBorradores: {
  backgroundColor: "#faf5ff",
},

kpiObsoletos: {
  backgroundColor: "#fef2f2",
},

kpiCumplimiento: {
  backgroundColor: "#ecfeff",
},

kpiEvidencias: {
  backgroundColor: "#faf5ff",
},

kpiComentarios: {
  backgroundColor: "#f0f9ff",
},

kpiProximas: {
  backgroundColor: "#fffbeb",
},

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#16163b",
  },

  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  summaryValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
  },
});