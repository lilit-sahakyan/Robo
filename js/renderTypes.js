export function setupRenderTypes() {
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
}
