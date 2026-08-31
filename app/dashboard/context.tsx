'use client'

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useTimeDate } from '../component/global/TimeDateContext';
import { useFetch } from '../Services/api'

type Cita = {
  fechaCita: string;
  horaCitaInicio: string;
  mes: number;
  id: number;
  anio: number;
  horaCitaFin: string;
  estado: number;
  nombre: string;
  idUsuario: number;
};

type ContextType = {
  dias: number | undefined;
  mes: number | null;
  anio: number | undefined;
  pagess: number;
  setPagess: React.Dispatch<React.SetStateAction<number>>;
   totalPacientesAnioMes: { data: number; response: number } | null;
   CitasHoy: { data: number; response: number } | null;
   montosMensuales: { data: number; response: number } | null;
   citasHoyss: {
    data: Cita[];
    response: number;
  } | null;

  

};

export const ContentContext = createContext<ContextType | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export const ContentProvider = ({ children }: ProviderProps) => {
  const { dia, mes, anio } = useTimeDate();

  const [pagess, setPagess] = useState(8);


  const nameController = 'citas';
  const nameController1 = 'personas';
  const nameController2 = 'montos';
  const nameController3 = 'citas';

  // const { data: allData } = useFetch(`${nameController}/allCitasDiarias/2025/2/10`,'GET' );
  const { data: totalPacientesAnioMes } = useFetch(`${nameController1}/totalMensual/${anio}/${mes}`,'GET' );
  const { data: CitasHoy } = useFetch(`${nameController}/citasTotalDiario/${anio}/${mes}/${dia}`,'GET' );
  const { data: montosMensuales } = useFetch(`${nameController2}/totalMensual/${anio}/${mes}`,'GET' );
  const { data: citasHoyss } = useFetch(`${nameController3}/allCitasDiarias/${anio}/${mes}/${dia}`,'GET' );


  const value: ContextType = {
    dias: dia,
    mes,
    anio,
    pagess,
    setPagess,
    totalPacientesAnioMes,
    CitasHoy,
    montosMensuales,
    citasHoyss

  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContentContext = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContentContext debe usarse dentro de un ContentProvider');
  }
  return context;
};