"use client";

import { useState } from "react";
import { Label } from '@heroui/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { newDate } from "react-datepicker/dist/dist/date_utils.js";

import { useTimeDate } from "../component/global/TimeDateContext";


export default function form() {

    const { selectedDate, setSelectedDate } = useTimeDate();

    console.log('que fehca sleeccion', selectedDate)

    const anio = selectedDate?.getFullYear();
    const mes = selectedDate ? selectedDate.getMonth() + 1 : null; // +1 porque getMonth() es 0-indexado (Enero = 0)
    const dia = selectedDate?.getDate();

 
    return (
        <div className="w-full bg-white border-b border-gray-200 shadow-sm px-4 py-2 flex items-center gap-3">
            <Label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Selecciona una fecha
            </Label>

            <DatePicker
                // showIcon
                selected={selectedDate}
                onChange={setSelectedDate}
                className="rounded-lg border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-36"
            />
        </div>
    )
}
