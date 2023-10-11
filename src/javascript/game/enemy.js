import { tirosEmMovimento } from './tiros.js';

const qtdEnemies = 30
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const timeInterval = 2000

const enemyPositions = new Set()
const enemyDivs = []
const inimigos = []
const destruction = new Audio('../assets/audios/destruction.mp3')
let score = document.querySelector('.score')
let scoreContador = 0
let formattedScore = String(scoreContador).padStart(4, '0');
score.innerHTML = `Score: ${formattedScore}`;


function updateScore() {
    scoreContador+=100
    let formattedScore = String(scoreContador).padStart(4, '0');
    score.innerHTML = `Score: ${formattedScore}`;
}

const createEnemy = () => {
    let totalEnemys = [1, 2, 3, 4, 5]
    let randomEnemyIndex = Math.floor(Math.random() * totalEnemys.length)
    let randomEnemy = totalEnemys[randomEnemyIndex]
    const enemy = document.createElement("img")
    enemy.src = `../assets/images/enemys/${randomEnemy}.png`
    enemy.className = "enemy"
    let randomX, randomY

    do {
        randomX = getRandomInt(0, screenWidth - 100)
    } while (isPositionTaken(randomX))

    randomY = -100
    enemy.style.left = randomX + "px"
    enemy.style.top = randomY + "px"
    enemyPositions.add(randomX)
    document.body.appendChild(enemy)

    const enemyDiv = document.createElement("div")
    enemyDiv.className = 'circle' 
    const circleSize = 70
    enemyDiv.style.width = `${circleSize}px`
    enemyDiv.style.height = `${circleSize}px`
    enemyDiv.style.position = 'absolute'
    enemyDiv.style.left = `${randomX +10}px`
    enemyDiv.style.top = `${randomY}px`
    enemyDiv.style.background = 'transparent'
    document.body.appendChild(enemyDiv)
    enemyDivs.push(enemyDiv);

    moveEnemy(enemy, enemyDiv)
}

const moveEnemy = (enemy, enemyDiv) => {
    const currentY = parseFloat(enemy.style.top)
    const controlaPos = currentY
    if (currentY < (screenHeight-100)) {
        const newY = currentY + 1
        enemy.style.top = newY + "px"
        enemyDiv.style.top = newY + "px" // Atualizar a posição do círculo
        requestAnimationFrame(() => moveEnemy(enemy, enemyDiv))
    } else {
        const enemyX = parseFloat(enemy.style.left)
        enemyPositions.delete(enemyX)
        enemy.remove()
        enemyDiv.remove()

        if (enemyPositions.size === 0) {
            displayYouWinMessage()
        }
    }
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const isPositionTaken = (x) => {
    return enemyPositions.has(x)
};

let createdEnemies = 0

const createEnemiesLoop = () => {
    if (createdEnemies < qtdEnemies) {
        createEnemy()
        createdEnemies++
        setTimeout(createEnemiesLoop, timeInterval)
    }
}

const displayYouWinMessage = () => {
    const p = document.querySelector('.condicao')
    p.innerHTML = 'YOU WIN'
    setTimeout(() => {
        setInterval(() => {
            p.classList.toggle('condicao')
        }, 500)
    },1000)
    setTimeout(() => {
        window.location.href = '../../../index.html'
    },3500)
}

createEnemiesLoop()

function removeEnemyAndBullet(enemy, enemyDiv, bullet) {
    destruction.currentTime = 0
    destruction.play()
    enemy.remove()

    updateScore()

    // Encontre o índice do inimigo no array e remova-o.
    const enemyIndex = inimigos.indexOf(enemy)
    if (enemyIndex > -1) {
        inimigos.splice(enemyIndex, 1)
    }

    // Remova todas as enemyDivs correspondentes ao inimigo.
    const removedEnemyDivs = enemyDivs.splice(enemyIndex, 1)
    removedEnemyDivs.forEach((enemyDiv) => {
        enemyDiv.remove()
    })

    // Remova o tiro do array de tiros em movimento.
    const bulletIndex = tirosEmMovimento.indexOf(bullet)
    if (bulletIndex > -1) {
        tirosEmMovimento.splice(bulletIndex, 1)
    }

    // Remova o tiro do DOM.
    const containerImg = document.querySelector('.containerImg');
    containerImg.removeChild(bullet)
}


function checkCollisions() {
    const enemies = document.querySelectorAll('.enemy')
    enemies.forEach((enemy, enemyIndex) => {
        const enemyRect = enemy.getBoundingClientRect()

        tirosEmMovimento.forEach((bullet, bulletIndex) => {
            const bulletRect = bullet.getBoundingClientRect();
            
            if (bulletRect.top <= enemyRect.bottom &&
                enemyRect.left <= bulletRect.right &&
                enemyRect.right >= bulletRect.left) {
                removeEnemyAndBullet(enemy, enemyDivs[enemyIndex], bullet)
            }
        })
    })
}
setInterval(checkCollisions, 100)

export { moveEnemy, enemyPositions, checkCollisions, updateScore }
