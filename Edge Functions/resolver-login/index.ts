import { createClient } from "supabase";

// ============================================================
// NAGRUP QUALITY
// EDGE FUNCTION: resolver-login
// ============================================================
//
// OBJETIVO:
//   nombre de usuario -> email
//
// La contraseña NUNCA se envía a esta función.
// La autenticación real seguirá realizándose mediante:
//   supabase.auth.signInWithPassword()
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
    status, // ⚠️ siempre 200 para no romper el cliente
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
};

// ============================================================
// EDGE FUNCTION
// ============================================================
Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  try {
    // 1. Solo POST
    if (req.method !== "POST") {
      return responder({ ok: false, error: "Solicitud no válida" }, 200);
    }

    // 2. Configuración Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Faltan variables internas de Supabase");
      return responder({ ok: false, error: "No se pudo procesar el acceso" }, 200);
    }

    // 3. Leer usuario
    const body = await req.json();
    const usuario = String(body?.usuario || "").trim().toLowerCase();

    if (!usuario) {
      return responder({ ok: false, error: "Usuario o contraseña incorrectos" }, 200);
    }

    // 4. Cliente administrativo
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // 5. Buscar usuario
    const { data: usuarioEncontrado, error: usuarioError } = await supabaseAdmin
      .from("usuarios")
      .select("email, activo, auth_id")
      .ilike("usuario", usuario)
      .limit(1)
      .maybeSingle();

    if (usuarioError) {
      console.error("Error resolviendo login:", usuarioError);
      return responder({ ok: false, error: "Usuario o contraseña incorrectos" }, 200);
    }

    if (!usuarioEncontrado) {
      return responder({ ok: false, error: "Usuario o contraseña incorrectos" }, 200);
    }

    // 7. Comprobar activo
    if (usuarioEncontrado.activo !== true) {
      return responder({ ok: false, error: "Usuario desactivado" }, 200);
    }

    // 8. Comprobar usuario migrado a Auth
    if (!usuarioEncontrado.auth_id) {
      return responder({ ok: false, error: "Usuario aún no vinculado a Auth" }, 200);
    }

    // 9. Comprobar email
    if (!usuarioEncontrado.email) {
      console.error("Usuario Auth sin email");
      return responder({ ok: false, error: "Usuario sin email" }, 200);
    }

    // 10. Respuesta final
    return responder({ ok: true, email: usuarioEncontrado.email }, 200);
  } catch (error) {
    console.error("Error inesperado en resolver-login:", error);
    return responder({ ok: false, error: "Error inesperado" }, 200);
  }
});