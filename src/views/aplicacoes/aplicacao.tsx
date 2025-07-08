import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import '../../App.css'
import '../aplicacoes/aplicacaoStyle.css'
import FormCadastroAplicacao from '../../components/aplicacoes/cadAplicacao'
import api from "../../service/api";
import {motion} from 'framer-motion';
import { div } from "framer-motion/client";

//Elemento de Exibição da pagina de Aplicações ↓
const  Aplicacao =() =>{
    return(
            
            <div className="AplicacaoConteudo">
            <Listar_Aplicacao/>
            </div>
        )
 
}

export default Aplicacao;

function Listar_Aplicacao() {
    const [aplicacoes, setApicacoes] = useState([]);

/*----------------------- Lista Aplicações ------------------ */
async function getAplicacoes() {

    try {
        const aplicacaoApi = await api.get('/aplicacao');
        setApicacoes(aplicacaoApi.data);
        console.log("Busca realizada com sucesso")
    }catch(err){
        console.error("Erro na busca", error);
    }
}

 useEffect(() => {
    getAplicacoes();
  }, []);
/*----------------------- X ------------------------------------ */

/* -------------------- Deletar Aplicações ----------------------- */
async function deleteAplicacao(id) {
    try{
        const response = await api.delete(`/deletarAplicacao/${id}`);
        alert(`Aplicação deletada: ${response.data.titulo}`);
        window.location.reload();

    }catch(err){
      console.error("Erro ao deletar aplicacao:", error);
      alert("Erro ao deletar aplicação.");
    }
    
}
/*----------------------- X ------------------------------------ */
/*-------------------- -- Bloco Visual--------------------------- */
return(
<div className="lista-aplicacao" style={{padding: "10px"}}>
        <h2>Aplicações</h2>
        <FormCadastroAplicacao/>

    <div className="cardContainer">
        {aplicacoes.map(aplicacao => (
            <div key={aplicacao.id} className="Card-Aplicacao">
                <p>{aplicacao.titulo}</p>
                <i className="fa-solid fa-trash" onClick={() => deleteAplicacao(aplicacao.id)}></i>
            </div>
        ))}
    </div>

</div>
)


}