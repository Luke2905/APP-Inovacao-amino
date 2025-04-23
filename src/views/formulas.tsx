import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import '../App.css'
import api from "../service/api";
import {motion} from 'framer-motion'; //-> biblioteca para animações

const Formulas =() =>{
        return(
            <div className="FormulasConteudo">
            <List/>
            </div>
        )
 
}

export default Formulas;


function List() {
    const [formulas, setFormulas] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [loading, setLoading] = useState(true);

const Formulas = []

    async function getFormulas() { //-> Função para acessar o backend
        try {
        const formulaApi = await api.get('/formulas')
        setFormulas(formulaApi.data)   //-> seleciona apenas o campo data da requisiçao do backend
        console.log("Sucesso na busca")
        }catch(error){
            console.error("Erro ao buscar fórmulas:", error);
        }


    }

  
    useEffect(() => {
      getFormulas();
    }, []);
  
    const formulasFiltradas = formulas.filter(item =>
      (!pesquisa || item.codigo?.toLowerCase().includes(pesquisa.toLowerCase()) ||
       item.titulo?.toLowerCase().includes(pesquisa.toLowerCase()))
    );
  
    return (
      <div className="lista-container" style={{ padding: '20px' }}>
  
          <input
            className="searchBar"
            type="text"
            placeholder="Pesquisar por código ou descrição..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
    

            <table className="Tabela">
              <thead style={{ backgroundColor: '#003366', color: 'white' }}>
                <tr>
                  <th>Codigo</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {formulasFiltradas.map(formula => (
                  <tr key={formula.id}>
                    <td>{formula.codigo}</td>
                    <td>{formula.titulo}</td>
                    <td>{formula.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
      
      </div>
    );
  }
  
