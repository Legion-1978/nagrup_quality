import { createClient } from "npm:@supabase/supabase-js@2";

// ============================================================
// NAGRUP QUALITY
// EDGE FUNCTION: actualizar-usuario
// FUNCION REAL: actualizar perfil de usuario existente
// ============================================================

// ============================================================
// CORS
// ============================================================
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ============================================================
// RESPUESTA JSON
// ============================================================
const responder = (datos: Record<string, unknown>, status = 200) => {
  return new Response(JSON.stringify(datos), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
};

// ============================================================
// EDGE FUNCTION
// ============================================================
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return responder({ ok: false, error: "Metodo no permitido" }, 405);
    }

    // Configuración Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
      return responder({ ok: false, error: "Configuracion interna incompleta" }, 500);
    }

    // JWT del administrador
    const authorization = req.headers.get("Authorization");
    if (!authorization) return responder({ ok: false, error: "Usuario no autenticado" }, 401);

    const token = authorization.replace(/^Bearer\s+/i, "");
    if (!token) return responder({ ok: false, error: "Token no valido" }, 401);

    // Cliente usuario → validar sesión
    const supabaseUsuario = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authorization } },
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: authData, error: authError } = await supabaseUsuario.auth.getUser(token);
    if (authError || !authData?.user) {
      return responder({ ok: false, error: "Sesion no valida" }, 401);
    }
    const authIdAdministrador = authData.user.id;

    // Cliente admin → service_role
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Comprobar administrador
    const { data: administrador, error: administradorError } = await supabaseAdmin
      .from("usuarios")
      .select("id, auth_id, rol, activo")
      .eq("auth_id", authIdAdministrador)
      .maybeSingle();

    if (administradorError) {
      return responder({ ok: false, error: "Error comprobando administrador" }, 500);
    }
    if (!administrador || administrador.activo !== true || administrador.rol !== "Administrador") {
      return responder({ ok: false, error: "No tienes permisos para actualizar usuarios" }, 403);
    }

    // Leer body
    const body = await req.json();
    const userId = Number(body?.id);
    const updateData = body?.updateData || {};

    if (!Number.isSafeInteger(userId) || userId <= 0) {
      return responder({ ok: false, error: "Identificador no valido" }, 400);
    }

    // Campos permitidos
    const allowedFields = ["nombre", "usuario", "email", "departamento", "rol", "activo", "permisos", "permisos_edicion"];
    const sanitizedUpdate: Record<string, any> = {};
    for (const key of Object.keys(updateData)) {
      if (allowedFields.includes(key)) sanitizedUpdate[key] = updateData[key];
    }

    if (Object.keys(sanitizedUpdate).length === 0) {
      return responder({ ok: false, error: "No hay campos validos para actualizar" }, 400);
    }

    sanitizedUpdate.updated_at = new Date().toISOString();

    // UPDATE
    const { data: updated, error: updateError } = await supabaseAdmin
      .from("usuarios")
      .update(sanitizedUpdate)
      .eq("id", userId)
      .select("id, nombre, usuario, email, departamento, rol, activo, permisos, permisos_edicion, updated_at")
      .maybeSingle();

    if (updateError || !updated) {
      return responder({ ok: false, error: updateError?.message || "No se pudo actualizar el usuario" }, 500);
    }

    return responder({ ok: true, usuario: updated }, 200);
  } catch (error) {
    return responder({ ok: false, error: error instanceof Error ? error.message : "Error interno" }, 500);
  }
});
