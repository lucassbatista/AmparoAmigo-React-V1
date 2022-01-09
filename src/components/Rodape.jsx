import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

export default function Rodape() {
    return (
        <Card className="text-center" bg="primary" variant="dark" text={'primary' === 'light' ? 'dark' : 'white'}>
        <Card.Body>
            <Card.Text>

            </Card.Text>
            <Button as={NavLink} to="/sobre" variant="primary">Sobre nós</Button>
            <Button as={NavLink} to="/cadastro" variant="primary">Seja Voluntário</Button>
            <Button as={NavLink} to="/buscarVoluntario" variant="primary">Encontre um Voluntário</Button>
            <Button as={NavLink} to="/login" variant="primary">Meu Acesso</Button>
        </Card.Body>
        <Card.Footer className="text-muted">© 2022 Copyright: AmparoAmigo</Card.Footer>
        </Card>
    )
}
