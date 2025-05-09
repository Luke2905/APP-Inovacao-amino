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
    const [familia, setFamilia] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [filtrosAplicacaoSelecionados, setFiltrosAplicacaoSelecionados] = useState([]);
    const [filtrosFamiliaSelecionados, setFiltrosFamiliaSelecionados] = useState([]);
    

    function handleFiltroAplicacaoChange(event) { //handle para filtro de aplicações
        const { value, checked } = event.target;
        if (checked) {
          setFiltrosAplicacaoSelecionados(prev => [...prev, value]);
        } else {
          setFiltrosAplicacaoSelecionados(prev => prev.filter(filtro => filtro !== value));
        }
      }

    function handleFiltroFamiliaChange(event) { //handle para fitro de familias
        const { value, checked } = event.target;
        if (checked) {
          setFiltrosFamiliaSelecionados(prev => [...prev, value]);
        } else {
          setFiltrosFamiliaSelecionados(prev => prev.filter(filtro => filtro !== value));
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


     async function getFamilia() {
        try {
            const familiaApi = await api.get('/familias')
            setFamilia(familiaApi.data)   //-> seleciona apenas o campo data da requisiçao do backend
            console.log("Sucesso na busca")
            }catch(error){
                console.error("Erro ao buscar aplicações:", error);
            }
     }

  
    useEffect(() => {
      getFormulas();
      getAplicacao();
      getFamilia();
    }, []);

    
  
    const formulasFiltradas = formulas.filter(item => {
        const pesquisaOk = !pesquisa || 
          item.sistema_titulo?.toLowerCase().includes(pesquisa.toLowerCase()) ||
          item.familia_titulo?.toLowerCase().includes(pesquisa.toLowerCase());
      
        const filtroAplicacaoOk = filtrosAplicacaoSelecionados.length === 0 || (
          item.aplicacao_titulo && filtrosAplicacaoSelecionados.includes(item.aplicacao_titulo)
        );
      
        const filtroFamiliaOk = filtrosFamiliaSelecionados.length === 0 || (
          item.familia_titulo && filtrosFamiliaSelecionados.includes(item.familia_titulo)
        );
      
        return pesquisaOk && filtroAplicacaoOk && filtroFamiliaOk;
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
            <strong style={{textAlign: 'center'}}>Filtrar por Familia:</strong>
            <div className="select-familias">
                    {Array.from(new Set(familia.map((p) => p.titulo))).map((descricao) => (
                         <label key={descricao} className="checkbox-container" style={{ display: "block" }}>
                            <input
                            type="checkbox"
                            value={descricao}
                            checked={filtrosFamiliaSelecionados.includes(descricao)}
                            onChange={handleFiltroFamiliaChange}
                            />
                             <span className="checkmark"></span>
                            {descricao}
                        </label>
                        ))}
                    </div>
                    <hr />
                    <strong>Filtrar por Aplicação:</strong>
            <div className="select-aplicacao">
                    {Array.from(new Set(aplicacao.map((p) => p.titulo))).map((descricao) => (
                        <label key={descricao} className="checkbox-container" style={{ display: "block" }}>
                            <input
                            type="checkbox"
                            value={descricao}
                            checked={filtrosAplicacaoSelecionados.includes(descricao)}
                            onChange={handleFiltroAplicacaoChange}
                            />
                            <span className="checkmark"></span>
                            {descricao}
                        </label>
                        ))}
                    </div>
                    <hr />
                    
            </div>
        
                
                
                <div className="TabelaContainer">
                <table className="Tabela-busca">
                <thead >
                    <tr>
                    <th>Nome</th>
                    <th>Familia</th>
                    <th>Aplicação</th>
                    <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                {formulasFiltradas
                .sort((a, b) => a.sistema_titulo.localeCompare(b.sistema_titulo))
                .map(formula => (
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
  
