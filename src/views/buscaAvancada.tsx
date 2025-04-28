import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import '../App.css'
import api from "../service/api";
import {motion} from 'framer-motion'; //-> biblioteca para animações

const BuscaPropriedades =() =>{
        return(
            <div className="BuscaConteudo">
            <List/>
            </div>
        )
 
}

export default BuscaPropriedades;


function List() {
    const [formulas, setFormulas] = useState([]);
    const [aplicacao, setApicacao] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);

    function handleFiltroChange(event) {  //-> chamada com o click do usuario
        const { value, checked } = event.target;
        if (checked) {
          setFiltrosSelecionados(prev => [...prev, value]);
        } else {
          setFiltrosSelecionados(prev => prev.filter(filtro => filtro !== value));
        }
      }

    const [loading, setLoading] = useState(true);

const Formulas = []

    async function getFormulas() { //-> Função para acessar o backend
        try {
        const formulaApi = await api.get('/busca')
        setFormulas(formulaApi.data)   //-> seleciona apenas o campo data da requisiçao do backend
        console.log("Sucesso na busca")
        }catch(error){
            console.error("Erro ao buscar fórmulas:", error);
        }
     }

     async function getAplicacao() {
        try {
            const aplicacaoApi = await api.get('/Listar')
            setApicacao(aplicacaoApi.data)   //-> seleciona apenas o campo data da requisiçao do backend
            console.log("Sucesso na busca")
            }catch(error){
                console.error("Erro ao buscar aplicações:", error);
            }
     }

  
    useEffect(() => {
      getFormulas();
      getAplicacao();
    }, []);

    
  
    const formulasFiltradas = formulas.filter(item => {
        const pesquisaOk = !pesquisa || 
          item.sistema_titulo?.toLowerCase().includes(pesquisa.toLowerCase()) ||
          item.familia_titulo?.toLowerCase().includes(pesquisa.toLowerCase());
      
        const filtroAplicacaoOk = filtrosSelecionados.length === 0 || (
          item.aplicacao_titulo && filtrosSelecionados.includes(item.aplicacao_titulo)
        );
      
        return pesquisaOk && filtroAplicacaoOk;
      });
      
  
    return (
        <>
            <input
                className="searchBar"
                type="text"
                placeholder="Pesquisar por código ou descrição..."
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
            />
        <div className="buscaContainer">
                <div className="select-propriedades">
                    <strong>Filtrar por Aplicação:</strong>
                    {Array.from(new Set(aplicacao.map((p) => p.titulo))).map((descricao) => (
                        <label key={descricao} style={{ display: "block" }}>
                            <input
                            type="checkbox"
                            value={descricao}
                            checked={filtrosSelecionados.includes(descricao)}
                            onChange={handleFiltroChange}
                            />
                            {descricao}
                        </label>
                        ))}
                    </div>
                
                <div className="TabelaContainer">
                <table className="Tabela-busca">
                <thead style={{ backgroundColor: '#003366', color: 'white' }}>
                    <tr>
                    <th>Nome</th>
                    <th>Familia</th>
                    <th>Aplicação</th>
                    <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {formulasFiltradas.map(formula => (
                    <tr key={formula.id}>
                        <td>{formula.sistema_titulo}</td>
                        <td>{formula.familia_titulo}</td>
                        <td>{formula.aplicacao_titulo}</td>
                        <td>{formula.descricao}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

            </div>
        </>
    );
  }
  
