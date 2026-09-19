import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  obtenerConfiguracion,
  guardarConfiguracion,
} from "../services/configuracionRepository";
import { ahoraUI } from "../utils/fechas";

const ConfigContext = createContext(null);

const configuracionPorDefecto = {
  objetivoOTIF: 98,
  objetivoIncidencias: 90,
  objetivoReclamaciones: 90,
  objetivoProveedores: 90,
  objetivoAuditorias: 100,
  refrescoDashboard: 5,
  mostrarActividad: true,
  mostrarAlertas: true,
  notiIncidencias: true,
  notiReclamaciones: true,
  notiAuditorias: true,
};

export const ConfigProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [actividad, setActividad] = useState([]);
  const [configuracionDashboard, setConfiguracionDashboard] = useState(
    configuracionPorDefecto
  );

  const refDashboard = useRef(configuracionPorDefecto);
  const refActividad = useRef([]);

  const persistir = useCallback(async (dashboard, listaActividad) => {
    try {
      await guardarConfiguracion({
        dashboard,
        actividad: listaActividad,
      });
    } catch (error) {
      console.error("Error guardando configuración en Supabase:", error);
    }
  }, []);

  const cargarDatos = useCallback(async () => {
    try {
      const fila = await obtenerConfiguracion();

      const dashboard = {
        ...configuracionPorDefecto,
        ...(fila?.dashboard || {}),
      };
      const listaActividad = Array.isArray(fila?.actividad)
        ? fila.actividad
        : [];

      setConfiguracionDashboard(dashboard);
      setActividad(listaActividad);
      refDashboard.current = dashboard;
      refActividad.current = listaActividad;
    } catch (error) {
      console.error("Error cargando configuración:", error);
      setActividad([]);
      setConfiguracionDashboard(configuracionPorDefecto);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const actualizarConfiguracion = (config) => {
    setConfiguracionDashboard((prev) => {
      const siguiente = { ...prev, ...config };
      refDashboard.current = siguiente;
      persistir(siguiente, refActividad.current);
      return siguiente;
    });
  };

  const registrarActividad = (texto) => {
    setActividad((prev) => {
      const siguiente = [
        {
          fecha: ahoraUI(),
          texto,
        },
        ...prev,
      ].slice(0, 20);

      refActividad.current = siguiente;
      persistir(refDashboard.current, siguiente);
      return siguiente;
    });
  };

  const eliminarDatosConfig = async () => {
    setActividad([]);
    setConfiguracionDashboard(configuracionPorDefecto);
    refActividad.current = [];
    refDashboard.current = configuracionPorDefecto;
    await persistir(configuracionPorDefecto, []);
  };

  const value = {
    loading,
    actividad,
    setActividad,
    configuracionDashboard,
    setConfiguracionDashboard,
    actualizarConfiguracion,
    registrarActividad,
    eliminarDatosConfig,
  };

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error("useConfig debe usarse dentro de ConfigProvider");
  }

  return context;
};
