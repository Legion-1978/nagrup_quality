import { createClient } from "npm:@supabase/supabase-js@2";


// ============================================================
// NAGRUP QUALITY
// EDGE FUNCTION: bright-endpoint
// FUNCION REAL: crear-usuario
// ============================================================
//
// Crea un usuario completo:
//
// 1. Valida la sesión del solicitante.
// 2. Comprueba que está activo.
// 3. Comprueba que es Administrador.
// 4. Valida los datos del nuevo usuario.
// 5. Comprueba usuario/email duplicados.
// 6. Crea la identidad en Supabase Auth.
// 7. Crea el perfil en public.usuarios.
// 8. Si falla el perfil, elimina la identidad Auth creada.
// 9. Devuelve el usuario creado.
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
  // 1. PREFLIGHT CORS
  // ==========================================================

  if (req.method === "OPTIONS") {
    return new Response(
      "ok",
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  }


  try {
    // ========================================================
    // 2. SOLO POST
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
    // 3. CONFIGURACION SUPABASE
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
    // 4. OBTENER JWT DEL ADMINISTRADOR
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
    // 5. CLIENTE DEL USUARIO
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
            persistSession: false,
            autoRefreshToken: false,
          },
        }
      );


    // ========================================================
    // 6. VALIDAR JWT
    // ========================================================

    const {
      data: authData,
      error: authError,
    } =
      await supabaseUsuario
        .auth
        .getUser(token);


    if (
      authError ||
      !authData?.user
    ) {
      console.error(
        "Error verificando usuario Auth:",
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
    // Este cliente utiliza exclusivamente service_role.
    //
    // NO contiene el JWT del usuario autenticado.
    //
    // ========================================================

    const supabaseAdmin =
      createClient(
        supabaseUrl,
        serviceRoleKey,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
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
        .from("usuarios")
        .select(
          "id, auth_id, usuario, email, rol, activo"
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


    if (
      administrador.activo !== true
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


    if (
      administrador.rol !==
      "Administrador"
    ) {
      return responder(
        {
          ok: false,

          error:
            "No tienes permisos para crear usuarios",
        },
        403
      );
    }


    // ========================================================
    // 9. LEER DATOS
    // ========================================================

    const body =
      await req.json();


    const id =
      Number(body?.id);


    const nombre =
      String(
        body?.nombre || ""
      ).trim();


    const usuario =
      String(
        body?.usuario || ""
      ).trim();


    const email =
      String(
        body?.email || ""
      )
        .trim()
        .toLowerCase();


    const password =
      String(
        body?.password || ""
      );


    const passwordHash =
      String(
        body?.passwordHash || ""
      );


    const departamento =
      String(
        body?.departamento || ""
      ).trim();


    const rol =
      String(
        body?.rol || "Usuario"
      ).trim();


    const activo =
      body?.activo !== false;


    const permisos =
      body?.permisos &&
      typeof body.permisos === "object"
        ? body.permisos
        : {};


    const permisosEdicion =
      body?.permisosEdicion &&
      typeof body.permisosEdicion === "object"
        ? body.permisosEdicion
        : {};


    // ========================================================
    // 10. VALIDAR ID
    // ========================================================

    if (
      !Number.isSafeInteger(id) ||
      id <= 0
    ) {
      return responder(
        {
          ok: false,
          error:
            "Identificador interno no valido",
        },
        400
      );
    }


    // ========================================================
    // 11. VALIDAR NOMBRE
    // ========================================================

    if (!nombre) {
      return responder(
        {
          ok: false,
          error:
            "El nombre es obligatorio",
        },
        400
      );
    }


    // ========================================================
    // 12. VALIDAR USUARIO
    // ========================================================

    if (
      !usuario ||
      !/^[a-zA-Z0-9._-]+$/.test(
        usuario
      )
    ) {
      return responder(
        {
          ok: false,
          error:
            "El nombre de usuario no es valido",
        },
        400
      );
    }


    // ========================================================
    // 13. VALIDAR EMAIL
    // ========================================================

    if (
      !email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      return responder(
        {
          ok: false,
          error:
            "El formato del correo electronico no es valido",
        },
        400
      );
    }


    // ========================================================
    // 14. VALIDAR PASSWORD
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


    if (!passwordHash) {
      return responder(
        {
          ok: false,

          error:
            "Falta el hash de compatibilidad de la contraseña",
        },
        400
      );
    }


    // ========================================================
    // 15. COMPROBAR USUARIO DUPLICADO
    // ========================================================

    const {
      data: usuarioDuplicado,
      error: usuarioDuplicadoError,
    } =
      await supabaseAdmin
        .from("usuarios")
        .select(
          "id, usuario"
        )
        .ilike(
          "usuario",
          usuario
        )
        .limit(1)
        .maybeSingle();


    if (usuarioDuplicadoError) {
      console.error(
        "Error comprobando usuario:",
        usuarioDuplicadoError
      );

      return responder(
        {
          ok: false,

          error:
            "No se pudo comprobar el nombre de usuario",
        },
        500
      );
    }


    if (usuarioDuplicado) {
      return responder(
        {
          ok: false,

          error:
            "Ya existe un usuario con ese nombre de acceso",
        },
        409
      );
    }


    // ========================================================
    // 16. COMPROBAR EMAIL DUPLICADO EN public.usuarios
    // ========================================================

    const {
      data: emailDuplicado,
      error: emailDuplicadoError,
    } =
      await supabaseAdmin
        .from("usuarios")
        .select(
          "id, email"
        )
        .ilike(
          "email",
          email
        )
        .limit(1)
        .maybeSingle();


    if (emailDuplicadoError) {
      console.error(
        "Error comprobando email:",
        emailDuplicadoError
      );

      return responder(
        {
          ok: false,

          error:
            "No se pudo comprobar el correo electronico",
        },
        500
      );
    }


    if (emailDuplicado) {
      return responder(
        {
          ok: false,

          error:
            "Ya existe un usuario con ese correo electronico",
        },
        409
      );
    }


    // ========================================================
    // 17. CREAR IDENTIDAD SUPABASE AUTH
    // ========================================================

    const {
      data: nuevoUsuarioAuth,
      error: crearAuthError,
    } =
      await supabaseAdmin
        .auth
        .admin
        .createUser({
          email,

          password,

          email_confirm:
            true,
        });


    if (crearAuthError) {
      console.error(
        "Error creando usuario en Supabase Auth:",
        crearAuthError
      );

      return responder(
        {
          ok: false,

          error:
            crearAuthError.message ||
            "No se pudo crear el usuario en Supabase Auth",
        },
        400
      );
    }


    const authId =
      nuevoUsuarioAuth?.user?.id;


    if (!authId) {
      return responder(
        {
          ok: false,

          error:
            "Supabase Auth no devolvio el identificador del usuario",
        },
        500
      );
    }


    // ========================================================
    // 18. CREAR PERFIL EN public.usuarios
    // ========================================================

    const ahora =
      new Date().toISOString();


    const {
      data: perfilCreado,
      error: crearPerfilError,
    } =
      await supabaseAdmin
        .from("usuarios")
        .insert({
          id,

          auth_id:
            authId,

          nombre,

          usuario,

          email,

          departamento,

          password:
            passwordHash,

          rol,

          activo,

          debe_cambiar_password:
            true,

          permisos,

          permisos_edicion:
            permisosEdicion,

          created_at:
            ahora,

          updated_at:
            ahora,
        })
        .select(
          "id, auth_id, nombre, usuario, email, departamento, rol, activo, debe_cambiar_password, permisos, permisos_edicion, created_at, updated_at"
        )
        .single();


    // ========================================================
    // 19. ROLLBACK SI FALLA public.usuarios
    // ========================================================

    if (
      crearPerfilError ||
      !perfilCreado
    ) {
      console.error(
        "Falló public.usuarios. Se intentará rollback de Auth:",
        crearPerfilError
      );


      const {
        error: rollbackError,
      } =
        await supabaseAdmin
          .auth
          .admin
          .deleteUser(
            authId
          );


      if (rollbackError) {
        console.error(
          "ERROR CRITICO: no se pudo hacer rollback de Auth:",
          rollbackError
        );

        return responder(
          {
            ok: false,

            error:
              "No se pudo crear el perfil y tampoco se pudo revertir completamente la identidad Auth",
          },
          500
        );
      }


      return responder(
        {
          ok: false,

          error:
            crearPerfilError?.message ||
            "No se pudo crear el perfil del usuario",
        },
        500
      );
    }


    // ========================================================
    // 20. RESPUESTA CORRECTA
    // ========================================================

    return responder(
      {
        ok: true,

        id:
          perfilCreado.id,

        authId:
          perfilCreado.auth_id,

        nombre:
          perfilCreado.nombre,

        usuario:
          perfilCreado.usuario,

        email:
          perfilCreado.email,

        departamento:
          perfilCreado.departamento ||
          "",

        rol:
          perfilCreado.rol,

        activo:
          perfilCreado.activo !== false,

        debeCambiarPassword:
          perfilCreado
            .debe_cambiar_password === true,

        permisos:
          perfilCreado.permisos ||
          {},

        permisosEdicion:
          perfilCreado
            .permisos_edicion ||
          {},

        createdAt:
          perfilCreado.created_at,

        updatedAt:
          perfilCreado.updated_at,
      },
      201
    );

  } catch (error) {
    console.error(
      "Error inesperado creando usuario:",
      error
    );


    return responder(
      {
        ok: false,

        error:
          error instanceof Error
            ? error.message
            : "Error interno creando usuario",
      },
      500
    );
  }
});