import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router';
import apiVoluntario from '../../api/voluntario'
import BuscaItem from './BuscaItem';

export default function BuscaLista() {
    const navegate = useNavigate();
    const { categoria, tipoServico, estado, cidade } = useParams();

    const [voluntarios, setVoluntarios] = useState([]);
    const [voluntario, setVoluntario] = useState({ id: 0});
    const [smShowConfirmModal, setShowConfirmModal] = useState(false);

    const handleConfirmModal = (id) => {
        if(id !== 0 && id !== undefined){
            const voluntario = voluntarios.filter(voluntario => voluntario.id === id)
            console.log(voluntario[0])
            setVoluntario(voluntario[0])
          }else{
            setVoluntario({id: 0})
          }
        setShowConfirmModal(!smShowConfirmModal)
      }

      useEffect(() =>{
        const getinfosVoluntarios = async () => {
            const pegaInfosVoluntarios = async () => {
              const response = await apiVoluntario.get(`/${categoria}/${tipoServico}/${estado}/${cidade}`)
              return response.data;
            }
              const infosVoluntario = await pegaInfosVoluntarios();
              if(infosVoluntario) setVoluntarios(infosVoluntario);
          }
        getinfosVoluntarios(); 
    },[categoria, tipoServico, estado, cidade])

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
                <p className="display-6 font-weight-normal mt-2">Resultados da busca</p>
                <button className="btn btn-outline-primary ms-auto" onClick={() => navegate("/buscarVoluntario")}> 
                    <i className="fas fa-chevron-left me-2"></i>
                    Nova Busca
                </button>
            </div>
            <div className="mt-3">
                <ul className="list-group">
                {voluntarios.map(voluntario => (
                    <BuscaItem
                        key={voluntario.id}
                        voluntario={voluntario}
                        handleConfirmModal={handleConfirmModal}
                    />
                ))}  
                </ul>
            </div>

      <Modal size="lg" show={smShowConfirmModal} onHide={handleConfirmModal}>
          <Modal.Header closeButton>
            <Modal.Title> 
              Detalhes voluntário
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="main-body">
            <div className="row gutters-sm mt-1">
            <div className="col-md-12 mb-1 shadow-sm">
                <div className="card">
                <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                        <h4>{voluntario.nomeCompleto}</h4>
                        <p className="text-muted font-size-sm">{voluntario.cidade}, {voluntario.estado}</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="col-md-12 mt-2 shadow-sm">
                <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Nome Completo</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {voluntario.nomeCompleto}
                    </div>
                    </div>

                    <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Data de Nascimento</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {new Date(voluntario.dataNascimento).toLocaleDateString()}
                    </div>
                    </div>

                    <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Categorias</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {voluntario.categoria1}  
                        {(voluntario.categoria2 === null || voluntario.categoria2 === '') ?  "" : " - " + voluntario.categoria2}  
                        {(voluntario.categoria3 === null || voluntario.categoria3 === '') ?  "" : " - " + voluntario.categoria3}  
                    </div>
                    </div>

                    <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Serviços</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {voluntario.tipoServico1}  
                        {(voluntario.tipoServico2 === null || voluntario.tipoServico2 === '') ?  "" : " - " + voluntario.tipoServico2}  
                        {(voluntario.tipoServico3 === null || voluntario.tipoServico3 === '') ?  "" : " - " + voluntario.tipoServico3}  
                    </div>
                    </div>

                    <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Descrição:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {voluntario.descricao}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <div>
                <h6>
                Gostaria de escolher esse voluntário?
                </h6>
            </div>
            <div>
                <button className="btn btn-outline-success ms-2 mb-1 me-2" onClick={() => navegate(`/solicitacao/${voluntario.id}`)}>
                <i className="fas fas-check me-2"></i>
                Sim
                </button>
                <button className="btn btn-outline-danger me-2 mb-1"
                onClick={() => handleConfirmModal()}
                >
                <i className="fas fas-times me-2"></i>
                Não
                </button>
            </div>
          </Modal.Footer>
      </Modal>
        </>
    )
}
