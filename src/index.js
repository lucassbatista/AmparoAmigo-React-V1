import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Menu from './components/Menu';
import 'bootswatch/dist/pulse/bootstrap.min.css';
import Rodape from './components/Rodape';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Menu />
    <div id="container-id" className="container">
      <App />
    </div>
    <Rodape/>
  </Router>,
  document.getElementById('root')
);


