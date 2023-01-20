const nameUsers = [ ]

const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nameUsers)

promise.then(respostaChegou())

function respostaChegou(resposta){
    console.log(resposta.data)
}


function nomeColocado() {
    // Vai ser perguntado o nome do usuario para ser salvo
    const nomeDoUsuario = prompt('Qual o seu nome')

   nameUsers.push(nomeDoUsuario)

}
nomeColocado()

function mensagemEntrada() {

    // Será feito a mensagem com o nome do usuario inserido nela
    // Ultilizaçao do DOM para buscar qual inforçao necessária
    const mensagem = document.querySelector('.mensagensEntrada')

    mensagem.innerHTML= ` ${nameUsers} entra na sala... `

    mensagem.classList.add('entrada')
}
mensagemEntrada()
