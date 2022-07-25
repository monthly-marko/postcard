'use strict';

const {log} = console

const EDITION_FRONT_PREFIX = 'edition',
  EDITION_PREFIX_BACK = 'b',
  GITHUB_ROOT = 'https://raw.githubusercontent.com/monthly-marko/postcard/master/',
  FRONT_FOLDER_PREFIX = 'src/assets/',
  DEFAULT_BACK = 'postcard-back-default.jpeg',
  flip_duration = parseFloat(
    window.getComputedStyle(document.documentElement).getPropertyValue('--flip-duration')
  ) * 1000, // get it as milliseconds
  IOS_CLASSNAME = 'ios-device'

let flipTimer, isFlipInProgress = false;

document.addEventListener('DOMContentLoaded', ev=>{

  // not really used ATM
  if (isIosDevice()){
    document.body.classList.add(IOS_CLASSNAME)
  }

  if (location.hash){
    // get edition number from hash which will be used as part of the link
    const srcUrlFront = getImageURL('front')
    const imageEl = document.querySelector('main #front img')
    imageEl.setAttribute('src', srcUrlFront)

    const srcUrlBack = getImageURL()
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

function handleFlip(ev) {

  // if it's click on link, dont flip card
  if (isAnchorEl(ev.target)) return;

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

function getImageURL(side = 'back'){
    const FRONT_SIDE = 'front'
    const isHostedLocally = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    const editionNumber = location.hash.replace(/#/, '')

    if (side === FRONT_SIDE){
        // https://raw.githubusercontent.com/monthly-marko/postcard/master/ src/assets/ edition-01.jpeg
        const fileName = `${EDITION_FRONT_PREFIX}-${editionNumber}`
        const srcUrl = `${isHostedLocally ? '' : GITHUB_ROOT}${FRONT_FOLDER_PREFIX}${fileName}.jpeg`
        return srcUrl
    }

    else return `${isHostedLocally ? '' : GITHUB_ROOT}${FRONT_FOLDER_PREFIX}${DEFAULT_BACK}`
}

function isIosDevice(){
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)

}

function isAnchorEl(target){
  return target && target.tagName.toLowerCase() === 'a'
}