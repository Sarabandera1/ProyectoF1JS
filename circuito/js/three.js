import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// 1️⃣ Configurar escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2️⃣ Cargar modelo GLTF
const loader = new GLTFLoader();
loader.load(
  "./models/brabham_bt44/scene.gltf", // Reemplaza con la ruta correcta
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(5, 5, 5);
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error("Error al cargar el modelo", error);
  }
);

// 3️⃣ Configurar luces
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// 4️⃣ Posicionar la cámara
camera.position.set(0, 5, 15);

// 5️⃣ Animación
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
