'use client'

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useTimeDate } from '../component/global/TimeDateContext';
import { useFetch } from '../Services/api'
import {Pacientes} from '../component/types/types'



type ContextType = {
  dias: number | undefined;
  mes: number | null;
  anio: number | undefined;
  pagess: number;
  setPagess: React.Dispatch<React.SetStateAction<number>>;
   listaPacientes: {data: Pacientes[];  response: number; } | null;
};

export const ContentContext = createContext<ContextType | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export const ContentProvider = ({ children }: ProviderProps) => {
  const { dia, mes, anio } = useTimeDate();

  const [pagess, setPagess] = useState(15);


  const nameController = 'citas';
  const nameController1 = 'personas';
  const nameController2 = 'montos';
  const nameController3 = 'citas';

 
  const { data: listaPacientes } = useFetch(`${nameController1}/listPersona/${anio}/${pagess}`,'GET' );

//   const { data: citasHoyss } = useFetch(`${nameController3}/allCitasDiarias/${anio}/${mes}/${dia}`,'GET' );


  const value: ContextType = {
    dias: dia,
    mes,
    anio,
    pagess,
    setPagess,
    listaPacientes
  
 
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