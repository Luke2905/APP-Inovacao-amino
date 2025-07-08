import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import ReactDOM from "react-dom/client";
import App from '../App.tsx'
import { table } from "console";
import moment from "moment";
import api from "../service/api.ts";
import { Alert } from "react-bootstrap";
import Conteudo from "./conteudo.tsx";


const Login = () => {


    const userInput = useRef();
    const senhaInput = useRef();
    const navigate = useNavigate();

    async function Login() {
        try{

             const response = await api.post('/login', {  //→ Envia os dados para a API
                
                    email: userInput.current.value,
                    senha: senhaInput.current.value

                })

                const { token, usuario, tipo} = response.data;
                localStorage.setItem('token', token) // -> Armazena o token de usuario
                localStorage.setItem('usuario', JSON.stringify(usuario));
                localStorage.setItem('tipo', JSON.stringify(tipo));


                navigate('/home')

        }catch(err){
            alert('Erro ao efetuar Login')
        }
    }

    return(

        <div className="LoginBody">
            <form className="LoginForm" method="post" onSubmit={Login}>
                <label id="HeaderLogin">Login</label><br/>
                <hr />
                <label>Usuario:</label><br/>
                <input type="email" placeholder="Usuario..." required ref={userInput}/><br/>
                <label>Senha: </label><br/>
                <input type="password" placeholder="Senha..." name="" id=""  required ref={senhaInput}/><br/>
                <button type="button" onClick={Login}>Login</button>
            </form>
        </div>


    )
}
export default Login;