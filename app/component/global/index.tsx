"use client";

import { useState } from "react";

export function useTimeDate() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const anio = selectedDate?.getFullYear();
    const mes = selectedDate ? selectedDate.getMonth() + 1 : null; 
    const dia = selectedDate?.getDate();

  return { selectedDate, setSelectedDate, anio, mes, dia };
}