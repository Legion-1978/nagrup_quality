import React, { useState } from "react";

import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";

import { useAuth } from "../context/AuthContext";
import { useQuality } from "../context/QualityContext";
import { useLogistics } from "../context/LogisticsContext";
import { useConfig } from "../context/ConfigContext";
import { mostrarMensaje } from "../utils/mensajes";
import { usuarioInicial } from "../constants/usuarioInicial";
import { hashPassword } from "../utils/security";
import {
  crearUsuarioAuth,
  restablecerPasswordAuth,
  eliminarUsuarioAuth,
  actualizarUsuarioAuth, // 🔹 nuevo import
} from "../services/authAdminService";
import ScreenLayout from "../components/ScreenLayout";
import SistemaSection from "../components/configuracion/SistemaSection";
import UsuariosSection from "../components/configuracion/UsuariosSection";
import KPISection from "../components/configuracion/KPISection";
import styles from "../styles/configuracionStyles";

export default function ConfiguracionScreen() {
const {
  usuarios = [],
  actualizarUsuarios,
  actualizarUsuariosLocal,
} = useAuth();

const {
  eliminarDatosQuality,
} = useQuality();

const {
  eliminarDatosLogistics,
} = useLogistics();

  const {
    configuracionDashboard = {},
    actualizarConfiguracion,
    eliminarDatosConfig,
  } = useConfig();

const eliminarTodosLosDatos = async () => {
  try {

    await Promise.all([
      eliminarDatosQuality(),
      eliminarDatosLogistics(),
      eliminarDatosConfig(),
    ]);

    if (
      typeof window !==
      "undefined"
    ) {
      mostrarMensaje("success", "Datos eliminados", "Todos los datos han sido eliminados correctamente");
    }

  } catch (error) {

    console.error(error);

    mostrarMensaje("error", "Error", "No se pudieron eliminar los datos");

  }
};

const [config, setConfig] = useState({
  // =========================================================
  // SISTEMA
  // =========================================================

  nombreAplicacion:
    configuracionDashboard?.nombreAplicacion ??
    "NAGRUP Quality",

  versionSistema:
    configuracionDashboard?.versionSistema ??
    "1.0.0",

  empresa:
    configuracionDashboard?.empresa ?? "",

  cif:
    configuracionDashboard?.cif ?? "",

  direccion:
    configuracionDashboard?.direccion ?? "",

  ciudad:
    configuracionDashboard?.ciudad ?? "",

  pais:
    configuracionDashboard?.pais ?? "",

  telefono:
    configuracionDashboard?.telefono ?? "",

  email:
    configuracionDashboard?.email ?? "",

  web:
    configuracionDashboard?.web ?? "",

  responsableCalidad:
    configuracionDashboard?.responsableCalidad ?? "",

  directorGeneral:
    configuracionDashboard?.directorGeneral ?? "",

  normaPrincipal:
    configuracionDashboard?.normaPrincipal ?? "",


  // =========================================================
  // OBJETIVOS KPI
  // =========================================================

  objetivoOTIF:
    configuracionDashboard?.objetivoOTIF ?? 98,

  objetivoIncidencias:
    configuracionDashboard?.objetivoIncidencias ?? 90,

  objetivoReclamaciones:
    configuracionDashboard?.objetivoReclamaciones ?? 90,

  objetivoProveedores:
    configuracionDashboard?.objetivoProveedores ?? 90,

  objetivoAuditorias:
    configuracionDashboard?.objetivoAuditorias ?? 100,


  // =========================================================
  // DASHBOARD
  // =========================================================

  refrescoDashboard:
    configuracionDashboard?.refrescoDashboard ?? 5,

  mostrarActividad:
    configuracionDashboard?.mostrarActividad ?? true,

  mostrarAlertas:
    configuracionDashboard?.mostrarAlertas ?? true,


  // =========================================================
  // NOTIFICACIONES
  // =========================================================

  notiIncidencias:
    configuracionDashboard?.notiIncidencias ?? true,

  notiReclamaciones:
    configuracionDashboard?.notiReclamaciones ?? true,

  notiAuditorias:
    configuracionDashboard?.notiAuditorias ?? true,
});

  const [showSistema, setShowSistema] =
    useState(false);

  const [showObjetivos, setShowObjetivos] =
    useState(false);

  const [showDashboard, setShowDashboard] =
    useState(false);

  const [showUsuarios, setShowUsuarios] =
    useState(false);

  const [
    showNotificaciones,
    setShowNotificaciones,
  ] = useState(false);
  
  const [editandoId, setEditandoId] =
    useState(null);

  const [nuevoUsuario, setNuevoUsuario] =
    useState(usuarioInicial);

  const [confirmarPassword, setConfirmarPassword] =
    useState("");

const actualizarCampo = (campo, valor) => {
  setConfig((prev) => ({
    ...prev,
    [campo]: valor,
  }));
};

  const resetFormulario = () => {
    setEditandoId(null);
    setNuevoUsuario(usuarioInicial);
    setConfirmarPassword("");
  };

  const guardarUsuarios = async (
    lista
  ) => {
    await actualizarUsuarios(lista);
  };

const crearUsuario = async () => {
  // =========================================================
  // 1. NORMALIZAR DATOS
  // =========================================================

  const nombre =
    String(
      nuevoUsuario.nombre || ""
    ).trim();

  const usuario =
    String(
      nuevoUsuario.usuario || ""
    ).trim();

  const email =
    String(
      nuevoUsuario.email || ""
    )
      .trim()
      .toLowerCase();

  const password =
    nuevoUsuario.password || "";


  // =========================================================
  // 2. VALIDACIONES
  // =========================================================

  if (
    !nombre ||
    !usuario ||
    !email ||
    !password
  ) {
    mostrarMensaje("info", "Validación", "Complete nombre, usuario, correo electrónico y contraseña");

    return;
  }


  if (
    !/^[a-zA-Z0-9._-]+$/.test(
      usuario
    )
  ) {
    mostrarMensaje("info", "Validación", "El nombre de usuario solo puede contener letras, números, puntos, guiones y guiones bajos");

    return;
  }


  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    )
  ) {
    mostrarMensaje("info", "Validación", "El formato del correo electrónico no es válido");

    return;
  }


  if (
    password.length < 6
  ) {
    mostrarMensaje("info", "Validación", "La contraseña debe tener al menos 6 caracteres");

    return;
  }


  if (
    password !==
    confirmarPassword
  ) {
    mostrarMensaje("info", "Validación", "Las contraseñas no coinciden");

    return;
  }


  // =========================================================
  // 3. COMPROBAR USUARIO DUPLICADO EN MEMORIA
  // =========================================================

  const existeUsuario =
    usuarios.some(
      (u) =>
        u.usuario
          ?.trim()
          .toLowerCase() ===
        usuario.toLowerCase()
    );


  if (existeUsuario) {
    mostrarMensaje("error", "Error", "Ya existe un usuario con ese nombre de acceso");

    return;
  }


  // =========================================================
  // 4. COMPROBAR EMAIL DUPLICADO EN MEMORIA
  // =========================================================

  const existeEmail =
    usuarios.some(
      (u) =>
        u.email
          ?.trim()
          .toLowerCase() ===
        email
    );


  if (existeEmail) {
    mostrarMensaje("error", "Error", "Ya existe un usuario con ese correo electrónico");

    return;
  }


  try {
    // =======================================================
    // 5. PREPARAR ID
    // =======================================================

    const id =
      Date.now();


    // =======================================================
    // 6. HASH LEGACY TEMPORAL
    // =======================================================
    //
    // Se conserva mientras public.usuarios siga teniendo
    // la columna password.
    //
    // Este hash NO se utiliza para autenticar usuarios que
    // ya tienen authId.
    //
    // =======================================================

    const passwordHash =
      await hashPassword(
        password
      );


    // =======================================================
    // 7. CREAR USUARIO COMPLETO EN SERVIDOR
    // =======================================================
    //
    // bright-endpoint debe realizar:
    //
    //   Supabase Auth
    //          +
    //   public.usuarios
    //
    // utilizando service_role.
    //
    // =======================================================

    const resultadoAuth =
      await crearUsuarioAuth({
        id,

        nombre,

        usuario,

        email,

        password,

        passwordHash,

        departamento:
          nuevoUsuario.departamento ||
          "",

        rol:
          nuevoUsuario.rol ||
          "Usuario",

        activo:
          nuevoUsuario.activo !== false,

        permisos:
          nuevoUsuario.permisos ||
          {},

        permisosEdicion:
          nuevoUsuario
            .permisosEdicion ||
          {},
      });


    // =======================================================
    // 8. COMPROBAR RESULTADO
    // =======================================================

    if (
      !resultadoAuth?.authId
    ) {
      throw new Error(
        "No se recibió el identificador de Supabase Auth"
      );
    }


    // =======================================================
    // 9. CONSTRUIR USUARIO LOCAL
    // =======================================================

    const ahora =
      new Date().toISOString();


    const usuarioNuevo = {
      id:
        resultadoAuth.id ||
        id,

      nombre:
        resultadoAuth.nombre ||
        nombre,

      usuario:
        resultadoAuth.usuario ||
        usuario,

      email:
        resultadoAuth.email ||
        email,

      authId:
        resultadoAuth.authId,

      departamento:
        resultadoAuth.departamento ||
        nuevoUsuario.departamento ||
        "",

      rol:
        resultadoAuth.rol ||
        nuevoUsuario.rol ||
        "Usuario",

      activo:
        resultadoAuth.activo !== false,

      permisos:
        resultadoAuth.permisos ||
        nuevoUsuario.permisos ||
        {},

      permisosEdicion:
        resultadoAuth.permisosEdicion ||
        nuevoUsuario.permisosEdicion ||
        {},

      debeCambiarPassword:
        true,

      // Compatibilidad legacy temporal.
      password:
        passwordHash,

      createdAt:
        ahora,

      updatedAt:
        ahora,
    };


    // =======================================================
    // 10. ACTUALIZAR SOLAMENTE MEMORIA
    // =======================================================
    //
    // NO utilizamos guardarUsuarios().
    //
    // public.usuarios ya debe haber sido creado por
    // bright-endpoint.
    //
    // =======================================================

    const nuevaLista = [
      ...usuarios,
      usuarioNuevo,
    ];


    actualizarUsuariosLocal(
      nuevaLista
    );


    // =======================================================
    // 11. LIMPIAR FORMULARIO
    // =======================================================

    resetFormulario();


    // =======================================================
    // 12. MENSAJE
    // =======================================================

    mostrarMensaje("success", "Usuario", "Usuario creado correctamente. La contraseña es provisional...");

  } catch (error) {
    console.error(
      "Error creando usuario:",
      error
    );


    mostrarMensaje("error", "Error", error?.message || "No se pudo crear el usuario");
  }
};

const actualizarUsuario = async () => {
  const nombre = nuevoUsuario.nombre.trim();
  const email = (nuevoUsuario.email || "").trim().toLowerCase();
  const passwordNueva = nuevoUsuario.password || "";

  if (!nombre) {
    mostrarMensaje("info", "Validación", "El nombre no puede estar vacío");
    return;
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    mostrarMensaje("info", "Validación", "El formato del correo electrónico no es válido");
    return;
  }

  const usuarioActualLista = usuarios.find((u) => u.id === editandoId);
  if (!usuarioActualLista) {
    mostrarMensaje("error", "Error", "No se ha encontrado el usuario que se intenta actualizar");
    return;
  }

  let passwordFinal = usuarioActualLista.password || "";
  let debeCambiarPassword = usuarioActualLista.debeCambiarPassword ?? false;

  try {
    if (passwordNueva.trim().length > 0) {
      if (passwordNueva.length < 6) {
        mostrarMensaje("info", "Validación", "La nueva contraseña debe tener al menos 6 caracteres");
        return;
      }

      if (passwordNueva !== confirmarPassword) {
        mostrarMensaje("info", "Validación", "Las contraseñas no coinciden");
        return;
      }

      if (usuarioActualLista.authId) {
        await restablecerPasswordAuth({
          authId: usuarioActualLista.authId,
          password: passwordNueva,
        });

        debeCambiarPassword = true;
        passwordFinal = await hashPassword(passwordNueva);
      } else {
        passwordFinal = await hashPassword(passwordNueva);
        debeCambiarPassword = true;
      }
    }

    // 🔹 Llamada a la Edge Function
    const resultado = await actualizarUsuarioAuth({
      id: editandoId,
      updateData: {
        nombre,
        email,
        departamento: nuevoUsuario.departamento,
        rol: nuevoUsuario.rol,
        activo: nuevoUsuario.activo,
        permisos: nuevoUsuario.permisos,
        permisosEdicion: nuevoUsuario.permisosEdicion,
        password: passwordFinal, // compatibilidad legacy
        debeCambiarPassword,
      },
    });

    if (!resultado.ok) {
      throw new Error("No se pudo actualizar el usuario");
    }

    // 🔹 Actualizar estado local con la respuesta
    const nuevaLista = usuarios.map((u) =>
      u.id === editandoId ? { ...u, ...resultado.usuario } : u
    );

    actualizarUsuariosLocal(nuevaLista);
    resetFormulario();

    if (passwordNueva.trim().length > 0) {
      mostrarMensaje("success", "Usuario", "Usuario actualizado. La nueva contraseña es provisional y deberá cambiarla en el próximo acceso.");
    } else {
      mostrarMensaje("success", "Usuario", "Usuario actualizado");
    }
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    mostrarMensaje("error", "Error", error?.message || "No se pudo actualizar el usuario");
  }
};

const editarUsuario = (user) => {
  setEditandoId(
    user.id
  );

  setNuevoUsuario({
    nombre:
      user.nombre || "",

    usuario:
      user.usuario || "",

    email:
      user.email || "",

    departamento:
      user.departamento || "",

    // Nunca cargamos la contraseña actual
    // dentro del formulario.
    password: "",

    activo:
      user.activo !== false,

    rol:
      user.rol || "Usuario",

    permisos: {
      ...usuarioInicial.permisos,
      ...user.permisos,
    },

    permisosEdicion: {
      ...usuarioInicial.permisosEdicion,
      ...user.permisosEdicion,
    },
  });

  setConfirmarPassword("");
};

const eliminarUsuario = async (id) => {
  // =========================================================
  // 1. BUSCAR USUARIO
  // =========================================================

  const usuario =
    usuarios.find(
      (u) =>
        u.id === id
    );

  if (!usuario) {
    mostrarMensaje("error", "Error", "No se ha encontrado el usuario");

    return;
  }


  // =========================================================
  // 2. PROTEGER ADMIN
  // =========================================================

  if (
    usuario.usuario
      ?.trim()
      .toLowerCase() ===
    "admin"
  ) {
    mostrarMensaje("info", "Validación", "El usuario admin no puede eliminarse");

    return;
  }


  // =========================================================
  // 3. EJECUTAR ELIMINACION
  // =========================================================

  const ejecutarEliminacion =
    async () => {
      try {
        // ===================================================
        // USUARIO CON SUPABASE AUTH
        // ===================================================
        //
        // La Edge Function elimina:
        //
        // - identidad de Supabase Auth
        // - registro de public.usuarios
        //
        // NO debemos llamar después a guardarUsuarios(),
        // porque intentaríamos eliminarlo dos veces.
        //
        // ===================================================

        if (usuario.authId) {
          await eliminarUsuarioAuth({
            authId:
              usuario.authId,
          });


          // ================================================
          // ACTUALIZAR SOLO ESTADO LOCAL
          // ================================================
          //
          // La base de datos ya ha sido modificada por
          // la Edge Function.
          //
          // Por tanto aquí solamente quitamos el usuario
          // de la memoria de React.
          //
          // ================================================

          const nuevaLista =
            usuarios.filter(
              (u) =>
                u.id !== id
            );

          actualizarUsuariosLocal(
            nuevaLista
          );

          mostrarMensaje("success", "Usuario", "Usuario eliminado correctamente");

          return;
        }


        // ===================================================
        // USUARIO LEGACY SIN authId
        // ===================================================
        //
        // Compatibilidad temporal.
        //
        // Estos usuarios todavía no existen en Supabase Auth,
        // así que seguimos utilizando el sistema antiguo.
        //
        // ===================================================

        const nuevaLista =
          usuarios.filter(
            (u) =>
              u.id !== id
          );

        await guardarUsuarios(
          nuevaLista
        );

        mostrarMensaje("success", "Usuario", "Usuario eliminado correctamente");

      } catch (error) {
        console.error(
          "Error eliminando usuario:",
          error
        );

        mostrarMensaje("error", "Error", error?.message || "No se pudo eliminar el usuario");
      }
    };


  // =========================================================
  // 4. CONFIRMACION WEB
  // =========================================================

  if (
    typeof window !== "undefined"
  ) {
    const confirmar =
      window.confirm(
        `¿Eliminar ${usuario.nombre}?`
      );

    if (!confirmar) {
      return;
    }

    await ejecutarEliminacion();

    return;
  }


  // =========================================================
  // 5. CONFIRMACION REACT NATIVE
  // =========================================================

  Alert.alert(
    "Eliminar usuario",

    `¿Eliminar ${usuario.nombre}?`,

    [
      {
        text:
          "Cancelar",

        style:
          "cancel",
      },

      {
        text:
          "Eliminar",

        style:
          "destructive",

        onPress:
          ejecutarEliminacion,
      },
    ]
  );
};

  const guardar = async () => {
    try {
      await actualizarConfiguracion(
        config
      );

      mostrarMensaje("success", "Configuración", "Configuración guardada correctamente");

    } catch (error) {
      console.error(error);

      mostrarMensaje("error", "Error", "No se pudo guardar la configuración");
    }
  };

return (
  <ScreenLayout>
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        ⚙️ Configuración
      </Text>

      <Text style={styles.subtitle}>
        Administración del sistema y permisos
      </Text>

      <SistemaSection
        showSistema={showSistema}
        setShowSistema={setShowSistema}
        config={config}
        actualizarCampo={actualizarCampo}
        styles={styles}
      />

      <KPISection
        showObjetivos={showObjetivos}
        setShowObjetivos={setShowObjetivos}
        config={config}
        actualizarCampo={actualizarCampo}
        styles={styles}
      />

      {/* USUARIOS */}

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() =>
            setShowUsuarios(!showUsuarios)
          }
        >
          <Text style={styles.section}>
            👥 Usuarios
          </Text>

          <Text style={styles.arrow}>
            {showUsuarios ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {showUsuarios && (
          <UsuariosSection
            usuarios={usuarios}
            nuevoUsuario={nuevoUsuario}
            setNuevoUsuario={setNuevoUsuario}
            confirmarPassword={confirmarPassword}
            setConfirmarPassword={setConfirmarPassword}
            editandoId={editandoId}
            crearUsuario={crearUsuario}
            actualizarUsuario={actualizarUsuario}
            editarUsuario={editarUsuario}
            eliminarUsuario={eliminarUsuario}
            cancelarEdicion={resetFormulario}
            styles={styles}
          />
        )}
      </View>

      {/* DASHBOARD */}

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() =>
            setShowDashboard(!showDashboard)
          }
        >
          <Text style={styles.section}>
            📊 Dashboard
          </Text>

          <Text style={styles.arrow}>
            {showDashboard ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {showDashboard && (
          <>
            <Text style={styles.label}>
              Refresco Dashboard
            </Text>

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(
                config.refrescoDashboard
              )}
              onChangeText={(v) =>
                actualizarCampo(
                  "refrescoDashboard",
                  Number(v)
                )
              }
            />

            <View style={styles.switchRow}>
              <Text>
                Mostrar actividad
              </Text>

              <Switch
                value={
                  config.mostrarActividad
                }
                onValueChange={(v) =>
                  actualizarCampo(
                    "mostrarActividad",
                    v
                  )
                }
              />
            </View>

            <View style={styles.switchRow}>
              <Text>
                Mostrar alertas
              </Text>

              <Switch
                value={
                  config.mostrarAlertas
                }
                onValueChange={(v) =>
                  actualizarCampo(
                    "mostrarAlertas",
                    v
                  )
                }
              />
            </View>
          </>
        )}
      </View>

      {/* NOTIFICACIONES */}

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() =>
            setShowNotificaciones(
              !showNotificaciones
            )
          }
        >
          <Text style={styles.section}>
            🔔 Notificaciones
          </Text>

          <Text style={styles.arrow}>
            {showNotificaciones
              ? "▲"
              : "▼"}
          </Text>
        </TouchableOpacity>

        {showNotificaciones && (
          <>
            <View style={styles.switchRow}>
              <Text>
                Notificar incidencias
              </Text>

              <Switch
                value={
                  config.notiIncidencias
                }
                onValueChange={(v) =>
                  actualizarCampo(
                    "notiIncidencias",
                    v
                  )
                }
              />
            </View>

            <View style={styles.switchRow}>
              <Text>
                Notificar reclamaciones
              </Text>

              <Switch
                value={
                  config.notiReclamaciones
                }
                onValueChange={(v) =>
                  actualizarCampo(
                    "notiReclamaciones",
                    v
                  )
                }
              />
            </View>
          </>
        )}
      </View>

{/* ACCIONES DE CONFIGURACION */}

<View
  style={{
    marginTop: 20,
    gap: 12,
  }}
>
  <TouchableOpacity
    style={styles.button}
    onPress={guardar}
  >
    <Text style={styles.buttonText}>
      💾 Guardar Configuración
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.secondaryButton,
      {
        backgroundColor: "#dc2626",
      },
    ]}
    onPress={eliminarTodosLosDatos}
  >
    <Text style={styles.buttonText}>
      🗑 Eliminar Todos los Datos
    </Text>
  </TouchableOpacity>
</View>

      <View style={{ height: 60 }} />
    </ScrollView>
  </ScreenLayout>
);
}