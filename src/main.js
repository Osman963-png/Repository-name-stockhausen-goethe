import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x040410);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 30;

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

const octagons = [];

const colors = [
  0xffd700,
  0xff3300,
  0x0033ff,
  0x7a00ff,
  0x00cc66
];

for (let i = 0; i < 12; i++) {

  const geometry =
    new THREE.CylinderGeometry(
      2 + i * 1.4,
      2 + i * 1.4,
      0.2,
      8,
      1,
      true
    );

  const material =
    new THREE.MeshBasicMaterial({
      color: colors[i % colors.length],
      wireframe: true
    });

  const octagon =
    new THREE.Mesh(
      geometry,
      material
    );

  scene.add(octagon);

  octagons.push({
    mesh: octagon,
    speedX:
      (Math.random() - 0.5) *
      0.01,

    speedY:
      (Math.random() - 0.5) *
      0.01,

    phase:
      Math.random() *
      Math.PI *
      2
  });
}

const particleCount = 3000;

const particleGeometry =
  new THREE.BufferGeometry();

const positions = [];

for (
  let i = 0;
  i < particleCount;
  i++
) {

  positions.push(
    (Math.random() - 0.5) *
      200
  );

  positions.push(
    (Math.random() - 0.5) *
      200
  );

  positions.push(
    (Math.random() - 0.5) *
      200
  );
}

particleGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(
    positions,
    3
  )
);

const particleMaterial =
  new THREE.PointsMaterial({
    size: 0.2,
    color: 0xffffff
  });

const stars = new THREE.Points(
  particleGeometry,
  particleMaterial
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

  stars.rotation.y +=
    0.0005;

  octagons.forEach(
    (obj, index) => {

      obj.mesh.rotation.x +=
        obj.speedX;

      obj.mesh.rotation.y +=
        obj.speedY;

      obj.mesh.position.z =
        Math.sin(
          t +
          obj.phase
        ) * 2;

      const hue =
        (
          t * 0.05 +
          index * 0.08
        ) % 1;

      obj.mesh.material.color.setHSL(
        hue,
        0.9,
        0.55
      );

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