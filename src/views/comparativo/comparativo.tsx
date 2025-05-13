import React, { useState, useEffect } from "react";
import api from "../../service/api";
import './comparativo.css';
import "../../App.css";
import { motion, transform } from 'framer-motion';
import { div } from "framer-motion/client";

const Comparativo = () => {
  const [formulasDisponiveis, setFormulasDisponiveis] = useState([]);
  const [formulasComparadas, setFormulasComparadas] = useState([]);
  const [idsSelecionados, setIdsSelecionados] = useState([]);

  // Carrega todas as fórmulas (apenas id e nome para exibir os checkboxes)
  async function getFormulas() {
    try {
      const response = await api.get('/busca');
      setFormulasDisponiveis(response.data);
    } catch (error) {
      console.error("Erro ao buscar fórmulas:", error);
    }
  }

  // Atualiza as fórmulas comparadas com base nas selecionadas
  useEffect(() => {
    async function fetchComparacoes() {
      const novasFormulas = [];

      for (const id of idsSelecionados) {
        try {
          const response = await api.get(`/formulapropriedades/${id}`);
          novasFormulas.push(response.data);
        } catch (error) {
          console.error(`Erro ao buscar dados da fórmula ${id}:`, error);
        }
      }

      setFormulasComparadas(novasFormulas);
    }

    if (idsSelecionados.length > 0) {
      fetchComparacoes();
    } else {
      setFormulasComparadas([]);
    }
  }, [idsSelecionados]);

  useEffect(() => {
    getFormulas();
  }, []);

    const limparFiltros = () => {
    setIdsSelecionados([]);
  };

  // Manipula seleção de fórmula via checkbox
  const handleCheckboxChange = (id) => {
    setIdsSelecionados(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  // Propriedades únicas para montar linhas
  const propriedadesUnicas = [
    ...new Set(formulasComparadas.flatMap(f => f.propriedades.map(p => p.propriedade)))
  ];

  return (
    <div className="BodyComparador">
       <h2 >Comparativo de Propriedades</h2>
    <button className="limpaFiltro" onClick={() => limparFiltros()} ><i className="fa-solid fa-filter-circle-xmark"></i> Limpar Filtros</button>
    <div className="comparador-container">
      {/* Checkboxes de seleção */}
      <div className="select-formulas">
        <strong>Selecionar Fórmulas para Comparar:</strong>
        <div className="select">
          {formulasDisponiveis.map(f => (
            <label key={f.id} className="checkbox-container">
              <input
                type="checkbox"
                value={f.id}
                checked={idsSelecionados.includes(f.id)}
                onChange={() => handleCheckboxChange(f.id)}
              />
              <span className="checkmark"></span>
              {f.sistema_titulo}
            </label>
          ))}
        </div>
        <hr />
      </div>

      {/* Tabela de Comparação */}
      <div className="tabela-comparativa">
        <table className="Comparativos">
          <thead>
            <tr>
              <th>Propriedade</th>
              {formulasComparadas.map((f, i) => (
                <th key={i}>{f.nome}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {propriedadesUnicas.map((prop, idx) => (
              <tr key={idx}>
                <td>{prop}</td>
                {formulasComparadas.map((f, fi) => {
                  const p = f.propriedades.find(x => x.propriedade === prop);
                  if (!p) return <td key={fi}>N/A</td>;

                  const inferior = parseFloat(p.valorVariacaoInferior);
                  const superior = parseFloat(p.valorVariacaoSuperior);
                  const range = superior + 100;

                  return (
                    <td key={fi}>
                      <div className="progress-container">
                        <div
                          className="progress-bar"
                          style={{
                            left: `${(inferior / range) * 100}%`,
                            width: `${((superior - inferior) / range) * 100}%`
                          }}
                        />
                        <span className="range-text">{inferior} - {superior}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Comparativo;
