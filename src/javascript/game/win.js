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

export default displayYouWinMessage