import React, { useContext, useMemo, useState } from 'react'
import {EllipsisVertical} from '@gravity-ui/icons';
import { Button, Card, Link, Pagination, Table, Label, Description, Dropdown } from "@heroui/react";

import { Container, Row, Col } from 'reactstrap';
import Estado from '../component/global/Estado';
import { Pacientes } from '../component/types/types';

import { useContentContext } from './context';




export default function list() {

  const { dias, pagess,
 listaPacientes
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

  const handleVer = ()=>{

  };


  const citas = listaPacientes?.data ?? [];
  // estado render
  const renderCell = (cita: Pacientes, columnId: string) => {
    const valor = cita[columnId as keyof Pacientes];

    if (columnId === "estado") {
      return <Estado estado={valor as number} />;
    }

    if (columnId === "acciones") {
    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button variant="ghost" isIconOnly aria-label="Abrir acciones">
            {/* ícono de 3 puntos verticales */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </Button>
        </Dropdown.Trigger>

        <Dropdown.Popover>
          <Dropdown.Menu
            onAction={(key) => {
              if (key === "ver") handleVer();
              if (key === "editar") handleVer();
              // if (key === "cancelar") handleVer(row);
            }}
          >
            <Dropdown.Item id="ver" textValue="Ver detalle">
              <Label>Ver detalle</Label>
            </Dropdown.Item>
            <Dropdown.Item id="editar" textValue="Editar">
              <Label>Editar</Label>
            </Dropdown.Item>
            <Dropdown.Item id="cancelar" textValue="Cancelar cita" className="text-danger">
              <Label>Cancelar cita</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    );
  }

    return valor;
  };





  const columns = [
    { id: "nombre", name: "nombre" },
    { id: "edad", name: "edad" },
    { id: "correo", name: "correo" },
    { id: "pais", name: "pais" },
    { id: "estado", name: "Estado" },
    { id: "acciones", name: "Acciones" },
  ];
  // console.log("qasdasdasdasduyy", columns)


  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(citas.length / ROWS_PER_PAGE);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return citas.slice(start, start + ROWS_PER_PAGE);
  }, [page, citas]);




  const start = (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, citas.length);

  return (
    <div className="p-4">

      <div className="p-4">
        
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

      </div>



    </div>
  )
}