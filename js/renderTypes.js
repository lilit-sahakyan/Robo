import * as THREE from "three";
import { spotLight1, spotLight2, spotLight3, spotLight4, torsoMesh, handsMesh, legsMesh, torsoMaterial, handsMaterial, legsMaterial, scene, loader, headMesh, headMaterial,
} from "./scene.js";

export function setupRenderTypes() {
  const lightingOption_None = document.getElementById("lightingOption-None");
  const lightingOption_Studio = document.getElementById("lightingOption-Studio");
  const lightingOption_Sunset = document.getElementById("lightingOption-Sunset");

  const LightingButtons = document.querySelectorAll('.LightingOption');

  LightingButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      LightingButtons.forEach((buttons) => {
        buttons.classList.remove('LightingOption-Selected')
      })
      btn.classList.add('LightingOption-Selected')
    })
  })
  


  lightingOption_None.addEventListener("click", (event) => {
    spotLight1.intensity = 10;
    spotLight2.intensity = 10;
    spotLight3.intensity = 0;
    spotLight4.intensity = 0;
    // Blocky 📌
    headMesh.traverse(function (node) {
      if (node.isMesh) {
        node.material = new THREE.MeshBasicMaterial({
          map: node.material.map,
        });
      }
    });
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
    if (Man_torsoMesh) {
      Man_headMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshBasicMaterial({
            map: node.material.map,
          });
        }
      });
      Man_torsoMesh.traverse(function (node) {
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
      });
    }

    // Woman 📌
    if (Woman_torsoMesh) {
      Woman_headMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshBasicMaterial({
            map: node.material.map,
          });
        }
      });
      Woman_torsoMesh.traverse(function (node) {
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
      });
    }

    // Curvy Woman 📌
    if (Curvy_Woman_legsMesh) {
      Curvy_Woman_legsMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshBasicMaterial({
            map: node.material.map,
          });
        }
      });
    }
  });

  lightingOption_Studio.addEventListener("click", (event) => {
    spotLight1.intensity = 10;
    spotLight2.intensity = 10;
    spotLight3.intensity = 0;
    spotLight4.intensity = 0;

    // Blocky 📌
    headMesh.traverse(function (node) {
      if (node.isMesh) {
        node.material = new THREE.MeshStandardMaterial({
          map: node.material.map,
        });
      }
    });
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
    if (Man_torsoMesh){
      Man_headMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshStandardMaterial({
            map: node.material.map,
          });
        }
      });
      Man_torsoMesh.traverse(function (node) {
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
    if (Woman_torsoMesh){
      Woman_headMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshStandardMaterial({
            map: node.material.map,
          });
        }
      });
      Woman_torsoMesh.traverse(function (node) {
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
      });
    }

    // Curvy Woman 📌
    if (Curvy_Woman_legsMesh){
      Curvy_Woman_legsMesh.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshStandardMaterial({
            map: node.material.map,
          });
        }
      });
    }

  });

  lightingOption_Sunset.addEventListener("click", (event) => {
    spotLight1.intensity = 0;
    spotLight2.intensity = 0;
    spotLight3.intensity = 90;
    spotLight4.intensity = 100;
    headMesh.traverse(function (node) {
      if (node.isMesh) {
        node.material = new THREE.MeshStandardMaterial({
          map: node.material.map,
        });
      }
    });
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

export let Man_headMesh = undefined
export let Man_torsoMesh = undefined;
export let Man_handsMesh = undefined;
export let Man_legsMesh = undefined;
export let Woman_headMesh = undefined
export let Woman_torsoMesh = undefined;
export let Woman_handsMesh = undefined;
export let Woman_legsMesh = undefined;
export let Curvy_Woman_legsMesh = undefined;
export let currentBodyType = 'Blocky';
let HeadVisibility = true;

function changeBody(bodyType) {
  // Body
  scene.remove(
    headMesh,
    torsoMesh,
    handsMesh,
    legsMesh,
    Man_headMesh,
    Man_torsoMesh,
    Man_handsMesh,
    Man_legsMesh,
    Woman_headMesh,
    Woman_torsoMesh,
    Woman_handsMesh,
    Woman_legsMesh,
    Curvy_Woman_legsMesh
  );

  currentBodyType = bodyType;

  // Man 📌
  if (bodyType == "Man") {
    if (!Man_torsoMesh && !Man_handsMesh && !Man_legsMesh && !Man_headMesh) {
      // Head
      loader.load(
        "../models/Man_Head.glb",
        function (gltf) {
          Man_headMesh = gltf.scene;
          Man_headMesh.scale.copy(headMesh.scale);
          Man_headMesh.traverse(function (node) {
            if (node.isMesh) {
              node.material = headMaterial;
              node.castShadow = true;
            }
          });
          if(HeadVisibility == true){scene.add(Man_headMesh);}
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );

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
          scene.add(Man_torsoMesh);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );

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
          scene.add(Man_handsMesh);
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
          scene.add(Man_legsMesh);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    } else {
      scene.add(Man_torsoMesh, Man_handsMesh, Man_legsMesh);
      if(HeadVisibility == true){scene.add(Man_headMesh);}
    }
  } 
  // Woman 📌
  else if (bodyType == "Woman" || bodyType == "CurvyWoman") {
    if (!Woman_torsoMesh && !Woman_handsMesh && !Woman_legsMesh && !Curvy_Woman_legsMesh) {
      // Head      
      loader.load(
        "../models/Woman_Head.glb",
        function (gltf) {
          Woman_headMesh = gltf.scene;
          Woman_headMesh.scale.copy(torsoMesh.scale);
          Woman_headMesh.traverse(function (node) {
            if (node.isMesh) {
              node.material = headMaterial;
              node.castShadow = true;
            }
          });
          if(HeadVisibility == true){scene.add(Woman_headMesh);}
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );

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
          scene.add(Woman_torsoMesh);
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
          scene.add(Woman_handsMesh);
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
          if (bodyType == "Woman"){scene.add(Woman_legsMesh);}
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
      // Curvy Legs
      loader.load(
        "../models/Curvy_Woman_Legs.glb",
        function (gltf) {
          Curvy_Woman_legsMesh = gltf.scene;
          Curvy_Woman_legsMesh.scale.copy(torsoMesh.scale);
          Curvy_Woman_legsMesh.traverse(function (node) {
            if (node.isMesh) {
              node.material = legsMaterial;
              node.castShadow = true;
            }
          });
          if (bodyType == "CurvyWoman"){scene.add(Curvy_Woman_legsMesh);}
        },
        undefined,
        function (error) {
          console.error(error);
        }
        );
    } else {
      scene.add(Woman_torsoMesh, Woman_handsMesh);
      if (bodyType == "Woman"){scene.add(Woman_legsMesh);}
      if (bodyType == "CurvyWoman"){scene.add(Curvy_Woman_legsMesh);}
      if(HeadVisibility == true){scene.add(Woman_headMesh);}
    }
  }
  else if (bodyType == "Blocky") {
    scene.add(torsoMesh, handsMesh, legsMesh);
    if(HeadVisibility == true){scene.add(headMesh);}
  }
}

const BodyTypeItems = document.querySelectorAll(
  ".Humanoids-Option"
);

BodyTypeItems.forEach(function (BodyTypeItem) {
  BodyTypeItem.addEventListener("click", function () {
    BodyTypeItems.forEach(function (item) {
      item.classList.remove("Selected-Humanoid");
    });

    BodyTypeItem.classList.add("Selected-Humanoid");

    changeBody(BodyTypeItem.id);
  });
});

// Toggle head
document.addEventListener('DOMContentLoaded', function() {
  var humanoidHeadCheckbox = document.getElementById('HumanoidVisibility-Head');
    humanoidHeadCheckbox.addEventListener('change', function() {
      if (humanoidHeadCheckbox.checked) {
        switch (currentBodyType){
          case 'Blocky':
            scene.add(headMesh)
            break;
          case 'Woman', "CurvyWoman":
            scene.add(Woman_headMesh)
            break;
          case 'Man':
            scene.add(Man_headMesh)
            break;
        }
        HeadVisibility = true;
      } else {
        scene.remove(headMesh, Woman_headMesh, Man_headMesh)
        HeadVisibility = false;
      }
    });
});