import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import '../App.css'
import api from "../service/api";
import {motion} from 'framer-motion'; //-> biblioteca para animações
import { div } from "framer-motion/client";

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
    const [mostrarModal, setMostrarModal] = useState(false);
    const [formulaSelecionada, setFormulaSelecionada] = useState(null);
    
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
            const aplicacaoApi = await api.get('/aplicacao')
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

  const limparFiltros = () => {
    setPesquisa(""); // Limpa o campo de pesquisa
    setFiltrosAplicacaoSelecionados([]);
    setFiltrosFamiliaSelecionados([]); 
  };

    async function VisualizarProrpiedades(id) {
      console.log("Buscando fórmula com ID:", id);
      try {
        const response = await api.get(`/formulapropriedades/${id}`);
        setFormulaSelecionada(response.data);
        console.log(response.data)
        setMostrarModal(true);
      } catch (error) {
        console.error("Erro ao buscar fórmula:", error);
        alert("Erro ao buscar fórmula.");
      }
      
    }
  
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
            <button className="limpaFiltro" onClick={() => limparFiltros()}><i className="fa-solid fa-filter-circle-xmark"></i> Limpar Filtros</button>
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
                    <th></th>
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
                    <td>   <i className="fa-solid fa-eye" onClick={() => VisualizarProrpiedades(formula.id)}></i></td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
      {/*---------------------- MODAL DE VISUALIZAÇÃO DE PROPRIEDADES ------------------  */}
                {mostrarModal && formulaSelecionada &&(
                  <div className="VerPropriedades" >
                    <motion.div
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                    <div className="detalhesProp">
                     <span
                      className="close"
                      onClick={() => setMostrarModal(false)}
                    >
                      x
                    </span>
                    <h2>Detalhamento</h2>
                      <label>Nome: </label><br />
                      <input type="text" value={formulaSelecionada.nome} disabled />
                      <hr />
                      <label>Descricão: </label><br />
                      <input style={{width: '35vw'}} type="text" value={formulaSelecionada.descricao} disabled />
                      <hr />
                      <label>Familia: </label>
                      <input type="text" value={formulaSelecionada.familia} disabled />
                      <label> Aplicação: </label>
                      <input type="text" value={formulaSelecionada.aplicacao} disabled />
                      <hr />
                      <label >Revisão: </label>
                      <input type="text" value={formulaSelecionada.revisao} disabled />
                      <label >Data da Revisão: </label>
                      <input type="text" value={formulaSelecionada.dt_revisao} disabled />
                      <hr />
                      <h4>Propriedades</h4>
                    </div>


             {formulaSelecionada.propriedades && formulaSelecionada.propriedades.length > 0 ?(
                <>
              {formulaSelecionada.propriedades.map((comp, index) => (
                   
                <div className="CardPropriedade" key={index}>  
                    <p className="prop">{comp.propriedade}</p>
                    <p  className="v1" style={{fontWeight: 'bold', color: 'red'}}>Valor Min: {comp.valorVariacaoInferior} ↑</p>   
                    <p className="v2" style={{fontWeight: 'bold', color: 'green'}}>Valor Max: {comp.valorVariacaoSuperior} ↓</p>
             </div>
                ))}
                </>   
            ) : (
              <div>
                sem propriedades cadastradas
              </div>
            )}
                </motion.div>
                </div>  
                )}
            </div>
        </>
    );
  }
  
