// Importar Three.js y el cargador GLTF
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// 1️⃣ CREAR LA ESCENA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// 2️⃣ CARGAR MODELO 3D DEL CARRO (Mercedes F1 W14)
const loader = new GLTFLoader();
loader.load(
  "https://model-url.glb", // 🔄 REEMPLAZA con la URL del modelo o la ruta local "./models/car/scene.gltf"
  function (gltf) {
    const model = gltf.scene;
    
    // 📌 Ajustar tamaño y posición del modelo
    model.scale.set(10, 10, 10); // Ajusta según el tamaño del modelo
    model.position.set(0, -2, 0); // Centrar en la escena
    model.rotation.y = Math.PI; // Rotar si es necesario
    
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error("Error al cargar el modelo", error);
  }
);

// 3️⃣ LUCES PARA ILUMINAR EL MODELO
const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

// 4️⃣ POSICIONAR CÁMARA
camera.position.set(0, 2, 10); // Alejar la cámara para ver el modelo completo

// 5️⃣ AJUSTAR AL REDIMENSIONAR VENTANA
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 6️⃣ ANIMACIÓN (RENDERIZAR EL MODELO)
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
