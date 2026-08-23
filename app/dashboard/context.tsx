'use client'

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useTimeDate } from '../component/global/TimeDateContext';
import { useFetch } from '../Services/api'

type ContextType = {
  dias: number | undefined;
  mes: number | null;
  anio: number | undefined;
  pagess: number;
  setPagess: React.Dispatch<React.SetStateAction<number>>;

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

  // const { data: allData } = useFetch(`${nameController}/allCitasDiarias/2025/2/10`,'GET' );
  const { data: totalPacientesAnio } = useFetch(`${nameController1}/totalPacientes/${anio}`,'GET' );

  useEffect(() => {
    // console.log('allData:', allData);
    console.log('totalPacientesanioo:', totalPacientesAnio);
  }, [totalPacientesAnio]);


  const value: ContextType = {
    dias: dia,
    mes,
    anio,
    pagess,
    setPagess,

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