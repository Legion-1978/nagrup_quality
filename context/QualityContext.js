import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import repoIncidencias, {
  obtenerIncidencias,
} from "../services/incidenciasRepository";
import repoAuditorias, {
  obtenerAuditorias,
} from "../services/auditoriasRepository";
import repoFormaciones, {
  obtenerFormaciones,
} from "../services/formacionesRepository";
import repoMejoras, {
  obtenerMejoras,
} from "../services/mejorasRepository";
import repoProcedimientos, {
  obtenerProcedimientos,
} from "../services/procedimientosRepository";
import repoProveedores, {
  obtenerNCProveedores,
} from "../services/proveedoresRepository";
import repoReclamaciones, {
  obtenerReclamaciones,
} from "../services/reclamacionesRepository";
import repoSatisfaccion, {
  obtenerSatisfaccion,
} from "../services/satisfaccionRepository";

import { sincronizarLista } from "../services/sincronizarLista";

const QualityContext = createContext(null);

export const QualityProvider = ({ children }) => {

  const [loading, setLoading] =
    useState(true);

  const [incidencias, setIncidencias] =
    useState([]);

  const [auditorias, setAuditorias] =
    useState([]);

  const [reclamaciones, setReclamaciones] =
    useState([]);

  const [ncProveedores, setNcProveedores] =
    useState([]);

  const [mejoras, setMejoras] =
    useState([]);

  const [formaciones, setFormaciones] =
    useState([]);

  const [procedimientos, setProcedimientos] =
    useState([]);

  const [satisfacciones, setSatisfacciones] =
    useState([]);

  // Referencias con el último valor sincronizado de cada lista, para
  // poder calcular el diff sin depender del ciclo de render de React.
  const refIncidencias = useRef([]);
  const refAuditorias = useRef([]);
  const refReclamaciones = useRef([]);
  const refNcProveedores = useRef([]);
  const refMejoras = useRef([]);
  const refFormaciones = useRef([]);
  const refProcedimientos = useRef([]);
  const refSatisfacciones = useRef([]);

const cargarDatos = useCallback(async () => {
  try {
    const [
      incidenciasData,
      auditoriasData,
      reclamacionesData,
      proveedoresData,
      mejorasData,
      formacionesData,
      procedimientosData,
      satisfaccionesData,
    ] = await Promise.all([
      obtenerIncidencias(),
      obtenerAuditorias(),
      obtenerReclamaciones(),
      obtenerNCProveedores(),
      obtenerMejoras(),
      obtenerFormaciones(),
      obtenerProcedimientos(),
      obtenerSatisfaccion(),
    ]);

    setIncidencias(
      incidenciasData || []
    );

    setAuditorias(
      auditoriasData || []
    );

    setReclamaciones(
      reclamacionesData || []
    );

    setNcProveedores(
      proveedoresData || []
    );

    setMejoras(
      mejorasData || []
    );

    setFormaciones(
      formacionesData || []
    );

    setProcedimientos(
      procedimientosData || []
    );

    setSatisfacciones(
      satisfaccionesData || []
    );

    refIncidencias.current =
      incidenciasData || [];

    refAuditorias.current =
      auditoriasData || [];

    refReclamaciones.current =
      reclamacionesData || [];

    refNcProveedores.current =
      proveedoresData || [];

    refMejoras.current =
      mejorasData || [];

    refFormaciones.current =
      formacionesData || [];

    refProcedimientos.current =
      procedimientosData || [];

    refSatisfacciones.current =
      satisfaccionesData || [];

  } catch (error) {

    console.error(
      "Error cargando datos desde Supabase:",
      error
    );

    setIncidencias([]);
    setAuditorias([]);
    setReclamaciones([]);
    setNcProveedores([]);
    setMejoras([]);
    setFormaciones([]);
    setProcedimientos([]);
    setSatisfacciones([]);

  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  // Fábrica de "actualizarX": actualiza el estado local al instante
  // (para que la pantalla responda ya) y en paralelo sincroniza la
  // diferencia contra Supabase. Si la sincronización falla, se avisa
  // por consola pero no se revierte la UI (evita perder lo que el
  // usuario acaba de escribir); al recargar la app se volverá a leer
  // el estado real de Supabase.
  const crearActualizador = (
    setState,
    refAnterior,
    repositorio
  ) => (listaNueva) => {
    const siguiente =
      typeof listaNueva === "function"
        ? listaNueva(refAnterior.current)
        : listaNueva;

    setState(siguiente);

    const listaAnterior = refAnterior.current;
    refAnterior.current = siguiente;

    sincronizarLista({
      listaAnterior,
      listaNueva: siguiente,
      repositorio,
    }).catch((error) => {
      console.error(
        "Error sincronizando con Supabase:",
        error
      );
    });
  };

  const actualizarIncidencias = crearActualizador(
    setIncidencias,
    refIncidencias,
    repoIncidencias
  );

  const actualizarAuditorias = crearActualizador(
    setAuditorias,
    refAuditorias,
    repoAuditorias
  );

  const actualizarReclamaciones = crearActualizador(
    setReclamaciones,
    refReclamaciones,
    repoReclamaciones
  );

  const actualizarProveedores = crearActualizador(
    setNcProveedores,
    refNcProveedores,
    repoProveedores
  );

  const actualizarMejoras = crearActualizador(
    setMejoras,
    refMejoras,
    repoMejoras
  );

  const actualizarFormaciones = crearActualizador(
    setFormaciones,
    refFormaciones,
    repoFormaciones
  );

  const actualizarProcedimientos = crearActualizador(
    setProcedimientos,
    refProcedimientos,
    repoProcedimientos
  );

  const actualizarSatisfacciones = crearActualizador(
    setSatisfacciones,
    refSatisfacciones,
    repoSatisfaccion
  );

const eliminarDatosQuality = async () => {
  setIncidencias([]);
  setAuditorias([]);
  setReclamaciones([]);
  setNcProveedores([]);
  setMejoras([]);
  setFormaciones([]);
  setProcedimientos([]);
  setSatisfacciones([]);

  refIncidencias.current = [];
  refAuditorias.current = [];
  refReclamaciones.current = [];
  refNcProveedores.current = [];
  refMejoras.current = [];
  refFormaciones.current = [];
  refProcedimientos.current = [];
  refSatisfacciones.current = [];

  await Promise.all([
    repoIncidencias.reemplazarTodos([]),
    repoAuditorias.reemplazarTodos([]),
    repoReclamaciones.reemplazarTodos([]),
    repoProveedores.reemplazarTodos([]),
    repoMejoras.reemplazarTodos([]),
    repoFormaciones.reemplazarTodos([]),
    repoProcedimientos.reemplazarTodos([]),
    repoSatisfaccion.reemplazarTodos([]),
  ]);
};

const value = {
  loading,

  incidencias,
  setIncidencias,

  auditorias,
  setAuditorias,

  reclamaciones,
  setReclamaciones,

  ncProveedores,
  setNcProveedores,

  mejoras,
  setMejoras,

  formaciones,
  setFormaciones,

  procedimientos,
  setProcedimientos,

  satisfacciones,
  setSatisfacciones,

  actualizarIncidencias,
  actualizarAuditorias,
  actualizarReclamaciones,
  actualizarProveedores,
  actualizarMejoras,
  actualizarFormaciones,
  actualizarProcedimientos,
  actualizarSatisfacciones,

  eliminarDatosQuality,
};

  return (
    <QualityContext.Provider value={value}>
      {children}
    </QualityContext.Provider>
  );
};

export const useQuality = () => {
  const context = useContext(QualityContext);

  if (!context) {
    throw new Error(
      "useQuality debe usarse dentro de QualityProvider"
    );
  }

  return context;
};
