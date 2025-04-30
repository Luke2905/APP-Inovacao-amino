import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import '../App.css'
import api from "../service/api";
import FormCadastroFormula from "../components/formulas/cadFormula";
import VisualizarFormula from "../components/formulas/verFormula";
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
  const [mostrarModal, setMostrarModal] = useState(false);
  const [formulaSelecionada, setFormulaSelecionada] = useState(null);

  async function getFormulas() {
    try {
      const formulaApi = await api.get('/formulas');
      setFormulas(formulaApi.data);
      console.log("Sucesso na busca");
    } catch (error) {
      console.error("Erro ao buscar fórmulas:", error);
    }
  }

  async function deleteFormulas(id) {
    try {
      const response = await api.delete(`/deletarFormula/${id}`);
      alert(`Fórmula deletada: ${response.data.titulo}`);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao deletar fórmula:", error);
      alert("Erro ao deletar fórmula.");
    }
  }

  async function visualizarFormula(id) {
    console.log("Buscando fórmula com ID:", id); // <-- ADICIONE ISSO
    try {
      const response = await api.get(`/formula/${id}`);
      setFormulaSelecionada(response.data);
      setMostrarModal(true);
    } catch (error) {
      console.error("Erro ao buscar fórmula:", error);
      alert("Erro ao buscar fórmula.");
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

      <FormCadastroFormula />

      <div className="CardContainer">
        {formulasFiltradas
          .sort((a, b) => a.titulo.localeCompare(b.titulo))
          .map(formula => (
            <div key={formula.id} className="CardFormula">
              <h3>{formula.titulo}</h3>
              <p>{formula.descricao}</p>
              <i className="fa-solid fa-eye" onClick={() => visualizarFormula(formula.id)}></i>
              <i className="fa-solid fa-pencil"></i>
              <i className="fa-solid fa-trash" onClick={() => deleteFormulas(formula.id)}></i>
            </div>
          ))}
      </div>

      {/* Modal Visualização */}
      {mostrarModal && formulaSelecionada && (
        <div className="VerFormulas" >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="close"
              onClick={() => setMostrarModal(false)}
            >
              x
            </span>
            <h2>Detalhes da Fórmula</h2>
            <label>Título</label>
            <input type="text" value={formulaSelecionada.titulo} disabled />
            <label>Preço</label>
            <input type="number" value={formulaSelecionada.preco} disabled />
            <label>Código</label>
            <input type="number" value={formulaSelecionada.codigo} disabled />
            <label>Descrição</label>
            <input type="text" value={formulaSelecionada.descricao} disabled />
            <label>Justificativa</label>
            <input type="text" value={formulaSelecionada.justificativa} disabled />
          </motion.div>
        </div>
      )}
    </div>
  );
}

  
