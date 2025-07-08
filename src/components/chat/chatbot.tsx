import React, { useState, useRef } from "react"; //-> biblioteca de mascara de input
import axios from "axios";
import api from "../../service/api.ts";
import '../chat/chat.css';
import {motion} from 'framer-motion';
import "./chat.css"


const ChatCopilot = ({ gridRef }) => {
  const [chatVisible, setChatVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [dadosEnviados, setDadosEnviados] = useState(false);
  const [history, setHistory] = useState([]);

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

    const handleSubmit = async () => {
      setLoading(true);

      const payload = {
        pergunta: inputText,
      //  dadosTabela: null // ou remova se a API não exigir
      };

      console.log("Mensagem Enviada:", payload);

      try {
        const resp = await fetch('/api/webhook/chat-rag', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pergunta: inputText })
        });

        if (!resp.ok) throw new Error('Erro ao obter resposta')
          else {

          const data = await resp.json(); //← Recebe a resposta da API

          console.log(data)

         const textoResposta = Array.isArray(data) ? data[0].resposta : data.response || data.resposta; //← Tratamento para o array da respost

          {/*← Salva histórico de interação*/}
            setHistory(prev => [  
              ...prev,
              { prompt: inputText, response: textoResposta}
            ])

        
          }

      //const textoResposta = Array.isArray(data) ? data[0].resposta : data.response; //← Tratamento para o array da respost

      {/* Armazena o texto para enviar  */}
      setInputText('');
      } catch (err) {
        console.error('❌ Erro ao enviar pergunta:', err);
      } finally {
        setLoading(false);
      }
    };

  
  const handleClear = () => {  //← Limpa o histórico de interação
    setHistory([]);
    setDadosEnviados(false);
  };


  /*-------------- Bloco Visual do Chatbot ↓ --------------------- */
  return (
    <div>
      <button id='chatbot-botton' onClick={toggleChat}>
        {chatVisible ? 'Fechar Chat' : 'Abrir Chat IA'}
      </button>

      {chatVisible && (
        <div className="chat-box">
          <div className="chat-history">
            {history.map((item, idx) => (
              <div key={idx} className="chat-message">
                <strong>Você:</strong> {item.prompt}
                <br />
                <strong>IA:</strong> {item.response}
              </div>
            ))}
          </div>

          <textarea
           style={{width: '100%'}}
            rows={3}
            placeholder="Digite sua pergunta..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          /><br></br>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
          <button onClick={handleClear}>Limpar Histórico</button>
        </div>
      )}
    </div>
  );
};

export default ChatCopilot;