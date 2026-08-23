'use client'

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useTimeDate } from '../component/global';

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


  const [pagess, setPagess] = useState (8);

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