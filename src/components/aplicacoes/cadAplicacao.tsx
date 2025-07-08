import React, { useState, useRef } from "react"; //-> biblioteca de mascara de input
import axios from "axios";
import Aplicacao from "../../views/aplicacoes/aplicacao";
import api from "../../service/api.ts";
import '../aplicacoes/form.css';
import {motion} from 'framer-motion'; 

function FormCadastroAplicacaco({fecharFormulario}) {

    const inputTitulo = useRef();
    const inputDesc = useRef();

    async function createAplicacao() {
        const NovaAplicacao = await api.post('/criarAplicacao', {

            titulo: inputTitulo.current.value,
            descricao: inputDesc.current.value,
        })

        if(!NovaAplicacao){
            console.log("Nenhuma Aplicação Cadastrada!");
        }else{
            alert(`Nova Aplicação: ${NovaAplicacao.data.titulo}`)
            window.location.reload();
        }
    }
    
    return(
        <div>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
            
            <form className="FormEntrada" action={Aplicacao}>
            <span className="close" onClick={fecharFormulario}>x</span>
            <h2>Cadastro de Aplicações</h2>

            <label>Titulo</label>
            <input id="titulo" type="text" placeholder="Titulo..." required ref={inputTitulo}/>

            <label>Descrição</label>
            <input id="descricao" type="text"placeholder="Descrição..." ref={inputDesc} /><br />

            <input id="enviar" type="button" value="Enviar" onClick={createAplicacao} />
            </form>
            </motion.div>
        </div>
    )
}
function Abriform() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    return (

        <div id="cadButton">
            <i className="fa-solid fa-square-plus" onClick={() => setMostrarFormulario(true)}></i>

            {mostrarFormulario && <FormCadastroAplicacaco fecharFormulario={() => setMostrarFormulario(false)} />}
        </div>
    );
}

export default Abriform;