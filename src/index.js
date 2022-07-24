'use strict';

const {log} = console

const EDITION_FRONT_PREFIX = 'edition',
  EDITION_PREFIX_BACK = 'b',
  FRONT_FOLDER_PREFIX = 'src/assets/',
  DEFAULT_BACK = 'postcard-back-default.jpeg',
  flip_duration = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('--flip-duration')) * 1000;

let flipTimer, isFlipInProgress = false;

document.addEventListener('DOMContentLoaded', ev=>{

  if (location.hash){
    // get edition number from hash which will be used as part of the link
    const editionNumber = location.hash.replace(/#/, '')
    
    const picFront = `${EDITION_FRONT_PREFIX}-${editionNumber}`
    const srcUrl = `${FRONT_FOLDER_PREFIX}${picFront}.jpeg`

    const imageEl = document.querySelector('main #front img')
    imageEl.setAttribute('src', srcUrl)

    const srcUrlBack = `${FRONT_FOLDER_PREFIX}${DEFAULT_BACK}`
    const imageElBack = document.querySelector('main #back img')
    imageElBack.setAttribute('src', srcUrlBack)

  } else {
    // go to the latest one - how?
  }

  const card = document.querySelector('.card')

  card.addEventListener('mouseenter', handleFlip)
  card.addEventListener('mouseleave', handleFlip)
  // for the mobile devices
  card.addEventListener('click', handleFlip)
})

function handleFlip() {
  // prevent enter and leave events happening when mouse movement is too slow and around card edges
  if (isFlipInProgress) return;
  isFlipInProgress = true
  flipTimer = setTimeout(()=>{
    isFlipInProgress = false
  }, flip_duration)

  const front = document.getElementById('front')
  const back = document.getElementById('back')

  front.classList.toggle('flipped')
  back.classList.toggle('flipped')
}