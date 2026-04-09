/* *******************************************************************************
* Objetivo: Arquivo responsável pela criação da API do projeto WhatsApp API
* Data: 08/04/2026
* Autor: Anderson Ribeiro
* Versão: 1.0
* ********************************************************************************/

// Import das depedencias para criar a API
const express = require('express')
const cors = require('cors')

// Criação do objeto app utilizando a classe do express
const app = express()

// Configuração do cors para liberar o acesso a API
const corsOptions = {
    origin: ['*'],
    methods: 'GET',
    allowedHeaders: ['Content-Type', 'Authorization']
}

// Habilitar o cors para a API
app.use(cors(corsOptions))

// Import do arquivo de funções para a API
const funcoesApi = require('./modulo/funcoes.js')

// Endpoint para retornar as informações dos contatos
app.get('/v1/whatsapp/', function(request, response){
    let resposta = funcoesApi.getInfoContatos()

    if(resposta){
        response.status(200)
        response.json(resposta)
    }
})

app.listen(2020, function(){
    console.log('Servidor rodando na porta 2020')
})