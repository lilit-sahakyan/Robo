import { openMenu } from "./activeFunctions.js";

// Version check 📌
const dripzelsVersion = '1.0';
let firstTime = false;
let welcomed = false;

document.getElementById('clientVersion').innerHTML = dripzelsVersion;

if (localStorage.getItem('clientVersion') == null) { // First visit
  firstTime = true;
  localStorage.setItem('clientVersion', dripzelsVersion);
  openMenu('updateLog', '🤗 Welcome! Update Log:')
}


if(localStorage.getItem('clientVersion') !== dripzelsVersion){ // The website has updated
  localStorage.setItem('clientVersion', `${dripzelsVersion}`)
  openMenu('updateLog', '⌚ Update Log')
}

document.addEventListener("click", () => {
  if (welcomed == false) {
    welcomed = true;
    if (firstTime == true) {
      playAudio("welcomeAudio");
      firstTime = false;
    } else {
      playAudio('welcomeBackAudio')
    }
  }
});

function playAudio(id){
  document.getElementById(id).volume = 0.4;
  document.getElementById(id).play()
}



// Cursor changer 📌
document.addEventListener('mousedown', (e) => {
  const tgt = e.target;
  const cursor = window.getComputedStyle(tgt)['cursor'];
  if (cursor === 'grab') {
    if(e.button == 0){
      document.querySelector('canvas').style.cursor = 'grabbing';
    } else if (e.button == 1){
      document.querySelector('canvas').style.cursor = 'zoom-in';
    }
  }
});


document.addEventListener('mouseup', () => {
  document.querySelector('canvas').style.cursor = 'grab';
});


// Pop up menus 📌
document.getElementById('closePopup').addEventListener('click', () => {
    document.getElementById("errorMenu").classList.remove('open');
    document.getElementById("popupContainer").classList.remove('open')
    openMenu('menu2D', '2D clothing Menu', true)
    openMenu('updateLog', '⌚ Update Log', true)
    if (firstTime == true){
      playAudio('welcomeAudio')
      console.log('First time')
    }
})
document.addEventListener('keydown', (key) => {
  if (key.code == "Escape"){
    document.getElementById("errorMenu").classList.remove('open');
    document.getElementById("popupContainer").classList.remove('open')
    openMenu('menu2D', '2D clothing Menu', true)
    openMenu('updateLog', '⌚ Update Log', true)
    if (firstTime == true){
      playAudio('welcomeAudio')
      console.log('First time')
    }
  }
})