import { openMenu } from "./activeFunctions.js";

// Version check 📌
const dripzelsVersion = '1.5';
let firstTime = false;

document.getElementById('clientVersion').innerHTML = dripzelsVersion;

if (localStorage.getItem('clientVersion') == null) { // First visit
  firstTime = true;
  localStorage.setItem('clientVersion', dripzelsVersion);
  openMenu('updateLog', 'Welcome to Dripzels!')
}


if(localStorage.getItem('clientVersion') !== dripzelsVersion){ // The website has updated
  localStorage.setItem('clientVersion', `${dripzelsVersion}`)
  openMenu('updateLog', '⌚ Update Log')
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
})
document.addEventListener('keydown', (key) => {
  if (key.code == "Escape"){
    document.getElementById("errorMenu").classList.remove('open');
    document.getElementById("popupContainer").classList.remove('open')
    openMenu('menu2D', '2D clothing Menu', true)
    openMenu('updateLog', '⌚ Update Log', true)
  }
})