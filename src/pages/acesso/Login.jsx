import React, { useState } from 'react'
import { useNavigate  } from 'react-router';
import { Navigate } from 'react-router-dom';
import apiUsuario from '../../api/usuario'
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';

const usuarioInicial = {
  email: "",
  senha: ""
}

export default function Login() {
    const navegate = useNavigate();

    const [usuario, setUsuario] = useState(usuarioInicial);
    const { register, handleSubmit, formState: { errors }} = useForm();

    const [showModalErro, setShowModalErro] = useState(false);
    const [erroLogin, setErroLogin] = useState("")
    const handleModalErro = () => { setShowModalErro(!showModalErro)}

    if(localStorage.getItem('user') !== null && localStorage.getItem('user') !== 'null')
    {
      console.log(localStorage.getItem('user'))
      return <Navigate to="/perfil" />
    }

    const Logar = async () =>{
        try {
          const response = await apiUsuario.post('',usuario)
          localStorage.setItem('user', response.data)
          navegate(`/perfil`)
        } catch (error) {
          setErroLogin(error.response.data)
          handleModalErro();
        }
      }

      const inputTextHandler = (e) => {
        const {name, value} = e.target;

        setUsuario({...usuario, [name] : value})
      }

    return (
        <>
        <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
            <button className="btn btn-outline-primary ms-auto" onClick={() => navegate("/")}> 
                <i className="fas fa-chevron-left me-2"></i>
                Voltar
            </button>
        </div>

        <form className="position-relative overflbeelow-hidden p-3 p-md-5 m-md-3 text-center bg-light" onSubmit={handleSubmit(Logar)}>


          <div className="col-md-3 mx-auto">
          <h1 className="display-4 font-weight-normal mb-4">Login</h1>
            <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        value={usuario.email}
                        {...register("email", { required: true })}
                        onChange={inputTextHandler}
                        className="form-control"></input>
                        {errors.email && <span>Esse campo é obrigatório</span>}
         </div>
         <div className="col-md-3 mx-auto">
          <label className="form-label">Senha</label>
                      <input 
                        type="password" 
                        value={usuario.senha}
                        {...register("senha", 
                        { 
                          required: true,
                          minLength: {
                            value: 5,
                          }
                        })}
                        onChange={inputTextHandler}
                        className="form-control"></input>
              {errors.senha && <span>Esse campo é obrigatório</span>}
         </div>
          <div className="col-md-5 mx-auto my-5">
             <button className="btn btn-outline-primary me-2" type="submit">
                 Logar
            </button>
          </div>
        </form>

        <Modal show={showModalErro} onHide={handleModalErro}>
        <Modal.Header closeButton>
          <Modal.Title>Erro ao Logar</Modal.Title>
        </Modal.Header>
        <Modal.Body>{erroLogin}</Modal.Body>
        <Modal.Footer>    
          <button className="btn btn-outline-primary ms-2 mb-1 me-2"  variant="primary" onClick={() => handleModalErro()}>
            OK
          </button>
        </Modal.Footer>
      </Modal>
      </>
    )
}
