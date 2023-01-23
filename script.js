let nameUsers = []

let mensagem = []



function nomeColocado() {
    // Vai ser perguntado o nome do usuario para ser salvo
    const nomeDoUsuario = prompt('Qual o seu nome')
    if (nomeDoUsuario === '') {
        alert('Por favor digite seu nome')
        return nomeColocado()
    } else {
        nameUsers.push({ name: nomeDoUsuario })
        console.log(nameUsers)
    }

    //saveUsers()
}
nomeColocado()

function saveUsers() {

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nameUsers)

    promise.then(respostaLogin)
    promise.catch(erroLogin)

}

function respostaLogin() {

    mostrarStatus()
    setInterval(mostrarStatus, 5000)

    mostrarMensagens()
    setInterval(mostrarMensagens, 3000)

    loadUsuarios()
    setInterval(loadUsuarios, 10000)

}

function erroLogin(error) {

    console.log(error.response)
    if (error.response.status === 400) {
        alert('Lamento, porém esse nome ja esta sendo usado. Por favor escolha outro!!')
        window.location.reload()
    }
    if (error.response.status === 404) {
        alert('Erro 404 Not Found... Tente novamente mais tarde')
        windon.location.reload()
    }
}


function mostrarStatus() {

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nameUsers)

    promise.then(statusAtivado)
    promise.catch(statusDesativado)
}

function statusAtivado() {
    console.log('Usuario conectado')
}

function statusDesativado() {
    console.log('Erro na conexão do Usuario!')
}


function mostrarMensagens() {

    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promise.then(mensagensEncontradas)
    promise.catch(() => window.location.reload())

}

function loadUsuarios() {

    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')
    promise.then(loadEncontrado)
    promise.catch(loadNaoEncontrado)
}

function loadEncontrado(){

    usuario = response.data
}

function loadNaoEncontrado(){

    alert('Usuários procurados nao encontrados')
    window.location.reload()
}


function mensagensEncontradas(){

    

}











function sideBarAbrir() {

    const abrir = document.querySelector('.containerPrincipal .menu')
    abrir.classList.toggle('escondido')
    console.log(abrir)

}