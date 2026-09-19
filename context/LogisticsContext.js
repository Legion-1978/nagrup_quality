import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import repoOTIF, {
  obtenerEntregasOTIF,
} from "../services/otifRepository";

import { sincronizarLista } from "../services/sincronizarLista";

const LogisticsContext = createContext(null);

export const LogisticsProvider = ({
  children,
}) => {
  const [loading, setLoading] =
    useState(true);

  const [entregasOTIF, setEntregasOTIF] =
    useState([]);

  const refEntregasOTIF =
    useRef([]);

  const cargarDatos =
    useCallback(async () => {
      try {
        const data =
          await obtenerEntregasOTIF();

        const listaFinal =
          data || [];

        setEntregasOTIF(
          listaFinal
        );

        refEntregasOTIF.current =
          listaFinal;
      } catch (error) {
        console.error(
          "Error cargando datos de logística desde Supabase:",
          error
        );

        setEntregasOTIF([]);
        refEntregasOTIF.current =
          [];
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const actualizarOTIF = (
    listaNueva
  ) => {
    const siguiente =
      typeof listaNueva === "function"
        ? listaNueva(refEntregasOTIF.current)
        : listaNueva;

    setEntregasOTIF(siguiente);

    const listaAnterior =
      refEntregasOTIF.current;

    refEntregasOTIF.current =
      siguiente;

    sincronizarLista({
      listaAnterior,
      listaNueva: siguiente,
      repositorio: repoOTIF,
    }).catch((error) => {
      console.error(
        "Error sincronizando OTIF con Supabase:",
        error
      );
    });
  };

  const eliminarDatosLogistics =
    async () => {
      setEntregasOTIF([]);

      refEntregasOTIF.current =
        [];

      await repoOTIF.reemplazarTodos(
        []
      );
    };

  const value = {
    loading,

    entregasOTIF,
    setEntregasOTIF,

    actualizarOTIF,

    eliminarDatosLogistics,
  };

  return (
    <LogisticsContext.Provider
      value={value}
    >
      {children}
    </LogisticsContext.Provider>
  );
};

export const useLogistics =
  () => {
    const context =
      useContext(
        LogisticsContext
      );

    if (!context) {
      throw new Error(
        "useLogistics debe usarse dentro de LogisticsProvider"
      );
    }

    return context;
  };