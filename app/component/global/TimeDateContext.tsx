// component/global.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type TimeDateContextType = {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  anio: number | undefined;
  mes: number | null;
  dia: number | undefined;
};

const TimeDateContext = createContext<TimeDateContextType | null>(null);

export const TimeDateProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const anio = selectedDate?.getFullYear();
  const mes = selectedDate ? selectedDate.getMonth() + 1 : null;
  const dia = selectedDate?.getDate();

  return (
    <TimeDateContext.Provider value={{ selectedDate, setSelectedDate, anio, mes, dia }}>
      {children}
    </TimeDateContext.Provider>
  );
};

export const useTimeDate = () => {
  const context = useContext(TimeDateContext);
  if (!context) {
    throw new Error("useTimeDate debe usarse dentro de un TimeDateProvider");
  }
  return context;
};