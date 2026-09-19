import React from "react";

import { AuthProvider } from "./AuthContext";
import { QualityProvider } from "./QualityContext";
import { LogisticsProvider } from "./LogisticsContext";
import { ConfigProvider } from "./ConfigContext";

// Compone los 4 contextos de dominio en uno solo para envolver
// la app desde App.js. Cada contexto gestiona su propia porción
// de datos y su propia persistencia en Supabase — ver
// AuthContext, QualityContext y LogisticsContext (ConfigContext
// sigue siendo solo local, no tiene tabla propia todavía).
export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ConfigProvider>
        <LogisticsProvider>
          <QualityProvider>
            {children}
          </QualityProvider>
        </LogisticsProvider>
      </ConfigProvider>
    </AuthProvider>
  );
};
