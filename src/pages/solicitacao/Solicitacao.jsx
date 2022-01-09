import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import apiLocalidade from '../../api/localidade'
import apiSolicitacao from '../../api/solicitacao'


export default function Solicitacao() {

    const navegate = useNavigate();

    const [estados, setEstados] = useState([]);
    const [estado, setEstado] = useState([]);
    const [cidades, setCidades] = useState([]);

    const { idVoluntario } = useParams();
    const solicitacaoInicial = { razaoSocial: "", cnpj: "", telefoneCelular:"", endereco:"", estado:"", cidade:"", responsavel:"", voluntarioId: idVoluntario }
    const [solicitacao, setSolicitacao] = useState(solicitacaoInicial);

    const { register, handleSubmit, formState: { errors }} = useForm();

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

      const validarTelefone = (telefone) =>{
        if(telefone.replace('_','').length === 15)
          return true;
        return false;
      }
      const validarCNPJ = (cnpj) =>{
          cnpj = cnpj.replace(/[^\d]+/g,'');
 
          if(cnpj === '') return false;
           
          if (cnpj.length !== 14)
              return false;
       
          if (cnpj === "00000000000000" || 
              cnpj === "11111111111111" || 
              cnpj === "22222222222222" || 
              cnpj === "33333333333333" || 
              cnpj === "44444444444444" || 
              cnpj === "55555555555555" || 
              cnpj === "66666666666666" || 
              cnpj === "77777777777777" || 
              cnpj === "88888888888888" || 
              cnpj === "99999999999999")
              return false;

          return true;
      }

    const SalvarSolicitacao = async () => {
        try {
          await apiSolicitacao.post('',solicitacao)
          navegate('/solicitacaoSucesso')
        } catch (error) {
          alert(error.response.data)
        }
      }

      const inputTextHandler = (e) => {
        const {name, value} = e.target;
        if(name === "estado")
          setEstado(value);
        
          setSolicitacao({...solicitacao, [name] : value})
      }

    return (
    <>
            <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
                <p className="display-6 font-weight-normal mt-2">Solicitação</p>
                <button className="btn btn-outline-primary ms-auto" onClick={() => navegate("/buscarVoluntario")}> 
                    <i className="fas fa-chevron-left me-2"></i>
                    Nova Busca
                </button>
            </div>

        <form className="row g-3 mt-3" onSubmit={handleSubmit(SalvarSolicitacao)}>
         <div className="col-md-12">
           <label className="form-label">Razão Social</label>
           <input 
                type="text" 
                value={solicitacao.razaoSocial}
                {...register("razaoSocial", { required: true })}
                onChange={inputTextHandler}
                className="form-control"></input>
                {errors.razaoSocial && <span>Esse campo é obrigatório</span>}
         </div>
         <div className="col-md-6">
           <label className="form-label">CNPJ (apenas números)</label>
            <InputMask  
              type="text" 
              value={solicitacao.cnpj}
              {...register("cnpj",
              { 
                required: true,
                validate: value => validarCNPJ(value)
              })}
              mask="99.999.999/9999-99"
              onChange={inputTextHandler}
              className="form-control"></InputMask>
            {errors.cnpj && <span>CNPJ Invalido</span>}
         </div>
         <div className="col-md-6">
         <label className="form-label">Telefone Celular</label>
                <InputMask  
                    type="text"
                    value={solicitacao.telefoneCelular}
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
                value={solicitacao.endereco}
                {...register("endereco", { required: true })}
                onChange={inputTextHandler}
                className="form-control"></input>
                {errors.endereco && <span>Esse campo é obrigatório</span>}
         </div>
         <div className="col-md-3">
                <label className="form-label">Estado</label>
              <select 
                  value={solicitacao.estado}
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
                  value={solicitacao.cidade}
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

          <div className="col-md-6">
           <label className="form-label">Quem o voluntário deve procurar?</label>
           <input 
                type="text" 
                value={solicitacao.responsavel}
                {...register("responsavel", { required: true })}
                onChange={inputTextHandler}
                className="form-control"></input>
                {errors.responsavel && <span>Esse campo é obrigatório</span>}
         </div>
          <div className="col-12">
             <button className="btn btn-outline-primary me-2" type="submit">
                 Proximo
            </button>
            <button className="btn btn-outline-secondary" >
                 Limpar
            </button>
          </div>
        </form>
    </>
    )
}
