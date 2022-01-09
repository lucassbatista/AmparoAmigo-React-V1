import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import { Modal } from 'react-bootstrap'
import InputMask from "react-input-mask";
import apiVoluntario from '../../api/voluntario'
import apiLocalidade from '../../api/localidade'

const cadastroNovo = {
  id: 0,
  nomeCompleto: "",
  dataNascimento: "",
  telefoneCelular: "",
  endereco: "",
  estado: "",
  cidade: "",

  tipoServico1: "",
  tipoServico2: "",
  tipoServico3: "",
  descricao: "",

  categoria1:"",
  categoria2:"",
  categoria3:"",

  email: "",
  senha: ""
}

export default function Cadastro() {
    const navegate = useNavigate();
    const [cadastro, setCadastro] = useState(cadastroNovo);
    const [estados, setEstados] = useState([]);
    const [estado, setEstado] = useState([]);
    const [cidades, setCidades] = useState([]);
    const { register, handleSubmit, formState: { errors }} = useForm();

    const [showModalErro, setShowModalErro] = useState(false);
    const [erroCadastro, setErroCadastro] = useState("")
    const handleModalErro = () => { setShowModalErro(!showModalErro)}
    
    const inputTextHandler = (e) => {
      const {name, value} = e.target;

      if(name === "estado")
        setEstado(value);
      
      setCadastro({...cadastro, [name] : value})
    }

    const proximaEtapa = async () => {
      try {
        const response = await apiVoluntario.post('',cadastro)
        console.log(response)
        //navegate(`/cadastroFoto/${response.data.id}`)
        navegate("/cadastroSucesso")
      } catch (error) {
        setErroCadastro(error.response.data)
        handleModalErro();
      }
    }

    useEffect(() =>{
      const getinfosEstados = async () => {
          const pegaInfosEstados = async () => {
            const response = await apiLocalidade.get("/estados")
            return response.data;
          }
            const estados = await pegaInfosEstados();
            estados.sort((a, b) => a.sigla.localeCompare(b.sigla))
            if(estados) setEstados(estados);
        }
        getinfosEstados(); 
  },[])

  useEffect(() =>{
    const getinfosCidades = async () => {
        const pegaInfosCidades = async () => {
          const response = await apiLocalidade.get(`/estados/${estado}/municipios`)
          return response.data;
        }
          const cidades = await pegaInfosCidades();
          cidades.sort((a, b) => a.nome.localeCompare(b.nome))
          if(cidades) setCidades(cidades);
      }
      getinfosCidades(); 
  },[estado])

    const limparCampos = (e) =>{
      e.preventDefault();
        setCadastro(cadastroNovo)
    }

    const validarDataNascimento = (dataNascimento) =>{
      if(new Date(dataNascimento) >= Date.now())
        return false;
      return true;
    }

    const validarTelefone = (telefone) =>{
      if(telefone.replace('_','').length === 15)
        return true;
      return false;
    }

    return (
        <>
        <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
            <p className="display-6 font-weight-normal mt-2">Cadastro</p>
            <button className="btn btn-outline-primary ms-auto" onClick={() => navegate("/")}> 
                <i className="fas fa-chevron-left me-2"></i>
                Voltar
            </button>
        </div>

        <form className="row g-3 " onSubmit={handleSubmit(proximaEtapa)}>
         <div className="row g-3 mt-3 border border-secondary rounded ">
            <div className="col-md-12">
              <label className="form-label">Nome Completo</label>
                <input 
                  type="text" 
                  value={cadastro.nomeCompleto}
                  {...register("nomeCompleto", { required: true })}
                  onChange={inputTextHandler}
                  className="form-control"></input>
                  {errors.nomeCompleto && <span>Esse campo é obrigatório</span>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Data Nascimento</label>
                <input  
                  type="date" 
                  value={cadastro.dataNascimento}
                  {...register("dataNascimento", 
                  { 
                    required: true, 
                    validate: value => validarDataNascimento(value)
                  })}
                  onChange={inputTextHandler}
                  className="form-control"></input>
                  {errors.dataNascimento && <span>Data de nascimento invalida</span>}
            </div>
            <div className="col-md-5">
              <label className="form-label">Telefone Celular</label>
                <InputMask  
                    type="text"
                    value={cadastro.telefoneCelular}
                    {...register("telefoneCelular", 
                    { 
                      required: true,
                      validate: value => validarTelefone(value)
                    })}
                    mask="(99) 99999-9999"
                    placeholder="ex: (11) 98638-2067"
                    onChange={inputTextHandler}
                    className="form-control"></InputMask>
                {errors.telefoneCelular && <span>Telefone invalido</span>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Endereço</label>
                <input 
                  type="text" 
                  value={cadastro.endereco}
                  {...register("endereco", { required: true })}
                  onChange={inputTextHandler}
                  className="form-control"></input>
                  {errors.endereco && <span>Esse campo é obrigatório</span>}
            </div>
            <div className="col-md-3">
                <label className="form-label">Estado</label>
              <select 
                  value={cadastro.estado}
                  {...register("estado", { required: true })}
                  onChange={inputTextHandler}
                  className="form-select">
                  <option value="">Selecionar...</option>
                  {estados.map(estado => (
                    <option value={estado.sigla} key={estado.sigla}>{estado.sigla}</option>
                  ))} 
                </select>
                {errors.estado && <span>Esse campo é obrigatório</span>}
              </div>

              <div className="col-md-3 mb-3">
              <label className="form-label">Cidade</label>
                <select 
                  value={cadastro.cidade}
                  {...register("cidade", { required: true })}
                  onChange={inputTextHandler}
                  className="form-select">
                  <option value="">Selecionar...</option>
                  {cidades.map(cidade => (
                    <option value={cidade.nome} key={cidade.id}>{cidade.nome}</option>
                  ))} 
                  </select>
                  {errors.cidade && <span>Esse campo é obrigatório</span>}
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
                    value={cadastro.tipoServico1}
                    onChange={inputTextHandler}
                    placeholder="ex: Professora"
                    className="form-control"></input>
              </div>

              <div className="col-md-4">
                <label className="form-label">Tipo Serviço 2</label>
                  <input 
                    name="tipoServico2"
                    type="text" 
                    value={cadastro.tipoServico2}
                    onChange={inputTextHandler}
                    placeholder="ex: Auxiliar de Limpeza"
                    className="form-control"></input>
              </div>

              <div className="col-md-4">
                <label className="form-label">Tipo Serviço 3</label>
                  <input 
                    name="tipoServico3"
                    type="text" 
                    value={cadastro.tipoServico3}
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
                    value={cadastro.descricao}
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
                    id="categoria1" 
                    value={cadastro.categoria1}
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
                    id="categoria2" 
                    value={cadastro.categoria2}
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
                    id="categoria3" 
                    value={cadastro.categoria3}
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

           <div className="row g-3 mt-3 border border-secondary rounded ">
                  <div className="col-md-6">
                  <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      value={cadastro.email}
                      {...register("email", { required: true })}
                      onChange={inputTextHandler}
                      className="form-control"></input>
                      {errors.email && <span>Esse campo é obrigatório</span>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Senha</label>
                    <input 
                      type="password" 
                      value={cadastro.senha}
                      {...register("senha", 
                      { 
                        required: true,
                        minLength: {
                          value: 5,
                        }
                      })}
                      onChange={inputTextHandler}
                      className="form-control"></input>
                      {errors.senha && <span> a senha deve possuir no minimo 5 caracteres</span>}
                </div>
            </div>  
          <div className="col-12 mb-3">
             <button className="btn btn-outline-primary me-2" type="submit">
                 Cadastrar
            </button>
            <button className="btn btn-outline-secondary" onClick={limparCampos}>
                 Limpar
            </button>
          </div>
        </form>

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
