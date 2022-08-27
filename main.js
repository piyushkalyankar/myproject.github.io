import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.setZ(20);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('main-container')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

new OrbitControls(camera, renderer.domElement)

const createMeshWithRandomPosition = (geometry, material, scene) => {
  let mesh = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(50));
  mesh.position.set(x, y, z);
  scene.add(mesh);
  return mesh;
}


const cubeshinyMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.1,
  roughness: 0.2,
  transparent: true,
  opacity: 0.7,
});

const crystalGeometry = new THREE.OctahedronGeometry(1, 0);
const shinyMaterialforcrystal = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.1,
  roughness: 0.2,
  transparent: true,
  opacity: 0.7,
});

//const sphereGeometry 
const pointlight1 = new THREE.PointLight(0xbf40Bf);
pointlight1.position.set(5, -28, 5);
scene.add(pointlight1);

const pointlight2 = new THREE.PointLight(0x00ffff);
pointlight2.position.set(5, 5, 5);
scene.add(pointlight2);


const crystal = new THREE.Mesh(crystalGeometry, shinyMaterialforcrystal);
scene.add(crystal);

let crystals = [];
for (let i = 0; i < 300; i++) {
  let mesh = createMeshWithRandomPosition(crystalGeometry, shinyMaterialforcrystal, scene);
  crystals.push(mesh);
}

let cubes = [];
for(let i = 0 ; i < 100 ; i++){
  const cubegeometry = new THREE.BoxGeometry(Math.random()*10,Math.random()*10, Math.random()*10);
  let cubemesh = createMeshWithRandomPosition(cubegeometry, cubeshinyMaterial, scene);
  cubes.push(cubemesh);
}

function animate() {
  requestAnimationFrame(animate)
  for (let i = 0; i < crystals.length; i++) {
    crystals[i].rotation.x += 0.01
    crystals[i].rotation.y += 0.01
    //crystals[i].scale.set(Math.random(),Math.random(),Math.random())
  }

  for (let i = 0; i < cubes.length; i++) {
    cubes[i].rotation.x += 0.01
    cubes[i].rotation.y += 0.01
    //cubes[i].scale.set(Math.random(),Math.random(),Math.random())
  }
  render()
}

function render() {
  renderer.render(scene, camera)
}

animate()
