import * as THREE from 'three'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000011)

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.innerHTML = ''
document.body.appendChild(renderer.domElement)

const geometry = new THREE.CylinderGeometry(
  5,
  5,
  1,
  8
)

const material = new THREE.MeshBasicMaterial({
  color: 0xffcc00,
  wireframe: true
})

const octogono = new THREE.Mesh(
  geometry,
  material
)

scene.add(octogono)

camera.position.z = 12

function animate() {
  requestAnimationFrame(animate)

  octogono.rotation.x += 0.005
  octogono.rotation.y += 0.01

  renderer.render(scene, camera)
}

animate()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  )
})