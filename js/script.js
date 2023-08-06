function sendError(error) {
  document.getElementById("errorMessage").innerHTML = error;
  document.getElementById("errorMenu").style.display = "flex";
}

import { processImage, draw2D } from "./imageProcess.js";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.antialias = true;
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const scene = new THREE.Scene();
const orbit = new OrbitControls(camera, renderer.domElement);
const orbit2 = new TrackballControls(camera, renderer.domElement);
const gridGround = new THREE.GridHelper(100, 130, 0x7a7a7a, 0x454545);
scene.fog = new THREE.Fog(0x323232, 7, 15);
scene.add(gridGround);

camera.position.set(-0.5, 1.7, 3.5);
orbit.maxDistance = 7;
orbit.minDistance = 0.7;
orbit.target.set(0, 0.7, 0);
orbit.enablePan = false;
orbit.enableDamping = true;
orbit.dampingFactor = 0.12;
orbit.enableZoom = false;

orbit2.noRotate = true;
orbit2.noPan = true;
orbit2.noZoom = false;
orbit2.zoomSpeed = 1.5;

orbit.update();

renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

// Objects ⭐
const loader = new GLTFLoader();

// Lights
const ambientLight = new THREE.AmbientLight(0xf5feff, 1);

const spotLight1 = new THREE.SpotLight(0xffffff, 0);
spotLight1.position.set(1.5, 2, 2);
const spotLight2 = new THREE.SpotLight(0xffffff, 0);
spotLight2.position.set(-1, 2, -2);

const spotLight3 = new THREE.SpotLight(0xeb7f2d, 0);
spotLight3.position.set(3, 4, 3);
const spotLight4 = new THREE.SpotLight(0x140078, 0);
spotLight4.position.set(-3, 3, -2);

scene.add(ambientLight, spotLight1, spotLight2, spotLight3, spotLight4);

THREE.ColorManagement.enabled = true;

//   Character
let torsoMaterial = "";
let shirtMaterial = "";
let pantsMaterial = "";
let torsoMesh;
let shirtMesh;
let pantsMesh;
// Torso
loader.load(
  "../models/torso.glb",
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.3, 0.3, 0.3); // Adjust the scale as needed
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      "../models/textures/baseShirt.png",
      function (texture) {
        texture.flipY = false;
        texture.needsUpdate = true;
      }
    );
    torsoMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: texture,
    });
    model.traverse(function (node) {
      if (node.isMesh) {
        node.material = torsoMaterial;
        node.castShadow = true;
      }
    });
    torsoMesh = model;
    scene.add(torsoMesh);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
// Shirt
loader.load(
  "../models/Shirt.glb",
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.3, 0.3, 0.3); // Adjust the scale as needed
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      "../models/textures/baseShirt.png",
      function (texture) {
        texture.flipY = false;
        texture.needsUpdate = true;
      }
    );
    shirtMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: texture,
    });
    model.traverse(function (node) {
      if (node.isMesh) {
        node.material = shirtMaterial;
        node.castShadow = true;
      }
    });
    shirtMesh = model;
    scene.add(shirtMesh);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
// Pants
loader.load(
  "../models/Pants.glb",
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.3, 0.3, 0.3); // Adjust the scale as needed
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      "../models/textures/basePants.png",
      function (texture) {
        texture.flipY = false;
        texture.needsUpdate = true;
      }
    );
    pantsMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: texture,
    });
    model.traverse(function (node) {
      if (node.isMesh) {
        node.material = pantsMaterial;
        node.castShadow = true;
      }
    });
    pantsMesh = model;
    scene.add(pantsMesh);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

scene.add(ambientLight);
renderer.setClearColor(0x323232); // Background color

function animate() {
  // Animate
  const target = orbit.target;
  orbit.update();
  orbit2.target.set(target.x, target.y, target.z);
  orbit2.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
window.addEventListener("resize", function () {
  // Resize window
  camera.aspect = this.window.innerWidth / this.window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//        Image processing ⚠️
// Wait for the website to load
document.addEventListener("DOMContentLoaded", function () {
  // Common variables
  const shirtButton = document.getElementById("shirtButton");
  const shirtUpload = document.getElementById("shirtUpload");
  const pantsButton = document.getElementById("pantsButton");
  const pantsUpload = document.getElementById("pantsUpload");
  let shirtUploaded = false;

  // Upload popup
  shirtButton.addEventListener("click", () => {
    shirtUpload.click();
  });
  pantsButton.addEventListener("click", () => {
    pantsUpload.click();
  });

  function clothingChecks(file, callback) {
    // File type check
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

  function changeClothing(clothing, type) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(clothing.src, function (texture) {
      texture.flipY = false;
      texture.needsUpdate = true;
    });
    switch (type) {
      case "shirt":
        torsoMesh.traverse(function (node) {
          if (node.isMesh) {
            node.material.map = texture;
          }
        });
        shirtMesh.traverse(function (node) {
          if (node.isMesh) {
            node.material.map = texture;
          }
        });
        break;
      case "pants":
        if (shirtUploaded == false) {
          torsoMesh.traverse(function (node) {
            if (node.isMesh) {
              node.material.map = texture;
            }
          });
        }

        pantsMesh.traverse(function (node) {
          if (node.isMesh) {
            node.material.map = texture;
          }
        });
        break;
    }
  }
  // Execute when the user uploads shirt 👕
  shirtUpload.addEventListener("change", (event) => {
    const file = event.target.files[0]; // select the image they uploaded
    // Check the requirements
    clothingChecks(file, (clothingImg) => {
      draw2D("shirt", clothingImg);
      processImage(clothingImg, (clothingImg) => {
        changeClothing(clothingImg, "shirt");
        // Clear the file input value
        shirtUpload.value = null;
        shirtUploaded = true;
      });
    });
  });
  // Execute when the user uploads pants 🩳
  pantsUpload.addEventListener("change", (event) => {
    const file = event.target.files[0]; // select the image they uploaded
    // Check the requirements
    clothingChecks(file, (clothingImg) => {
      draw2D("pants", clothingImg);
      processImage(clothingImg, (clothingImg) => {
        changeClothing(clothingImg, "pants");
        // Clear the file input value
        pantsUpload.value = null;
      });
    });
  });
});
document.getElementById("button2D").addEventListener("click", () => {
  if (window.getComputedStyle(document.getElementById('menu2D')).display == 'none'){
    document.getElementById('mainMenu').style.display = 'flex'
    document.getElementById('menu2D').style.display = 'flex'
  }
});
document.getElementById('closeMainMenu').addEventListener('click', () => {
  document.getElementById('mainMenu').style.display = 'none'
  document.getElementById('menu2D').style.display = 'none'
})
document.getElementById("buttonReset").addEventListener("click", () => {
  document.getElementById("image2D").src = "../images/2DPreview.png";
  const textureLoader = new THREE.TextureLoader();
  const basePants = textureLoader.load(
    "../models/textures/basePants.png",
    function (texture) {
      texture.flipY = false;
      texture.needsUpdate = true;
    }
  );

  const baseShirt = textureLoader.load(
    "../models/textures/baseShirt.png",
    function (texture) {
      texture.flipY = false;
      texture.needsUpdate = true;
    }
  );

  pantsMesh.traverse(function (node) {
    if (node.isMesh) {
      node.material.map = basePants;
    }
  });

  shirtMesh.traverse(function (node) {
    if (node.isMesh) {
      node.material.map = baseShirt;
    }
  });
  torsoMesh.traverse(function (node) {
    if (node.isMesh) {
      node.material.map = baseShirt;
    }
  });
});

// Cool effect thingy 💖
// Listen to the change event of the controls
let shakeActive = false;
orbit.addEventListener("change", function () {
  // Get the current distance from the controls
  const currentDistance = orbit.getDistance();
  if (
    currentDistance >= orbit.maxDistance - 0.01 ||
    currentDistance <= orbit.minDistance + 0.01
  ) {
    if (shakeActive != true) {
      shake();
    }
  }
});

function shake() {
  let border = document.getElementById("menuElement");
  const borderCol = border.style.border;
  setTimeout(function () {
    shakeActive = true;
    border.style.border = "1px solid rgba(255,0,0,.7)";
    setTimeout(function () {
      border.style.border = borderCol;
      setTimeout(function () {
        border.style.border = "1px solid rgba(255,0,0,.7)";
        setTimeout(function () {
          border.style.border = borderCol;
          setTimeout(function () {
            border.style.border = "1px solid rgba(255,0,0,.7)";
            setTimeout(function () {
              border.style.border = borderCol;
              shakeActive = false;
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  }, 100);
}

// Render types

const textureRender = document.getElementById("texture");
const lighting1Render = document.getElementById("lighting1");
const lighting2Render = document.getElementById("lighting2");

textureRender.addEventListener("click", (event) => {
  torsoMesh.traverse(function (node) {
    if (node.isMesh) {
      node.material = new THREE.MeshBasicMaterial({
        map: node.material.map,
      });
    }
  });
  shirtMesh.traverse(function (node) {
    if (node.isMesh) {
      node.material = new THREE.MeshBasicMaterial({
        map: node.material.map,
      });
    }
  });
  pantsMesh.traverse(function (node) {
    if (node.isMesh) {
      node.material = new THREE.MeshBasicMaterial({
        map: node.material.map,
      });
    }
  });
});

lighting1Render.addEventListener("click", (event) => {
  spotLight1.intensity = 0.3;
  spotLight2.intensity = 0.3;
  spotLight3.intensity = 0;
  spotLight4.intensity = 0;
  torsoMesh.traverse(function (node) {
    if (node.isMesh) {
      node.material = new THREE.MeshStandardMaterial({
        map: node.material.map,
      });
    }
  });
  shirtMesh.traverse(function (node) {
    if (node.isMesh) {
      node.material = new THREE.MeshStandardMaterial({
        map: node.material.map,
      });
    }
  });
  pantsMesh.traverse(function (node) {
    if (node.isMesh) {
      node.material = new THREE.MeshStandardMaterial({
        map: node.material.map,
      });
    }
  });
});

lighting2Render.addEventListener("click", (event) => {
  spotLight1.intensity = 0;
  spotLight2.intensity = 0;
  spotLight3.intensity = 0.7;
  spotLight4.intensity = 1;
  torsoMesh.traverse(function (node) {
    if (node.isMesh) {
      node.material = new THREE.MeshStandardMaterial({
        map: node.material.map,
      });
    }
  });
  shirtMesh.traverse(function (node) {
    if (node.isMesh) {
      node.material = new THREE.MeshStandardMaterial({
        map: node.material.map,
      });
    }
  });
  pantsMesh.traverse(function (node) {
    if (node.isMesh) {
      node.material = new THREE.MeshStandardMaterial({
        map: node.material.map,
      });
    }
  });
});

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