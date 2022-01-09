import { useState, useEffect } from 'react'
import { useNavigate  } from 'react-router';
import { Navigate } from 'react-router-dom';
import apiVoluntario from '../../api/voluntario'
import apiSolicitacao from '../../api/solicitacao'

export default function Perfil() {
    const navegate = useNavigate();

    const [voluntario, setVoluntario] = useState("");   
    const [solicitacoes, setSolicitacoes] = useState([]);   

    useEffect(() =>{
        const pegaInfosVoluntario = async () => {
            const response = await apiVoluntario.get(`/${localStorage.getItem('user')}`)
            return response.data;
          }
          const getinfosVoluntario = async () => {
              const infosVoluntario = await pegaInfosVoluntario();
              if(infosVoluntario) setVoluntario(infosVoluntario);
          }
          getinfosVoluntario();
      },[])

      useEffect(() =>{
        const getinfosSolicitacao = async () => {
            const pegaInfosSolicitacao = async () => {
              const response = await apiSolicitacao.get(`/${localStorage.getItem('user')}`)
              return response.data;
            }
              const solicitacoes = await pegaInfosSolicitacao();
              if(solicitacoes) setSolicitacoes(solicitacoes);
          }
          getinfosSolicitacao(); 
      },[])

      const logoff = async () =>{
        localStorage.removeItem("user");
        navegate('/');
      }

    if((localStorage.getItem('user') === null || localStorage.getItem('user') === 'null'))
    {
        return <Navigate to="/" />
    }
    else{
        return (
            <>
            <div className="main-body">
                <div className="row gutters-sm mt-4">
                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                                <div className="mt-3">
                                    <h4>{voluntario.nomeCompleto}</h4>
                                    <p className="text-muted font-size-sm">{voluntario.cidade}, {voluntario.estado}</p>
                                    <button className="btn btn-outline-primary" onClick={() => navegate('/editarCadastro')} > Editar </button>
                                    <button className="btn btn-primary" onClick={() => logoff()} > Sair </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card mb-3 shadow-sm">
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
                            <h6 className="mb-0">Endereço</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {voluntario.endereco} - {voluntario.cidade} - {voluntario.estado}
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Telefone Celular</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {voluntario.telefoneCelular}
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Categorias</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {voluntario.categoria1}  
                            {voluntario.categoria2 !== null ? " - " + voluntario.categoria2 : ""}  
                            {voluntario.categoria3 !== null ? " - " + voluntario.categoria3 : ""}  
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Serviços</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {voluntario.tipoServico1}  
                            {voluntario.tipoServico2 !== null ? " - " + voluntario.tipoServico2 : ""}  
                            {voluntario.tipoServico3 !== null ? " - " + voluntario.tipoServico3 : ""}  
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Descrição das Atividades</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {voluntario.descricao}
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="row gutters-sm shadow-sm">
                        <div className="col-md-12 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="d-flex align-items-center mb-3">Solicitações recebidas:</h5>
                                    <ul className="list-group">
                                        {solicitacoes.map(solicitacao => (
                                            <div key={solicitacao.id} className="col-md-12 shadow-sm">
                                                <div className="card mb-3">
                                                <div className="card-body">

                                                    <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">CNPJ</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {solicitacao.cnpj}
                                                    </div>
                                                    </div>

                                                    <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Razão Social</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {solicitacao.razaoSocial}
                                                    </div>
                                                    </div>

                                                    <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Data da Solicitação</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {new Date(solicitacao.dataCriacao).toLocaleDateString()}
                                                    </div>
                                                    </div>

                                                    <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Endereço</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {solicitacao.endereco} - {solicitacao.cidade} - {solicitacao.estado} 
                                                    </div>
                                                    </div>

                                                    <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Telefone Celular</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {voluntario.telefoneCelular}  
                                                    </div>
                                                    </div>

                                                </div>
                                                </div>
                                            </div>
                                        ))}  
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
        )
    }
}
