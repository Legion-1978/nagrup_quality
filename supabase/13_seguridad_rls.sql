-- ============================================================
-- NAGRUP QUALITY
-- ARCHIVO: 13_seguridad_rls.sql
-- MODULO: SEGURIDAD / ROW LEVEL SECURITY (RLS)
-- ============================================================
--
-- DESCRIPCION:
--
-- Este archivo activa Row Level Security (RLS) en todas
-- las tablas utilizadas por NAGRUP Quality y crea las
-- politicas necesarias para que la aplicacion pueda
-- trabajar con ellas.
--
-- ============================================================
--
-- IMPORTANTE SOBRE LA ARQUITECTURA ACTUAL
-- ============================================================
--
-- Actualmente NAGRUP Quality NO utiliza Supabase Auth
-- para identificar a los usuarios.
--
-- El login se gestiona desde la propia aplicacion utilizando
-- la tabla:
--
--   public.usuarios
--
-- La aplicacion se conecta a Supabase utilizando la clave
-- publica "anon".
--
-- Esto significa que Supabase no puede distinguir entre:
--
--   - Administrador
--   - Responsable
--   - Usuario
--   - Departamento
--   - Usuario con permisos de edicion
--   - Usuario con permisos de solo lectura
--
-- Para Supabase todas esas peticiones llegan actualmente
-- utilizando el rol "anon".
--
-- Por ese motivo las politicas actuales permiten:
--
--   SELECT
--   INSERT
--   UPDATE
--   DELETE
--
-- a:
--
--   anon
--   authenticated
--
-- Los permisos internos de la aplicacion continuan siendo
-- gestionados mediante:
--
--   usuarios.permisos
--   usuarios.permisos_edicion
--   usuarios.rol
--
-- IMPORTANTE:
--
-- Esta configuracion permite que la aplicacion actual
-- funcione, pero NO proporciona seguridad real basada
-- en el usuario a nivel de base de datos.
--
-- Para conseguir seguridad individual por usuario seria
-- recomendable utilizar Supabase Auth en el futuro.
--
-- ============================================================


-- ============================================================
-- 01. USUARIOS
-- ============================================================

ALTER TABLE public.usuarios
ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS
  "anon_full_access_usuarios"
ON public.usuarios;

CREATE POLICY "anon_full_access_usuarios"
ON public.usuarios
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);


-- ============================================================
-- 02. CONFIGURACION
-- ============================================================

ALTER TABLE public.configuracion
ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS
  "anon_full_access_configuracion"
ON public.configuracion;

CREATE POLICY "anon_full_access_configuracion"
ON public.configuracion
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);


-- ============================================================
-- 03. CONTADORES
-- ============================================================

ALTER TABLE public.contadores
ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS
  "anon_full_access_contadores"
ON public.contadores;

CREATE POLICY "anon_full_access_contadores"
ON public.contadores
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);


-- ============================================================
-- 04. AUDITORIAS
-- ============================================================

ALTER TABLE public.auditorias
ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS
  "anon_full_access_auditorias"
ON public.auditorias;

CREATE POLICY "anon_full_access_auditorias"
ON public.auditorias
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);


-- ============================================================
-- 05. FORMACIONES
-- ============================================================

ALTER TABLE public.formaciones
ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS
  "anon_full_access_formaciones"
ON public.formaciones;

CREATE POLICY "anon_full_access_formaciones"
ON public.formaciones
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);


-- ============================================================
-- 06. INCIDENCIAS
-- ============================================================

ALTER TABLE public.incidencias
ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS
  "anon_full_access_incidencias"
ON public.incidencias;

CREATE POLICY "anon_full_access_incidencias"
ON public.incidencias
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);


-- ============================================================
-- 07. MEJORAS
-- ============================================================

ALTER TABLE public.mejoras
ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS
  "anon_full_access_mejoras"
ON public.mejoras;

CREATE POLICY "anon_full_access_mejoras"
ON public.mejoras
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);


-- ============================================================
-- 08. PROCEDIMIENTOS
-- ============================================================

ALTER TABLE public.procedimientos
ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS
  "anon_full_access_procedimientos"
ON public.procedimientos;

CREATE POLICY "anon_full_access_procedimientos"
ON public.procedimientos
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);


-- ============================================================
-- 09. NO CONFORMIDADES DE PROVEEDORES
-- ============================================================

ALTER TABLE public.proveedores_nc
ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS
  "anon_full_access_proveedores_nc"
ON public.proveedores_nc;

CREATE POLICY "anon_full_access_proveedores_nc"
ON public.proveedores_nc
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);


-- ============================================================
-- 10. RECLAMACIONES DE CLIENTES
-- ============================================================

ALTER TABLE public.reclamaciones_clientes
ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS
  "anon_full_access_reclamaciones_clientes"
ON public.reclamaciones_clientes;

CREATE POLICY "anon_full_access_reclamaciones_clientes"
ON public.reclamaciones_clientes
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);


-- ============================================================
-- 11. SATISFACCION DE CLIENTES
-- ============================================================

ALTER TABLE public.satisfaccion_clientes
ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS
  "anon_full_access_satisfaccion_clientes"
ON public.satisfaccion_clientes;

CREATE POLICY "anon_full_access_satisfaccion_clientes"
ON public.satisfaccion_clientes
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);


-- ============================================================
-- 12. ENTREGAS OTIF
-- ============================================================

ALTER TABLE public.entregas_otif
ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS
  "anon_full_access_entregas_otif"
ON public.entregas_otif;

CREATE POLICY "anon_full_access_entregas_otif"
ON public.entregas_otif
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);


-- ============================================================
-- FIN DEL ARCHIVO
-- ============================================================