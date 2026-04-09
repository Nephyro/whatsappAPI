/* *******************************************************************************
* Objetivo: Arquivo responsável por manipular dados do arquivo contatos.js
* Data: 08/04/2026
* Autor: Anderson Ribeiro
* Versão: 1.0
* ********************************************************************************/

// Importando biblioteca de contatos
const { get } = require('node:http')
const contato = require('./contatos.js')

// Função para retornar as informações dos contatos
function getInfoContatos() {
    let todosUsuarios = []      // Array para armazenar as informações dos usuários

    // Percorre a lista de usuários e extrai as informações necessárias para criar um novo array de objetos
    contato.contatos['whats-users'].forEach(function(user){
        todosUsuarios.push ({
            id: user.id,
            account: user.account,
            nickname: user.nickname,
            createdisince: user['created-since'],
            profileimage: user['profile-image'],
            number: user.number,
            background: user.background,
            // Percorre a lista de contatos de cada usuário e extrai as informações necessárias para criar um novo array de strings
            contacts: user.contacts.map(contact => `${contact.name}: ${contact.description} -> ${contact.messages.map(message => `time: ${message.time} - ${message.sender} - ${message.content}`)}`)
        })
    })

    // Verifica se o array de usuários contém informações e retorna o array ou false caso esteja vazio
    if(todosUsuarios.length > 0) {
        return todosUsuarios
    }else{
        return false
    }
}

// Função para retornar as informações de um usuário específico, recebendo o número do usuário como parâmetro
function getInfoUsuario(numero) {
    // Percorre a lista de usuários e encontra o perfil do usuário com o número correspondente
    let userProfile = contato.contatos['whats-users']
    
    // Utiliza o método find para encontrar o perfil do usuário com o número correspondente e armazena o resultado na variável perfil
    let perfil = userProfile.find(user => user.number == numero)

    // Verifica se o perfil do usuário foi encontrado e retorna um objeto com as informações do usuário ou false caso o perfil não seja encontrado
    if(perfil) {
        return {
            nickname: perfil.nickname,
            profileimage: perfil['profile-image'],
            number: perfil.number,
            background: perfil.background,
            createdisince: perfil['created-since'],
        }
    }else{
        return false
    }
}

// Função para retornar as informações dos contatos de um usuário específico, recebendo o número do usuário como parâmetro
function getUserContatos(numero) {
    let userProfile = contato.contatos['whats-users']

    let perfil = userProfile.find(user => user.number == numero)

    if(perfil) {
        return {
            user: perfil.nickname,
            contacts: perfil.contacts.map(contact => `${contact.name}: ${contact.description} - image: ${contact.image} `)}
    }else{
        return false
    }
}

// Função para retornar as mensagens de um usuário específico, recebendo o número do usuário como parâmetro
function getMessagesUsuario(numero) {
    let userProfile = contato.contatos['whats-users']

    let perfil = userProfile.find(user => user.number == numero)

    if(perfil) {
        return {
            user: perfil.nickname,
            messages: perfil.contacts.map(contact => `${contact.name}: ${contact.description} - image: ${contact.image} - messages: ${contact.messages.map(message => `time: ${message.time} - ${message.sender} - ${message.content}`)}`)}
    }else{
        return false
    }
}

// Função para retornar as mensagens de um contato específico de um usuário específico, recebendo o número do usuário e o nome do contato como parâmetros
function getMessage(numero, contatoNome) {
    let userProfile = contato.contatos['whats-users']

    let perfil = userProfile.find(user => user.number == numero)

    // Verifica se o perfil do usuário foi encontrado e, em caso afirmativo, 
    // procura o contato com o nome correspondente e retorna um objeto com as informações do contato e suas mensagens 
    // ou false caso o contato não seja encontrado 
    if(perfil){
        // Utiliza o método find para encontrar o contato com o nome correspondente e armazena o resultado na variável contato
        let contato = perfil.contacts.find(contact => contact.name == contatoNome)
        // Verifica se o contato foi encontrado e retorna um objeto com as informações do contato e suas mensagens ou false caso o contato não seja encontrado
        if(contato) {
            return {
                user: perfil.nickname,
                contact: contato.name,
                messages: contato.messages.map(message => `time: ${message.time} - ${message.sender} - ${message.content}`)
            }
        }else{
            return false
        }
    }else{
        return false
    }
}

// console.log(getInfoContatos())
// console.log(getInfoUsuario(11987876567));
// console.log(getUserContatos(11987876567));
// console.log(getMessagesUsuario(11987876567));
// console.log(getMessage(11987876567, 'Ana Maria'))


module.exports = {
    getInfoContatos,
    getInfoUsuario,
    getUserContatos,
    getMessagesUsuario,
    getMessage
}