import React, { useContext, useMemo, useState } from 'react'
import { CircleDollar, Person, Calendar, CircleCheck } from "@gravity-ui/icons";
import { Button, Card, Link, Pagination, Table, Label, Description } from "@heroui/react";
import { Container, Row, Col } from 'reactstrap';

import { useContentContext } from './context';


export default function list() {

  const { dias, pagess } = useContentContext();

  const ROWS_PER_PAGE = pagess;

  const columns = [
    { id: "name", name: "Nombre" },
    { id: "role", name: "Tipo" },
    { id: "status", name: "Cita" },
    { id: "email", name: "Estado" },
  ];
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
  const user2 = [
    { email: "kate@acme.com", id: 1, name: "Kate Moore", role: "CEO", status: "Active" },
    { email: "john@acme.com", id: 2, name: "John Smith", role: "CTO", status: "Active" },
    { email: "sara@acme.com", id: 3, name: "Sara Johnson", role: "CMO", status: "On Leave" },
    { email: "michael@acme.com", id: 4, name: "Michael Brown", role: "CFO", status: "Active" },
    { email: "emily@acme.com", id: 5, name: "Emily Davis", role: "Product Manager", status: "Inactive" },
    { email: "davis@acme.com", id: 6, name: "Davis Wilson", role: "Lead Designer", status: "Active" },
    { email: "olivia@acme.com", id: 7, name: "Olivia Martinez", role: "Frontend Engineer", status: "Active" },
    { email: "james@acme.com", id: 8, name: "James Taylor", role: "Backend Engineer", status: "Active" },
  ];


  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(users.length / ROWS_PER_PAGE);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return users.slice(start, start + ROWS_PER_PAGE);
  }, [page, ROWS_PER_PAGE]);

  const [page2, setPage2] = useState(1);
const totalPages2 = Math.ceil(users.length / ROWS_PER_PAGE);
const pages2 = Array.from({ length: totalPages2 }, (_, i) => i + 1);
const paginatedItems2 = useMemo(() => {
  const start = (page2 - 1) * ROWS_PER_PAGE;
  return users.slice(start, start + ROWS_PER_PAGE);
}, [page2, ROWS_PER_PAGE]);



  const start = (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, users.length);

  return (
    <div className="p-4">

      <div className="p-4">
        <div className="flex flex-wrap gap-4">
          <Card className="w-[250px] gap-2">
            <Person aria-label="Dollar sign icon" className="text-primary size-6" role="img" />
            <Card.Header>
              <Card.Title>Total de pacientes</Card.Title>
            </Card.Header>
            <Card.Footer>
              <Card.Description>Esto es por mes</Card.Description>
            </Card.Footer>
          </Card>

          <Card className="w-[250px] gap-2">
            <Calendar aria-label="Dollar sign icon" className="text-primary size-6" role="img" />
            <Card.Header>
              <Card.Title>Citas para hoy</Card.Title>
            </Card.Header>
            <Card.Footer>
              <Card.Description>Esto es por mes</Card.Description>
            </Card.Footer>
          </Card>

          <Card className="w-[250px] gap-2">
            <CircleCheck aria-label="Dollar sign icon" className="text-primary size-6" role="img" />
            <Card.Header>
              <Card.Title>Citas Completas</Card.Title>
            </Card.Header>
            <Card.Footer>
              <Card.Description>Esto es por mes</Card.Description>
            </Card.Footer>
          </Card>

          <Card className="w-[250px] gap-2">
            <CircleDollar aria-label="Dollar sign icon" className="text-primary size-6" role="img" />
            <Card.Header>
              <Card.Title>Monto Generado</Card.Title>
            </Card.Header>
            <Card.Footer>
              <Card.Description>Esto es por mes</Card.Description>
            </Card.Footer>
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
                    <Table.Column isRowHeader={column.id === "name"}>{column.name}</Table.Column>
                  )}
                </Table.Header>
                <Table.Body items={paginatedItems}>
                  {(user) => (
                    <Table.Row>
                      <Table.Collection items={columns}>
                        {(column) => <Table.Cell>{user[column.id as keyof typeof user]}</Table.Cell>}
                      </Table.Collection>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
            <Table.Footer>
              <Pagination size="sm">
                <Pagination.Summary>
                  {start} to {end} of {users.length} results
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
              <Table.Content aria-label="Table with pagination" className="min-w-[300px]">
                <Table.Header columns={columns1}>
                  {(column) => (
                    <Table.Column isRowHeader={column.id === "name"}>{column.name}</Table.Column>
                  )}
                </Table.Header>
                <Table.Body items={paginatedItems2}>
                  {(user) => (
                    <Table.Row>
                      <Table.Collection items={columns1}>
                        {(column) => <Table.Cell>{user[column.id as keyof typeof user]}</Table.Cell>}
                      </Table.Collection>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
            <Table.Footer>
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
            </Table.Footer>
          </Table>
        </div>

      </div>



    </div>
  )
}