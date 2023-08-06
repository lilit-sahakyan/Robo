import * as THREE from "three";
import { sendError } from "./index.js";
import { pantsMesh, shirtMesh, torsoMesh } from "./scene.js";
import { addSkin, draw2D, drawTorso } from "./imageProcess.js";


// Common variables
const shirtButton = document.getElementById("shirtButton");
const shirtUpload = document.getElementById("shirtUpload");
const pantsButton = document.getElementById("pantsButton");
const pantsUpload = document.getElementById("pantsUpload");
let defaultShirt = true;
export let reset = false;
let processedShirt;
let currentHands = new Image(); currentHands.src = "../images/baseShirt.png";
let currentLegs = new Image(); currentLegs.src = "../images/basePants.png";
let currentTorso = new Image(); currentTorso.src = "../images/baseShirt.png";

export function resetClothing(changed) {
    if (changed){
      reset = false;
      return;
    }
    reset = true;
    processedShirt = undefined;
    currentHands.src = "../images/baseShirt.png";
    currentLegs.src = "../images/basePants.png";
    currentTorso.src = "../images/baseShirt.png";
    uploadHandler(currentLegs, 'pants', true);
    changeClothing('legs', currentLegs)
    changeClothing('torso', currentTorso)
    changeClothing('hands', currentHands)
    defaultShirt = true;
    setTimeout(() => {
      document.getElementById('image2D').src = "../images/2DPreview.png"
    }, 1000);

}

export function uploadHandler(file, type) {
  clothingChecks(file, (clothingImg) => {
    
    addSkin(clothingImg, (result) => {
      if (type == "shirt") {
        currentHands = clothingImg;
        processedShirt = result;
        if (reset == false){defaultShirt = false;}
        shirtUpload.value = null;
        draw2D('shirt', currentHands)
      } else if (type == "pants") {
        currentLegs = result;
        pantsUpload.value = null;
        if (defaultShirt == false){
            draw2D('pants', currentLegs);
            setTimeout(() => {
              draw2D('shirt', currentHands);
            }, 1000);
          
        } else{
          draw2D('pants', currentLegs)
        }
      }
      
      Promise.all([
        drawTorso(currentLegs, currentHands, defaultShirt, (result) => {
          currentTorso = result;
          changeClothing("legs", currentLegs);
          changeClothing("torso", currentTorso);
          changeClothing("hands", processedShirt || currentHands);
        }),
      ]);
      
    });
  });
}



function clothingChecks(file, callback) {
  if (!file.name){return;}
  if (file && !file.type.match(/image\/(png|jpe?g)/)) {
    sendError("Invalid file type! \n Only PNG, JPEG, and JPG are allowed!");
    return;
  } else {
    // Wait for the image to load
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      const clothingImg = new Image();
      clothingImg.addEventListener("load", () => {
        // Image size check
        if (clothingImg.width != 585 || clothingImg.height != 559) {
          sendError("The image must be 585x559 pixels!");
          return;
        }
        // Passed 🟢
        else {
          callback(clothingImg);
        }
      });
      clothingImg.src = event.target.result;
    });
    reader.readAsDataURL(file);
  }
}

function changeClothing(type, clothing) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(clothing.src, function (texture) {
    texture.flipY = false;
    texture.needsUpdate = true;
  });
  switch (type) {
    case "hands":
      shirtMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material.map = texture;
        }
      });
      break;
    case "legs":
      pantsMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material.map = texture;
      }
      });
      break;
    case 'torso':
        torsoMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material.map = texture;
        }
      });
      break;
  }
}