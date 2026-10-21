import React, { Fragment } from 'react'
import { useContentContext } from './context';
import { Button, Modal, Label, Input, TextArea } from "@heroui/react";
// import { Container, Row, Col } from 'reactstrap';
import { PAISES } from "../component/data/paises";
import Select from 'react-select'

import { Row, Col } from "../utils/position"

export default function form() {
  const {
    opcion,
    setModal,
    modal,
    toggle,
  } = useContentContext();

  console.log("modal:", modal);




  const createUsers = () => {


    return (
      <>
        <div className="flex flex-col gap-4">


          <Row>
            <Col>
              <Label> Nombre paciente</Label>
              <Input
                type='text'
                placeholder='Nombre de paciente' />
            </Col>
            <Col>
              <Label>Correo Electronico</Label>
              <Input
                id="input-type-email" placeholder="jane@example.com" type="email" />
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Edad</Label>

              <Input id="input-type-number" min={0} placeholder="Edad" type="number" />
            </Col>
            <Col>
              <Label> Donde supo </Label>
                            <Input 
                            disabled 
                            />
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Pais</Label>
              <Select
                options={PAISES}
                placeholder="Selecciona un país"
                menuPortalTarget={typeof document !== "undefined" ? document.body : null}
                menuPosition="fixed"
                menuPlacement="auto"
                maxMenuHeight={200}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  menu: (base) => ({ ...base, marginTop: 4 }),
                }}
              />
            </Col>
            <Col>
              <Label>Telefono</Label>
              <Input
                type='number'
                placeholder='Numero telefonico' />
            </Col>

          </Row>

          <Row>
            <Col>
              <Label>Motivo</Label>
              <TextArea
                aria-label="Motivo del paciente"
                className="h-32"
                placeholder="Motivo del paciente"
              />
            </Col>
          </Row>



        </div>
      </>
    )

  };



  return (
    <div className="flex flex-wrap gap-4">
      <Fragment>
        <Modal
          isOpen={modal}
          onOpenChange={(open) => setModal(open)}
        >
          <Modal.Backdrop>
            <Modal.Container size="lg">
              <Modal.Dialog className="sm:max-w-[1200px] bg-gray-100">
                <Modal.CloseTrigger />

                <Modal.Header className="border-b border-gray-200 pb-4">
                  <Modal.Heading className="text-2xl font-semibold text-gray-800">
                    Agregar paciente
                  </Modal.Heading>
                </Modal.Header>

                <Modal.Body>
                  {createUsers()}
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setModal(false)}
                  >
                    Cancelar
                  </Button>

                  <Button>
                    Guardar paciente
                  </Button>
                </Modal.Footer>

              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </Fragment>

    </div>
  )
}
