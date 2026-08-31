import React from "react";

type EstadoProps = {
estado: number;
};

const estados = {
1: {
texto: "Pendiente",
color: "bg-yellow-100 text-yellow-700",
},

2: {
texto: "Confirmado",
color: "bg-green-100 text-green-700",
},

3: {
texto: "Cancelado",
color: "bg-red-100 text-red-700",
},

4: {
texto: "Finalizado",
color: "bg-blue-100 text-blue-700",
},
};

export default function Estado({ estado }: EstadoProps) {
const estadoInfo = estados[estado as keyof typeof estados];

if (!estadoInfo) {
return ( <span className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700">
Desconocido </span>
);
}

return (
<span
className={`inline-block rounded-lg px-3 py-1 text-sm font-medium ${estadoInfo.color}`}
>
{estadoInfo.texto} </span>
);
}
