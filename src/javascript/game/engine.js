import { naveEscolhida } from "../escolhas/escolhaNave.js"
import moverNave from "./movimento.js"

const valorLocalStorage = localStorage.getItem('naveEscolhida')

document.addEventListener('DOMContentLoaded', () => {
    const nave = document.querySelector('.imgNaveEscolhida')
    nave.src = valorLocalStorage
})

