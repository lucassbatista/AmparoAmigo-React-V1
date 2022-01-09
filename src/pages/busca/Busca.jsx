import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import apiVoluntario from '../../api/voluntario'
import apiLocalidade from '../../api/localidade'

export default function Busca() {
    const navegate = useNavigate();
    
    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [tipoServicos, setTipoServicos] = useState([]);
    const [tipoServico, setTipoServico] = useState([]);

    const [estados, setEstados] = useState([]);
    const [estado, setEstado] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [cidade, setCidade] = useState([]);

    useEffect(() =>{
      const getinfosCategorias = async () => {
          const pegaInfosEstados = async () => {
            const response = await apiVoluntario.get("/categorias")
            return response.data;
          }
            const categorias = await pegaInfosEstados();
            if(categorias) setCategorias(categorias);
        }
        getinfosCategorias(); 
    },[])

    useEffect(() =>{
    const getInfosTipoServico = async () => {
        const pegaInfosTipoServico = async () => {
          const response = await apiVoluntario.get(`/tiposServico/${categoria}`)
          return response.data;
        }
          const tipoServicos = await pegaInfosTipoServico();
          if(tipoServicos) setTipoServicos(tipoServicos);
      }
      
      if(categoria.length > 2) {
        getInfosTipoServico();
      }else{
        setTipoServicos([])
      } 

    },[categoria])

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

    const inputTextHandler = (e) => {
      const {name, value} = e.target;

      if(name === "estado")
      {
        setEstado(value);
        setCidade("")
      }

      if(name === "cidade")
      {
        setCidade(value)
      }

      if(name === "categoria" )
      {
        setCategoria(value);
        setTipoServico("")
      }

      if(name === "tipoServico" )
      {
        setTipoServico(value);
      }
    
    }

    const handlerSubmit = (e) =>{
        e.preventDefault();
        let paramCategoria = (categoria.length > 1) ? categoria : "c"; 
        let paramTipoServico = (tipoServico.length > 1) ? tipoServico : "t";
        let paramEstado = (estado.length > 1) ? estado : "e";
        let paramCidade = (cidade.length > 1) ? cidade : "c";
        
        navegate(`/buscaLista/${paramCategoria}/${paramTipoServico}/${paramEstado}/${paramCidade}`)  
      }

    return (
        <>
        <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
            <p className="display-6 font-weight-normal mt-2">Buscar Voluntário</p>
            <button className="btn btn-outline-primary ms-auto" onClick={() => navegate("/")}> 
                <i className="fas fa-chevron-left me-2"></i>
                Voltar
            </button>
        </div>

        <form className="row g-3 mt-3" onSubmit={handlerSubmit}>
         <div className="col-md-3">
            <label className="form-label">Categoria</label>
           <select 
              name="categoria"
              id="categoria" 
              onChange={inputTextHandler}
              className="form-select">
              <option value="">Selecionar...</option>
              {categorias.map(categoria => (
                <option value={categoria} key={categoria}>{categoria}</option>
              ))} 
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Tipo Serviço</label>
           <select 
              name="tipoServico"
              id="tipoServico" 
              onChange={inputTextHandler}
              className="form-select">
              <option value="">Selecionar...</option>
              {tipoServicos.map(tipoServico => (
                <option value={tipoServico} key={tipoServico}>{tipoServico}</option>
              ))} 
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Estado</label>
           <select 
              name="estado"
              id="estado" 
              onChange={inputTextHandler}
              className="form-select">
              <option value="">Selecionar...</option>
              {estados
                .map(estado => (
                <option value={estado.sigla} key={estado.sigla}>{estado.sigla}</option>
              ))} 
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Cidade</label>
           <select 
              name="cidade"
              id="cidade" 
              onChange={inputTextHandler}
              className="form-select">
              <option value="">Selecionar...</option>
              {cidades
                .map(cidade => (
                <option value={cidade.nome} key={cidade.id}>{cidade.nome}</option>
              ))} 
            </select>
          </div>

          <div className="col-12">
             <button className="btn btn-outline-primary me-2" type="submit">
                 Buscar
            </button>
          </div>
        </form>
      </>
    )
}
