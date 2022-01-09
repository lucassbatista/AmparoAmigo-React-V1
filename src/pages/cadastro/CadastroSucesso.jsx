import React from 'react'
import { useNavigate } from 'react-router';

export default function CadastroSucesso() {
    const navegate = useNavigate();

    return (
    <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
      <div className="col-md-5 p-lg-5 mx-auto my-5">
        <h1 className="display-4 font-weight-normal">Cadastro Realizado com sucesso</h1>
        <br/>
        <p className="lead font-weight-normal">Seja muito bem-vindo ao AmparoAmigo, esperemos que em breve você possa colaborar com nossas amigas ONGs!</p>
        <button className="btn btn-outline-primary" onClick={() => navegate("/login")} >Meu Acesso</button>
      </div>
    </div>
    )
}
