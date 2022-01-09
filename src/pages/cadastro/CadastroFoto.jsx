import React from 'react'
import { useNavigate, useParams } from 'react-router';
import { Form } from 'react-bootstrap'

export default function CadastroFoto() {
    const navegate = useNavigate();
    const { id } = useParams();
    console.log(id)
    const handlerSubmit = (e) =>{
        e.preventDefault();
        navegate('/cadastroSucesso')
      }

    return (
        <>
        <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
            <p className="display-6 font-weight-normal mt-2">Cadastro</p>

        </div>

        <form className="row g-3 mt-3 " onSubmit={handlerSubmit}>

        <div className="col-md-4">
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Deseja subir uma imagem para o seu perfil?</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
          </div>

          <div className="col-12">
             <button className="btn btn-outline-primary me-2" type="submit">
             <i className="fas fa-plus me-2"></i> Salvar
            </button>
            <button className="btn btn-outline-secondary" >
                 Pular Etapa
            </button>
          </div>
        </form>
      </>
    )
}
