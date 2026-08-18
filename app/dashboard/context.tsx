'use client'

import React, { createContext, ReactNode } from 'react';

type ContextType = {
  
};

export const ContentContext = createContext<ContextType | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export const ContentProvider = ({ children }: ProviderProps) => { //aqui el pros del tema a seguir de typescript
  
  const value: ContextType = {};

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};