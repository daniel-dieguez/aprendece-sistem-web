import React, { Fragment } from 'react'
import { useContentContext } from './context';
import { Button, Modal, Label, Input } from "@heroui/react";
// import { Container, Row, Col } from 'reactstrap';

export default function form() {
  const {
    opcion,
    setModal,
    modal,
    toggle,
  } = useContentContext();

  console.log("modal:", modal);


  return (
    <div className="flex flex-wrap gap-4">
      <Fragment>
        <Modal
          isOpen={modal}
          onOpenChange={(open) => setModal(open)}
        >
          <Modal.Backdrop>
            <Modal.Container size="lg">
              <Modal.Dialog>
                <Modal.CloseTrigger />

                <Modal.Header>
                  <Modal.Heading>Agregar paciente</Modal.Heading>
                </Modal.Header>

                <Modal.Body>
                  <div className="flex flex-col gap-4">

                    {/* Paciente / Correo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Paciente</Label>
                        <Input
                          type="text"
                          placeholder="Nombre del paciente"
                        />
                      </div>

                      <div>
                        <Label>Correo</Label>
                        <Input
                          type="email"
                          placeholder="Correo del paciente"
                        />
                      </div>
                    </div>

                    {/* Teléfono / País */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Teléfono</Label>
                        <Input
                          type="text"
                          placeholder="Teléfono del paciente"
                        />
                      </div>

                      <div>
                        <Label>País</Label>
                        <Input
                          type="text"
                          placeholder="País del paciente"
                        />
                      </div>
                    </div>

                    {/* Motivo */}
                    <div>
                      <Label>Motivo</Label>
                      <Input
                        type="text"
                        placeholder="Motivo de la consulta"
                      />
                    </div>

                  </div>
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
