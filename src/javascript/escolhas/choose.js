import {naveEscolhida} from "./escolhaNave.js"

const btnStart = document.querySelector('.btnStart')
const message = document.querySelector('.messageChoose')
const loader = document.querySelector('.containerLoader')

btnStart.addEventListener('click', (event) => {
    const audioStart = document.querySelector('.audioStart')
    if (naveEscolhida != null) {
        audioStart.play()
        btnStart.style.display = 'none'
        loader.style.display = 'flex'
        message.innerHTML = 'O seu jogo já está começando!'
        message.style.color = 'white'

        setTimeout(() => {
            window.location.href = `game.html`
        }, 3500)
    } else {
        event.preventDefault()
    }
})
