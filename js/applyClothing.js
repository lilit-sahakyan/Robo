import * as THREE from "three";
import { sendError } from "./index.js";
import { legsMesh, handsMesh, torsoMesh, scene } from "./scene.js";
import { addSkin, draw2D, drawTorso } from "./imageProcess.js";
import { Man_handsMesh, Man_legsMesh, Man_torsoMesh, Woman_torsoMesh, Woman_handsMesh, Woman_legsMesh ,currentBodyType } from "./renderTypes.js";


// Common variables
const shirtButton = document.getElementById("shirtButton");
const shirtUpload = document.getElementById("shirtUpload");
const pantsButton = document.getElementById("pantsButton");
const pantsUpload = document.getElementById("pantsUpload");
export let defaultShirt = true;
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
    // uploadHandler(currentLegs, 'pants', true);
    changeClothing('hands', currentHands)
    changeClothing('torso', currentTorso)
    changeClothing('legs', currentLegs)
    defaultShirt = true;
    document.getElementById('image2D').src = "../images/2DPreview.png"
}

export function uploadHandler(file, type) {
  clothingChecks(file, (clothingImg) => {
    
    addSkin(clothingImg, (result) => {
      if (type == "shirt") {
        currentHands = clothingImg;
        processedShirt = result;
        if (reset == false){defaultShirt = false;}
        shirtUpload.value = null;
        draw2D('shirt', clothingImg)
      } else if (type == "pants") {
        currentLegs = result;
        pantsUpload.value = null;
        if (defaultShirt == false){
            draw2D('pants', clothingImg);
            setTimeout(() => {
              draw2D('shirt', currentHands);
            }, 1000);
          
        } else{
          draw2D('pants', clothingImg)
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
      handsMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material.map = texture;
        }
      });
      if(Man_handsMesh){
      Man_handsMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material.map = texture;
        }
      })}
      if(Woman_handsMesh){
      Woman_handsMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material.map = texture;
        }
      })}
      break;
    case "legs":
      legsMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material.map = texture;
        }
      });
      if(Man_legsMesh){
      Man_legsMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material.map = texture;
        }
      })}
      if(Woman_legsMesh){
      Woman_legsMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material.map = texture;
        }
      })}
      break;
    case "torso":
      torsoMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material.map = texture;
        }
      });
      if(Man_torsoMesh){
      Man_torsoMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material.map = texture;
        }
      })}
      if(Woman_torsoMesh){
      Woman_torsoMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material.map = texture;
        }
      })}
      break;
  }
}