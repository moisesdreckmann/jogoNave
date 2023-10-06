let btnIntro = document.querySelector('.btnIntro')
const iconJs = document.querySelector('.footerIcon')
const p = document.querySelector('.footerTitle')
const jogarTitle = document.querySelector('.howDoIPlayTitle')
const jogarDescricao = document.querySelector('.howDoIPlayDescricao')

setTimeout(function(){
    btnIntro.style.display = "block"
    iconJs.style.display = "block"
}, 2000)

anime({
    targets: iconJs,
    translateX: {
      value: 405,
      duration: 2000
    },
    rotate: {
      value: 360,
      duration: 2100,
      easing: 'easeInOutSine'
    },
    scale: {
      value: 1.5,
      duration: 1600,
      delay: 800,
      easing: 'easeInOutQuart'
    },
    delay: 2000
  });
  
  anime({
    targets: p,
    translateX: ['20', '0'],
    delay: 1500
  });

  btnIntro.addEventListener('click', () => {
      const audio = document.querySelector('.audioStart')
      audio.play()
      btnIntro.disabled = true;
      btnIntro.style.cursor = 'not-allowed'
      
      setTimeout(() => {
        window.location.href = '../src/pages/choose.html'
    }, 2000);
      
  })

jogarTitle.addEventListener('click', () => {
  jogarDescricao.classList.toggle('toogleHowToIPlay')
})
