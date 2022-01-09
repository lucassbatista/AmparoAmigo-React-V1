import { Route, Routes } from 'react-router';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Sobre from './pages/sobre/Sobre';
import Cadastro from './pages/cadastro/Cadastro';
import CadastroFoto from './pages/cadastro/CadastroFoto';
import CadastroSucesso from './pages/cadastro/CadastroSucesso';
import Login from './pages/acesso/Login';
import Perfil from './pages/acesso/Perfil';
import Busca from './pages/busca/Busca';
import BuscaLista from './pages/busca/BuscaLista';
import Solicitacao from './pages/solicitacao/Solicitacao';
import SolicitacaoSucesso from './pages/solicitacao/SolicitacaoSucesso';
import EditarCadastro from './pages/cadastro/EditarCadastro';

export default function App() {

  return (
    <Routes>      
      <Route path='/' exact element={<Dashboard/>}/>
      <Route path='/sobre' exact element={<Sobre/>}/>
      <Route path='/cadastro' exact element={<Cadastro/>}/>
      <Route path='/cadastroSucesso' exact element={<CadastroSucesso/>}/>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/buscarVoluntario' exact element={<Busca/>}/>
      <Route path='/buscaLista/:categoria/:tipoServico/:estado/:cidade' exact element={<BuscaLista/>}/>
      <Route path='/solicitacao/:idVoluntario' exact element={<Solicitacao/>}/>
      <Route path='/solicitacaoSucesso' exact element={<SolicitacaoSucesso/>}/>

      <Route path='/editarCadastro' exact element={<EditarCadastro/>}/>
      <Route path='/cadastroFoto/:id' exact element={<CadastroFoto/>}/>
      <Route path='/perfil' exact element={<Perfil/>}/>
    </Routes>
  );
}
