import React, { useState, useRef } from "react"; //-> biblioteca de mascara de input
import axios from "axios";
import Formulas from "../../views/formulas.tsx";
import api from "../../service/api.ts";
import '../formulas/form.css';
import {motion} from 'framer-motion'; //-> biblioteca para animações


/* eslint-disable */
function FormCadastroFormula({fecharFormulario}) {



    const inputNome = useRef(); // -> useRef: referencia um elemento e pega as informações dele
    const inputPreco = useRef();
    const inputCodigo = useRef();
    const inputDescricao = useRef();
    const inputJustificativa = useRef();

    async function createFormulas() { //-> Função para criar/enivar transportadora o backend
     const NovaFormula = await api.post('/novaformula', {
            
                titulo: inputNome.current.value,
                preco: inputPreco.current.value,
                codigo: inputCodigo.current.value,
                descricao: inputDescricao.current.value,
                justificativa: inputJustificativa.current.value,
            })

            if (!NovaFormula) {
                console.log("Nenhuma nova Fórmula cadastrada.");
            } else {
                alert(`Nova Fórmula: ${NovaFormula.data.titulo}`)
                window.location.reload(); 
            }
    
    }

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

                <label>Titulo</label><br/>
                <input id="transportadora_input" type="text" placeholder="Titulo.." required  ref={inputNome} /*-> Ref server para referenciar o elemento a ter os dados coletados*//>

                <label>Preço</label><br/>
                <input id="motorista" type="number" placeholder="Preço..." required ref={inputPreco}/><br />

                <label>Codigo</label><br/>
                <input id="rg" type="number" placeholder="Codigo..." required ref={inputCodigo}/><br />
                <label>Descrição</label><br/>
                <input id="ajudante" type="text" placeholder="Descrição..." required ref={inputDescricao}/><br/>

                <label>Justificativa</label><br/>
                <input id="rg-ajudante" type="text" placeholder="Justificativa..." ref={inputJustificativa}/><br />

                <input id="enviar" type="button" value="Enviar" onClick={createFormulas}/>
            </form>
            </motion.div>
        </div>
    );
}

function Abriform() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    return (

        <div id="cadButton">
            <i className="fa-solid fa-square-plus" onClick={() => setMostrarFormulario(true)}></i>

            {mostrarFormulario && <FormCadastroFormula fecharFormulario={() => setMostrarFormulario(false)} />}
        </div>
    );
}

export default Abriform;