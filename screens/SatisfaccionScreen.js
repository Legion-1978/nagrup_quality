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

import SatisfaccionFormulario from "../components/SatisfaccionFormulario";
import SatisfaccionTabla from "../components/SatisfaccionTabla";
import SatisfaccionDetalleModal from "../components/SatisfaccionDetalleModal";
import { satisfaccionClienteSchema }
  from "../schemas/satisfaccionSchema.js";

import { validar }
  from "../schemas/validar";

import { mostrarMensaje }
  from "../utils/mensajes";
import { useQuality } from "../context/QualityContext";
import { useAuth } from "../context/AuthContext";

import {
  generarSiguienteId,
  PREFIJOS_ID,
} from "../utils/correlativos";

import { calcularKPIsSatisfaccion } from "../utils/satisfaccionKPI";

import {
  crearNuevaSatisfaccion,
  borrarSatisfaccion,
  actualizarEstadoSatisfaccion,
  actualizarSatisfaccion,
  marcarSeguimientoResuelto,
} from "../services/satisfaccionService";

import { crearModeloSatisfaccion } from "../models/Satisfaccion";

export default function SatisfaccionScreen() {

  const {
    satisfacciones = [],
    actualizarSatisfacciones,
  } = useQuality();

  const { tienePermisoEdicion } = useAuth();

  const puedeEditar = tienePermisoEdicion("satisfaccion");

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [cliente, setCliente] = useState("");
  const [responsable, setResponsable] = useState("");
  const [pedido, setPedido] = useState("");
  const [producto, setProducto] = useState("");
  const [fecha, setFecha] = useState("");
  const [canal, setCanal] = useState("Teléfono");
  const [nps, setNps] = useState("");
  const [notaCalidad, setNotaCalidad] = useState("");
  const [notaPlazo, setNotaPlazo] = useState("");
  const [notaComunicacion, setNotaComunicacion] = useState("");
  const [notaPrecio, setNotaPrecio] = useState("");
  const [comentario, setComentario] = useState("");
  const [reclamacionRelacionada, setReclamacionRelacionada] = useState("");

  const [editando, setEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const [detalleRegistro, setDetalleRegistro] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  const [nuevoComentario, setNuevoComentario] = useState("");
  const [accionSeguimientoTexto, setAccionSeguimientoTexto] = useState("");

  const kpis = useMemo(
    () => calcularKPIsSatisfaccion(satisfacciones),
    [satisfacciones]
  );

  const limpiarFormulario = () => {
    setCliente("");
    setResponsable("");
    setPedido("");
    setProducto("");
    setFecha("");
    setCanal("Teléfono");
    setNps("");
    setNotaCalidad("");
    setNotaPlazo("");
    setNotaComunicacion("");
    setNotaPrecio("");
    setComentario("");
    setReclamacionRelacionada("");
  };

const crearRegistro = async () => {

  if (!puedeEditar) {
    return;
  }

  const resultado = validar(
    satisfaccionClienteSchema,
    {
      cliente,
      responsable,
      fecha,
      canal,
      nps,
      notaCalidad,
      notaPlazo,
      notaComunicacion,
      notaPrecio,
      comentario,
    }
  );

  if (!resultado.ok) {

    mostrarMensaje(
      "Validación",
      resultado.mensaje
    );

    return;
  }

  const id =
    await generarSiguienteId(
      PREFIJOS_ID.SATISFACCION
    );

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

  const nuevo =
    crearNuevaSatisfaccion({
      id,
      cliente,
      responsable,
      pedido,
      producto,
      fecha:
        convertirFechaParaSQL(
          fecha
        ),
      canal,
      nps,
      notaCalidad,
      notaPlazo,
      notaComunicacion,
      notaPrecio,
      comentario,
      reclamacionRelacionada,
      crearModeloSatisfaccion,
    });

  actualizarSatisfacciones([
    ...satisfacciones,
    nuevo,
  ]);

  limpiarFormulario();

  setMostrarFormulario(
    false
  );

  mostrarMensaje(
    "Correcto",
    "Encuesta guardada"
  );
};

const guardarEdicion = () => {

  if (!puedeEditar) {
    return;
  }

  const resultado = validar(
    satisfaccionClienteSchema,
    {
      cliente,
      responsable,
      fecha,
      canal,
      nps,
      notaCalidad,
      notaPlazo,
      notaComunicacion,
      notaPrecio,
      comentario,
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

  const nuevaLista =
    actualizarSatisfaccion(
      satisfacciones,
      editando,
      {
        cliente:
          cliente.trim(),

        responsable:
          responsable.trim(),

        pedido:
          pedido.trim(),

        producto:
          producto.trim(),

        fecha:
          convertirFechaParaSQL(
            fecha
          ),

        canal:
          canal?.trim() ||
          "Teléfono",

        nps:
          Number(nps),

        notaCalidad:
          Number(notaCalidad),

        notaPlazo:
          Number(notaPlazo),

        notaComunicacion:
          Number(
            notaComunicacion
          ),

        notaPrecio:
          Number(notaPrecio),

        comentario:
          comentario.trim(),

        reclamacionRelacionada:
          reclamacionRelacionada.trim(),
      }
    );

  actualizarSatisfacciones(
    nuevaLista
  );

  setEditando(null);

  limpiarFormulario();

  setMostrarFormulario(
    false
  );

  mostrarMensaje(
    "Correcto",
    "Encuesta actualizada"
  );
};

  const eliminar = id => {
    if (!puedeEditar) {
      return;
    }
    actualizarSatisfacciones(
      borrarSatisfaccion(satisfacciones, id)
    );
  };

  const cambiarEstado = id => {
    if (!puedeEditar) {
      return;
    }
    actualizarSatisfacciones(
      actualizarEstadoSatisfaccion(satisfacciones, id)
    );
  };

  const verDetalle = item => {
    setDetalleRegistro(item);
    setAccionSeguimientoTexto("");
    setMostrarDetalle(true);
  };

  const editarRegistro = item => {

    if (!puedeEditar) {
      return;
    }

    setEditando(item.id);

    setCliente(item.cliente || "");
    setResponsable(item.responsable || "");
    setPedido(item.pedido || "");
    setProducto(item.producto || "");
    setFecha(
  item.fecha
    ? item.fecha.includes("-")
      ? item.fecha
          .split("-")
          .reverse()
          .join("/")
      : item.fecha
    : ""
);
    setCanal(item.canal || "Teléfono");
    setNps(item.nps === null || item.nps === undefined ? "" : String(item.nps));
    setNotaCalidad(
      item.notaCalidad === null || item.notaCalidad === undefined
        ? ""
        : String(item.notaCalidad)
    );
    setNotaPlazo(
      item.notaPlazo === null || item.notaPlazo === undefined
        ? ""
        : String(item.notaPlazo)
    );
    setNotaComunicacion(
      item.notaComunicacion === null ||
        item.notaComunicacion === undefined
        ? ""
        : String(item.notaComunicacion)
    );
    setNotaPrecio(
      item.notaPrecio === null || item.notaPrecio === undefined
        ? ""
        : String(item.notaPrecio)
    );
    setComentario(item.comentario || "");
    setReclamacionRelacionada(item.reclamacionRelacionada || "");

    setMostrarFormulario(true);

  };

  const agregarComentario = () => {

    if (!puedeEditar) {
      return;
    }

    if (!nuevoComentario.trim() || !detalleRegistro) {
      return;
    }

    const comentario = {
      fecha: new Date().toLocaleString("es-ES"),
      autor: "Usuario",
      texto: nuevoComentario.trim(),
    };

    const nuevaLista = satisfacciones.map(item =>
      item.id !== detalleRegistro.id
        ? item
        : {
            ...item,
            comentarios: [...(item.comentarios || []), comentario],
          }
    );

    actualizarSatisfacciones(nuevaLista);

    setDetalleRegistro({
      ...detalleRegistro,
      comentarios: [...(detalleRegistro.comentarios || []), comentario],
    });

    setNuevoComentario("");

  };

  const marcarSeguimiento = item => {

    if (!puedeEditar) {
      return;
    }

    const nuevaLista = marcarSeguimientoResuelto(
      satisfacciones,
      item.id,
      accionSeguimientoTexto
    );

    actualizarSatisfacciones(nuevaLista);

    setDetalleRegistro({
      ...item,
      requiereSeguimiento: false,
      accionSeguimiento: accionSeguimientoTexto?.trim() || item.accionSeguimiento,
      estado: "Cerrada",
    });

    setAccionSeguimientoTexto("");

  };

  const registrosFiltrados = satisfacciones.filter(item => {

    const texto = busqueda.toLowerCase();

    return (
      item.cliente?.toLowerCase().includes(texto) ||
      item.responsable?.toLowerCase().includes(texto) ||
      item.pedido?.toLowerCase().includes(texto)
    );

  });

  return (
    <ScreenLayout>

      <ScrollView style={styles.container}>

        <View style={styles.header}>

          <Text style={styles.title}>
            😊 Satisfacción del Cliente
          </Text>

          <Text style={styles.subtitle}>
            Seguimiento de NPS, valoraciones y acciones de seguimiento
          </Text>

        </View>

        {/* KPIs */}

        <View style={styles.row}>
          <KPIBox
            style={styles.dashboardKpi}
            title="NPS"
            value={kpis.nps}
            detail="Promotores - Detractores"
            icon="📈"
            color={
              kpis.nps >= 50
                ? "#16a34a"
                : kpis.nps >= 0
                ? "#eab308"
                : "#dc2626"
            }
          />

          <KPIBox
            style={styles.dashboardKpi}
            title="Encuestas"
            value={kpis.total}
            detail="Total registradas"
            icon="📋"
            color="#2563eb"
          />
        </View>

        <View style={styles.row}>
          <KPIBox
            style={styles.dashboardKpi}
            title="Promotores"
            value={kpis.promotores}
            detail="NPS 9-10"
            icon="🟢"
            color="#16a34a"
          />

          <KPIBox
            style={styles.dashboardKpi}
            title="Detractores"
            value={kpis.detractores}
            detail="NPS 0-6"
            icon="🔴"
            color="#dc2626"
          />
        </View>

        <View style={styles.row}>
          <KPIBox
            style={styles.dashboardKpi}
            title="Seguimientos"
            value={kpis.seguimientosPendientes}
            detail="Detractores sin resolver"
            icon="⚠️"
            color="#f97316"
          />

          <KPIBox
            style={styles.dashboardKpi}
            title="Pendientes"
            value={kpis.pendientes}
            detail="Encuestas por enviar"
            icon="📧"
            color="#eab308"
          />
        </View>

        {/* VALORACIONES POR ASPECTO */}

        <View style={styles.summaryCard}>

          <Text style={styles.cardTitle}>
            📊 Valoración Media por Aspecto (1-5)
          </Text>

          <View style={styles.summaryRow}>
            <Text>🏭 Calidad</Text>
            <Text style={styles.summaryValue}>
              {kpis.notaCalidadMedia}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text>⏱️ Plazo</Text>
            <Text style={styles.summaryValue}>
              {kpis.notaPlazoMedia}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text>💬 Comunicación</Text>
            <Text style={styles.summaryValue}>
              {kpis.notaComunicacionMedia}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text>💰 Precio</Text>
            <Text style={styles.summaryValue}>
              {kpis.notaPrecioMedia}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text>🏢 Cliente peor valorado</Text>
            <Text style={styles.summaryValue}>
              {kpis.clientePeorValorado}
            </Text>
          </View>

        </View>

        {/* FORMULARIO */}

        {puedeEditar && (
          <SatisfaccionFormulario
            mostrarFormulario={mostrarFormulario}
            setMostrarFormulario={setMostrarFormulario}
            editando={editando}
            guardarEdicion={guardarEdicion}
            cliente={cliente}
            setCliente={setCliente}
            responsable={responsable}
            setResponsable={setResponsable}
            pedido={pedido}
            setPedido={setPedido}
            producto={producto}
            setProducto={setProducto}
            fecha={fecha}
            setFecha={setFecha}
            canal={canal}
            setCanal={setCanal}
            nps={nps}
            setNps={setNps}
            notaCalidad={notaCalidad}
            setNotaCalidad={setNotaCalidad}
            notaPlazo={notaPlazo}
            setNotaPlazo={setNotaPlazo}
            notaComunicacion={notaComunicacion}
            setNotaComunicacion={setNotaComunicacion}
            notaPrecio={notaPrecio}
            setNotaPrecio={setNotaPrecio}
            comentario={comentario}
            setComentario={setComentario}
            reclamacionRelacionada={reclamacionRelacionada}
            setReclamacionRelacionada={setReclamacionRelacionada}
            crearRegistro={crearRegistro}
          />
        )}

        {!puedeEditar && (
          <View style={styles.summaryCard}>
            <Text style={{ color: "#64748b" }}>
              🔒 Tienes acceso de solo lectura a este módulo.
              Puedes consultar las encuestas, pero no crear,
              editar ni borrar registros.
            </Text>
          </View>
        )}

        {/* TABLA */}

        <SatisfaccionTabla
          registrosFiltrados={registrosFiltrados}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          cambiarEstado={cambiarEstado}
          eliminar={eliminar}
          verDetalle={verDetalle}
          editarRegistro={editarRegistro}
          soloLectura={!puedeEditar}
        />

        <View style={{ height: 50 }} />

      </ScrollView>

      <SatisfaccionDetalleModal
        visible={mostrarDetalle}
        detalleRegistro={detalleRegistro}
        nuevoComentario={nuevoComentario}
        setNuevoComentario={setNuevoComentario}
        agregarComentario={agregarComentario}
        editarRegistro={editarRegistro}
        marcarSeguimiento={marcarSeguimiento}
        accionSeguimientoTexto={accionSeguimientoTexto}
        setAccionSeguimientoTexto={setAccionSeguimientoTexto}
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

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#16163b",
    marginBottom: 15,
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

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 12,
  },

  dashboardKpi: {
    flex: 1,
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
