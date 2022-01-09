import React from 'react'
import { useNavigate } from 'react-router';
import sobreNos from '../../img/sobreNos.jpg'

export default function Sobre() {
    const navegate = useNavigate();

    return (
        <div className="row row-cols-1 g-3">
            <div className="col">
                <div className="card shadow-sm">
                    <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
                        <p className="display-6 font-weight-normal mt-2 ms-2">Sobre Nós</p>
                        <button className="btn btn-outline-primary" onClick={() => navegate("/")}> 
                        <i className="fas fa-chevron-left me-2"></i>
                            Voltar
                        </button>
                    </div>
                    <img src={sobreNos} alt='...' />

                    <div className="card-body">
                        <p>
                        O Amparo Amigo e uma organização privada sem fins lucrativos com o objetivo de ser uma ponte entre as ONG's e os voluntário. 
                        No amparo amigo os voluntários podem fazer o cadastro, informando sobre quais atividades podem executar, e assim possibilitando para que ONG's acessem o 
                        nosso portal e consigam encontrar os voluntarios que possam ajuda-las e solicitar os seus serviços.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
