import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

let bananyathModel;

const scene = new THREE.Scene();
const mainCanvas = document.getElementById('canvas1')
const camera = new THREE.PerspectiveCamera(
  60,
  mainCanvas.width / mainCanvas.height,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({canvas: mainCanvas, alpha: true, antialias:true});
renderer.setSize( mainCanvas.width, mainCanvas.height );

camera.position.z = 13;

const loader = new GLTFLoader();

loader.load( 'src/assets/halloweenNyath.glb', function ( gltf ) {

  bananyathModel = gltf.scene;


  bananyathModel.traverse((o) => {
    if(o.isMesh && o.name != "lente_nova001")
    {
      let toonMaterial = new THREE.MeshToonMaterial({
        color : o.material.color, 
        map: o.material.map,
      });

      o.material = toonMaterial;
    }
  })

  scene.add(bananyathModel);

}, undefined, function (error) {

  console.error(error);

} );

const dirLight = new THREE.DirectionalLight(0xffffff, 3);
dirLight.position.set(1,1,1);
dirLight.target.position.set(0,0,0);

scene.add(dirLight);
scene.add(dirLight.target);

const effect = new OutlineEffect( renderer, {defaultThickness: 0.0075});

function animate(time)
{
  if(bananyathModel)
  {
    bananyathModel.rotation.y = (-0.5 * Math.PI) + (.5 * Math.sin(time / 1500));
    bananyathModel.rotation.x = .2 + (.2 * Math.sin(time / 2500));

    let scaleFactor = 1 + ((Math.sin(time / 3500) + 1) / 2) * .15;

    bananyathModel.scale.set(scaleFactor, scaleFactor, scaleFactor);
  }

  //renderer.render(scene, camera);
  effect.render( scene, camera);
}

renderer.setAnimationLoop(animate);

function Customize() {
  console.log('teste');
}

