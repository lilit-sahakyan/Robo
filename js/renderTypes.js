import * as THREE from "three";
import { spotLight1, spotLight2, spotLight3, spotLight4, torsoMesh, handsMesh, legsMesh, torsoMaterial, handsMaterial, legsMaterial, scene, loader,
} from "./scene.js";
import { defaultShirt } from "./applyClothing.js";

export function setupRenderTypes() {
  const textureRender = document.getElementById("texture");
  const lighting1Render = document.getElementById("lighting1");
  const lighting2Render = document.getElementById("lighting2");

  textureRender.addEventListener("click", (event) => {
    // Blocky 📌
    torsoMesh.traverse(function (node) {
      if (node.isMesh) {
        node.material = new THREE.MeshBasicMaterial({
          map: node.material.map,
        });
      }
    });
    handsMesh.traverse(function (node) {
      if (node.isMesh) {
        node.material = new THREE.MeshBasicMaterial({
          map: node.material.map,
        });
      }
    });
    legsMesh.traverse(function (node) {
      if (node.isMesh) {
        node.material = new THREE.MeshBasicMaterial({
          map: node.material.map,
        });
      }
    });

    // Man 📌
    if (Man_torsoMesh)
{      Man_torsoMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshBasicMaterial({
            map: node.material.map,
          });
        }
      });
      Man_handsMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshBasicMaterial({
            map: node.material.map,
          });
        }
      });
      Man_legsMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshBasicMaterial({
            map: node.material.map,
          });
        }
      });}

    // Woman 📌
    if (Woman_torsoMesh)
{      Woman_torsoMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshBasicMaterial({
            map: node.material.map,
          });
        }
      });
      Woman_handsMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshBasicMaterial({
            map: node.material.map,
          });
        }
      });
      Woman_legsMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshBasicMaterial({
            map: node.material.map,
          });
        }
      });}
  });

  lighting1Render.addEventListener("click", (event) => {
    spotLight1.intensity = 0.3;
    spotLight2.intensity = 0.3;
    spotLight3.intensity = 0;
    spotLight4.intensity = 0;

    // Blocky 📌
    torsoMesh.traverse(function (node) {
      if (node.isMesh) {
        node.material = new THREE.MeshStandardMaterial({
          map: node.material.map,
        });
      }
    });
    handsMesh.traverse(function (node) {
      if (node.isMesh) {
        node.material = new THREE.MeshStandardMaterial({
          map: node.material.map,
        });
      }
    });
    legsMesh.traverse(function (node) {
      if (node.isMesh) {
        node.material = new THREE.MeshStandardMaterial({
          map: node.material.map,
        });
      }
    });

    // Man 📌
    if (Man_torsoMesh)
{      Man_torsoMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshStandardMaterial({
            map: node.material.map,
          });
        }
      });
      Man_handsMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshStandardMaterial({
            map: node.material.map,
          });
        }
      });
      Man_legsMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshStandardMaterial({
            map: node.material.map,
          });
        }
      });}

    // Woman 📌
    if (Woman_torsoMesh)
{      Woman_torsoMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshStandardMaterial({
            map: node.material.map,
          });
        }
      });
      Woman_handsMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshStandardMaterial({
            map: node.material.map,
          });
        }
      });
      Woman_legsMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshStandardMaterial({
            map: node.material.map,
          });
        }
      });}
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
    handsMesh.traverse(function (node) {
      if (node.isMesh) {
        node.material = new THREE.MeshStandardMaterial({
          map: node.material.map,
        });
      }
    });
    legsMesh.traverse(function (node) {
      if (node.isMesh) {
        node.material = new THREE.MeshStandardMaterial({
          map: node.material.map,
        });
      }
    });
  });
}

export let Man_torsoMesh = undefined;
export let Man_handsMesh = undefined;
export let Man_legsMesh = undefined;
export let Woman_torsoMesh = undefined;
export let Woman_handsMesh = undefined;
export let Woman_legsMesh = undefined;
export let currentBodyType = 'Blocky';

function changeBody(bodyType) {
  // Body
  scene.remove(
    torsoMesh,
    handsMesh,
    legsMesh,
    Man_torsoMesh,
    Man_handsMesh,
    Man_legsMesh,
    Woman_torsoMesh,
    Woman_handsMesh,
    Woman_legsMesh
  );

  currentBodyType = bodyType;

  // Man 📌
  if (bodyType == "Man") {
    if (!Man_torsoMesh && !Man_handsMesh && !Man_legsMesh) {
      // Torso
      loader.load(
        "../models/Man_Torso.glb",
        function (gltf) {
          Man_torsoMesh = gltf.scene;
          Man_torsoMesh.scale.copy(torsoMesh.scale);
          Man_torsoMesh.traverse(function (node) {
            if (node.isMesh) {
              node.material = torsoMaterial;
              node.castShadow = true;
            }
          });
          scene.add(Man_torsoMesh); // Add the updated mesh to the scene
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );

      // console.log(torsoMesh.scale.copy);
      // Hands
      loader.load(
        "../models/Man_Hands.glb",
        function (gltf) {
          Man_handsMesh = gltf.scene;
          Man_handsMesh.scale.copy(torsoMesh.scale);
          Man_handsMesh.traverse(function (node) {
            if (node.isMesh) {
              node.material = handsMaterial;
              node.castShadow = true;
            }
          });
          scene.add(Man_handsMesh); // Add the updated mesh to the scene
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );

      // Legs
      loader.load(
        "../models/Man_Legs.glb",
        function (gltf) {
          Man_legsMesh = gltf.scene;
          Man_legsMesh.scale.copy(torsoMesh.scale);
          Man_legsMesh.traverse(function (node) {
            if (node.isMesh) {
              node.material = legsMaterial;
              node.castShadow = true;
            }
          });
          scene.add(Man_legsMesh); // Add the updated mesh to the scene
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    } else {
      scene.add(Man_torsoMesh, Man_handsMesh, Man_legsMesh);
    }
  } 
  // Woman 📌
  else if (bodyType == "Woman") {
    if (!Woman_torsoMesh && !Woman_handsMesh && !Woman_legsMesh) {
      // Torso
      loader.load(
        "../models/Woman_Torso.glb",
        function (gltf) {
          Woman_torsoMesh = gltf.scene;
          Woman_torsoMesh.scale.copy(torsoMesh.scale);
          Woman_torsoMesh.traverse(function (node) {
            if (node.isMesh) {
              node.material = torsoMaterial;
              node.castShadow = true;
            }
          });
          scene.add(Woman_torsoMesh); // Add the updated mesh to the scene
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
      loader.load(
        "../models/Woman_Hands.glb",
        function (gltf) {
          Woman_handsMesh = gltf.scene;
          Woman_handsMesh.scale.copy(torsoMesh.scale);
          Woman_handsMesh.traverse(function (node) {
            if (node.isMesh) {
              node.material = handsMaterial;
              node.castShadow = true;
            }
          });
          scene.add(Woman_handsMesh); // Add the updated mesh to the scene
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );

      // Legs
      loader.load(
        "../models/Woman_Legs.glb",
        function (gltf) {
          Woman_legsMesh = gltf.scene;
          Woman_legsMesh.scale.copy(torsoMesh.scale);
          Woman_legsMesh.traverse(function (node) {
            if (node.isMesh) {
              node.material = legsMaterial;
              node.castShadow = true;
            }
          });
          scene.add(Woman_legsMesh); // Add the updated mesh to the scene
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    } else {
      scene.add(Woman_torsoMesh, Woman_handsMesh, Woman_legsMesh);
    }
  }
  else if (bodyType == "Blocky") {
    scene.add(torsoMesh, handsMesh, legsMesh);
  }
}

const BodyTypeItems = document.querySelectorAll(
  ".SideMenu-Left-BodyTypes-Type"
);

BodyTypeItems.forEach(function (BodyTypeItem) {
  BodyTypeItem.addEventListener("click", function () {
    // Remove the class "Active_BodyType" from all elements
    BodyTypeItems.forEach(function (item) {
      item.classList.remove("Active_BodyType");
    });

    // Add the class "Active_BodyType" to the clicked element
    BodyTypeItem.classList.add("Active_BodyType");

    // Call the changeBody function
    changeBody(BodyTypeItem.id);
  });
});

// Body Scaling 📌
const scalingHeight = document.getElementById("Scaling-Height");
const bodyHeightText = document.getElementById("bodyHeightText");
const scalingWidth = document.getElementById("Scaling-Width");
const bodyWidthText = document.getElementById("bodyWidthText");

scalingHeight.addEventListener("input", () => {
  const sliderValue = parseFloat(scalingHeight.value) / 10; // Map the slider value to a range of 0 to 1
  let scaleY = 0.2 + sliderValue * 0.2; // Map 0 to 0.2 and 1 to 0.4 for the Y scale
  scaleY = Math.round(scaleY * 100) / 100; // Round to two decimal places
  const scale = new THREE.Vector3(torsoMesh.scale.x, scaleY, 0.3); // Create the scale vector

  if (scalingHeight.value == 0) {
    bodyHeightText.innerHTML = "0";
  } else if (scalingHeight.value == 10) {
    bodyHeightText.innerHTML = "1";
  } else {
    bodyHeightText.innerHTML = `0.${scalingHeight.value}`;
  }

  // Apply the scale to the torsoMesh
  torsoMesh.scale.copy(scale);
  handsMesh.scale.copy(scale);
  legsMesh.scale.copy(scale);
  if (Man_torsoMesh) {
    Man_torsoMesh.scale.copy(scale);
    Man_handsMesh.scale.copy(scale);
    Man_legsMesh.scale.copy(scale);
  }
  if (Woman_torsoMesh) {
    Woman_torsoMesh.scale.copy(scale);
    Woman_handsMesh.scale.copy(scale);
    Woman_legsMesh.scale.copy(scale);
  }
});
scalingWidth.addEventListener("input", () => {
  const sliderValue = parseFloat(scalingWidth.value) / 10; // Map the slider value to a range of 0 to 1
  let scaleX = 0.2 + sliderValue * 0.2; // Map 0 to 0.2 and 1 to 0.4 for the Y scale
  scaleX = Math.round(scaleX * 100) / 100; // Round to two decimal places
  const scale = new THREE.Vector3(scaleX, torsoMesh.scale.y, 0.3); // Create the scale vector

  if (scalingWidth.value == 0) {
    bodyWidthText.innerHTML = "0";
  } else if (scalingWidth.value == 10) {
    bodyWidthText.innerHTML = "1";
  } else {
    bodyWidthText.innerHTML = `0.${scalingWidth.value}`;
  }

  // Apply the scale to the torsoMesh
  torsoMesh.scale.copy(scale);
  handsMesh.scale.copy(scale);
  legsMesh.scale.copy(scale);
  if (Man_torsoMesh) {
    Man_torsoMesh.scale.copy(scale);
    Man_handsMesh.scale.copy(scale);
    Man_legsMesh.scale.copy(scale);
  }
  if (Woman_torsoMesh) {
    Woman_torsoMesh.scale.copy(scale);
    Woman_handsMesh.scale.copy(scale);
    Woman_legsMesh.scale.copy(scale);
  }
});
