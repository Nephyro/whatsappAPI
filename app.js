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

// Endpoints

// Endpoint para retornar as informações de um usuário específico para poder alterar
app.get('/v1/whatsapp/user/:numero', function(request, response){
    let numero = request.params.numero

    let resposta = funcoesApi.getInfoUsuario(numero)

    if(resposta){
        response.status(200)
        response.json(resposta)
    }else{
        response.status(404)
        response.json({message: 'Usuário não encontrado'})
    }
})

// Endpoint para retornar as informações dos contatos de um usuário específico
app.get('/v1/whatsapp/user/:numero/contacts', function(request, response){
    let numero = request.params.numero

    let resposta = funcoesApi.getUserContatos(numero)

    if(resposta){
        response.status(200)
        response.json(resposta)
    }else{
        response.status(404)
        response.json({message: 'Usuário não encontrado'})
    }
})

// Endpoint para retornar as mensagens de um usuário específico
app.get('/v1/whatsapp/user/:numero/messages', function(request, response){
    let numero = request.params.numero

    let resposta = funcoesApi.getMessagesUsuario(numero)

    if(resposta){
        response.status(200)
        response.json(resposta)
    }else{
        response.status(404)
        response.json({message: 'Usuário não encontrado'})
    }

})

// Endpoint para retornar as mensagens de um contato específico de um usuário específico, 
// com a opção de pesquisa por palavra-chave
app.get('/v1/whatsapp/user/:numero/contacts/:contato/messages', function(request, response){
    let numero = request.params.numero
    let contatoNome = request.params.contato
    let palavraChave = request.query.search

    if(!numero || !contatoNome) {
        return response.status(400).json({message: 'Parâmetros número e contato são obrigatórios'})
    }

    let resposta

    if(palavraChave){
        resposta = funcoesApi.getPesquisaPorMensagem(numero, contatoNome, palavraChave)
    }else{
        resposta = funcoesApi.getMessage(numero, contatoNome)
    }

    if(resposta){
        response.status(200)
        response.json(resposta)
    }else{
        response.status(404)
        response.json({message: 'Usuário ou contato não encontrado'})
    }
    
})

// Endpoint para retornar as informações dos contatos
app.get('/v1/whatsapp/', function(request, response){
    let resposta = funcoesApi.getInfoContatos()

    if(resposta){
        response.status(200)
        response.json(resposta)
    }
})

app.get('/v1/whatsapp/help', function(request, response){
    let docAPI = {
        "API-description": "API para consulta de mensagens e contatos do WhatsApp",
        "Date": "2026-04-13",
        "Developer": "Anderson Ribeiro",
        "Version": "1.0",
        "Endpoints": [
            {   "id": 1,
                "Rota 1": "/v1/whatsapp/",
                "obs": "Retorna as informações dos contatos"
            },
            {   "id": 2,
                "Rota 2": "/v1/whatsapp/user/:numero",
                "obs": "Retorna as informações de um usuário específico para poder alterar"
            },
            {   "id": 3,
                "Rota 3": "/v1/whatsapp/user/:numero/contacts",
                "obs": "Retorna as informações dos contatos de um usuário específico"
            },
            {   "id": 4,
                "Rota 4": "/v1/whatsapp/user/:numero/messages",
                "obs": "Retorna as mensagens de um usuário específico"
            },
            {   "id": 5,
                "Rota 5": "/v1/whatsapp/user/:numero/contacts/:contato/messages",
                "obs": "Retorna as mensagens de um contato específico de um usuário específico, com a opção de pesquisa por palavra-chave"
            }
        ]
    }

    response.status(200)
    response.json(docAPI)
})

app.get('/', function(request, response){
    response.redirect('/v1/whatsapp/help')
})

app.listen(8080, function(){
    console.log('Servidor rodando na porta 8080')
})