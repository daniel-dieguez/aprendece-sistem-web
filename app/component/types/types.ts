export type Cita = {
  id: number;
  idUsuario: number;
  nombre: string;
  estado: number;
  anio: number;
  mes: number;
  fechaCita: string;
  horaCitaInicio: string;
  horaCitaFin: string;
};

export type Pacientes = {
  id: number;
  nombres: string;
  edad: number;
  pais: string;
  estado: number ;
  motivo: string;
  telefono: number;

};