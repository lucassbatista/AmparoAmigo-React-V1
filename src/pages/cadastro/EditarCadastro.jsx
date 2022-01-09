import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap'
import InputMask from "react-input-mask";
import apiVoluntario from '../../api/voluntario'
import apiLocalidade from '../../api/localidade'

const VoluntarioInicial = {
  id: 0,
  nomeCompleto: "",
  dataNascimento: "",
  telefoneCelular: "",
  endereco: "",
  cidade: "",
  estado: "",

  tipoServico1: "",
  tipoServico2: "",
  tipoServico3: "",
  descricao: "",

  categoria1:"",
  categoria2:"",
  categoria3:"",
}

export default function EditarCadastro() {
  const navegate = useNavigate();

  const [voluntario, setVoluntario] = useState(VoluntarioInicial);

  const [estados, setEstados] = useState([]);
  const [estado, setEstado] = useState([]);
  const [cidades, setCidades] = useState([]);

  const [showModalErro, setShowModalErro] = useState(false);
  const [erroCadastro, setErroCadastro] = useState("")
  const handleModalErro = () => { setShowModalErro(!showModalErro)}

    useEffect(() =>{
        const getinfosVoluntario = async () => {
          const pegaInfosVoluntario = async () => {
            const response = await apiVoluntario.get(`/${localStorage.getItem('user')}`)
            return response.data;
          }
            const infosVoluntario = await pegaInfosVoluntario();
            if(infosVoluntario) await setVoluntario(infosVoluntario);
        }
        getinfosVoluntario(); 
    },[])

    useEffect(() =>{
      const getinfosEstados = async () => {
          const pegaInfosEstados = async () => {
            const response = await apiLocalidade.get("/estados")
            return response.data;
          }
            const estados = await pegaInfosEstados();
            estados.sort((a, b) => a.sigla.localeCompare(b.sigla))
            if(estados) await setEstados(estados);
            setEstado("RJ");
            setEstado("SP");
            setEstado(voluntario.estado);
        }
        getinfosEstados(); 
  },[voluntario.estado])

  useEffect(() =>{
    const getinfosCidades = async () => {
        const pegaInfosCidades = async () => {
          const response = await apiLocalidade.get(`/estados/${estado}/municipios`)
          return response.data;
        }
          const cidades = await pegaInfosCidades();
          cidades.sort((a, b) => a.nome.localeCompare(b.nome))
          if(cidades) await setCidades(cidades);
      }
      getinfosCidades(); 
  },[estado])

    const inputTextHandler = (e) => {
      const {name, value} = e.target;

      if(name === "estado")
      setEstado(value);
      
      setVoluntario({...voluntario, [name] : value})
      console.log(voluntario)
    }

    const SalvarAlteracoes = async () => {
      try {
        await apiVoluntario.put(`/${voluntario.id}`,voluntario)
        navegate(`/perfil`)
      } catch (error) {
        setErroCadastro(error.response.data)
        handleModalErro();
      }
    }

    if((localStorage.getItem('user') === null || localStorage.getItem('user') === 'null'))
    {
        return <Navigate to="/" />
    }
    else{
        return (
            <>
            <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
                <p className="display-6 font-weight-normal mt-2">Editar Cadastro</p>
                <button className="btn btn-outline-primary ms-auto" onClick={() => navegate('/perfil')}> 
                    <i className="fas fa-chevron-left me-2"></i>
                    Voltar
                </button>
            </div>

            <div className="row g-3 ">
            <div className="row g-3 mt-3 border border-secondary rounded ">
                <div className="col-md-12">
                  <label className="form-label">Nome Completo</label>
                    <input 
                      name="nomeCompleto"
                      type="text" 
                      value={voluntario.nomeCompleto}
                      onChange={inputTextHandler}
                      className="form-control"></input>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Data Nascimento</label>
                    <input  
                      name='dataNascimento'
                      type="text" 
                      readOnly
                      value={new Date(voluntario.dataNascimento).toLocaleDateString()}
                      className="form-control"></input>
                </div>
                <div className="col-md-5">
                  <label className="form-label">Telefone Celular</label>
                    <InputMask  
                        name="telefoneCelular"
                        type="text"
                        value={voluntario.telefoneCelular}
                        mask="(99) 99999-9999"
                        placeholder="ex: (11) 98638-2067"
                        onChange={inputTextHandler}
                        className="form-control"></InputMask>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Endereço</label>
                    <input 
                      name="endereco"
                      type="text" 
                      value={voluntario.endereco}
                      onChange={inputTextHandler}
                      className="form-control"></input>
                </div>
                <div className="col-md-3 mb-3">
                    <label className="form-label">Estado</label>
                  <select 
                      name="estado"
                      value={voluntario.estado}
                      onChange={inputTextHandler}
                      className="form-select">
                      {estados.map(estado => (
                        <option value={estado.sigla} key={estado.sigla}>{estado.sigla}</option>
                      ))} 
                    </select>
                  </div>

                  <div className="col-md-3">
                  <label className="form-label">Cidade</label>
                  <select 
                      name="cidade"
                      value={voluntario.cidade}
                      onChange={inputTextHandler}
                      className="form-select">
                      <option value="">Selecionar...</option>
                      {cidades.map(cidade => (
                        <option value={cidade.nome} key={cidade.id}>{cidade.nome}</option>
                      ))} 
                      </select>
                </div>

              </div>
              
              <div className="row g-3 mt-3 border border-secondary rounded ">
                  <div className="col-md-12 d-flex justify-content-center border border-info rounded"> 
                  <p className='mt-3'> Adicione até 3 atividades que possa realizar. Utilize o campo descrição para dar mais detalhes sobre a atividade que possa ou ja realizou</p>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Tipo Serviço 1</label>
                      <input 
                        name="tipoServico1"
                        type="text" 
                        value={voluntario.tipoServico1}
                        onChange={inputTextHandler}
                        placeholder="ex: Professora"
                        className="form-control"></input>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Tipo Serviço 2</label>
                      <input 
                        name="tipoServico2"
                        type="text" 
                        value={voluntario.tipoServico2}
                        onChange={inputTextHandler}
                        placeholder="ex: Auxiliar de Limpeza"
                        className="form-control"></input>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Tipo Serviço 3</label>
                      <input 
                        name="tipoServico3"
                        type="text" 
                        value={voluntario.tipoServico3}
                        onChange={inputTextHandler}
                        placeholder="ex: Cozinheira"
                        className="form-control"></input>
                  </div>

                    <div className="col-md-12 mb-3">
                      <label className="form-label">Descrição</label>
                      <textarea 
                        name="descricao"
                        id="descricao"
                        type="text" 
                        value={voluntario.descricao}
                        onChange={inputTextHandler}
                        placeholder="Breve descrição das atividades ja realizadas"
                        className="form-control"></textarea>
                  </div>
              </div>

              <div className="row g-3 mt-3 border border-secondary rounded ">
                    <div className="col-md-12 d-flex justify-content-center border border-info rounded"> 
                      <p className='mt-3'> Adicione as categorias que você se enquadra (Preencha ao menos uma categoria)</p>
                    </div>

                  <div className="col-md-4">
                      <label className="form-label">Categoria 1</label>
                    <select 
                        name="categoria1"
                        value={voluntario.categoria1}
                        onChange={inputTextHandler}
                        className="form-select">
                        <option value="">Selecionar...</option>
                        <option value="Educação">Educação</option>
                        <option value="Comunicação">Comunicação</option>
                        <option value="Assistência Social">Assistência Social</option>
                        <option value="Geral">Geral</option>
                        <option value="Transporte">Transporte</option>
                        <option value="Suplementos">Suplementos</option>
                        <option value="Animais">Animais</option>
                        <option value="serviços Gerais">serviços Gerais</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Estética">Estética</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Categoria 2</label>
                    <select 
                        name="categoria2"
                        value={voluntario.categoria2}
                        onChange={inputTextHandler}
                        className="form-select">
                        <option value="">Selecionar...</option>
                        <option value="Educação">Educação</option>
                        <option value="Comunicação">Comunicação</option>
                        <option value="Assistência Social">Assistência Social</option>
                        <option value="Geral">Geral</option>
                        <option value="Transporte">Transporte</option>
                        <option value="Suplementos">Suplementos</option>
                        <option value="Animais">Animais</option>
                        <option value="serviços Gerais">serviços Gerais</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Estética">Estética</option>
                      </select>
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">Categoria 3</label>
                    <select 
                        name="categoria3"
                        value={voluntario.categoria3}
                        onChange={inputTextHandler}
                        className="form-select">
                        <option value="">Selecionar...</option>
                        <option value="Educação">Educação</option>
                        <option value="Comunicação">Comunicação</option>
                        <option value="Assistência Social">Assistência Social</option>
                        <option value="Geral">Geral</option>
                        <option value="Transporte">Transporte</option>
                        <option value="Suplementos">Suplementos</option>
                        <option value="Animais">Animais</option>
                        <option value="serviços Gerais">serviços Gerais</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Estética">Estética</option>
                      </select>
                    </div>
              </div>

              <div className="col-12 mb-3">
                <button className="btn btn-outline-primary me-2" onClick={SalvarAlteracoes}>
                    Salvar
                </button>
                <button className="btn btn-outline-secondary" onClick={() => navegate('/perfil')}>
                    Cancelar
                </button>
              </div>
            </div>

            <Modal show={showModalErro} onHide={handleModalErro}>
            <Modal.Header closeButton>
              <Modal.Title>Erro ao cadastrar</Modal.Title>
            </Modal.Header>
            <Modal.Body>{erroCadastro}</Modal.Body>
            <Modal.Footer>    
              <button className="btn btn-outline-primary ms-2 mb-1 me-2"  variant="primary" onClick={() => handleModalErro()}>
                OK
              </button>
            </Modal.Footer>
          </Modal>
          </>
        )
    }
}
