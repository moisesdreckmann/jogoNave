import Nave from "../game/Nave.js"

const escolhas = Nave.values.escolhas
const audio = document.getElementById('audioChoose')
let naveEscolhida = null

escolhas.forEach(radio => {
    radio.addEventListener("change", () => {
        audio.play()
        naveEscolhida = escolherNave()     
        localStorage.setItem('naveEscolhida', naveEscolhida)
    })
})

function escolherNave() {
    if (escolhas[0].checked) {
        naveEscolhida = Nave.view.nave1
    } else if (escolhas[1].checked) {
        naveEscolhida = Nave.view.nave2
    } else if (escolhas[2].checked) {
        naveEscolhida = Nave.view.nave3
    }
    return naveEscolhida
}

export { naveEscolhida }
