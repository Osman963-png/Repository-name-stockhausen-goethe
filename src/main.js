import * as THREE from "three";

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050510);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 25;

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

document.body.innerHTML = "";
document.body.appendChild(
  renderer.domElement
);

const colors = [
  0xffd700,
  0xff3300,
  0x0033ff,
  0x7a00ff,
  0x00cc66
];

const octagons = [];

for (let i = 0; i < 10; i++) {

  const geometry =
    new THREE.CylinderGeometry(
      2 + i * 1.5,
      2 + i * 1.5,
      0.15,
      8,
      1,
      true
    );

  const material =
    new THREE.MeshBasicMaterial({
      color:
        colors[
          i % colors.length
        ],
      wireframe: true
    });

  const mesh =
    new THREE.Mesh(
      geometry,
      material
    );

  scene.add(mesh);

  octagons.push({
    mesh,
    speed:
      0.001 +
      Math.random() * 0.005,
    phase:
      Math.random() *
      Math.PI *
      2
  });

}
const particleCount = 6000;

const positions = [];

for (
  let i = 0;
  i < particleCount;
  i++
) {

  positions.push(
    (Math.random() - 0.5) * 300
  );

  positions.push(
    (Math.random() - 0.5) * 300
  );

  positions.push(
    (Math.random() - 0.5) * 300
  );

}

const starGeometry =
  new THREE.BufferGeometry();

starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(
    positions,
    3
  )
);

const starMaterial =
  new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.2
  });

const stars =
  new THREE.Points(
    starGeometry,
    starMaterial
  );

scene.add(stars);




const clock =
  new THREE.Clock();

function animate() {

  requestAnimationFrame(
    animate
  );

  const t =
    clock.getElapsedTime();

  octagons.forEach(
    (obj, index) => {

      obj.mesh.rotation.x +=
        obj.speed;

      obj.mesh.rotation.y +=
        obj.speed;

      obj.mesh.position.z =
        Math.sin(
          t +
          obj.phase
        ) * 1.5;

    }
  );

  renderer.render(
    scene,
    camera
  );

}

animate();

window.addEventListener(
  "resize",
  () => {
   stars.rotation.y +=
  0.0005;
    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
);

