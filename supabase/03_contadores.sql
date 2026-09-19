-- ============================================================
-- NAGRUP QUALITY
-- ARCHIVO: 03_contadores.sql
-- DESCRIPCION:
-- Gestiona los contadores utilizados para generar codigos
-- correlativos de forma segura y atomica.
--
-- Ejemplos de codigos que puede generar la aplicacion:
--
--   REC26001
--   REC26002
--   FOR26001
--   FOR26002
--   AUD26001
--
-- El codigo final se construye desde la aplicacion utilizando:
--
--   PREFIJO + ANIO + NUMERO CORRELATIVO
--
-- Este archivo contiene:
--
--   1. Tabla public.contadores
--   2. Funcion RPC public.siguiente_correlativo()
--   3. Permisos para ejecutar la funcion
--
-- La configuracion general de RLS se realizara posteriormente
-- en:
--
--   13_seguridad_rls.sql
--
-- ============================================================


-- ============================================================
-- 1. TABLA: contadores
-- ============================================================
--
-- Guarda el ultimo numero utilizado para cada combinacion
-- de prefijo y ano.
--
-- Ejemplo:
--
-- prefijo | anio | valor
-- --------+------+------
-- REC     | 26   | 125
-- FOR     | 26   | 43
-- AUD     | 26   | 18
--
-- Esto significa que:
--
-- REC -> siguiente numero = 126
-- FOR -> siguiente numero = 44
-- AUD -> siguiente numero = 19
--
-- La clave primaria compuesta evita que existan dos
-- contadores para la misma combinacion de prefijo y ano.
--
-- ============================================================

CREATE TABLE IF NOT EXISTS public.contadores (

  -- ----------------------------------------------------------
  -- PREFIJO DEL CODIGO
  -- ----------------------------------------------------------
  --
  -- Ejemplos:
  --
  -- REC
  -- FOR
  -- AUD
  -- INC
  -- MEJ
  --
  -- ----------------------------------------------------------

  prefijo TEXT NOT NULL,


  -- ----------------------------------------------------------
  -- ANO
  -- ----------------------------------------------------------
  --
  -- Ejemplo:
  --
  -- 26
  -- 27
  -- 28
  --
  -- Se almacena como TEXT porque forma parte del codigo
  -- generado por la aplicacion.
  --
  -- ----------------------------------------------------------

  anio TEXT NOT NULL,


  -- ----------------------------------------------------------
  -- ULTIMO VALOR UTILIZADO
  -- ----------------------------------------------------------
  --
  -- Empieza en 0.
  --
  -- Cuando se solicita el primer correlativo pasa a 1.
  --
  -- ----------------------------------------------------------

  valor INTEGER NOT NULL DEFAULT 0,


  -- ----------------------------------------------------------
  -- CLAVE PRIMARIA COMPUESTA
  -- ----------------------------------------------------------
  --
  -- Impide duplicar:
  --
  -- REC + 26
  -- REC + 26
  --
  -- pero permite:
  --
  -- REC + 26
  -- REC + 27
  -- FOR + 26
  --
  -- ----------------------------------------------------------

  PRIMARY KEY (prefijo, anio)

);


-- ============================================================
-- 2. FUNCION: siguiente_correlativo
-- ============================================================
--
-- Esta funcion devuelve el siguiente numero disponible para
-- una combinacion de prefijo y ano.
--
-- Ejemplo:
--
-- SELECT public.siguiente_correlativo('REC', '26');
--
-- Si no existe:
--
--   REC | 26
--
-- se crea automaticamente con:
--
--   valor = 1
--
-- y devuelve:
--
--   1
--
-- Si ya existe con:
--
--   valor = 25
--
-- lo incrementa a:
--
--   valor = 26
--
-- y devuelve:
--
--   26
--
-- IMPORTANTE:
--
-- La operacion se realiza de forma atomica mediante
-- INSERT ... ON CONFLICT DO UPDATE.
--
-- Esto evita que dos usuarios que creen registros al mismo
-- tiempo reciban accidentalmente el mismo numero correlativo.
--
-- ============================================================

CREATE OR REPLACE FUNCTION public.siguiente_correlativo(
  prefijo_input TEXT,
  anio_input TEXT
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE

  -- Variable donde guardaremos el nuevo numero generado.

  nuevo_valor INTEGER;

BEGIN

  -- ----------------------------------------------------------
  -- INSERTAR O INCREMENTAR CONTADOR
  -- ----------------------------------------------------------
  --
  -- Si la combinacion prefijo + ano NO existe:
  --
  --   se crea con valor 1.
  --
  -- Si ya existe:
  --
  --   aumenta el valor actual en 1.
  --
  -- ----------------------------------------------------------

  INSERT INTO public.contadores (
    prefijo,
    anio,
    valor
  )

  VALUES (
    prefijo_input,
    anio_input,
    1
  )

  ON CONFLICT (prefijo, anio)

  DO UPDATE SET
    valor = public.contadores.valor + 1

  RETURNING valor INTO nuevo_valor;


  -- ----------------------------------------------------------
  -- DEVOLVER RESULTADO
  -- ----------------------------------------------------------

  RETURN nuevo_valor;

END;
$$;


-- ============================================================
-- 3. PERMISO PARA EJECUTAR LA FUNCION
-- ============================================================
--
-- Permite que la aplicacion pueda llamar a la funcion
-- siguiente_correlativo() utilizando los roles:
--
--   anon
--   authenticated
--
-- Esto es necesario con la arquitectura actual de la
-- aplicacion.
--
-- ============================================================

GRANT EXECUTE
ON FUNCTION public.siguiente_correlativo(TEXT, TEXT)
TO anon, authenticated;