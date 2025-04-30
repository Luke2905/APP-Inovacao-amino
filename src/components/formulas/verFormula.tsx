import React, { useState, useRef, useEffect } from "react"; //-> biblioteca de mascara de input
import axios from "axios";
import Formulas from "../../views/formulas.tsx";
import api from "../../service/api.ts";
import '../formulas/form.css';
import {motion} from 'framer-motion'; //-> biblioteca para animações


/* eslint-disable */
function VisualizarFormula({ id, fecharFormulario })  {
    const [formulas, setFormulas] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [loading, setLoading] = useState(true);


    async function getFormulas(id) {
        try {
          const response = await api.get(`/formula/${id}`);
          setFormulas(response.data);
        } catch (error) {
          console.error("Erro ao buscar fórmula:", error);
          alert("Erro ao buscar fórmula.");
        }
      }

  
            useEffect(() => {
            if (id) {
                getFormulas(id);
            }
            }, [id]);



    return (
        <div className="FormEntrada">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <form action={Formulas}>
                <span className="close"  onClick={fecharFormulario}>x</span>
                <h2>Cadastro de Formulações</h2>
                {formulas && (
                    <div key={formula.id}>
                        <label>Titulo</label><br />
                        <input type="text" value={formula.titulo} disabled />
                        
                        <label>Preço</label><br />
                        <input type="number" value={formula.preco} disabled /><br />
                        
                        <label>Codigo</label><br />
                        <input type="number" value={formula.codigo} disabled /><br />
                        
                        <label>Descrição</label><br />
                        <input type="text" value={formula.descricao} disabled /><br />

                        <label>Justificativa</label><br />
                        <input type="text" value={formula.justificativa} disabled /><br />
                    </div>
                    )}
            </form>
            </motion.div>
        </div>
    );
}

function Abriform() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [formulaIdSelecionada, setFormulaIdSelecionada] = useState(null);

    return (

        <div id="verForm">
            <i className="fa-solid fa-eye" onClick={() => setMostrarFormulario(true)}></i>

            {mostrarFormulario && <VisualizarFormula id={formulas.id} fecharFormulario={() => setMostrarFormulario(false)} />}
        </div>
    );
}

export default Abriform;