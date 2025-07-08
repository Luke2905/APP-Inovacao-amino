import React from "react";
import ReactDOM from "react-dom/client";
import '../App.css'
import {motion} from 'framer-motion'; //-> biblioteca para animações

const Home =() =>{
  const usuario = JSON.parse(localStorage.getItem('usuario')); // ← Recupera os dados do Usuario

  return(
        <>
        <p style={{fontSize: '2rem', fontWeight: 'bold'}}>Seja Bem vindo (a), {usuario.nome}</p> {/* % Exibe o nome do User logado */}
        <div className="HomeConteudo">
          {/* Item 1 - Produtos */}
          <div className="item-1">
            <h1 id="noticia-titulo">Novas Formulações!!!</h1>
            <div className="lista-prod">
            <div className="prod-item">
                <img className="icon-prod" src="https://cdn-icons-png.flaticon.com/512/9809/9809521.png" alt="Produto" />
                <div className="prod-desc">AMIPOL BVE 2255 - POLIOL FORMULADO PARA BLOCO DE ESPUMA VISCOELÁSTICO D50 (I=75)</div>
            </div>

            <div className="prod-item">
                <img className="icon-prod" src="https://cdn-icons-png.flaticon.com/512/9809/9809521.png" alt="Produto" />
                <div className="prod-desc">AMIPLAST PCO 21708 - PLASTISOL PARA REVESTIMENTO</div>
            </div>

            <div className="prod-item">
                <img className="icon-prod" src="https://cdn-icons-png.flaticon.com/512/9809/9809521.png" alt="Produto" />
                <div className="prod-desc">AMIPLAST PCO 21708 - PLASTISOL PARA REVESTIMENTO</div>
            </div>

            <div className="prod-item">
                <img className="icon-prod" src="https://cdn-icons-png.flaticon.com/512/9809/9809521.png" alt="Produto" />
                <div className="prod-desc">AMIPLAST PCO 21708 - PLASTISOL PARA REVESTIMENTO</div>
            </div>
            {/* <!-- Adicione mais aqui se quiser testar scroll --> */}
            </div>
          </div>

          {/* Item 2 - Notícias */}
          <div className="item-2">
            <div className="news-card">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D22AQFVRwNnfI6RIw/feedshare-shrink_800/feedshare-shrink_800/0/1722925888194?e=1730937600&v=beta&t=99RHiPZyHdydqwEz73eDlukko6PLTzleEP597NtZksE"
                alt="Imagem da Notícia 1"
              />
              <div className="news-card-content">
                <h3>Participação da AMINO na Utech Middle East 2024</h3>
                <p>
                  No mês de setembro participamos da Utech Middle East 2024 venha conferir mais detalhes
                </p>
                <a
                  href="https://www.linkedin.com/posts/aminoquimica_amino-na-utech-dubai-2024-activity-7240420128444583937-XZXI?utm_source=share&utm_medium=member_desktop"
                  target="_blank"
                >
                  Leia mais
                </a>
              </div>
            </div>

            <div className="news-card">
              <img src="imagens/image.png" alt="Imagem da Notícia 2" />
              <div className="news-card-content">
                <h3>Sistema Viscoelástico Base TDI</h3>
                <p>
                  A Amino, buscando atender as principais normas técnicas e oferecendo o que há de melhor em Sistemas de PU para um produto final de qualidade, traz mais uma solução completa da AminoLab:
                </p>
                <a
                  href="https://www.linkedin.com/posts/aminoquimica_sistema-viscoel%C3%A1stico-base-tdi-activity-7241522801277362180-Y8sk?utm_source=share&utm_medium=member_desktop"
                  target="_blank"
                >
                  Leia mais
                </a>
              </div>
            </div>
          </div>
        </div>
        </>
        )
 
}

export default Home;
