const valorLocalStorage = localStorage.getItem('naveEscolhida');
const audioTiro = new Audio('../assets/audios/tiros.mp3');
const containerImg = document.querySelector('.containerImg');

function tirosSrc() {
    let tiro = new Image()
    if (valorLocalStorage == '../assets/images/naves/nave1.png') {
        tiro.src = '../assets/images/tiros/blue.png'
    } else if (valorLocalStorage == '../assets/images/naves/nave2.png') {
        tiro.src = '../assets/images/tiros/red.png'
    } else {
        tiro.src = '../assets/images/tiros/yellow.png'
    }
    return tiro
}

function criarNovoTiro(left) {
    const tiro = tirosSrc()
    tiro.style.top = '35%'
    tiro.style.left = left
    tiro.className = 'tiros'
    containerImg.appendChild(tiro)
    return tiro
}

function saiuDaTela(tiro) {
    const rect = tiro.getBoundingClientRect()
    return rect.bottom < 0
}

let tirosEmMovimento = []
const velocidadeDoTiro = 1.1

function atualizarPosicaoDosTiros(timestamp) {
    const deltaTempo = ultimoTimestamp ? timestamp - ultimoTimestamp : 0
    ultimoTimestamp = timestamp

    const tirosARemover = []

    tirosEmMovimento.forEach((tiro, index) => {
        const posicaoAtual = parseFloat(getComputedStyle(tiro).top) - (velocidadeDoTiro * deltaTempo)
        tiro.style.top = posicaoAtual + 'px'

        if (saiuDaTela(tiro)) {
            tirosARemover.push(tiro)
        }
    })

    tirosARemover.forEach((tiro) => {
        containerImg.removeChild(tiro)
        tirosEmMovimento = tirosEmMovimento.filter((t) => t !== tiro)
    })

    requestAnimationFrame(atualizarPosicaoDosTiros)
}

let ultimoDisparo = 0
const atrasoEntreDisparos = 500
let podeAtirar = true

function atirar(event) {
    if (event.key == ' ' && podeAtirar) {
        audioTiro.currentTime = 0
        audioTiro.play()

        let novoTiro1, novoTiro2
        
        if (valorLocalStorage == '../assets/images/naves/nave1.png') {
            novoTiro1 = criarNovoTiro('30%')
            novoTiro2 = criarNovoTiro('65%')
        } else if (valorLocalStorage == '../assets/images/naves/nave2.png') {
            novoTiro1 = criarNovoTiro('28%')
            novoTiro2 = criarNovoTiro('67%')
        } else {
            novoTiro1 = criarNovoTiro('17%')
            novoTiro2 = criarNovoTiro('77%')
        }

        tirosEmMovimento.push(novoTiro1, novoTiro2)
        podeAtirar = false
        setTimeout(() => {
            podeAtirar = true
        }, atrasoEntreDisparos)
    }
}

document.addEventListener('keydown', atirar)

let ultimoTimestamp = 0
requestAnimationFrame(atualizarPosicaoDosTiros)

export { atirar, tirosEmMovimento, criarNovoTiro }
