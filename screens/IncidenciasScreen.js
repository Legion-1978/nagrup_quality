import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import {
  useMemo,
  useState,
} from "react";

import KPIBox from "../components/KPIBox";
import { mostrarMensaje }
  from "../utils/mensajes";
import IncidenciaFormulario from "../components/IncidenciaFormulario";
import IncidenciaTabla from "../components/IncidenciaTabla";
import IncidenciaDetalleModal from "../components/IncidenciaDetalleModal";
import ScreenLayout from "../components/ScreenLayout";
import {crearModeloIncidencia,} from "../models/Incidencia";
import { useQuality } from "../context/QualityContext";
import { useAuth } from "../context/AuthContext";
import {
  generarSiguienteId,
  PREFIJOS_ID,
} from "../utils/correlativos";
import {calcularKPIsIncidencias,} from "../utils/incidenciasKPI";
import { incidenciaSchema } from "../schemas/incidenciaSchema";
import { validar } from "../schemas/validar";

import {
  crearNuevaIncidencia,
  borrarIncidencia,
  actualizarEstadoIncidencia,
  actualizarGravedadIncidencia,
  actualizarIncidencia,
  agregarComentarioIncidencia,
  agregarEvidenciaIncidencia,
} from "../services/incidenciasService";

export default function IncidenciasScreen() {
  const {
    incidencias = [],
    actualizarIncidencias,
  } = useQuality();

  const { tienePermisoEdicion } = useAuth();

  const puedeEditar = tienePermisoEdicion("incidencias");

  // =====================
  // DATOS INCIDENCIA
  // =====================

  const [
    numeroIncidencia,
    setNumeroIncidencia,
  ] = useState("");

  const [area, setArea] =
    useState("");

  const [
    proceso,
    setProceso,
  ] = useState("");

  const [
    turno,
    setTurno,
  ] = useState("");

  const [
    ubicacion,
    setUbicacion,
  ] = useState("");

  const [
    categoria,
    setCategoria,
  ] = useState("");

  const [
    subcategoria,
    setSubcategoria,
  ] = useState("");

  const [origen, setOrigen] =
    useState("Interna");

  const [
    problema,
    setProblema,
  ] = useState("");

  const [sku, setSku] =
    useState("");

  const [
    cantidadAfectada,
    setCantidadAfectada,
  ] = useState("");

  const [
    impactoEconomico,
    setImpactoEconomico,
  ] = useState("");

  const [
    responsable,
    setResponsable,
  ] = useState("");

  const [
    fechaCompromiso,
    setFechaCompromiso,
  ] = useState("");

  const [
    causaRaiz,
    setCausaRaiz,
  ] = useState("");

  const [
    accionInmediata,
    setAccionInmediata,
  ] = useState("");

  const [
    accionCorrectiva,
    setAccionCorrectiva,
  ] = useState("");

  const [
    accionPreventiva,
    setAccionPreventiva,
  ] = useState("");

  // =====================
  // UI
  // =====================

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
    detalleIncidencia,
    setDetalleIncidencia,
  ] = useState(null);

  const [
    mostrarDetalle,
    setMostrarDetalle,
  ] = useState(false);

  const [
    nuevoComentario,
    setNuevoComentario,
  ] = useState("");

  // =====================
  // LIMPIAR
  // =====================

  const limpiarFormulario =
    () => {
      setNumeroIncidencia("");

      setArea("");

      setProceso("");
      setTurno("");
      setUbicacion("");

      setCategoria("");
      setSubcategoria("");
      setOrigen("Interna");

      setProblema("");

      setSku("");

      setCantidadAfectada("");

      setImpactoEconomico("");

      setResponsable("");

      setFechaCompromiso("");

      setCausaRaiz("");

      setAccionInmediata("");
      setAccionCorrectiva("");
      setAccionPreventiva("");

      setEditando(null);
    };

  // =====================
  // CREAR
  // =====================

const crearIncidencia = async () => {

  console.log("1. Entrando crearIncidencia");

  console.log("categoria:", categoria);
  console.log("problema:", problema);
  console.log("longitud problema:", problema?.length);

  const resultado = validar(
    incidenciaSchema,
    {
      categoria,
      problema,
      cantidadAfectada,
      impactoEconomico,
    }
  );

  console.log("3. Resultado validación", resultado);

  if (!resultado.ok) {
mostrarMensaje(
  "Validación",
  resultado.mensaje
);
    return;
  }

  const numeroIncidencia =
    await generarSiguienteId(
      PREFIJOS_ID.INCIDENCIA
    );

  console.log(
    "4. ID generado",
    numeroIncidencia
  );

  const nueva =
    crearNuevaIncidencia({
      numeroIncidencia,
      area,
      proceso,
      turno,
      ubicacion,
      categoria,
      subcategoria,
      origen,
      problema,
      sku,
      cantidadAfectada:
        Number(cantidadAfectada || 0),
      impactoEconomico:
        Number(impactoEconomico || 0),
      responsable,
      fechaCompromiso,
      causaRaiz,
      accionInmediata,
      accionCorrectiva,
      accionPreventiva,
      crearModeloIncidencia,
    });

  console.log(
    "5. Incidencia creada",
    nueva
  );

  await actualizarIncidencias([
    ...incidencias,
    nueva,
  ]);

  console.log(
    "6. Incidencia sincronizada"
  );

  limpiarFormulario();

  setMostrarFormulario(false);
};

  // =====================
  // EDITAR
  // =====================

  const guardarEdicion =
    async () => {
      if (!puedeEditar) {
        return;
      }

      const resultado = validar(incidenciaSchema, {
        categoria,
        problema,
        cantidadAfectada,
        impactoEconomico,
      });

if (!resultado.ok) {
  mostrarMensaje("info", "Validación", resultado.mensaje);
  return;
}

      const nuevaLista =
        actualizarIncidencia(
          incidencias,
          editando,
          {
            area,

            proceso,
            turno,
            ubicacion,

            categoria,
            subcategoria,

            origen,

            problema,

            sku,

            cantidadAfectada:
              Number(
                cantidadAfectada || 0
              ),

            impactoEconomico:
              Number(
                impactoEconomico || 0
              ),

            responsable,

            fechaCompromiso,

            causaRaiz,

            accionInmediata,

            accionCorrectiva,

            accionPreventiva,
          }
        );

      await actualizarIncidencias(
        nuevaLista
      );

      limpiarFormulario();

      setMostrarFormulario(
        false
      );
    };

  // =====================
  // ELIMINAR
  // =====================

  const eliminar =
    async id => {
      if (!puedeEditar) {
        return;
      }
      await actualizarIncidencias(
        borrarIncidencia(
          incidencias,
          id
        )
      );
    };

  // =====================
  // ESTADO
  // =====================

  const cambiarEstado =
    async id => {
      if (!puedeEditar) {
        return;
      }
      await actualizarIncidencias(
        actualizarEstadoIncidencia(
          incidencias,
          id
        )
      );
    };

  // =====================
  // GRAVEDAD
  // =====================

  const cambiarGravedad =
    async id => {
      if (!puedeEditar) {
        return;
      }
      await actualizarIncidencias(
        actualizarGravedadIncidencia(
          incidencias,
          id
        )
      );
    };

  // =====================
  // DETALLE
  // =====================

  const verDetalle =
    item => {
      setDetalleIncidencia(
        item
      );

      setMostrarDetalle(
        true
      );
    };

  // =====================
  // CARGAR EDICIÓN
  // =====================

  const editarIncidencia =
    item => {
      if (!puedeEditar) {
        return;
      }

      setEditando(
        item.id
      );

      setNumeroIncidencia(
        item.id
      );

      setArea(
        item.area || ""
      );

      setProceso(
        item.proceso || ""
      );

      setTurno(
        item.turno || ""
      );

      setUbicacion(
        item.ubicacion || ""
      );

      setCategoria(
        item.categoria || ""
      );

      setSubcategoria(
        item.subcategoria || ""
      );

      setOrigen(
        item.origen || "Interna"
      );

      setProblema(
        item.problema || ""
      );

      setSku(
        item.sku || ""
      );

      setCantidadAfectada(
        String(
          item.cantidadAfectada || ""
        )
      );

      setImpactoEconomico(
        String(
          item.impactoEconomico || ""
        )
      );

      setResponsable(
        item.responsable || ""
      );

      setFechaCompromiso(
        item.fechaCompromiso || ""
      );

      setCausaRaiz(
        item.causaRaiz || ""
      );

      setAccionInmediata(
        item.accionInmediata || ""
      );

      setAccionCorrectiva(
        item.accionCorrectiva || ""
      );

      setAccionPreventiva(
        item.accionPreventiva || ""
      );

      setMostrarDetalle(
        false
      );

      setMostrarFormulario(
        true
      );
    };

  // =====================
  // FILTROS
  // =====================

  const incidenciasFiltradas =
    incidencias.filter(
      item => {
        const texto =
          busqueda.toLowerCase();

        return (
          item.id
            ?.toLowerCase()
            .includes(texto) ||

          item.area
            ?.toLowerCase()
            .includes(texto) ||

          item.proceso
            ?.toLowerCase()
            .includes(texto) ||

          item.turno
            ?.toLowerCase()
            .includes(texto) ||

          item.ubicacion
            ?.toLowerCase()
            .includes(texto) ||

          item.categoria
            ?.toLowerCase()
            .includes(texto) ||

          item.sku
            ?.toLowerCase()
            .includes(texto) ||

          item.responsable
            ?.toLowerCase()
            .includes(texto) ||

          item.problema
            ?.toLowerCase()
            .includes(texto) ||

          item.causaRaiz
            ?.toLowerCase()
            .includes(texto)
        );
      }
    );

  // =====================
  // KPIs
  // =====================

  const kpis = useMemo(
    () =>
      calcularKPIsIncidencias(
        incidencias
      ),
    [incidencias]
  );

const {
  abiertas,
  analisis,
  acciones,
  validacion,
  cerradas,

  critica,
  alta,
  media,
  baja,

  costeTotal,
  cumplimiento,
  vencidas,

  recurrentes,

  accionesAbiertas,

  tiempoMedioCierre,

  areaMasIncidencias,
  procesoMasIncidencias,
  categoriaMasIncidencias,
} = kpis;

const gestionarAcciones = (
  incidencia
) => {
  if (!puedeEditar) {
    return;
  }

mostrarMensaje("info", "CAPA", `Gestión CAPA de ${incidencia.id}`);
};

const gestionarEvidencias = async (
  incidencia
) => {

  if (!puedeEditar) {
    return;
  }

const fechaHora =
  new Date().toLocaleString(
    "es-ES"
  );

const evidencia = {
  id: Date.now().toString(),

  nombre: `Evidencia ${incidencia.id} - ${fechaHora}`,

  fecha: fechaHora,
};

  const nuevaLista =
    agregarEvidenciaIncidencia(
      incidencias,
      incidencia.id,
      evidencia
    );

  await actualizarIncidencias(
    nuevaLista
  );

  const incidenciaActualizada =
    nuevaLista.find(
      item =>
        item.id === incidencia.id
    );

  if (
    detalleIncidencia &&
    detalleIncidencia.id ===
      incidencia.id
  ) {
    setDetalleIncidencia(
      incidenciaActualizada
    );
  }

mostrarMensaje("success", "Correcto", "Evidencia añadida");
};

const agregarComentario = async () => {
  if (!puedeEditar) {
    return;
  }

  if (!nuevoComentario.trim()) {
    return;
  }

  const nuevaLista =
    agregarComentarioIncidencia(
      incidencias,
      detalleIncidencia.id,
      {
        autor: "Usuario",
        texto: nuevoComentario,
        fecha:
          new Date().toLocaleString(
            "es-ES"
          ),
      }
    );

  await actualizarIncidencias(
    nuevaLista
  );

  const incidenciaActualizada =
    nuevaLista.find(
      item =>
        item.id ===
        detalleIncidencia.id
    );

  setDetalleIncidencia(
    incidenciaActualizada
  );

  setNuevoComentario("");
};

return (
  <ScreenLayout>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          ⚠️ Incidencias Internas de Calidad Logística
        </Text>

        <Text style={styles.subtitle}>
          CAPA, No Conformidades, Auditorías y Mejora Continua
        </Text>
      </View>

{/* KPI PRINCIPALES */}

<View style={styles.kpiContainer}>

  <KPIBox
    style={styles.kpiCard}
    title="Abiertas"
    value={abiertas}
    detail={`${incidencias.length} registradas`}
    icon="🔴"
    color="#dc2626"
  />

  <KPIBox
    style={styles.kpiCard}
    title="Investigación"
    value={analisis}
    detail="Causa raíz pendiente"
    icon="🟡"
    color="#f59e0b"
  />

  <KPIBox
    style={styles.kpiCard}
    title="Correctivas"
    value={acciones}
    detail={`${accionesAbiertas} CAPAs abiertas`}
    icon="🟣"
    color="#7c3aed"
  />

  <KPIBox
    style={styles.kpiCard}
    title="Validación"
    value={validacion}
    detail="Validación eficacia"
    icon="🔵"
    color="#2563eb"
  />

  <KPIBox
    style={styles.kpiCard}
    title="Cerradas"
    value={cerradas}
    detail="Incidencias resueltas"
    icon="🟢"
    color="#16a34a"
  />

  <KPIBox
    style={styles.kpiCard}
    title="Cumplimiento"
    value={`${cumplimiento}%`}
    detail="Ratio de cierre"
    icon="✅"
    color="#059669"
  />

  <KPIBox
    style={styles.kpiCard}
    title="Críticas"
    value={critica}
    detail="Máxima prioridad"
    icon="🚨"
    color="#b91c1c"
  />

  <KPIBox
    style={styles.kpiCard}
    title="Altas"
    value={alta}
    detail="Seguimiento urgente"
    icon="⚠️"
    color="#dc2626"
  />

  <KPIBox
    style={styles.kpiCard}
    title="Vencidas"
    value={vencidas}
    detail="Fuera de compromiso"
    icon="⏰"
    color="#ea580c"
  />

  <KPIBox
    style={styles.kpiCard}
    title="Recurrentes"
    value={recurrentes}
    detail="Problemas repetidos"
    icon="🔁"
    color="#7c3aed"
  />

  <KPIBox
    style={styles.kpiCard}
    title="Tiempo Medio"
    value={`${tiempoMedioCierre || 0} d`}
    detail="Promedio cierre"
    icon="🕒"
    color="#0284c7"
  />

  <KPIBox
    style={styles.kpiCard}
    title="Coste"
    value={`${costeTotal.toFixed(0)} €`}
    detail="No calidad"
    icon="💰"
    color="#dc2626"
  />

  <KPIBox
    style={styles.kpiCard}
    title="Área Crítica"
    value={areaMasIncidencias || "-"}
    detail="Más incidencias"
    icon="🏭"
    color="#475569"
  />

  <KPIBox
    style={styles.kpiCard}
    title="Proceso Crítico"
    value={procesoMasIncidencias || "-"}
    detail="Mayor recurrencia"
    icon="⚙️"
    color="#0f766e"
  />

  <KPIBox
    style={styles.kpiCard}
    title="Categoría Top"
    value={categoriaMasIncidencias || "-"}
    detail="Más afectada"
    icon="📊"
    color="#7c2d12"
  />

</View>

      {/* RESUMEN OPERATIVO */}

      <View style={styles.summaryCard}>
        <Text style={styles.cardTitle}>
          📊 Resumen Operativo
        </Text>

        <View style={styles.summaryRow}>
          <Text>Total Incidencias</Text>
          <Text style={styles.summaryValue}>
            {incidencias.length}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>🚨 Críticas</Text>
          <Text
            style={[
              styles.summaryValue,
              {
                color: "#b91c1c",
              },
            ]}
          >
            {critica}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>🔴 Altas</Text>
          <Text style={styles.summaryValue}>
            {alta}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>🟡 Medias</Text>
          <Text style={styles.summaryValue}>
            {media}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>🟢 Bajas</Text>
          <Text style={styles.summaryValue}>
            {baja}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>🔁 Recurrentes</Text>
          <Text style={styles.summaryValue}>
            {recurrentes}
          </Text>
        </View>
      </View>

      {/* INDICADORES CALIDAD */}

      <View style={styles.summaryCard}>
        <Text style={styles.cardTitle}>
          📈 Indicadores de Calidad
        </Text>

        <View style={styles.summaryRow}>
          <Text>
            ✅ Cumplimiento Acciones
          </Text>

          <Text style={styles.summaryValue}>
            {cumplimiento}%
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>
            💰 Coste No Calidad
          </Text>

          <Text
            style={[
              styles.summaryValue,
              {
                color: "#dc2626",
              },
            ]}
          >
            {costeTotal.toFixed(2)} €
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>
            ⏰ Incidencias Vencidas
          </Text>

          <Text
            style={[
              styles.summaryValue,
              {
                color: "#dc2626",
              },
            ]}
          >
            {vencidas}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>
            🔁 Incidencias Recurrentes
          </Text>

          <Text style={styles.summaryValue}>
            {recurrentes}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>
            🕒 Tiempo Medio Cierre
          </Text>

          <Text style={styles.summaryValue}>
            {tiempoMedioCierre || 0} días
          </Text>
        </View>
      </View>

      {/* FORMULARIO */}

      {puedeEditar && (
        <IncidenciaFormulario
          mostrarFormulario={
            mostrarFormulario
          }
          setMostrarFormulario={
            setMostrarFormulario
          }
          editando={editando}
          guardarEdicion={
            guardarEdicion
          }
          numeroIncidencia={
            numeroIncidencia
          }
          area={area}
          setArea={setArea}
          proceso={proceso}
          setProceso={setProceso}
          turno={turno}
          setTurno={setTurno}
          ubicacion={ubicacion}
          setUbicacion={setUbicacion}
          categoria={categoria}
          setCategoria={setCategoria}
          subcategoria={subcategoria}
          setSubcategoria={
            setSubcategoria
          }
          origen={origen}
          setOrigen={setOrigen}
          problema={problema}
          setProblema={setProblema}
          sku={sku}
          setSku={setSku}
          cantidadAfectada={
            cantidadAfectada
          }
          setCantidadAfectada={
            setCantidadAfectada
          }
          impactoEconomico={
            impactoEconomico
          }
          setImpactoEconomico={
            setImpactoEconomico
          }
          responsable={
            responsable
          }
          setResponsable={
            setResponsable
          }
          fechaCompromiso={
            fechaCompromiso
          }
          setFechaCompromiso={
            setFechaCompromiso
          }
          causaRaiz={causaRaiz}
          setCausaRaiz={
            setCausaRaiz
          }
          accionInmediata={
            accionInmediata
          }
          setAccionInmediata={
            setAccionInmediata
          }
          accionCorrectiva={
            accionCorrectiva
          }
          setAccionCorrectiva={
            setAccionCorrectiva
          }
          accionPreventiva={
            accionPreventiva
          }
          setAccionPreventiva={
            setAccionPreventiva
          }
          crearIncidencia={
            crearIncidencia
          }
        />
      )}

      {!puedeEditar && (
        <View style={styles.summaryCard}>
          <Text style={{ color: "#64748b" }}>
            🔒 Acceso de solo lectura: puedes consultar las
            incidencias, pero no crear, editar ni borrar
            registros.
          </Text>
        </View>
      )}

      {/* TABLA */}

      <IncidenciaTabla
        incidenciasFiltradas={
          incidenciasFiltradas
        }
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        verDetalle={verDetalle}
        editarIncidencia={
          editarIncidencia
        }
        cambiarEstado={
          cambiarEstado
        }
        cambiarGravedad={
          cambiarGravedad
        }
        gestionarAcciones={
          gestionarAcciones
        }
        gestionarEvidencias={
          gestionarEvidencias
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

    <IncidenciaDetalleModal
      visible={mostrarDetalle}
      detalleIncidencia={
        detalleIncidencia
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
        gestionarEvidencias
      }
      editarIncidencia={
        editarIncidencia
      }
      soloLectura={!puedeEditar}
      onClose={() => {
        setMostrarDetalle(false);
        setNuevoComentario("");
      }}
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
    borderRadius: 16,
    padding: 20,
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

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#16163b",
    marginBottom: 15,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
kpiCard: {
  width: "31%",
  flexGrow: 0,
  flexShrink: 0,
  marginBottom: 10,
},
  summaryValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
  },
});