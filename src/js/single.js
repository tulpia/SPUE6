import axios from 'axios'
import Smooth from 'smooth-scrolling'
import SplitText from '@js/private/SplitText.js'
import { TweenMax, TimelineLite, Expo } from 'gsap'

document.addEventListener('DOMContentLoaded', (e) => {
  const section = document.querySelector('.single')
      
    if (section) {
      const smooth = new Smooth({
        native: true,
        section: section,
        ease: 0.07,
        noscrollbar: false
    })
        
    smooth.init()
  }

  let formData
  let infoBtn
  let date
  const empruntBtn = document.querySelector('.onEmprunt')
  const rendreBtn = document.querySelector('.onRendu')
  const textFeedback = document.querySelector('.after_text')
  const objFeedback = {
    renduText: "Merci d'avoir rendu ce livre",
    empruntText: "Le livre a été emprunté, Merci!"
  }

  // Requete pour emprunter un livre
  if (empruntBtn) {
    empruntBtn.addEventListener('click', (e) => {
      e.preventDefault()
      formData = new window.FormData()
      infoBtn = empruntBtn.getAttribute('data-name')
      date = new Date().toJSON().slice(0,10).replace(/-/g,'-')
      
      formData.set('id', infoBtn)
      formData.set('date', date)
      
      for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
      }
  
      axios({
        method: 'post',
        url: 'controller_single.php',
        data: formData
      })
      .then((response) => {
        console.log(response)
        empruntBtn.classList.add('hidden')
        textFeedback.innerHTML = objFeedback.empruntText
        textFeedback.classList.add('active')
      })
    })
  }

  if (rendreBtn) {
    rendreBtn.addEventListener('click', (e) => {
      e.preventDefault()
      formData = new window.FormData()
      infoBtn = rendreBtn.getAttribute('data-name')
      date = new Date().toJSON().slice(0,10).replace(/-/g,'-')
      
      formData.set('id', infoBtn)
      formData.set('date', date)
      
      for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
      }
  
      axios({
        method: 'post',
        url: 'controller_single_rendre.php',
        data: formData
      })
      .then((response) => {
        console.log(response)
        rendreBtn.classList.add('hidden')
        textFeedback.innerHTML = objFeedback.renduText
        textFeedback.classList.add('active')
      })
    })
  }

  // Animations
  const beforeTitle = document.querySelector('.before--main-title')
  const title = new SplitText(document.querySelector('.title-container__title'), {type: 'chars'})
  const appearAfter = document.querySelectorAll('.appearSingle')

  let tl = new TimelineLite({paused: true})

    tl.from(beforeTitle, 0.6, {
      y: 10,
      opacity: 0
    })
    .staggerFrom(title.chars, 0.8, {
      y: 80
    }, 0.03, '-=0.4')
    .staggerFrom(appearAfter, 1, {
      y: 20,
      opacity: 0
    }, 0.05, '-=0.8')

  setTimeout(() => {
    tl.play()
  }, 200)
})