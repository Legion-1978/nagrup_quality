-- ============================================================
-- NAGRUP QUALITY
-- ARCHIVO: 01_usuarios.sql
-- DESCRIPCION:
-- Crea la tabla principal de usuarios de la aplicacion.
--
-- IMPORTANTE:
-- Este sistema utiliza actualmente un login propio de la app
-- y no Supabase Auth.
--
-- La configuracion de RLS y las politicas de acceso NO se
-- incluyen aqui. Se configuraran posteriormente en:
--
--   13_seguridad_rls.sql
--
-- ============================================================


-- ============================================================
-- TABLA: usuarios
-- ============================================================
--
-- Guarda los usuarios que pueden acceder a NAGRUP Quality.
--
-- El ID es BIGINT porque la aplicacion genera actualmente
-- identificadores numericos mediante Date.now().
--
-- La tabla almacena:
--
--   - Nombre
--   - Usuario de acceso
--   - Email
--   - Password hasheada
--   - Rol
--   - Departamento
--   - Estado activo/inactivo
--   - Cambio obligatorio de password
--   - Permisos de visualizacion
--   - Permisos de edicion
--   - Fecha de creacion
--   - Fecha de ultima actualizacion
--
-- IMPORTANTE:
-- La aplicacion trabaja internamente en camelCase.
--
-- Ejemplo:
--
--   debeCambiarPassword
--
-- Supabase/PostgreSQL utiliza snake_case:
--
--   debe_cambiar_password
--
-- La conversion se realiza automaticamente mediante:
--
--   services/caseConverter.js
--
-- ============================================================

CREATE TABLE IF NOT EXISTS public.usuarios (

  -- ----------------------------------------------------------
  -- IDENTIFICADOR
  -- ----------------------------------------------------------
  --
  -- Generado actualmente por la aplicacion mediante Date.now().
  --
  -- App:
  --   id
  --
  -- Supabase:
  --   id
  --
  -- ----------------------------------------------------------

  id BIGINT PRIMARY KEY,

  -- ----------------------------------------------------------
  -- IDENTIFICADOR SUPABASE AUTH
  -- ----------------------------------------------------------
  --
  -- UUID del usuario correspondiente en Supabase Auth.
  --
  -- Relaciona:
  --
  --   public.usuarios.auth_id
  --
  -- con:
  --
  --   auth.users.id
  --
  -- Durante la migracion puede ser NULL porque los usuarios
  -- actuales todavia utilizan el sistema de login antiguo.
  --
  -- Cuando un usuario sea migrado a Supabase Auth, este campo
  -- almacenara su UUID.
  --
  -- La relacion ON DELETE SET NULL evita eliminar el registro
  -- interno de public.usuarios si se elimina accidentalmente
  -- el usuario correspondiente de Supabase Auth.
  --
  -- ----------------------------------------------------------

  auth_id UUID UNIQUE
    REFERENCES auth.users(id)
    ON DELETE SET NULL,
    
  -- ----------------------------------------------------------
  -- DATOS DEL USUARIO
  -- ----------------------------------------------------------

  nombre TEXT NOT NULL DEFAULT '',

  usuario TEXT NOT NULL UNIQUE,

  email TEXT DEFAULT '',

  departamento TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- AUTENTICACION
  -- ----------------------------------------------------------
  --
  -- La aplicacion NO deberia guardar aqui la contraseña
  -- en texto plano.
  --
  -- ConfiguracionScreen y AuthContext utilizan hashPassword()
  -- antes de guardar la contraseña.
  --
  -- ----------------------------------------------------------

  password TEXT NOT NULL,


  -- ----------------------------------------------------------
  -- CAMBIO OBLIGATORIO DE CONTRASEÑA
  -- ----------------------------------------------------------
  --
  -- FALSE:
  --
  --   El usuario tiene una contraseña definitiva y puede
  --   acceder normalmente.
  --
  -- TRUE:
  --
  --   La contraseña es provisional y el usuario debe
  --   sustituirla antes de acceder al resto de la aplicacion.
  --
  -- Flujo actual:
  --
  --   Administrador crea usuario
  --           |
  --           v
  --   debe_cambiar_password = TRUE
  --           |
  --           v
  --   Usuario inicia sesion
  --           |
  --           v
  --   CambiarPasswordObligatorioScreen
  --           |
  --           v
  --   Usuario cambia contraseña
  --           |
  --           v
  --   debe_cambiar_password = FALSE
  --
  -- Si posteriormente el administrador restablece la
  -- contraseña del usuario, la aplicacion vuelve a establecer:
  --
  --   debe_cambiar_password = TRUE
  --
  -- App:
  --   debeCambiarPassword
  --
  -- Supabase:
  --   debe_cambiar_password
  --
  -- ----------------------------------------------------------

  debe_cambiar_password BOOLEAN NOT NULL DEFAULT FALSE,


  -- ----------------------------------------------------------
  -- ROL
  -- ----------------------------------------------------------

  rol TEXT NOT NULL DEFAULT 'Usuario',


  -- ----------------------------------------------------------
  -- ESTADO DEL USUARIO
  -- ----------------------------------------------------------
  --
  -- TRUE:
  --   Puede iniciar sesion.
  --
  -- FALSE:
  --   El login de AuthContext rechaza el acceso.
  --
  -- ----------------------------------------------------------

  activo BOOLEAN NOT NULL DEFAULT TRUE,


  -- ----------------------------------------------------------
  -- PERMISOS DE VISUALIZACION
  -- ----------------------------------------------------------
  --
  -- Se almacenan como JSONB.
  --
  -- Ejemplo:
  --
  -- {
  --   "dashboard": true,
  --   "otif": true,
  --   "incidencias": true,
  --   "reclamaciones": false,
  --   "proveedores": false,
  --   "auditorias": true
  -- }
  --
  -- El contenido interno NO se convierte a snake_case.
  --
  -- ----------------------------------------------------------

  permisos JSONB NOT NULL DEFAULT '{}'::jsonb,


  -- ----------------------------------------------------------
  -- PERMISOS DE EDICION
  -- ----------------------------------------------------------
  --
  -- Permite diferenciar:
  --
  --   1. Poder visualizar un modulo.
  --   2. Poder modificar los datos del modulo.
  --
  -- App:
  --   permisosEdicion
  --
  -- Supabase:
  --   permisos_edicion
  --
  -- ----------------------------------------------------------

  permisos_edicion JSONB NOT NULL DEFAULT '{}'::jsonb,


  -- ----------------------------------------------------------
  -- FECHA DE CREACION
  -- ----------------------------------------------------------
  --
  -- Se establece automaticamente al crear el registro.
  --
  -- App:
  --   createdAt
  --
  -- Supabase:
  --   created_at
  --
  -- ----------------------------------------------------------

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),


  -- ----------------------------------------------------------
  -- FECHA DE ULTIMA ACTUALIZACION
  -- ----------------------------------------------------------
  --
  -- Se establece inicialmente con now().
  --
  -- El trigger definido mas abajo se encargara de cambiarla
  -- automaticamente en cada UPDATE.
  --
  -- App:
  --   updatedAt
  --
  -- Supabase:
  --   updated_at
  --
  -- ----------------------------------------------------------

  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),


  -- ----------------------------------------------------------
  -- VALIDACIONES
  -- ----------------------------------------------------------

  CONSTRAINT usuarios_usuario_no_vacio
    CHECK (length(trim(usuario)) > 0),

  CONSTRAINT usuarios_nombre_no_vacio
    CHECK (length(trim(nombre)) > 0),

  CONSTRAINT usuarios_password_no_vacio
    CHECK (length(password) > 0),

  CONSTRAINT usuarios_permisos_objeto
    CHECK (jsonb_typeof(permisos) = 'object'),

  CONSTRAINT usuarios_permisos_edicion_objeto
    CHECK (jsonb_typeof(permisos_edicion) = 'object')

);


-- ============================================================
-- FUNCION: actualizar updated_at
-- ============================================================
--
-- Esta funcion permite que PostgreSQL actualice automaticamente
-- la columna updated_at cada vez que se modifica un usuario.
--
-- De esta manera no dependemos exclusivamente de que React
-- envie updatedAt correctamente.
--
-- ============================================================

CREATE OR REPLACE FUNCTION public.actualizar_updated_at_usuarios()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN

  NEW.updated_at = now();

  RETURN NEW;

END;
$$;


-- ============================================================
-- TRIGGER: updated_at automatico
-- ============================================================
--
-- Eliminamos primero el trigger si ya existe para que este
-- archivo pueda ejecutarse nuevamente sin duplicarlo.
--
-- ============================================================

DROP TRIGGER IF EXISTS trigger_usuarios_updated_at
ON public.usuarios;

CREATE TRIGGER trigger_usuarios_updated_at
BEFORE UPDATE
ON public.usuarios
FOR EACH ROW
EXECUTE FUNCTION public.actualizar_updated_at_usuarios();


-- ============================================================
-- INDICES
-- ============================================================
--
-- usuario ya tiene un indice UNIQUE automaticamente debido a:
--
--   usuario TEXT NOT NULL UNIQUE
--
-- Por tanto NO es necesario crear otro indice normal sobre
-- usuario.
--
-- Creamos indices para posibles consultas habituales.
--
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_usuarios_activo
ON public.usuarios (activo);

CREATE INDEX IF NOT EXISTS idx_usuarios_rol
ON public.usuarios (rol);


-- ============================================================
-- FIN 01_usuarios.sql
-- ============================================================