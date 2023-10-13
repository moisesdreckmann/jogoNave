import { updateScore, scoreContador, formattedScore } from "./enemy"

const displayYouWinMessage = (formattedScore, scoreContador) => {
    const p = document.querySelector('.condicao')
    formattedScore = String(scoreContador).padStart(3, '0')
    if(scoreContador >=0) {
        p.innerHTML = `YOU WIN SCORE: ${formattedScore}`
    } else {
        p.innerHTML = `YOU LOOSE SCORE: ${formattedScore}`
    }  
    setTimeout(() => {
        setInterval(() => {
            p.classList.toggle('condicao')
        }, 500)
    },1000)
    setTimeout(() => {
        window.location.href = '../../../index.html'
    },3500)
}

export default displayYouWinMessage