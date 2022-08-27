import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.ExtrudeGeometry()


var cube = [];
const createMeshWithRandomPosition = (geometry, material, scene) => {
  let mesh = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(50));
  mesh.position.set(x, y, z);
  scene.add(mesh);
  return mesh;
}

for(let i = 0 ; i < 500 ; i++){
  const material = new THREE.MeshBasicMaterial({
    color: Math.random() * 0xff0000,
    wireframe: false,
  });
  let mesh = createMeshWithRandomPosition(geometry,material, scene);
  cube.push(mesh);
}


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)
  for(let i = 0; i< cube.length ; i++){
    cube[i].rotation.x += 0.01
    cube[i].rotation.y += 0.01
  }
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()