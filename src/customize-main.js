import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

let hatModels = [];
let glassesModels = [];
let bananyathModel;

let hatIndex = 0;
let glassesIndex = 0;

//list of ints between 0 and 255. this needs to be validated somewhere
let backgroundColor = [0,0,0]; 