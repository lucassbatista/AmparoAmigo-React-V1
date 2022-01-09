import React from 'react'

export default function BuscaItem(props) {
    return (
        <div className="card mb-2 shadow-sm">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">
                    <span className="badge bg-secondary me-1">{props.voluntario.nomeCompleto} </span>
                    </h5>
                    <p>
                        {props.voluntario.cidade} - {props.voluntario.estado}
                    </p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>
                        Serviços: {props.voluntario.tipoServico1}  
                        {(props.voluntario.tipoServico2 === null || props.voluntario.tipoServico2 === '') ?  "" : " - " + props.voluntario.tipoServico2}  
                        {(props.voluntario.tipoServico3 === null || props.voluntario.tipoServico3 === '') ?  "" : " - " + props.voluntario.tipoServico3}   
                    </p>
                    <button 
                    className="btn btn-outline-primary me-1 btn-sm"
                    onClick={() => props.handleConfirmModal(props.voluntario.id)}
                    >
                    Detalhes   
                    </button>
                </div>
            </div>
        </div>
    )
}
