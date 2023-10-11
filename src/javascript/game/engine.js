import { naveEscolhida } from "../escolhas/escolhaNave.js"
import moverNave from "./movimento.js"
import { atirar, tirosEmMovimento} from "./tiros.js"
import { enemyPositions, moveEnemy, checkCollisions, updateScore} from "./enemy.js"

const valorLocalStorage = localStorage.getItem('naveEscolhida')

document.addEventListener('DOMContentLoaded', () => {
    const nave = document.querySelector('.imgNaveEscolhida')
    nave.src = valorLocalStorage
})