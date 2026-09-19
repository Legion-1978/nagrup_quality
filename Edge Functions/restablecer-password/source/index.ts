import { createClient } from "npm:@supabase/supabase-js@2";


// ============================================================
// NAGRUP QUALITY
// EDGE FUNCTION: restablecer-password
// ============================================================
//
// Permite a un Administrador cambiar la contraseña de un
// usuario de Supabase Auth.
//
// FLUJO:
//
// 1. Recibe la petición del administrador.
// 2. Comprueba el JWT de Supabase Auth.
// 3. Comprueba que el administrador existe en public.usuarios.
// 4. Comprueba que está activo.
// 5. Comprueba que tiene rol "Administrador".
// 6. Recibe authId + contraseña nueva.
// 7. Comprueba que el usuario objetivo existe.
// 8. Cambia la contraseña en Supabase Auth.
// 9. Marca debe_cambiar_password = true.
// 10. El usuario deberá cambiarla en su próximo acceso.
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
    // 6. VERIFICAR IDENTIDAD SUPABASE AUTH
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
    // IMPORTANTE:
    //
    // service_role solamente se utiliza aquí, dentro de
    // la Edge Function.
    //
    // Nunca debe ponerse en Expo, React Native o config.js.
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
    // 9. COMPROBAR QUE EXISTE
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
            "El usuario administrador esta desactivado",
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
            "No tienes permisos para restablecer contraseñas",
        },
        403
      );
    }


    // ========================================================
    // 12. LEER DATOS DE LA PETICION
    // ========================================================

    const body =
      await req.json();


    const authId =
      String(
        body?.authId || ""
      ).trim();


    const password =
      String(
        body?.password || ""
      );


    // ========================================================
    // 13. VALIDAR authId
    // ========================================================

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
    // 14. VALIDAR CONTRASEÑA
    // ========================================================

    if (
      !password ||
      password.length < 6
    ) {
      return responder(
        {
          ok: false,

          error:
            "La contraseña debe tener al menos 6 caracteres",
        },
        400
      );
    }


    // ========================================================
    // 15. COMPROBAR USUARIO OBJETIVO
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
          "id, auth_id, usuario, email, activo"
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
    // 16. RESTABLECER CONTRASEÑA EN SUPABASE AUTH
    // ========================================================
    //
    // Esta es la contraseña REAL que posteriormente utilizará
    // el usuario para iniciar sesión.
    //
    // ========================================================

    const {
      data: authActualizado,
      error: passwordError,
    } =
      await supabaseAdmin
        .auth
        .admin
        .updateUserById(
          authId,
          {
            password,
          }
        );


    if (passwordError) {
      console.error(
        "Error actualizando contraseña Auth:",
        passwordError
      );

      return responder(
        {
          ok: false,

          error:
            passwordError.message ||
            "No se pudo restablecer la contraseña",
        },
        400
      );
    }


    if (
      !authActualizado?.user?.id
    ) {
      return responder(
        {
          ok: false,

          error:
            "Supabase Auth no devolvio el usuario actualizado",
        },
        500
      );
    }


    // ========================================================
    // 17. MARCAR CONTRASEÑA COMO PROVISIONAL
    // ========================================================
    //
    // Al ponerla en TRUE:
    //
    // Login
    //   ↓
    // AuthContext
    //   ↓
    // usuarioActual.debeCambiarPassword = true
    //   ↓
    // CambiarPasswordObligatorioScreen
    //
    // ========================================================

    const {
      error: provisionalError,
    } =
      await supabaseAdmin
        .from(
          "usuarios"
        )
        .update({
          debe_cambiar_password:
            true,
        })
        .eq(
          "auth_id",
          authId
        );


    if (provisionalError) {
      console.error(
        "Error marcando contraseña provisional:",
        provisionalError
      );

      return responder(
        {
          ok: false,

          error:
            provisionalError.message ||
            "La contraseña fue actualizada pero no se pudo marcar como provisional",
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

        authId:
          authActualizado.user.id,

        debeCambiarPassword:
          true,
      },
      200
    );

  } catch (error) {

    // ========================================================
    // 19. ERROR INESPERADO
    // ========================================================

    console.error(
      "Error inesperado en restablecer-password:",
      error
    );


    return responder(
      {
        ok: false,

        error:
          error instanceof Error
            ? error.message
            : "Error interno restableciendo contraseña",
      },
      500
    );
  }
});