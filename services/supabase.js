import {
  AppState,
  Platform,
} from "react-native";

import {
  createClient,
} from "@supabase/supabase-js";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { CONFIG } from "../config";


// ============================================================
// NAGRUP QUALITY
// SERVICIO: supabase.js
// ============================================================
//
// Cliente unico de Supabase utilizado por toda la aplicacion.
//
// Se utiliza para:
//
//   - Base de datos
//   - Supabase Auth
//   - Edge Functions
//   - Sesiones
//
// IMPORTANTE:
//
// Este archivo utiliza exclusivamente una clave publica.
//
// NUNCA debe contener:
//
//   - service_role
//   - secret key
//   - claves administrativas
//
// ============================================================


// ============================================================
// CONFIGURACION
// ============================================================

const SUPABASE_URL =
  CONFIG.SUPABASE_URL;

const SUPABASE_ANON_KEY =
  CONFIG.SUPABASE_ANON_KEY;


// ============================================================
// VALIDAR CONFIGURACION
// ============================================================

if (
  !SUPABASE_URL ||
  !SUPABASE_ANON_KEY
) {
  console.error(
    "Faltan SUPABASE_URL o SUPABASE_ANON_KEY. Revisa config.js."
  );
}


// ============================================================
// CREAR CLIENTE SUPABASE
// ============================================================
//
// En React Native utilizamos AsyncStorage para conservar
// la sesion.
//
// En web dejamos que supabase-js utilice el almacenamiento
// disponible en el navegador.
//
// ============================================================

export const supabase =
  createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      auth: {
        ...(Platform.OS !== "web"
          ? {
              storage: AsyncStorage,
            }
          : {}),

        persistSession: true,

        autoRefreshToken: true,

        detectSessionInUrl: false,
      },
    }
  );


// ============================================================
// REFRESCO AUTOMATICO DE SESION
// ============================================================
//
// En aplicaciones nativas controlamos el refresco del token
// dependiendo de si la aplicacion esta activa.
//
// Cuando la aplicacion vuelve al primer plano:
//
//   startAutoRefresh()
//
// Cuando pasa a segundo plano:
//
//   stopAutoRefresh()
//
// En web no es necesario gestionar AppState.
//
// ============================================================

if (Platform.OS !== "web") {
  AppState.addEventListener(
    "change",
    (state) => {
      if (state === "active") {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    }
  );
}


// ============================================================
// TEST DE CONEXION
// ============================================================

export const testConnection =
  async () => {
    try {
      const {
        error,
      } =
        await supabase
          .from("usuarios")
          .select("id")
          .limit(1);

      if (error) {
        console.error(
          "Error Supabase:",
          error
        );

        return false;
      }

      return true;

    } catch (error) {
      console.error(
        "Error inesperado de Supabase:",
        error
      );

      return false;
    }
  };


// ============================================================
// EXPORT DEFAULT
// ============================================================

export default supabase;