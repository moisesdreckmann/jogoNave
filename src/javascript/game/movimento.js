import { naveEscolhida } from "../escolhas/escolhaNave.js"

const nave = document.querySelector('.imgNaveEscolhida')
const naveContainer = document.querySelector('.containerImg')
const largura = window.innerWidth
const altura = window.innerHeight
let naveX = largura * 0.5
let naveY = altura * 0.8

let velocidade = 250
const limiteEsquerda = 70
const limiteDireita = largura - 80
const limiteSuperior = 70
const limiteInferior = altura - 80
let lastTimestamp = null;

function atualizarPosicao() {
    naveContainer.style.left = naveX + 'px'
    naveContainer.style.top = naveY + 'px'
}

let teclasPressionadas = {}

function moverNave(timestamp) {
    if (!lastTimestamp) {
        lastTimestamp = timestamp
    }

    //ajusta a velocidade em relação a taxa de quadros do navegador
    const deltaTime = timestamp - lastTimestamp 
    
    if ('a' in teclasPressionadas && naveX > limiteEsquerda) {
        naveX -= velocidade * (deltaTime / 1000)
    }
    if ('d' in teclasPressionadas && naveX < limiteDireita) {
        naveX += velocidade * (deltaTime / 1000)
    }
    if ('w' in teclasPressionadas && naveY > limiteSuperior) {
        naveY -= velocidade * (deltaTime / 1000)
    }
    if ('s' in teclasPressionadas && naveY < limiteInferior) {
        naveY += velocidade * (deltaTime / 1000)
    }

    atualizarPosicao()
    lastTimestamp = timestamp;

    requestAnimationFrame(moverNave)
}

document.addEventListener('keydown', (event) => {
    teclasPressionadas[event.key] = true
    requestAnimationFrame(moverNave)
})

document.addEventListener('keyup', (event) => {
    delete teclasPressionadas[event.key]

    if (Object.keys(teclasPressionadas).length === 0) {
        cancelAnimationFrame(moverNave)
    }
})

export default moverNave
