import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  hashPassword,
  verificarPassword,
  esHashDeContrasena,
  esHashLegacySinSalt,
} from "../utils/security";

import { usuarioInicial } from "../constants/usuarioInicial";
import { supabase } from "../services/supabase";
import repoUsuarios, {
  obtenerUsuarios,
} from "../services/usuariosRepository";

import { sincronizarLista } from "../services/sincronizarLista";

const AuthContext = createContext(null);

const USUARIO_ADMIN_POR_DEFECTO = {
  id: 1,

  nombre: "admin",
  usuario: "admin",

  email: "dvc_1@hotmail.com",
  departamento: "",

  password: "admin",

  rol: "Administrador",
  activo: true,

  debeCambiarPassword: false,

  permisos: {
    dashboard: true,
    otif: true,
    incidencias: true,
    reclamaciones: true,
    proveedores: true,
    auditorias: true,
    satisfaccion: true,
    mejoras: true,
    formacion: true,
    procedimientos: true,
    costes: true,
    configuracion: true,
  },

  permisosEdicion: {
    otif: true,
    incidencias: true,
    reclamaciones: true,
    proveedores: true,
    auditorias: true,
    satisfaccion: true,
    mejoras: true,
    formacion: true,
    procedimientos: true,
  },
};

// ---------------------------------------------------------------
// Persistencia de usuarios:
//
// - Al arrancar, se lee la tabla "usuarios" de Supabase. Si está
//   vacía (primer arranque), se crea ahí el usuario admin por
//   defecto (con la contraseña ya hasheada) para que sea el mismo
//   en todos los dispositivos desde el primer momento.
// - actualizarUsuarios (alta/edición/borrado desde Configuración)
//   sincroniza el diff contra Supabase, igual que en QualityContext.
// - login (migración de hash legacy) y cambiarPasswordPropia
//   escriben también directamente en Supabase, porque cambian el
//   usuario "por dentro" sin pasar por actualizarUsuarios.
// ---------------------------------------------------------------

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] =
    useState(true);

  const [usuarios, setUsuarios] =
    useState([
      USUARIO_ADMIN_POR_DEFECTO,
    ]);

  const [usuarioActual, setUsuarioActual] =
    useState(null);

  const refUsuarios = useRef([]);

const cargarDatos = useCallback(async () => {
  try {
    // =======================================================
    // 1. RECUPERAR SESION DE SUPABASE AUTH
    // =======================================================

    const {
      data: sessionData,
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error(
        "Error recuperando sesion de Supabase Auth:",
        sessionError.message
      );

      setUsuarios([]);
      refUsuarios.current = [];
      setUsuarioActual(null);

      return;
    }

    const session =
      sessionData?.session;

    // =======================================================
    // 2. SI NO HAY SESION
    // =======================================================
    //
    // Ya NO consultamos public.usuarios estando anonimos.
    //
    // =======================================================

    if (!session?.user) {
      setUsuarios([]);
      refUsuarios.current = [];
      setUsuarioActual(null);

      return;
    }

    // =======================================================
    // 3. OBTENER PERFIL DEL USUARIO AUTENTICADO
    // =======================================================

    const {
      data: perfil,
      error: perfilError,
    } = await supabase
      .from("usuarios")
      .select("*")
      .eq(
        "auth_id",
        session.user.id
      )
      .maybeSingle();

    if (
      perfilError ||
      !perfil
    ) {
      console.error(
        "No se pudo recuperar el perfil vinculado:",
        perfilError
      );

      await supabase.auth.signOut({
        scope: "local",
      });

      setUsuarios([]);
      refUsuarios.current = [];
      setUsuarioActual(null);

      return;
    }

    // =======================================================
    // 4. COMPROBAR QUE SIGUE ACTIVO
    // =======================================================

    if (
      perfil.activo !== true
    ) {
      console.warn(
        "El usuario autenticado esta desactivado."
      );

      await supabase.auth.signOut({
        scope: "local",
      });

      setUsuarios([]);
      refUsuarios.current = [];
      setUsuarioActual(null);

      return;
    }

    // =======================================================
    // 5. CONVERTIR CAMPOS DE SUPABASE A JAVASCRIPT
    // =======================================================

    const usuarioPerfil = {
      ...perfil,

      authId:
        perfil.auth_id,

      debeCambiarPassword:
        Boolean(
          perfil.debe_cambiar_password
        ),

      createdAt:
        perfil.created_at,

      updatedAt:
        perfil.updated_at,

      permisosEdicion:
        perfil.permisos_edicion ||
        {},
    };

    // =======================================================
    // 6. CONSTRUIR USUARIO DE SESION
    // =======================================================

    const usuarioSesion = {
      id:
        usuarioPerfil.id,

      authId:
        usuarioPerfil.authId,

      nombre:
        usuarioPerfil.nombre,

      usuario:
        usuarioPerfil.usuario,

      email:
        usuarioPerfil.email,

      departamento:
        usuarioPerfil.departamento ||
        "",

      rol:
        usuarioPerfil.rol,

      activo:
        usuarioPerfil.activo !== false,

      debeCambiarPassword:
        usuarioPerfil
          .debeCambiarPassword,

      permisos: {
        ...usuarioInicial.permisos,
        ...usuarioPerfil.permisos,
      },

      permisosEdicion: {
        ...usuarioInicial.permisosEdicion,
        ...usuarioPerfil.permisosEdicion,
      },
    };

    // =======================================================
    // 7. ESTABLECER SESION INTERNA
    // =======================================================

    setUsuarioActual(
      usuarioSesion
    );

    // Inicialmente solo cargamos el propio perfil.

    setUsuarios([
      usuarioPerfil,
    ]);

    refUsuarios.current = [
      usuarioPerfil,
    ];

    // =======================================================
    // 8. SI ES ADMINISTRADOR, CARGAR LISTA DE USUARIOS
    // =======================================================

    if (
      usuarioPerfil.rol ===
      "Administrador"
    ) {
      const {
        data: usuariosAdmin,
        error: usuariosAdminError,
      } = await supabase
        .from("usuarios")
        .select("*")
        .order(
          "id",
          {
            ascending: true,
          }
        );

      if (usuariosAdminError) {
        console.error(
          "No se pudo cargar la lista de usuarios:",
          usuariosAdminError
        );

        return;
      }

      if (
        Array.isArray(
          usuariosAdmin
        )
      ) {
        const listaUsuarios =
          usuariosAdmin.map(
            (u) => ({
              ...u,

              authId:
                u.auth_id,

              debeCambiarPassword:
                Boolean(
                  u.debe_cambiar_password
                ),

              createdAt:
                u.created_at,

              updatedAt:
                u.updated_at,

              permisosEdicion:
                u.permisos_edicion ||
                {},
            })
          );

        setUsuarios(
          listaUsuarios
        );

        refUsuarios.current =
          listaUsuarios;
      }
    }
  } catch (error) {
    console.error(
      "Error cargando autenticacion:",
      error
    );

    setUsuarios([]);
    refUsuarios.current = [];
    setUsuarioActual(null);
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

const actualizarUsuarios = async (listaNueva) => {
  const listaAnterior = refUsuarios.current;

  setUsuarios(listaNueva);
  refUsuarios.current = listaNueva;

  try {
    await sincronizarLista({
      listaAnterior,
      listaNueva,
      repositorio: repoUsuarios,
    });
  } catch (error) {
    console.error(
      "Error sincronizando usuarios con Supabase:",
      error
    );

    throw error;
  }
};

const actualizarUsuariosLocal = (listaNueva) => {
  setUsuarios(
    listaNueva
  );

  refUsuarios.current =
    listaNueva;
};

// ============================================================
// RESOLVER LOGIN
// ============================================================
//
// Convierte:
//
// usuario -> email
//
// mediante la Edge Function resolver-login.
//
// La contraseña NO se envía a esta función.
//
// ============================================================

const resolverLogin = async (
  usuario
) => {
  const nombreUsuario =
    String(usuario || "")
      .trim()
      .toLowerCase();

  if (!nombreUsuario) {
    return null;
  }

  try {
    const {
      data,
      error,
    } =
      await supabase.functions.invoke(
        "resolver-login",
        {
          body: {
            usuario:
              nombreUsuario,
          },
        }
      );

    if (error) {
      console.error(
        "Error resolver-login:",
        error
      );

      return null;
    }

    if (
      data?.ok !== true ||
      !data?.email
    ) {
      return null;
    }

    return {
      email:
        data.email
          .trim()
          .toLowerCase(),
    };
  } catch (error) {
    console.error(
      "Error inesperado en resolver-login:",
      error
    );

    return null;
  }
};

const login = async (usuario, password) => {
  const nombreUsuario = String(usuario || "").trim().toLowerCase();

  if (!nombreUsuario || !password) {
    return { ok: false, reason: "missing-fields" };
  }

  try {
    // ========================================================
    // 1. RESOLVER USUARIO -> EMAIL
    // ========================================================
    const datosLogin = await resolverLogin(nombreUsuario);

    if (!datosLogin?.email) {
      return { ok: false, reason: "user-not-found" };
    }

    // ========================================================
    // 2. AUTENTICAR CON SUPABASE AUTH
    // ========================================================
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: datosLogin.email,
        password,
      });

    if (authError || !authData?.user) {
      console.error("Error Supabase Auth:", authError?.message);

      if (authError?.message?.includes("Invalid login credentials")) {
        return { ok: false, reason: "wrong-password" };
      }

      return { ok: false, reason: "auth-error" };
    }

    // ========================================================
    // 3. OBTENER PERFIL VINCULADO
    // ========================================================
    const { data: perfil, error: perfilError } =
      await supabase
        .from("usuarios")
        .select("*")
        .eq("auth_id", authData.user.id)
        .maybeSingle();

    if (perfilError || !perfil) {
      console.error("No se pudo recuperar el perfil:", perfilError);
      await supabase.auth.signOut({ scope: "local" });
      return { ok: false, reason: "profile-error" };
    }

    // ========================================================
    // 4. VERIFICAR ESTADO
    // ========================================================
    if (perfil.activo !== true) {
      await supabase.auth.signOut({ scope: "local" });
      return { ok: false, reason: "inactive" };
    }

    // ========================================================
    // 5. VERIFICAR NOMBRE DE USUARIO
    // ========================================================
    if (String(perfil.usuario || "").trim().toLowerCase() !== nombreUsuario) {
      console.error("El usuario autenticado no coincide con el perfil solicitado.");
      await supabase.auth.signOut({ scope: "local" });
      return { ok: false, reason: "user-mismatch" };
    }

    // ========================================================
    // 6. CONVERTIR CAMPOS
    // ========================================================
    const usuarioPerfil = {
      ...perfil,
      authId: perfil.auth_id,
      debeCambiarPassword: Boolean(perfil.debe_cambiar_password),
      createdAt: perfil.created_at,
      updatedAt: perfil.updated_at,
      permisosEdicion: perfil.permisos_edicion || {},
    };

    // ========================================================
    // 7. CREAR SESION INTERNA
    // ========================================================
    const usuarioSesion = {
      id: usuarioPerfil.id,
      authId: usuarioPerfil.authId,
      nombre: usuarioPerfil.nombre,
      usuario: usuarioPerfil.usuario,
      email: usuarioPerfil.email,
      rol: usuarioPerfil.rol,
      activo: usuarioPerfil.activo !== false,
      departamento: usuarioPerfil.departamento || "",
      debeCambiarPassword: usuarioPerfil.debeCambiarPassword,
      permisos: {
        ...usuarioInicial.permisos,
        ...usuarioPerfil.permisos,
      },
      permisosEdicion: {
        ...usuarioInicial.permisosEdicion,
        ...usuarioPerfil.permisosEdicion,
      },
    };

    setUsuarioActual(usuarioSesion);

    setUsuarios((listaActual) => {
      const existe = listaActual.some((u) => u.id === usuarioPerfil.id);
      if (existe) {
        const actualizada = listaActual.map((u) =>
          u.id === usuarioPerfil.id ? { ...u, ...usuarioPerfil } : u
        );
        refUsuarios.current = actualizada;
        return actualizada;
      }
      const actualizada = [...listaActual, usuarioPerfil];
      refUsuarios.current = actualizada;
      return actualizada;
    });

    return { ok: true, user: usuarioSesion };
  } catch (error) {
    console.error("Error inesperado durante login:", error);
    try {
      await supabase.auth.signOut({ scope: "local" });
    } catch {
      // No hacemos nada.
    }
    return { ok: false, reason: "unexpected-error" };
  }
};

const logout = async () => {
  try {
    // =======================================================
    // CERRAR SESION SUPABASE AUTH
    // =======================================================
    //
    // Si el usuario actual esta vinculado con Supabase Auth,
    // cerramos tambien su sesion real.
    //
    // scope: "local" cierra solamente la sesion de este
    // dispositivo.
    //
    // =======================================================

    if (usuarioActual?.authId) {
      const { error } =
        await supabase.auth.signOut({
          scope: "local",
        });

      if (error) {
        console.error(
          "Error cerrando sesion de Supabase Auth:",
          error.message
        );
      }
    }

  } catch (error) {
    console.error(
      "Error inesperado cerrando sesion:",
      error
    );
  } finally {
    // =======================================================
    // CERRAR SESION INTERNA
    // =======================================================

    setUsuarioActual(null);
  }
};

const cambiarPasswordPropia = async (passwordNueva) => {
  if (!usuarioActual) {
    return false;
  }

  if (
    !passwordNueva ||
    passwordNueva.length < 6
  ) {
    return false;
  }

  try {
    // =======================================================
    // USUARIO MIGRADO A SUPABASE AUTH
    // =======================================================

    if (usuarioActual.authId) {
      // Primero cambiamos la contraseña real
      // gestionada por Supabase Auth.

      const { error: errorAuth } =
        await supabase.auth.updateUser({
          password: passwordNueva,
        });

      if (errorAuth) {
        console.error(
          "Error cambiando password en Supabase Auth:",
          errorAuth.message
        );

        return false;
      }

      // Ya no necesitamos cambiar el hash antiguo para
      // autenticar a este usuario.
      //
      // Por ahora lo conservamos en public.usuarios
      // porque estamos haciendo una migracion progresiva.

      await repoUsuarios.actualizar(
        usuarioActual.id,
        {
          debeCambiarPassword: false,
        }
      );

      // Actualizamos usuarios en memoria.

      setUsuarios((lista) => {
        const listaActualizada =
          lista.map((u) =>
            u.id === usuarioActual.id
              ? {
                  ...u,
                  debeCambiarPassword: false,
                }
              : u
          );

        refUsuarios.current =
          listaActualizada;

        return listaActualizada;
      });

      // Actualizamos la sesion interna.

      setUsuarioActual((actual) => ({
        ...actual,
        debeCambiarPassword: false,
      }));

      return true;
    }


    // =======================================================
    // USUARIO TODAVIA NO MIGRADO
    // =======================================================
    //
    // Este bloque es temporal.
    //
    // Los usuarios que aun no tengan authId continuan
    // utilizando el sistema antiguo mientras completamos
    // la migracion.
    //
    // =======================================================

    const nuevoHash =
      await hashPassword(
        passwordNueva
      );

    await repoUsuarios.actualizar(
      usuarioActual.id,
      {
        password: nuevoHash,
        debeCambiarPassword: false,
      }
    );

    setUsuarios((lista) => {
      const listaActualizada =
        lista.map((u) =>
          u.id === usuarioActual.id
            ? {
                ...u,
                password: nuevoHash,
                debeCambiarPassword: false,
              }
            : u
        );

      refUsuarios.current =
        listaActualizada;

      return listaActualizada;
    });

    setUsuarioActual((actual) => ({
      ...actual,
      debeCambiarPassword: false,
    }));

    return true;

  } catch (error) {
    console.error(
      "Error actualizando password propia:",
      error
    );

    return false;
  }
};

  const tienePermisoEdicion = (
    modulo
  ) => {
    if (!usuarioActual) {
      return false;
    }

    if (
      usuarioActual.rol ===
      "Administrador"
    ) {
      return true;
    }

    return Boolean(
      usuarioActual
        .permisosEdicion?.[modulo]
    );
  };

const value = {
  loading,
  usuarios,
  setUsuarios,
  usuarioActual,
  setUsuarioActual,
  actualizarUsuarios,
  actualizarUsuariosLocal,
  tienePermisoEdicion,
  login,
  logout,
  cambiarPasswordPropia,
  restablecerPassword, // 🔹 nuevo
};

const restablecerPassword = async (usuario) => {
  const nombreUsuario = String(usuario || "").trim().toLowerCase();

  if (!nombreUsuario) {
    return { ok: false, reason: "missing-user" };
  }

  try {
    // 1. Resolver usuario -> email
    const datosLogin = await resolverLogin(nombreUsuario);
    if (!datosLogin?.email) {
      return { ok: false, reason: "user-not-found" };
    }

    // 2. Generar contraseña provisional
    const provisional = "Provisional123"; // puedes personalizarla

    // 3. Actualizar en Supabase Auth
    const { error } = await supabase.auth.admin.updateUserByEmail(datosLogin.email, {
      password: provisional,
    });

    if (error) {
      console.error("Error restableciendo contraseña:", error.message);
      return { ok: false, reason: "reset-error" };
    }

    // 4. Marcar en tabla usuarios que debe cambiarla
    await repoUsuarios.actualizarPorEmail(datosLogin.email, {
      debeCambiarPassword: true,
    });

    return { ok: true, provisional };
  } catch (error) {
    console.error("Error inesperado restableciendo contraseña:", error);
    return { ok: false, reason: "unexpected-error" };
  }
};

const enviarCorreoResetPassword = async (email) => {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, reason: "invalid-email" };
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://tusitio.com/reset-password", // URL de tu frontend
    });

    if (error) {
      console.error("Error enviando correo de reset:", error.message);
      return { ok: false, reason: "reset-error" };
    }

    return { ok: true };
  } catch (error) {
    console.error("Error inesperado:", error);
    return { ok: false, reason: "unexpected-error" };
  }
};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe usarse dentro de AuthProvider"
    );
  }

  return context;
};
