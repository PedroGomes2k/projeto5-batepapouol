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



function mensagensEncontradas(resposta) {
    const mensagem = resposta.data

    let mensagensContainer = document.querySelector('.containerCentral .ul')
    mensagensContainer.innerHTML = ''

    for (let i = 0; i < mensagem.length; i++) {

        switch (mensagem[i].type) {

            case 'status': mensagensContainer.innerHTML += `
            <li data-test="message" class='entrada'>

                <span class='time'>(${message[i].time})</span>
                <strong class='name'>${message[i].from}</strong>
                <span class='text'>${message[i].text}</span> 

             </li>`
                break;
        }

    }

    mensagensContainer.lastChild.srollIntoView()
}

function mandarMensagem() {

    const enviarMensagem = document.querySelector('.rodape .mensagemRodape').value
    document.querySelector('.rodape .mensagemRodape').value = ''
    if (enviarMensagem === '') {

        return enviarMensagem
    }

    const novamensagem = {
        from: nameUsers.name,
        to: 'Todos',
        text: enviarMensagem,
        type: 'messagem'
    }

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', novamensagem)
    promise.then(mostrarMensagens)
    promise.catch(() => window.location.reload())
}





function sideBarAbrir() {

    const abrir = document.querySelector('.containerPrincipal .menu')
    abrir.classList.toggle('escondido')
    console.log(abrir)

}