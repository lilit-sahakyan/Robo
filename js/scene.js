import {
  WebGLRenderer,
  PerspectiveCamera,
  SpotLight,
  AmbientLight,
  GridHelper,
  TextureLoader,
  MeshStandardMaterial,
  MeshBasicMaterial,
  Scene,
  PCFSoftShadowMap,
  LinearSRGBColorSpace,
  Fog,
  Vector2,
  ColorManagement,
  PointsMaterial,
  Points,
  BufferGeometry,
  BufferAttribute,
  Vector3,
} from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {orbit, orbit2} from "./controls.js"; // Import Controls
import { sendError } from "./index.js";
// Export Objects
export let renderer, scene, camera, ambientLight, spotLight1, spotLight2, spotLight3, spotLight4, headMesh, torsoMesh, handsMesh, legsMesh, headMaterial, torsoMaterial, handsMaterial, legsMaterial, loader = new GLTFLoader(), sceneAdded = false, christmasMesh;

export let christmas_sun;

export function initScene() {
  try {
    try {
      var container = document.getElementById("section75");

      renderer = new WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.antialias = true;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = PCFSoftShadowMap;
      renderer.outputColorSpace = LinearSRGBColorSpace;
      scene = new Scene();
      scene.fog = new Fog(0xf5ffff, 7, 15);
      camera = new PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      ColorManagement.enabled = true;

      // Objects ⭐

      // Floor
      const gridGround = new GridHelper(100, 130, 0xe1e1e1, 0xf1f1f1);
      // scene.add(gridGround);

      // Lights
      ambientLight = new AmbientLight(0xf2fcff, 1);

      spotLight1 = new SpotLight(0xffffff, 0);
      spotLight1.position.set(1.5, 2, 2);
      spotLight2 = new SpotLight(0xffffff, 0);
      spotLight2.position.set(-1, 2, -2);
      spotLight3 = new SpotLight(0xeb7f2d, 0);
      spotLight3.position.set(3, 4, 3);
      spotLight4 = new SpotLight(0x140078, 0);
      spotLight4.position.set(-3, 3, -2);
      scene.add(ambientLight, spotLight1, spotLight2, spotLight3, spotLight4);

      christmas_sun = new SpotLight(0xffffff, 0.5);
      christmas_sun.position.set(15, 20, 10);
      christmas_sun.castShadow = true;
      christmas_sun.shadow.mapSize = new Vector2(2048, 2048);
      scene.add(christmas_sun);
    } catch (error) {
      console.error("Error: " + error);
      alert("Error: " + error);
      sendError(error)
    }

    let totalModelsToLoad = 4; // Update this if you add or remove models
    let modelsLoaded = 0;

    // Function to update the loading percentage
    function updateLoadingPercentage() {
      const threeSceneLoading = (modelsLoaded / totalModelsToLoad) * 100;
      document.getElementById(
        "loadingProgress"
      ).innerHTML = `${threeSceneLoading}%`;
      
      if (threeSceneLoading == 100) {
        sceneAdded = true;
        setTimeout(() => {
          threeCanvas.style.opacity = 1;
        }, 50);
      }
    }
    let threeCanvas = document
      .getElementById("section75")
      .appendChild(renderer.domElement);
    threeCanvas.style.opacity = 0;

    // Christmas 🎄
    // loader.load(
    //   "../models/Christmas.glb",
    //   function (gltf) {
    //     const model = gltf.scene;
    //     model.scale.set(0.3, 0.3, 0.3);
    //     let christmasMaterial = new MeshStandardMaterial({
    //       color: 0xf1f1f1,
    //       vertexColors: true,
    //     });
    //     model.traverse(function (node) {
    //       if (node.isMesh) {
    //         node.material = christmasMaterial;
    //         node.castShadow = true;
    //         node.receiveShadow = true;
    //       }
    //     });
    //     christmasMesh = model;
    //     scene.add(christmasMesh);
    //     modelsLoaded++;
    //     updateLoadingPercentage();
    //   },
    //   undefined,
    //   function (error) {
    //     console.error(error);
    //   }
    // );

    // Head
    loader.load(
      "../models/Blocky_Head.glb",
      function (gltf) {
        const model = gltf.scene;
        model.scale.set(0.3, 0.3, 0.3);
        const textureLoader = new TextureLoader();
        const randNum = Math.floor(Math.random() * (13 - 1 + 1) + 1); // Face picker
        const texture = textureLoader.load(
          `../models/textures/faces/${randNum}.webp`,
          function (texture) {
            texture.flipY = false;
            texture.needsUpdate = true;
          }
        );
        headMaterial = new MeshBasicMaterial({
          color: 0xffffff,
          map: texture,
        });
        model.traverse(function (node) {
          if (node.isMesh) {
            node.material = headMaterial;
            node.castShadow = true;
          }
        });
        headMesh = model;
        scene.add(headMesh);
        modelsLoaded++;
        updateLoadingPercentage();
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
    // Torso
    loader.load(
      "../models/Blocky_Torso.glb",
      function (gltf) {
        const model = gltf.scene;
        model.scale.set(0.3, 0.3, 0.3); // Adjust the scale as needed
        const textureLoader = new TextureLoader();
        const texture = textureLoader.load(
          `../models/textures/Christmas_Shirt.png`,
          function (texture) {
            texture.flipY = false;
            texture.needsUpdate = true;
          }
        );
        torsoMaterial = new MeshBasicMaterial({
          color: 0xffffff,
          map: texture,
        });
        model.traverse(function (node) {
          if (node.isMesh) {
            node.material = torsoMaterial;
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        torsoMesh = model;
        scene.add(torsoMesh);
        modelsLoaded++;
        updateLoadingPercentage();
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
    // Hands
    loader.load(
      "../models/Blocky_Hands.glb",
      function (gltf) {
        const model = gltf.scene;
        model.scale.set(0.3, 0.3, 0.3);
        const textureLoader = new TextureLoader();
        const texture = textureLoader.load(
          "../models/textures/Christmas_Shirt.png",
          function (texture) {
            texture.flipY = false;
            texture.needsUpdate = true;
          }
        );
        handsMaterial = new MeshBasicMaterial({
          color: 0xffffff,
          map: texture,
        });
        model.traverse(function (node) {
          if (node.isMesh) {
            node.material = handsMaterial;
            node.castShadow = true;
          }
        });
        handsMesh = model;
        scene.add(handsMesh);
        modelsLoaded++;
        updateLoadingPercentage();
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
    // Legs
    loader.load(
      "../models/Blocky_Legs.glb",
      function (gltf) {
        const model = gltf.scene;
        model.scale.set(0.3, 0.3, 0.3);
        const textureLoader = new TextureLoader();
        const texture = textureLoader.load(
          "../models/textures/Christmas_Pants.png",
          function (texture) {
            texture.flipY = false;
            texture.needsUpdate = true;
          }
        );
        legsMaterial = new MeshBasicMaterial({
          color: 0xffffff,
          map: texture,
        });
        model.traverse(function (node) {
          if (node.isMesh) {
            node.material = legsMaterial;
            node.castShadow = true;
          }
        });
        legsMesh = model;
        scene.add(legsMesh);
        modelsLoaded++;
        updateLoadingPercentage();
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    scene.add(ambientLight);
    renderer.setClearColor(0xf5ffff); // Background color

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
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  } catch (error) {
    console.error(error); // Log the error to the console
    sendError(`Error while building the scene: <br> ${error}`)
    alert(error)
  }


    // Snowfall ❄️
    // let snowfall;
    // function createSnowfall() {
    //   const snowflakeTexture = new TextureLoader().load(
    //     "../images/Snowflake.png"
    //   );
    //   const snowflakeMaterial = new PointsMaterial({
    //     size: 0.1,
    //     transparent: true,
    //     map: snowflakeTexture,
    //   });

    //   const snowflakeGeometry = new BufferGeometry();
    //   const snowflakeCount = 400;
    //   const snowflakePositions = new Float32Array(snowflakeCount * 3);
    //   const snowflakeSpeeds = new Float32Array(snowflakeCount);

    //   function initializeSnowflake(index) {
    //     // Random positions within the cube
    //     snowflakePositions[index * 3] = (Math.random() - 0.5) * 10;
    //     snowflakePositions[index * 3 + 1] = Math.random() * 10;
    //     snowflakePositions[index * 3 + 2] = (Math.random() - 0.5) * 10;
    //     snowflakeSpeeds[index] = Math.random() * 0.005 + 0.002; // Adjust speed range
    //   }

    //   for (let i = 0; i < snowflakeCount; i++) {
    //     initializeSnowflake(i);
    //   }

    //   snowflakeGeometry.setAttribute(
    //     "position",
    //     new BufferAttribute(snowflakePositions, 3)
    //   );

    //   snowfall = new Points(snowflakeGeometry, snowflakeMaterial);
    //   scene.add(snowfall);

    //   // Animate snowfall
    //   function animateSnowfall() {
    //     for (let i = 0; i < snowflakeCount; i++) {
    //       if (snowflakePositions[i * 3 + 1] < -1) {
    //         initializeSnowflake(i);
    //       } else {
    //         snowflakePositions[i * 3 + 1] -= snowflakeSpeeds[i];
    //       }

    //       // Horizontal and depth movement with randomness (wind effect)
    //       snowflakePositions[i * 3] += (Math.random() - 0.5) * 0.001;
    //       snowflakePositions[i * 3 + 2] += (Math.random() - 0.5) * 0.001;
    //     }

    //     snowflakeGeometry.attributes.position.needsUpdate = true;

    //     renderer.render(scene, camera);
    //     requestAnimationFrame(animateSnowfall);
    //   }
    //   animateSnowfall();
    // }

    // createSnowfall();
}