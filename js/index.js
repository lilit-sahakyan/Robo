// Initial website setup
import { initScene } from "./scene.js"; // Setup the scene
import { setupControls } from "./controls.js"; // Setup use controls
import { setupRenderTypes } from "./renderTypes.js"; // Setup Render types

initScene();
setupControls();
setupRenderTypes();

// Backend functions 📌

// Error 
export function sendError(error) {
  document.getElementById("errorMessage").innerHTML = error;
  document.getElementById("errorMenu").classList.add('open');
}