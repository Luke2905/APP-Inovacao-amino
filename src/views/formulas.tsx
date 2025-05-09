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
  const [mostrarModalEdit, setMostrarModalEdit] = useState(false);
  const [formulaSelecionadaEdit, setFormulaSelecionadaEdit] = useState(null);


  /*---------------------- Função Listar as Formulações ----------------- */
  async function getFormulas() {
    try {
      const formulaApi = await api.get('/formulas');
      setFormulas(formulaApi.data);
      console.log("Sucesso na busca");
    } catch (error) {
      console.error("Erro ao buscar fórmulas:", error);
    }
  }

  useEffect(() => {
    getFormulas();
  }, []);

  /*-------------------------- Função para Deletar uma Formulação --------------- */
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

  /*----------------- Função Para Exibir os Detalhes de uma Formulação ---------------------*/
  async function visualizarFormula(id) {
    console.log("Buscando fórmula com ID:", id);
    try {
      const response = await api.get(`/formula/${id}`);
      setFormulaSelecionada(response.data);
      setMostrarModal(true);
    } catch (error) {
      console.error("Erro ao buscar fórmula:", error);
      alert("Erro ao buscar fórmula.");
    }
  }

  /* -------------------- Função para Editar uma Formulação ----------------------------- */
  async function visualizarFormulaEdit(id) {
    console.log("Buscando fórmula com ID:", id); 
    try {
      const response = await api.get(`/formula/${id}`);
      setFormulaSelecionadaEdit(response.data);
      setMostrarModalEdit(true);
    } catch (error) {
      console.error("Erro ao buscar fórmula:", error);
      alert("Erro ao buscar fórmula.");
    }
  }

      // Atualização/Edição de Formulações
      const [tituloEdit, setTituloEdit] = useState('');
      const [precoEdit, setPrecoEdit] = useState('');
      const [codigoEdit, setCodigoEdit] = useState('');
      const [descricaoEdit, setDescricaoEdit] = useState('');
      const [justificativaEdit, setJustificativaEdit] = useState('');


      useEffect(() => {
        if (formulaSelecionadaEdit) {
          setTituloEdit(formulaSelecionadaEdit.titulo);
          setPrecoEdit(formulaSelecionadaEdit.preco);
          setCodigoEdit(formulaSelecionadaEdit.codigo);
          setDescricaoEdit(formulaSelecionadaEdit.descricao);
          setJustificativaEdit(formulaSelecionadaEdit.justificativa);
        }
      }, [formulaSelecionadaEdit]);

      async function salvarEdicao() {
        try {
          await api.put(`/alterarFormula/${formulaSelecionadaEdit.id}`, {
            titulo: tituloEdit,
            preco: precoEdit,
            codigo: codigoEdit,
            descricao: descricaoEdit,
            justificativa: justificativaEdit
          });
          alert('Fórmula atualizada com sucesso!');
          setMostrarModalEdit(false);
          window.location.reload();
        } catch (err) {
          console.error('Erro ao atualizar fórmula:', err);
          alert('Erro ao atualizar fórmula.');
        }
      }

  /* ------------------------------------ X --------------------------------------- */


  /* -------------------- Barra de pesquisa e Filtros ----------------------------- */
  const formulasFiltradas = formulas.filter(item =>
    (!pesquisa || item.codigo?.toLowerCase().includes(pesquisa.toLowerCase()) ||
      item.titulo?.toLowerCase().includes(pesquisa.toLowerCase()))
  );


  /* ---------------------- Bloco Visual --------------------------------------------- */
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
              <i className="fa-solid fa-pencil" onClick={() => visualizarFormulaEdit(formula.id)}></i>
              <i className="fa-solid fa-trash" onClick={() => deleteFormulas(formula.id)}></i>
            </div>
          ))}
      </div>

      {/* Modal Visualização */}
      {mostrarModal && formulaSelecionada && (
        <div className="VerFormulas">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="close" onClick={() => setMostrarModal(false)}>
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

            <hr />
            <h3 style={{textAlign: 'center'}}>Componentes</h3>
          {formulaSelecionada.componentes && formulaSelecionada.componentes.length > 0 ? (
            // Se a fórmula tiver componentes, renderiza a tabela
            <table className="Tabela-componete">
              <thead>
                <tr>
                  <th>Componente</th>
                  <th>Ordem</th>
                  <th>Proporção</th>
                </tr>
              </thead>
              <tbody>
                {/* Percorre o array de componentes e cria uma linha (tr) para cada componente */}
                {formulaSelecionada.componentes.map((comp, index) => (
                  <tr key={index}>
                    <td>{comp.componente}</td>
                    <td>{comp.ordem}</td>
                    <td>{comp.proporcao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // Caso não existam componentes, mostra uma mensagem informando
            <p style={{ marginTop: '10px', fontStyle: 'italic', color: 'gray' }}>
              Nenhum componente registrado para esta fórmula.
            </p>
          )}

          </motion.div>
        </div>
      )}


            {/* Modal Visualização Editavel */}
            {mostrarModalEdit && formulaSelecionadaEdit && (
        <div className="VerFormulas" >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="close"
              onClick={() => setMostrarModalEdit(false)}
            >
              x
            </span>
            <h2>Alteração de Fórmula</h2>
            <label>Título</label>
            <input type="text" value={tituloEdit} onChange={(e) => setTituloEdit(e.target.value)} />  {/*-> forma de editar os dados das formulações*/}
            <label>Preço</label>
            <input type="number" value={precoEdit} onChange={(e) => setPrecoEdit(e.target.value)} />
            <label>Código</label>
            <input type="number" value={codigoEdit} onChange={(e) => setCodigoEdit(e.target.value)} />
            <label>Descrição</label>
            <input type="text" value={descricaoEdit} onChange={(e) => setDescricaoEdit(e.target.value)} />
            <label>Justificativa</label>
            <input type="text" value={justificativaEdit} onChange={(e) => setJustificativaEdit(e.target.value)} />

            <button id="salvar" onClick={salvarEdicao}>Salvar</button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

  


// formulaSelecionada.componentes && formulaSelecionada.componentes.length > 0
//   ? (/* renderiza tabela */) //-> Se a condição for verdadeira
//   : (/* renderiza mensagem de "nenhum componente" */) //-> se for falsa
