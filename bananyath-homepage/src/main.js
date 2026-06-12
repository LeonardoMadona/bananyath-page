import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';

let bananyathModel;

const scene = new THREE.Scene();
const mainCanvas = document.getElementById('3dcanvas')
const camera = new THREE.PerspectiveCamera(
  60,
  mainCanvas.width / mainCanvas.height,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({canvas: mainCanvas, alpha: true});
renderer.setSize( mainCanvas.width, mainCanvas.height );

camera.position.z = 8;

const loader = new GLTFLoader();

loader.load( 'src/assets/halloweenNyath.glb', function ( gltf ) {

  bananyathModel = gltf.scene;


  /*bananyathModel.traverse((o) => {
    if(o.isMesh)
    {
      let toonMaterial = new THREE.MeshToonMaterial({
        color : o.material.color, 
        map: o.material.map
      });
      o.material = toonMaterial;
    }
  })*/

  scene.add(bananyathModel);

}, undefined, function (error) {

  console.error(error);

} );

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(1,1,1);
dirLight.target.position.set(0,0,0);

scene.add(dirLight);
scene.add(dirLight.target);

const effect = new OutlineEffect( renderer, {defaultThickness: 0.005});

function animate(time)
{
  if(bananyathModel)
  {
    bananyathModel.rotation.y = time / 2000;
    bananyathModel.rotation.x = .5 * Math.sin(time / 5000);
  }

  //renderer.render(scene, camera);
  effect.render( scene, camera);
}

renderer.setAnimationLoop(animate);

