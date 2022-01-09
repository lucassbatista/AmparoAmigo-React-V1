import React from 'react'
import { useNavigate } from 'react-router';
import maosUnidas from '../../img/maos.jpg'
import sobre from '../../img/sobre.jpg'

export default function Dashboard() {
    const navegate = useNavigate();

    return (
        <>
            <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                <div className="col-md-5 p-lg-5 mx-auto my-5">
                <h1 className="display-6">Aumentando a rede de colaboração e humanidade</h1>
                <p className="lead">Aqui você encontra pessoas que se importam</p>
                <button className="btn btn-outline-primary" onClick={() => navegate('/buscarVoluntario')}> Encontrar Voluntário</button>
                </div>
                <div className="product-device shadow-sm d-none d-md-block"></div>
                <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 g-2">
                <div className="col ">
                    <div className="card shadow-sm">
                        <img src={sobre} alt='...' />

                        <div className="card-body">
                            <h5>Venha saber sobre a gente!!!</h5>
                            <p>
                                O Amparo Amigo surgiu para ser a ponte entre ONGs e voluntarios de todo o Brasil.
                                <br/>Conectamos necessidades com o amparo necessário
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                                <button className="btn btn-outline-primary" onClick={() => navegate('/sobre')}> Sobre nós</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-sm">
                        <img src={maosUnidas} alt='...' />

                        <div className="card-body">
                            <h5>Já pensou em ajudar alguem hoje?</h5>
                            <p>
                                O Amparo Amigo está aqui para te ajuda a encontrar pessoas que precisam da sua ajuda.
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                                <button className="btn btn-outline-primary" onClick={() => navegate('/cadastro')}> Voluntarie-se</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
      </>
    )
}
