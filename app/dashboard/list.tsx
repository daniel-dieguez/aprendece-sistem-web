import React, { useContext, useMemo, useState } from 'react'
import { CircleDollar, Person, Calendar, CircleCheck } from "@gravity-ui/icons";
import { Button, Card, Link, Pagination, Table, Label, Description } from "@heroui/react";
import { Container, Row, Col } from 'reactstrap';
import Estado from '../component/global/Estado';
import { Cita } from '../component/types/types';

import { useContentContext } from './context';


// type Cita = {
//   id: number;
//   idUsuario: number;
//   nombre: string;
//   estado: number;
//   anio: number;
//   mes: number;
//   fechaCita: string;
//   horaCitaInicio: string;
//   horaCitaFin: string;
// };

export default function list() {

  const { dias, pagess,
    totalPacientesAnioMes,
    CitasHoy,
    montosMensuales,
    citasHoyss
  } = useContentContext();

  const ROWS_PER_PAGE = pagess;

  const formatoQuetzales = (monto?: number | null) => {
    return new Intl.NumberFormat("es-GT", {
      style: "currency",
      currency: "GTQ",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(monto ?? 0);

  };

  const obtenerHora = (fecha: string): string => {
    return new Date(fecha).toLocaleTimeString("es-GT", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };



  const citas = citasHoyss?.data ?? [];
  // estado render
  const renderCell = (cita: Cita, columnId: string) => {
    const valor = cita[columnId as keyof Cita];

    if (
      columnId === "horaCitaInicio" ||
      columnId === "horaCitaFin"
    ) {
      return obtenerHora(valor as string);
    }

    if (columnId === "estado") {
      return <Estado estado={valor as number} />;
    }

    return valor;
  };





  const columns = [
    { id: "nombre", name: "Paciente" },
    { id: "horaCitaInicio", name: "Hora inicio" },
    { id: "horaCitaFin", name: "Hora fin" },
    { id: "estado", name: "Estado" },
    
  ];
  // console.log("qasdasdasdasduyy", columns)


  const columns1 = [
    { id: "name", name: "Nombre" },
    { id: "role", name: "Atendido" },
    { id: "status", name: "Estado" },
    { id: "email", name: "Monto" },
  ];

  const users = [
    { email: "kate@acme.com", id: 1, name: "Kate Moore", role: "CEO", status: "Active" },
    { email: "john@acme.com", id: 2, name: "John Smith", role: "CTO", status: "Active" },
    { email: "sara@acme.com", id: 3, name: "Sara Johnson", role: "CMO", status: "On Leave" },
    { email: "michael@acme.com", id: 4, name: "Michael Brown", role: "CFO", status: "Active" },
    { email: "emily@acme.com", id: 5, name: "Emily Davis", role: "Product Manager", status: "Inactive" },
    { email: "davis@acme.com", id: 6, name: "Davis Wilson", role: "Lead Designer", status: "Active" },
    { email: "olivia@acme.com", id: 7, name: "Olivia Martinez", role: "Frontend Engineer", status: "Active" },
    { email: "james@acme.com", id: 8, name: "James Taylor", role: "Backend Engineer", status: "Active" },
  ];
  // const user2 = [
  //   { email: "kate@acme.com", id: 1, name: "Kate Moore", role: "CEO", status: "Active" },
  //   { email: "john@acme.com", id: 2, name: "John Smith", role: "CTO", status: "Active" },
  //   { email: "sara@acme.com", id: 3, name: "Sara Johnson", role: "CMO", status: "On Leave" },
  //   { email: "michael@acme.com", id: 4, name: "Michael Brown", role: "CFO", status: "Active" },
  //   { email: "emily@acme.com", id: 5, name: "Emily Davis", role: "Product Manager", status: "Inactive" },
  //   { email: "davis@acme.com", id: 6, name: "Davis Wilson", role: "Lead Designer", status: "Active" },
  //   { email: "olivia@acme.com", id: 7, name: "Olivia Martinez", role: "Frontend Engineer", status: "Active" },
  //   { email: "james@acme.com", id: 8, name: "James Taylor", role: "Backend Engineer", status: "Active" },
  // ];


  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(citas.length / ROWS_PER_PAGE);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return citas.slice(start, start + ROWS_PER_PAGE);
  }, [page, citas]);

  // const [page2, setPage2] = useState(1);
  // const totalPages2 = Math.ceil(users.length / ROWS_PER_PAGE);
  // const pages2 = Array.from({ length: totalPages2 }, (_, i) => i + 1);
  // const paginatedItems2 = useMemo(() => {
  //   const start = (page2 - 1) * ROWS_PER_PAGE;
  //   return users.slice(start, start + ROWS_PER_PAGE);
  // }, [page2, ROWS_PER_PAGE]);



  const start = (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, users.length);

  return (
    <div className="p-4">

      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Total de pacientes */}
          <Card className="gap-3 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <Card.Header className="w-full flex flex-row items-center justify-between px-4 pt-4">
              <Card.Title className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Nuevos pacientes
              </Card.Title>
              <div className="flex items-center justify-center size-10 rounded-xl bg-indigo-50 shrink-0">
                <Person aria-label="Icono de pacientes" className="text-indigo-600 size-5" role="img" />
              </div>
            </Card.Header>

            <div className="px-4 pb-4">
              <span className="text-3xl font-semibold text-gray-900 tracking-tight">
                {totalPacientesAnioMes?.data ?? 0}
              </span>
            </div>
          </Card>

          {/* Citas Hoy */}
          <Card className="gap-3 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <Card.Header className="w-full flex flex-row items-center justify-between px-4 pt-4">
              <Card.Title className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Citas hoy
              </Card.Title>
              <div className="flex items-center justify-center size-10 rounded-xl bg-amber-50 shrink-0">
                <Calendar aria-label="Icono de citas" className="text-amber-600 size-5" role="img" />
              </div>
            </Card.Header>

            <div className="px-4 pb-4">
              <span className="text-3xl font-semibold text-gray-900 tracking-tight">
                {CitasHoy?.data ?? 0}
              </span>
            </div>
          </Card>

          {/* Citas Completadas */}
          <Card className="gap-3 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <Card.Header className="w-full flex flex-row items-center justify-between px-4 pt-4">
              <Card.Title className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Citas completadas
              </Card.Title>
              <div className="flex items-center justify-center size-10 rounded-xl bg-emerald-50 shrink-0">
                <CircleCheck aria-label="Icono de citas completadas" className="text-emerald-600 size-5" role="img" />
              </div>
            </Card.Header>

            <div className="px-4 pb-4">
              <span className="text-3xl font-semibold text-gray-900 tracking-tight">
                {/* {totalPacientesAnioMes?.data ?? 0} */}
                Null
              </span>
            </div>
          </Card>

          {/* Generado al mes */}
          <Card className="gap-3 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-gray-900 text-white">
            <Card.Header className="w-full flex flex-row items-center justify-between px-4 pt-4">
              <Card.Title className="text-xs font-medium text-gray-300 uppercase tracking-wide">
                Generado al mes
              </Card.Title>
              <div className="flex items-center justify-center size-10 rounded-xl bg-white/10 shrink-0">
                <CircleDollar aria-label="Icono de ingresos" className="text-white size-5" role="img" />
              </div>
            </Card.Header>

            <div className="px-4 pb-4">
              <span className="text-3xl font-semibold tracking-tight">
                {formatoQuetzales(montosMensuales?.data)}
              </span>
            </div>
          </Card>
        </div>
      </div>



      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="flex-1">
          <div className="flex flex-col gap-1">

            <Label>
              Proximas Citas
            </Label>
            <Description>
              Citas programadas para hoy
            </Description>
          </div>


          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Table with pagination" className="min-w-[300px]">
                <Table.Header columns={columns}>
                  {(column) => (
                    <Table.Column isRowHeader={column.id === "nombre"}>{column.name}</Table.Column>
                  )}
                </Table.Header>


                <Table.Body items={paginatedItems}>
                  {(cita) => (
                    <Table.Row key={cita.id}>
                      <Table.Collection items={columns}>
                        {(column) => (
                          <Table.Cell>
                            {renderCell(cita, column.id)}
                          </Table.Cell>
                        )}
                      </Table.Collection>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
            <Table.Footer>
              <Pagination size="sm">
                <Pagination.Summary>
                  {start} to {end} of {citas.length} results
                </Pagination.Summary>
                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous
                      isDisabled={page === 1}
                      onPress={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      <Pagination.PreviousIcon />
                      Prev
                    </Pagination.Previous>
                  </Pagination.Item>
                  {pages.map((p) => (
                    <Pagination.Item key={p}>
                      <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  ))}
                  <Pagination.Item>
                    <Pagination.Next
                      isDisabled={page === totalPages}
                      onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                    >
                      Next
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </Table.Footer>
          </Table>

        </div>
        <div className="flex-1">

          <div className="flex flex-col gap-1">

            <Label>
              Pacientes Recientes
            </Label>
            <Description>
              Ultimos pacientes Atendidos
            </Description>
          </div>





          <Table>
            <Table.ScrollContainer>
              {/* <Table.Content aria-label="Table with pagination" className="min-w-[300px]">
                <Table.Header columns={columns1}>
                  {/* {(column) => (
                    <Table.Column isRowHeader={column.id === "name"}>{column.name}</Table.Column>
                  )} 
                </Table.Header>
                <Table.Body items={paginatedItems2}>
                  {/* {(user) => (
                    <Table.Row>
                      <Table.Collection items={columns1}>
                        {(column) => <Table.Cell>{user[column.id as keyof typeof user]}</Table.Cell>}
                      </Table.Collection>
                    </Table.Row>
                  )} 
                </Table.Body>
              </Table.Content> */}
            </Table.ScrollContainer>
            {/* <Table.Footer>
              <Pagination size="sm">
                <Pagination.Summary>
                  {start} to {end} of {user2.length} results
                </Pagination.Summary>
                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous
                      isDisabled={page2 === 1}
                      onPress={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      <Pagination.PreviousIcon />
                      Prev
                    </Pagination.Previous>
                  </Pagination.Item>
                  {pages2.map((p) => (
                    <Pagination.Item key={p}>
                      <Pagination.Link isActive={p === page2} onPress={() => setPage2(p)}>
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  ))}
                  <Pagination.Item>
                    <Pagination.Next
                      isDisabled={page2 === totalPages2}
                      onPress={() => setPage2((p) => Math.min(totalPages2, p + 1))}
                    >
                      Next
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </Table.Footer> */}
          </Table>
        </div>

      </div>



    </div>
  )
}