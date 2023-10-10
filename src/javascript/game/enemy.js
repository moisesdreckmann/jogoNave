const qtdEnemies = 30
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const timeInterval = 3500
const enemyPositions = new Set()

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
    document.body.appendChild(enemyDiv)

    moveEnemy(enemy, enemyDiv)
}

const moveEnemy = (enemy, enemyDiv) => {
    const currentY = parseFloat(enemy.style.top)
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

export { moveEnemy }
