'use client'

import React from "react";
import { Row, Col } from "reactstrap";
import Form from './form';
import List from './list';
import { ContentProvider } from './context';

export default function page() {
    return (
        <ContentProvider>
            <div className="page-content">
                <Row>
                    <Col lg="2" sm="2">
                    </Col>
                    <Col>
                        <div className="h1 font-weight-bolder text-uppercase text-center">
                        {/* Dasboard */}
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-end" lg="2" sm="2">
                        <Form />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <List />
                    </Col>
                </Row>
            </div>
        </ContentProvider>

    )
}
