import axios from 'axios'
import Smooth from 'smooth-scrolling'
import SplitText from '@js/private/SplitText.js'
import { TweenMax, TimelineLite, Expo } from 'gsap'
import scrollMonitor from 'scrollmonitor'

document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll
  const section = document.querySelector('.home')

  if (section) {
    const smooth = new Smooth({
        native: true,
        section: section,
        ease: 0.07,
        noscrollbar: false
      })
      
    smooth.init()

    // Requetes de filtrage
    const filtres = document.querySelectorAll('.legende p a')
    const filtreContainer = document.querySelector('.block-liste__container')
    let filtreInside
    let formData

    // fonction pour creer des elements
    function createElements(content) {
      // création du container
      let createContainerLink = document.createElement('a')
      createContainerLink.className = 'item-link'
      createContainerLink.href = 'single.php?id=' + content.id
      
      // création du container
      let createContainer = document.createElement('div')
      createContainer.className = 'block-liste__item-container'

      // Création du number
      let createNumber = document.createElement('p')
      createNumber.className = 'item-container__number'
      createNumber.innerHTML = content.id
      createContainer.appendChild(createNumber)

      // création du titre
      let createTitle = document.createElement('p')
      createTitle.className = 'item-container__title'
      createTitle.innerHTML = content.titre
      createContainer.appendChild(createTitle)

      // création de la categorie
      let createCategorie = document.createElement('p')
      createCategorie.className = 'item-container__categorie'
      createCategorie.innerHTML = content.categorie
      createContainer.appendChild(createCategorie)

      // création de la dispo
      let createRendu = document.createElement('p')
      createRendu.className = 'item-container__date-rendu'
      createRendu.innerHTML = content.date_rendu
      createContainer.appendChild(createRendu)

      // création de la date emprunt
      if (content.date_emprunt) {
        let createDate = document.createElement('p')
        createDate.className = 'item-container__date-emprunt'
        createDate.innerHTML = content.date_emprunt
        createContainer.appendChild(createDate)
      }

      createContainerLink.appendChild(createContainer)
      filtreContainer.appendChild(createContainerLink)
    }

    if (filtres) {
      for (let filtre of filtres) {
        filtre.addEventListener('click', (e) => {
          e.preventDefault()
          filtreInside = filtre.getAttribute('data-name')
          formData = new window.FormData()
          formData.set('filtre', filtreInside)
          console.log(filtreInside)

          // requete axios
          axios({
            method: 'post',
            url: 'controller.php',
            data: formData
          })
          .then((response) => {
            filtreContainer.innerHTML = ''
            for (let reponse of response.data.items) {
              createElements(reponse)
            }
          })
        })
      }
    }

    // si l'user a pas scroll dans les 5 secondes qui suivent
    const scrollAid = document.querySelector('.scroll-aid')
    let headerFlag = true
    setTimeout(() => {
      if (window.pageYOffset < 100) {
        scrollAid.classList.add('active')
      }
      if (headerFlag) {
        window.addEventListener('scroll', () => {
          if (scrollAid.classList.contains('active')) {
            scrollAid.classList.remove('active')
            return headerFlag = false
          } else {
            return headerFlag = false
          }
          console.log(headerFlag)
        })
      } else {
        return headerFlag = false
      }
    }, 3000)

    // Animations
    const title = new SplitText(document.querySelector('.block-introduction h1'), {type: 'chars'})
    const subTitle = new SplitText(document.querySelector('.block-introduction .outline'), {type: 'chars'})
    const headerItems = document.querySelectorAll('.fadein')
    const itemsLivre = document.querySelectorAll('.appearAccueil')
    const blockList = document.querySelector('.block-liste__container')
    const blockListWatcher = scrollMonitor.create(blockList, -300)

    let tl = new TimelineLite({paused: true})

    tl.staggerFrom(title.chars, 0.8, {
      y: 80
    }, 0.03)
      .staggerFrom(subTitle.chars, 0.7, {
        y: 80
      }, 0.03, '-=0.8')
      .staggerFrom(headerItems, 0.6, {
        y: -40,
        opacity: 0
      }, 0.1, '-=0.2')

    setTimeout(() => {
      tl.play()
    }, 200)

    let tlScroll = new TimelineLite({paused: true})
    tlScroll.staggerFrom(itemsLivre, 0.6, {
      y: 50,
      opacity: 0
    }, 0.1)

    blockListWatcher.enterViewport(function () {
      tlScroll.play()
    })
  }
})
