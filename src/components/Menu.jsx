import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

export default function Menu() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
        <Navbar.Brand  as={NavLink} to="/">AmparoAmigo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/sobre">Sobre Nós</Nav.Link>
            <Nav.Link as={NavLink} to="/cadastro">Seja Voluntário</Nav.Link>
            <Nav.Link as={NavLink} to="/buscarVoluntario">Encontre um Voluntário</Nav.Link>
            <Nav.Link as={NavLink} to="/login">Meu Acesso</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}
