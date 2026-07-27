import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

var hat_models = [];
var glasses_models = [];
var base_models = [];
var misc_models = [];

let hatIndex = 0;
let glassesIndex = 0;
let baseIndex = 0;
let backgroundColor; 

let colorPicker = document.getElementById("bg-color");

colorPicker.addEventListener('change', () => {
    scene.background = new THREE.Color(colorPicker.value);
})

//create scene, camera, renderer. 

const scene = new THREE.Scene();
const mainCanvas = document.getElementById('canvas-3d');
const camera = new THREE.PerspectiveCamera(
  60,
  mainCanvas.width / mainCanvas.height,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({canvas: mainCanvas, alpha: false, antialias:true});

scene.background = new THREE.Color(colorPicker.value);


// CANVAS
const canvasSizes = {
    width: mainCanvas.clientWidth,
    height: mainCanvas.clientHeight
}

// Resize event
window.addEventListener('resize', () => {
    ResetCamera();
})

window.addEventListener('load', () => {
    ResetCamera();
})

function ResetCamera()
{
  canvasSizes.width = mainCanvas.clientWidth;
  canvasSizes.height = mainCanvas.clientHeight;

  // Update camera
  camera.aspect = canvasSizes.width / canvasSizes.height;
  camera.updateProjectionMatrix();

  // Update render
  renderer.setSize(canvasSizes.width, canvasSizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

renderer.setSize( mainCanvas.clientWidth, mainCanvas.clientHeight );


const controls = new OrbitControls(camera, mainCanvas);

camera.position.z = 13;

controls.update();

// Load models:
const loader = new GLTFLoader();

loader.load( 'models/bananyath-three-js.glb', function ( gltf ) {

  let bananyathModel = gltf.scene;

  const hidden = ['slot_hat_0', 'slot_glasses_2', 'slot_glasses_0', 'slot_base_1'];

  bananyathModel.traverse((o) => {
    if(o.isMesh)
    {
        //swap each material for a toon version.
        
        //add each sub-mesh to its list according to its name (glasses, hat, etc.)
        
       
        if(o.material.name != 'lente' && o.material.name != 'DarkLenses' )
        {
            let toonMaterial = new THREE.MeshToonMaterial({
                color : o.material.color, 
                map: o.material.map,
            });

            o.material = toonMaterial;
        }        

        o.visible = !hidden.includes(o.name) && !hidden.includes(o.parent.name);


        /*for(let i = 0; i < o.material.length; i++)
        {
            if(o.material[i].name = 'lente' || o.material[i].name == 'DarkLenses')
            {
                continue;
            }
            else
            {
                let toonMaterial = new THREE.MeshToonMaterial({
                    color : o.material[i].color, 
                    map: o.material[i].map,
                });

                o.material[i] = toonMaterial;
            }

            console.log(`model = ${o.name}; material slot ${i}: ${o.material[i]}`);
        }*/
    }
  })

  scene.add(bananyathModel);

  bananyathModel.rotation.y= - 3.14159265 * 0.5;

}, undefined, function (error) {

  console.error(error);

} );

const dirLight = new THREE.DirectionalLight(0xffffff, 3);
dirLight.position.set(1,1,1);
dirLight.target.position.set(0,0,0);

scene.add(dirLight);
scene.add(dirLight.target);

const effect = new OutlineEffect( renderer, {defaultThickness: 0.003});

function animate(time)
{  
  effect.render( scene, camera);
}

renderer.setAnimationLoop(animate);

// set initial state and swap models accordingly.

// hook buttons to swapping loaded models.

// orbit camera set by default.

//set rendering function

