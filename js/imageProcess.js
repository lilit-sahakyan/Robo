import { reset } from "./applyClothing.js";

export function drawTorso(pants, shirt, defaultShirt, callback) {
  const skinImage = new Image();
  skinImage.src = "../images/skin.png";
  skinImage.addEventListener("load", () => {
    const faceImage = new Image();
    faceImage.src = "../images/Face.png";
    faceImage.addEventListener("load", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = skinImage.width;
      canvas.height = skinImage.height;

      ctx.drawImage(skinImage, 0, 0);
      ctx.drawImage(pants, 0, 0);
      if (defaultShirt == false) {ctx.drawImage(shirt, 0, 0);}
      ctx.drawImage(faceImage, 0, 0);

      const overlaidImage = new Image();
      overlaidImage.src = canvas.toDataURL();

      callback(overlaidImage);
    });
  });
}

export function addSkin(img, callback) {
  if(reset !== true){
  const skinImage = new Image();
  skinImage.src = "../images/skin.png";
  skinImage.addEventListener("load", () => {
    const faceImage = new Image();
    faceImage.src = "../images/Face.png";
    faceImage.addEventListener("load", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = skinImage.width;
      canvas.height = skinImage.height;

      ctx.drawImage(skinImage, 0, 0);
      ctx.drawImage(img, 0, 0);
      ctx.drawImage(faceImage, 0, 0);

      const overlaidImage = new Image();
      overlaidImage.src = canvas.toDataURL();

      callback(overlaidImage);
    });
  });}
}

function draw(
  img,
  skin,
  startX,
  startY,
  endX,
  endY,
  offsetX,
  offsetY,
  callback
) {
  const overlayCanvas = document.createElement("canvas");
  const overlayCtx = overlayCanvas.getContext("2d");
  const pixelRangeX = endX - startX;
  const pixelRangeY = endY - startY;
  // console.log(pixelRangeX + " " + pixelRangeY);

  overlayCanvas.width = skin.width;
  overlayCanvas.height = skin.height;
  // console.log(overlayCanvas.width + ' ' + overlayCanvas.height)
  overlayCtx.drawImage(skin, 0, 0, skin.width, skin.height);
  overlayCtx.drawImage(
    img,
    startX,
    startY,
    pixelRangeX,
    pixelRangeY,
    offsetX,
    offsetY,
    pixelRangeX,
    pixelRangeY
  );
  const newImage = new Image();
  newImage.src = overlayCanvas.toDataURL();
  newImage.onload = function () {
    document.getElementById("image2D").src = newImage.src;
    callback(newImage);
  };
}
export function draw2D(type, image, drawShirt, currentHands) {
  if (reset !== true){
    let skin = new Image();
    skin.src = document.getElementById("image2D").src;
    skin.addEventListener("load", () => {
      let img = new Image();
      img.src = image.src;
      img.addEventListener("load", () => {
        if (type == "shirt") {
          draw(img,skin,231,74,231+128,74+128,168,69,(skin)=>{draw(img,skin,217,355,217+64,355+128,104,69,(skin)=>{draw(img,skin,308,355,308+64,355+128,296,69,(skin)=>{draw(img,skin,427,74,427+128,74+128,453,69,(skin)=>{draw(img,skin,85,355,85+64,355+128,581,69,(skin)=>{draw(img,skin,440,355,440+64,355+128,389,69,(skin)=>{draw(img,skin,151,355,151+64,355+128,25,69,(skin)=>{draw(img,skin,374,355,374+64,355+128,660,69,(skin)=>{})})})})})})})});
        } else if (type == "pants") {
          draw(img,skin,231,74,231+128,74+128,168,69,(skin)=>{draw(img,skin,217,355,217+64,355+128,104+64,197,(skin)=>{draw(img,skin,308,355,308+64,355+128,296-64,197,(skin)=>{draw(img,skin,427,74,427+128,74+128,453,69,(skin)=>{draw(img,skin,85,355,85+64,355+128,581-64,197,(skin)=>{draw(img,skin,440,355,440+64,355+128,389+64,197,(skin)=>{draw(img,skin,151,355,151+64,355+128,25,197,(skin)=>{draw(img,skin,374,355,374+64,355+128,660,197,(skin)=>{})})})})})})})});
        }
      });
    });
  }
}