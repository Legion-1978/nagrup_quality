import { createClient } from "npm:@supabase/supabase-js@2";


// ============================================================
// NAGRUP QUALITY
// EDGE FUNCTION: eliminar-usuario
// ============================================================
//
// Elimina completamente un usuario del sistema:
//
// 1. Comprueba que quien llama está autenticado.
// 2. Comprueba que pertenece a NAGRUP Quality.
// 3. Comprueba que está activo.
// 4. Comprueba que tiene rol Administrador.
// 5. Comprueba que el usuario objetivo existe.
// 6. Impide eliminar al propio administrador.
// 7. Impide eliminar el usuario "admin".
// 8. Elimina la identidad de Supabase Auth.
// 9. Elimina el registro de public.usuarios.
// 10. Devuelve el resultado.
//
// ============================================================


// ============================================================
// CORS
// ============================================================

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",

  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",

  "Access-Control-Allow-Methods":
    "POST, OPTIONS",
};


// ============================================================
// RESPUESTA JSON
// ============================================================

const responder = (
  datos: Record<string, unknown>,
  status = 200
) => {
  return new Response(
    JSON.stringify(datos),
    {
      status,

      headers: {
        ...corsHeaders,

        "Content-Type":
          "application/json",
      },
    }
  );
};


// ============================================================
// EDGE FUNCTION
// ============================================================

Deno.serve(async (req: Request) => {

  // ==========================================================
  // CORS PREFLIGHT
  // ==========================================================

  if (req.method === "OPTIONS") {
    return new Response(
      "ok",
      {
        status: 200,

        headers:
          corsHeaders,
      }
    );
  }


  try {

    // ========================================================
    // 1. SOLO POST
    // ========================================================

    if (req.method !== "POST") {
      return responder(
        {
          ok: false,

          error:
            "Metodo no permitido",
        },
        405
      );
    }


    // ========================================================
    // 2. CONFIGURACION SUPABASE
    // ========================================================

    const supabaseUrl =
      Deno.env.get(
        "SUPABASE_URL"
      );

    const anonKey =
      Deno.env.get(
        "SUPABASE_ANON_KEY"
      );

    const serviceRoleKey =
      Deno.env.get(
        "SUPABASE_SERVICE_ROLE_KEY"
      );


    if (
      !supabaseUrl ||
      !anonKey ||
      !serviceRoleKey
    ) {
      console.error(
        "Faltan variables de entorno de Supabase"
      );

      return responder(
        {
          ok: false,

          error:
            "Configuracion interna incompleta",
        },
        500
      );
    }


    // ========================================================
    // 3. OBTENER SESION DEL ADMINISTRADOR
    // ========================================================

    const authorization =
      req.headers.get(
        "Authorization"
      );


    if (!authorization) {
      return responder(
        {
          ok: false,

          error:
            "Usuario no autenticado",
        },
        401
      );
    }


    // ========================================================
    // 4. EXTRAER TOKEN
    // ========================================================

    const token =
      authorization.replace(
        /^Bearer\s+/i,
        ""
      );


    if (!token) {
      return responder(
        {
          ok: false,

          error:
            "Token de autenticacion no valido",
        },
        401
      );
    }


    // ========================================================
    // 5. CLIENTE DEL USUARIO AUTENTICADO
    // ========================================================

    const supabaseUsuario =
      createClient(
        supabaseUrl,
        anonKey,
        {
          global: {
            headers: {
              Authorization:
                authorization,
            },
          },

          auth: {
            persistSession:
              false,

            autoRefreshToken:
              false,
          },
        }
      );


    // ========================================================
    // 6. VALIDAR IDENTIDAD SUPABASE AUTH
    // ========================================================

    const {
      data: authData,
      error: authError,
    } =
      await supabaseUsuario
        .auth
        .getUser(
          token
        );


    if (
      authError ||
      !authData?.user
    ) {
      console.error(
        "Error verificando usuario:",
        authError
      );

      return responder(
        {
          ok: false,

          error:
            "Sesion no valida",
        },
        401
      );
    }


    const authIdAdministrador =
      authData.user.id;


    // ========================================================
    // 7. CLIENTE ADMINISTRATIVO
    // ========================================================
    //
    // service_role se utiliza únicamente dentro de esta
    // Edge Function.
    //
    // NUNCA debe incluirse en:
    //
    // - Expo
    // - React Native
    // - Snack
    // - config.js
    //
    // ========================================================

    const supabaseAdmin =
      createClient(
        supabaseUrl,
        serviceRoleKey,
        {
          auth: {
            persistSession:
              false,

            autoRefreshToken:
              false,
          },
        }
      );


    // ========================================================
    // 8. COMPROBAR ADMINISTRADOR
    // ========================================================

    const {
      data: administrador,
      error: administradorError,
    } =
      await supabaseAdmin
        .from(
          "usuarios"
        )
        .select(
          "id, auth_id, usuario, rol, activo"
        )
        .eq(
          "auth_id",
          authIdAdministrador
        )
        .maybeSingle();


    if (administradorError) {
      console.error(
        "Error comprobando administrador:",
        administradorError
      );

      return responder(
        {
          ok: false,

          error:
            administradorError.message ||
            "Error comprobando el administrador",
        },
        500
      );
    }


    // ========================================================
    // 9. COMPROBAR QUE EL ADMINISTRADOR EXISTE
    // ========================================================

    if (!administrador) {
      return responder(
        {
          ok: false,

          error:
            "El usuario autenticado no esta vinculado a NAGRUP Quality",
        },
        403
      );
    }


    // ========================================================
    // 10. COMPROBAR QUE ESTA ACTIVO
    // ========================================================

    if (
      administrador.activo !==
      true
    ) {
      return responder(
        {
          ok: false,

          error:
            "El administrador esta desactivado",
        },
        403
      );
    }


    // ========================================================
    // 11. COMPROBAR ROL
    // ========================================================

    if (
      administrador.rol !==
      "Administrador"
    ) {
      return responder(
        {
          ok: false,

          error:
            "No tienes permisos para eliminar usuarios",
        },
        403
      );
    }


    // ========================================================
    // 12. LEER USUARIO OBJETIVO
    // ========================================================

    const body =
      await req.json();


    const authId =
      String(
        body?.authId || ""
      ).trim();


    if (!authId) {
      return responder(
        {
          ok: false,

          error:
            "Falta el identificador Auth del usuario",
        },
        400
      );
    }


    // ========================================================
    // 13. IMPEDIR AUTOELIMINACION
    // ========================================================

    if (
      authId ===
      authIdAdministrador
    ) {
      return responder(
        {
          ok: false,

          error:
            "No puedes eliminar tu propio usuario",
        },
        403
      );
    }


    // ========================================================
    // 14. BUSCAR USUARIO OBJETIVO
    // ========================================================

    const {
      data: usuarioObjetivo,
      error: usuarioError,
    } =
      await supabaseAdmin
        .from(
          "usuarios"
        )
        .select(
          "id, auth_id, usuario, email, rol, activo"
        )
        .eq(
          "auth_id",
          authId
        )
        .maybeSingle();


    if (usuarioError) {
      console.error(
        "Error buscando usuario:",
        usuarioError
      );

      return responder(
        {
          ok: false,

          error:
            usuarioError.message ||
            "No se pudo comprobar el usuario",
        },
        500
      );
    }


    if (!usuarioObjetivo) {
      return responder(
        {
          ok: false,

          error:
            "El usuario no existe en NAGRUP Quality",
        },
        404
      );
    }


    // ========================================================
    // 15. PROTEGER USUARIO ADMIN
    // ========================================================

    if (
      usuarioObjetivo.usuario
        ?.trim()
        .toLowerCase() ===
      "admin"
    ) {
      return responder(
        {
          ok: false,

          error:
            "El usuario admin no puede eliminarse",
        },
        403
      );
    }


    // ========================================================
    // 16. ELIMINAR IDENTIDAD DE SUPABASE AUTH
    // ========================================================
    //
    // Esta operación elimina la identidad Auth del usuario.
    //
    // Se realiza exclusivamente desde la Edge Function.
    //
    // ========================================================

    const {
      error: eliminarAuthError,
    } =
      await supabaseAdmin
        .auth
        .admin
        .deleteUser(
          authId
        );


    if (eliminarAuthError) {
      console.error(
        "Error eliminando usuario de Supabase Auth:",
        eliminarAuthError
      );

      return responder(
        {
          ok: false,

          error:
            eliminarAuthError.message ||
            "No se pudo eliminar el usuario de Supabase Auth",
        },
        400
      );
    }


    // ========================================================
    // 17. ELIMINAR REGISTRO DE public.usuarios
    // ========================================================

const {
  data: perfilEliminado,
  error: eliminarPerfilError,
} =
  await supabaseAdmin
    .from("usuarios")
    .delete()
    .eq(
      "id",
      usuarioObjetivo.id
    )
    .select(
      "id, auth_id, usuario, email"
    );


if (eliminarPerfilError) {
  console.error(
    "Usuario eliminado de Auth pero fallo public.usuarios:",
    eliminarPerfilError
  );

  return responder(
    {
      ok: false,

      error:
        eliminarPerfilError.message ||
        "El usuario fue eliminado de Supabase Auth pero no se pudo eliminar su perfil",
    },
    500
  );
}


if (
  !perfilEliminado ||
  perfilEliminado.length !== 1
) {
  console.error(
    "El DELETE de public.usuarios no eliminó exactamente una fila:",
    perfilEliminado
  );

  return responder(
    {
      ok: false,

      error:
        "La identidad Auth fue eliminada, pero el perfil no pudo eliminarse correctamente",
    },
    500
  );
}


    if (eliminarPerfilError) {
      console.error(
        "Usuario eliminado de Auth pero fallo public.usuarios:",
        eliminarPerfilError
      );

      return responder(
        {
          ok: false,

          error:
            eliminarPerfilError.message ||
            "El usuario fue eliminado de Supabase Auth pero no se pudo eliminar su perfil",
        },
        500
      );
    }


    // ========================================================
    // 18. RESPUESTA CORRECTA
    // ========================================================

    return responder(
      {
        ok: true,

        authId,

        usuario:
          usuarioObjetivo.usuario,
      },
      200
    );


  } catch (error) {

    // ========================================================
    // 19. ERROR INESPERADO
    // ========================================================

    console.error(
      "Error inesperado eliminando usuario:",
      error
    );


    return responder(
      {
        ok: false,

        error:
          error instanceof Error
            ? error.message
            : "Error interno eliminando el usuario",
      },
      500
    );
  }
});