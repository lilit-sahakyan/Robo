// Common variables
const shirtUpload = document.getElementById("shirtUpload");
const pantsUpload = document.getElementById("pantsUpload");

// Upload handler 📌
import { reset, resetClothing, uploadHandler } from "./applyClothing.js";
import { drawTorso } from "./imageProcess.js";

shirtUpload.addEventListener("change", (event) => {
  const file = event.target.files[0]; // select the image they uploaded
  uploadHandler(file, "shirt");
  resetClothing(true);
});
pantsUpload.addEventListener("change", (event) => {
  const file = event.target.files[0]; // select the image they uploaded
  uploadHandler(file, "pants");
  resetClothing(true);
});

// Drag and Drop 📌
document.body.addEventListener("dragover", (event) => {
  event.preventDefault();
  document.getElementById("Drop-backdrop").classList.remove("hidden");
  document.getElementById("Drop-backdrop").classList.add("visible");
});

['dragleave', 'drop'].forEach((evt) =>{
  document.getElementById('Drop-backdrop').addEventListener(evt, (event) => {
  event.preventDefault();
  document.getElementById("Drop-backdrop").classList.remove("visible");
  document.getElementById("Drop-backdrop").classList.add("hidden");
});
})

document.getElementById("Drop-backdrop").addEventListener('drop', () => {handleDrop(event)})

function handleDrop(event) {
  event.preventDefault();
  const imageFile = event.dataTransfer.files[0]; // Get the dropped image file

  if (imageFile) {
    const dropZone = event.target.id;
    if (dropZone === "shirtDrop") {
      simulateFileInput(document.getElementById("shirtUpload"), imageFile);
    } else if (dropZone === "pantsDrop") {
      simulateFileInput(document.getElementById("pantsUpload"), imageFile);
    }
  }
}

document.getElementById('Drop-backdrop').addEventListener('dragover', (event) => {
  let dragZone = event.target.id;
  document.getElementById(dragZone).classList.add('hovering')
})
document.getElementById('Drop-backdrop').addEventListener('dragleave', (event) => {
  let dragZone = event.target.id;
  document.getElementById(dragZone).classList.remove('hovering')
})

function simulateFileInput(inputElement, file) {
  const filesArray = new DataTransfer();
  filesArray.items.add(file);

  inputElement.files = filesArray.files;
  inputElement.dispatchEvent(new Event("change", { bubbles: true }));
}

// Reset button 📌
document.getElementById("buttonReset").addEventListener("click", () => {
  resetClothing();
});

// 2D Preview 📌
document.getElementById("image2D").addEventListener("click", () => {
  window.open("../images/2DPreview.png", "_blank");
});
document.getElementById("download2D").addEventListener("click", () => {
  // Convert canvas content to data URL
  var dataURL = document.getElementById("image2D").src;

  // Create temporary link element
  var link = document.createElement("a");
  link.href = dataURL;
  link.download = "2D Preview - Dripzels";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Open Menu
document.getElementById("button2D").addEventListener("click", () => {
  openMenu("menu2D", "2D Clothing Preview");
});

// Popup Menu 📌
export function openMenu(menuID, menuName, close) {
  if (!close) {
    document.getElementById("popupMenuTitle").innerHTML = menuName;
    document.getElementById("popupContainer").classList.add("open");
    document.getElementById(menuID).style.display = "flex";
  } else {
    document.getElementById("popupContainer").classList.remove("open");
    setTimeout(() => {
      document.getElementById("popupMenuTitle").innerHTML = "Title";
      document.getElementById(menuID).style.display = "none";
    }, 300);
  }
}

// Version 📌
// document.getElementById('version').addEventListener('click', () => {showUpdateLog()} )
document.getElementById("version").addEventListener("click", () => {
  openMenu("updateLog", "Update Log ⌚");
});
